"use client"

import type React from "react"

import { useState, useMemo, useRef } from "react"
import { useProject, type Host } from "@/lib/project-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { NetworkIcon, Server, Router, Info, ZoomIn, ZoomOut, Move } from "lucide-react"

// Define node types and their data structures
type NodeType = "network" | "host" | "device"

interface Node {
  id: string
  type: NodeType
  x: number
  y: number
  width: number
  height: number
  data: any
}

interface Edge {
  id: string
  source: string
  target: string
  type: string
}

export default function TopologyPage() {
  const { currentProject } = useProject()
  const [showNetworks, setShowNetworks] = useState(true)
  const [showHosts, setShowHosts] = useState(true)
  const [showDevices, setShowDevices] = useState(true)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  // Create nodes and edges from project data
  const { nodes, edges } = useMemo(() => {
    if (!currentProject) return { nodes: [], edges: [] }

    const nodesArray: Node[] = []
    const edgesArray: Edge[] = []
    const nodePositions: Record<string, { x: number; y: number }> = {}

    // Calculate positions for networks (in a row at the top)
    const networkSpacing = 300
    const networkY = 100
    currentProject.networks.forEach((network, index) => {
      const position = { x: (index + 1) * networkSpacing, y: networkY }
      nodePositions[`network-${network.network_id}`] = position

      if (showNetworks) {
        nodesArray.push({
          id: `network-${network.network_id}`,
          type: "network",
          x: position.x,
          y: position.y,
          width: 150,
          height: 60,
          data: {
            label: network.name,
            cidr: network.cidr_block,
            notes: network.notes,
          },
        })
      }
    })

    // Calculate positions for devices (in a row below networks)
    const deviceSpacing = 300
    const deviceY = 250
    currentProject.network_devices.forEach((device, index) => {
      const position = { x: (index + 1) * deviceSpacing, y: deviceY }
      nodePositions[`device-${device.device_id}`] = position

      if (showDevices) {
        nodesArray.push({
          id: `device-${device.device_id}`,
          type: "device",
          x: position.x,
          y: position.y,
          width: 150,
          height: 70,
          data: {
            label: device.name,
            type: device.device_type,
            ips: device.ip_addresses,
            status: device.status,
            notes: device.notes,
          },
        })

        // Add edges from devices to networks
        if (showNetworks) {
          device.connected_networks.forEach((networkId) => {
            edgesArray.push({
              id: `edge-${device.device_id}-${networkId}`,
              source: `device-${device.device_id}`,
              target: `network-${networkId}`,
              type: "device-to-network",
            })
          })
        }
      }
    })

    // Calculate positions for hosts (in rows below devices, grouped by network)
    const hostSpacing = 200
    const hostY = 400
    const hostsPerRow = 5
    const hostsByNetwork: Record<string, Host[]> = {}

    // Group hosts by network
    currentProject.hosts.forEach((host) => {
      // Find which network this host belongs to based on IP
      const network = currentProject.networks.find((network) => {
        const networkPrefix = network.cidr_block.split("/")[0].split(".")
        const hostIp = host.ip_address.split(".")
        const cidrMask = Number.parseInt(network.cidr_block.split("/")[1])
        const octetsToCompare = Math.floor(cidrMask / 8)

        for (let i = 0; i < octetsToCompare; i++) {
          if (networkPrefix[i] !== hostIp[i]) return false
        }
        return true
      })

      if (network) {
        if (!hostsByNetwork[network.network_id]) {
          hostsByNetwork[network.network_id] = []
        }
        hostsByNetwork[network.network_id].push(host)
      }
    })

    // Position hosts by network
    Object.entries(hostsByNetwork).forEach(([networkId, hosts]) => {
      const networkPosition = nodePositions[`network-${networkId}`]

      if (networkPosition && showHosts) {
        hosts.forEach((host, index) => {
          const row = Math.floor(index / hostsPerRow)
          const col = index % hostsPerRow
          const position = {
            x: networkPosition.x - (hostsPerRow * hostSpacing) / 2 + col * hostSpacing,
            y: hostY + row * 100,
          }

          nodesArray.push({
            id: `host-${host.host_id}`,
            type: "host",
            x: position.x,
            y: position.y,
            width: 150,
            height: 70,
            data: {
              label: host.hostname || host.ip_address,
              ip: host.ip_address,
              os: host.os,
              status: host.status,
              services: host.services,
              vulnerabilities: host.vulnerabilities,
            },
          })

          // Add edge from host to network
          if (showNetworks) {
            edgesArray.push({
              id: `edge-${host.host_id}-${networkId}`,
              source: `host-${host.host_id}`,
              target: `network-${networkId}`,
              type: "host-to-network",
            })
          }

          // Add edges from hosts to devices if they're on the same network
          if (showDevices) {
            currentProject.network_devices.forEach((device) => {
              if (device.connected_networks.includes(networkId)) {
                edgesArray.push({
                  id: `edge-${host.host_id}-${device.device_id}`,
                  source: `host-${host.host_id}`,
                  target: `device-${device.device_id}`,
                  type: "host-to-device",
                })
              }
            })
          }
        })
      }
    })

    return { nodes: nodesArray, edges: edgesArray }
  }, [currentProject, showNetworks, showHosts, showDevices])

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  // Handle pan start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  // Handle pan move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
      setDragStart({ x: e.clientX, y: e.clientY })
    }
  }

  // Handle pan end
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle node click
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node)
  }

  // Calculate SVG viewBox
  const viewBox = useMemo(() => {
    if (nodes.length === 0) return "0 0 1000 700"

    const minX = Math.min(...nodes.map((n) => n.x - n.width / 2))
    const minY = Math.min(...nodes.map((n) => n.y - n.height / 2))
    const maxX = Math.max(...nodes.map((n) => n.x + n.width / 2))
    const maxY = Math.max(...nodes.map((n) => n.y + n.height / 2))

    const width = maxX - minX + 200
    const height = maxY - minY + 200

    return `${minX - 100} ${minY - 100} ${width} ${height}`
  }, [nodes])

  // Draw edge between nodes
  const drawEdge = (edge: Edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source)
    const targetNode = nodes.find((n) => n.id === edge.target)

    if (!sourceNode || !targetNode) return null

    const sourceX = sourceNode.x
    const sourceY = sourceNode.y
    const targetX = targetNode.x
    const targetY = targetNode.y

    // Calculate control points for curved lines
    const midX = (sourceX + targetX) / 2
    const midY = (sourceY + targetY) / 2
    const dx = targetX - sourceX
    const dy = targetY - sourceY
    const controlX = midX - dy * 0.2
    const controlY = midY + dx * 0.2

    // Different styles for different edge types
    let strokeColor = "#6b7280"
    let strokeDasharray = ""
    let strokeWidth = 1.5

    if (edge.type === "device-to-network") {
      strokeColor = "#9333ea"
      strokeWidth = 2
    } else if (edge.type === "host-to-network") {
      strokeColor = "#3b82f6"
    } else if (edge.type === "host-to-device") {
      strokeDasharray = "5,5"
    }

    return (
      <path
        key={edge.id}
        d={`M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
    )
  }

  // Render node based on type
  const renderNode = (node: Node) => {
    let fill = "#f3f4f6"
    let stroke = "#6b7280"
    let icon = null

    if (node.type === "network") {
      fill = "rgba(59, 130, 246, 0.2)"
      stroke = "#3b82f6"
      icon = <NetworkIcon className="h-4 w-4 text-blue-500" />
    } else if (node.type === "host") {
      fill = "rgba(34, 197, 94, 0.2)"
      stroke = "#22c55e"
      icon = <Server className="h-4 w-4 text-green-500" />
    } else if (node.type === "device") {
      fill = "rgba(147, 51, 234, 0.2)"
      stroke = "#9333ea"
      icon = <Router className="h-4 w-4 text-purple-500" />
    }

    const isSelected = selectedNode?.id === node.id

    return (
      <g
        key={node.id}
        transform={`translate(${node.x - node.width / 2}, ${node.y - node.height / 2})`}
        onClick={() => handleNodeClick(node)}
        style={{ cursor: "pointer" }}
      >
        <rect
          width={node.width}
          height={node.height}
          rx={6}
          fill={fill}
          stroke={stroke}
          strokeWidth={isSelected ? 3 : 1.5}
        />
        <foreignObject width={node.width} height={node.height}>
          <div className="p-2 h-full flex flex-col">
            <div className="flex items-center gap-1 font-medium text-sm truncate">
              {icon}
              <span>{node.data.label}</span>
            </div>
            {node.type === "network" && <div className="text-xs text-muted-foreground truncate">{node.data.cidr}</div>}
            {node.type === "host" && <div className="text-xs text-muted-foreground truncate">{node.data.ip}</div>}
            {node.type === "device" && (
              <div className="text-xs text-muted-foreground truncate capitalize">{node.data.type}</div>
            )}
            {node.type === "host" && node.data.status && (
              <div className="mt-1">
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      node.data.status === "exploited"
                        ? "rgba(239, 68, 68, 0.2)"
                        : node.data.status === "vulnerable"
                          ? "rgba(249, 115, 22, 0.2)"
                          : "rgba(59, 130, 246, 0.2)",
                    color:
                      node.data.status === "exploited"
                        ? "#ef4444"
                        : node.data.status === "vulnerable"
                          ? "#f97316"
                          : "#3b82f6",
                  }}
                >
                  {node.data.status}
                </span>
              </div>
            )}
          </div>
        </foreignObject>
      </g>
    )
  }

  if (!currentProject) {
    return (
      <div className="text-center py-10">
        <h3 className="mt-4 text-lg font-semibold">Project not found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The project you're looking for doesn't exist or hasn't been loaded.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Network Topology</h2>
          <p className="text-muted-foreground">Visual representation of networks, devices, and hosts</p>
        </div>
      </div>

      <div className="border rounded-md h-[700px] relative">
        <div className="absolute top-4 left-4 z-10 bg-background border rounded-md p-4 shadow-md">
          <div className="font-medium mb-2">Show/Hide</div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-networks"
                checked={showNetworks}
                onCheckedChange={(checked) => setShowNetworks(!!checked)}
              />
              <Label htmlFor="show-networks" className="flex items-center gap-2">
                <NetworkIcon className="h-4 w-4 text-blue-500" /> Networks
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-devices"
                checked={showDevices}
                onCheckedChange={(checked) => setShowDevices(!!checked)}
              />
              <Label htmlFor="show-devices" className="flex items-center gap-2">
                <Router className="h-4 w-4 text-purple-500" /> Network Devices
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="show-hosts" checked={showHosts} onCheckedChange={(checked) => setShowHosts(!!checked)} />
              <Label htmlFor="show-hosts" className="flex items-center gap-2">
                <Server className="h-4 w-4 text-green-500" /> Hosts
              </Label>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className={isDragging ? "bg-muted" : ""}>
            <Move className="h-4 w-4" />
          </Button>
        </div>

        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={viewBox}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: "center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g>
            {edges.map(drawEdge)}
            {nodes.map(renderNode)}
          </g>
        </svg>
      </div>

      {selectedNode && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedNode.type === "network" ? (
                <NetworkIcon className="h-5 w-5 text-blue-500" />
              ) : selectedNode.type === "device" ? (
                <Router className="h-5 w-5 text-purple-500" />
              ) : (
                <Server className="h-5 w-5 text-green-500" />
              )}
              {selectedNode.data.label}
            </CardTitle>
            <CardDescription>
              {selectedNode.type === "network"
                ? `Network: ${selectedNode.data.cidr}`
                : selectedNode.type === "device"
                  ? `Device Type: ${selectedNode.data.type}`
                  : `IP: ${selectedNode.data.ip}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedNode.type === "network" && (
                <div>
                  <div className="font-medium flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4" /> Details
                  </div>
                  <div className="text-sm">{selectedNode.data.notes || "No additional notes."}</div>
                </div>
              )}

              {selectedNode.type === "device" && (
                <div>
                  <div className="font-medium flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4" /> Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="capitalize">{selectedNode.data.status}</span>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      <span className="capitalize">{selectedNode.data.type}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className="font-medium">IP Addresses:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedNode.data.ips.map((ip: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {ip}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-2" />
                  <div className="text-sm">{selectedNode.data.notes || "No additional notes."}</div>
                </div>
              )}

              {selectedNode.type === "host" && (
                <div>
                  <div className="font-medium flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4" /> Details
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">IP:</span> {selectedNode.data.ip}
                    </div>
                    <div>
                      <span className="font-medium">OS:</span> {selectedNode.data.os || "Unknown"}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span>{" "}
                      <span className="capitalize">{selectedNode.data.status}</span>
                    </div>
                  </div>

                  {selectedNode.data.services && selectedNode.data.services.length > 0 && (
                    <div className="mt-2">
                      <span className="font-medium">Services:</span>
                      <div className="mt-1 space-y-1">
                        {selectedNode.data.services.slice(0, 3).map((service: any, index: number) => (
                          <div key={index} className="text-xs">
                            {service.port}/{service.protocol}: {service.service_name} {service.product}{" "}
                            {service.version}
                          </div>
                        ))}
                        {selectedNode.data.services.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{selectedNode.data.services.length - 3} more services
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedNode.data.vulnerabilities && selectedNode.data.vulnerabilities.length > 0 && (
                    <div className="mt-2">
                      <span className="font-medium">Vulnerabilities:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedNode.data.vulnerabilities.map((vuln: string, index: number) => (
                          <Badge key={index} variant="destructive">
                            {vuln}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
