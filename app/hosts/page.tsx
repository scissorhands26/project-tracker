"use client"

import { useState } from "react"
import { useProject, type Host, type Service, type Note } from "@/lib/project-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Server, Plus, Trash2, Edit, Clock, Tag, AlertCircle } from "lucide-react"
import { format } from "date-fns"

export default function HostsPage() {
  const { currentProject, addHost, updateHost, deleteHost } = useProject()
  const [newHost, setNewHost] = useState<Partial<Host>>({
    ip_address: "",
    hostname: "",
    os: "",
    status: "discovered",
    tags: [],
    services: [],
    vulnerabilities: [],
    notes: [],
  })
  const [editingHost, setEditingHost] = useState<Host | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [hostToDelete, setHostToDelete] = useState<string | null>(null)

  // Service management
  const [newService, setNewService] = useState<Service>({
    port: 0,
    protocol: "tcp",
    service_name: "",
    product: "",
    version: "",
    banner: "",
    vulnerabilities: [],
  })

  // Note management
  const [newNote, setNewNote] = useState<Partial<Note>>({
    author: "",
    note: "",
  })

  // Tag management
  const [newTag, setNewTag] = useState("")

  // Vulnerability management
  const [newVulnerability, setNewVulnerability] = useState("")

  const handleAddHost = () => {
    addHost(newHost)
    setNewHost({
      ip_address: "",
      hostname: "",
      os: "",
      status: "discovered",
      tags: [],
      services: [],
      vulnerabilities: [],
      notes: [],
    })
    setIsAddOpen(false)
  }

  const handleUpdateHost = () => {
    if (editingHost) {
      updateHost(editingHost)
      setEditingHost(null)
      setIsEditOpen(false)
    }
  }

  const handleDeleteHost = () => {
    if (hostToDelete) {
      deleteHost(hostToDelete)
      setHostToDelete(null)
      setIsDeleteOpen(false)
    }
  }

  const addServiceToHost = () => {
    if (editingHost) {
      setEditingHost({
        ...editingHost,
        services: [...editingHost.services, newService],
      })
      setNewService({
        port: 0,
        protocol: "tcp",
        service_name: "",
        product: "",
        version: "",
        banner: "",
        vulnerabilities: [],
      })
    }
  }

  const removeServiceFromHost = (index: number) => {
    if (editingHost) {
      const updatedServices = [...editingHost.services]
      updatedServices.splice(index, 1)
      setEditingHost({
        ...editingHost,
        services: updatedServices,
      })
    }
  }

  const addNoteToHost = () => {
    if (editingHost) {
      const newNoteWithTimestamp: Note = {
        timestamp: new Date().toISOString(),
        author: newNote.author || "user",
        note: newNote.note || "",
      }

      setEditingHost({
        ...editingHost,
        notes: [...editingHost.notes, newNoteWithTimestamp],
      })
      setNewNote({
        author: "",
        note: "",
      })
    }
  }

  const removeNoteFromHost = (index: number) => {
    if (editingHost) {
      const updatedNotes = [...editingHost.notes]
      updatedNotes.splice(index, 1)
      setEditingHost({
        ...editingHost,
        notes: updatedNotes,
      })
    }
  }

  const addTagToHost = () => {
    if (editingHost && newTag) {
      setEditingHost({
        ...editingHost,
        tags: [...editingHost.tags, newTag],
      })
      setNewTag("")
    }
  }

  const removeTagFromHost = (tag: string) => {
    if (editingHost) {
      setEditingHost({
        ...editingHost,
        tags: editingHost.tags.filter((t) => t !== tag),
      })
    }
  }

  const addVulnerabilityToHost = () => {
    if (editingHost && newVulnerability) {
      setEditingHost({
        ...editingHost,
        vulnerabilities: [...editingHost.vulnerabilities, newVulnerability],
      })
      setNewVulnerability("")
    }
  }

  const removeVulnerabilityFromHost = (vuln: string) => {
    if (editingHost) {
      setEditingHost({
        ...editingHost,
        vulnerabilities: editingHost.vulnerabilities.filter((v) => v !== vuln),
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP p")
    } catch (error) {
      return dateString
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "discovered":
        return "bg-blue-500"
      case "scanning":
        return "bg-yellow-500"
      case "vulnerable":
        return "bg-orange-500"
      case "exploited":
        return "bg-red-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!currentProject) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center py-10">
          <h3 className="mt-4 text-lg font-semibold">No project selected</h3>
          <p className="mt-2 text-sm text-muted-foreground">Please select or create a project first.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hosts</h1>
          <p className="text-muted-foreground">Project: {currentProject.project_name}</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Host
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Host</DialogTitle>
              <DialogDescription>Add a new host to your project</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ip_address">IP Address</Label>
                  <Input
                    id="ip_address"
                    value={newHost.ip_address}
                    onChange={(e) => setNewHost({ ...newHost, ip_address: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hostname">Hostname</Label>
                  <Input
                    id="hostname"
                    value={newHost.hostname}
                    onChange={(e) => setNewHost({ ...newHost, hostname: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="os">Operating System</Label>
                <Input id="os" value={newHost.os} onChange={(e) => setNewHost({ ...newHost, os: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newHost.status}
                  onValueChange={(value) => setNewHost({ ...newHost, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discovered">Discovered</SelectItem>
                    <SelectItem value="scanning">Scanning</SelectItem>
                    <SelectItem value="vulnerable">Vulnerable</SelectItem>
                    <SelectItem value="exploited">Exploited</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddHost}>Add Host</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {currentProject.hosts.length === 0 ? (
        <div className="text-center py-10">
          <Server className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No hosts yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Add your first host to get started.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentProject.hosts.map((host) => (
            <Card key={host.host_id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{host.hostname || host.ip_address}</CardTitle>
                    <CardDescription>{host.hostname ? host.ip_address : ""}</CardDescription>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(host.status)}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="text-sm">
                    <span className="font-medium">OS:</span> {host.os || "Unknown"}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Status:</span> {host.status}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">First seen: {formatDate(host.first_seen)}</span>
                  </div>

                  {host.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {host.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {host.vulnerabilities.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium mb-1">Vulnerabilities:</div>
                      <div className="flex flex-wrap gap-1">
                        {host.vulnerabilities.map((vuln, index) => (
                          <Badge key={index} variant="destructive">
                            {vuln}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {host.services.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium mb-1">Services:</div>
                      <div className="text-sm">
                        {host.services.slice(0, 3).map((service, index) => (
                          <div key={index} className="text-muted-foreground">
                            {service.port}/{service.protocol}: {service.service_name}
                          </div>
                        ))}
                        {host.services.length > 3 && (
                          <div className="text-muted-foreground">+{host.services.length - 3} more</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog
                  open={isEditOpen && editingHost?.host_id === host.host_id}
                  onOpenChange={(open) => {
                    setIsEditOpen(open)
                    if (open) setEditingHost(host)
                    else setEditingHost(null)
                  }}
                >
                  <DialogTrigger asChild onClick={() => setEditingHost(host)}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Host</DialogTitle>
                      <DialogDescription>Update host details</DialogDescription>
                    </DialogHeader>
                    {editingHost && (
                      <Tabs defaultValue="details">
                        <TabsList className="grid grid-cols-5 mb-4">
                          <TabsTrigger value="details">Details</TabsTrigger>
                          <TabsTrigger value="services">Services</TabsTrigger>
                          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
                          <TabsTrigger value="tags">Tags</TabsTrigger>
                          <TabsTrigger value="notes">Notes</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit_ip_address">IP Address</Label>
                              <Input
                                id="edit_ip_address"
                                value={editingHost.ip_address}
                                onChange={(e) => setEditingHost({ ...editingHost, ip_address: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit_hostname">Hostname</Label>
                              <Input
                                id="edit_hostname"
                                value={editingHost.hostname}
                                onChange={(e) => setEditingHost({ ...editingHost, hostname: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit_os">Operating System</Label>
                            <Input
                              id="edit_os"
                              value={editingHost.os}
                              onChange={(e) => setEditingHost({ ...editingHost, os: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit_status">Status</Label>
                            <Select
                              value={editingHost.status}
                              onValueChange={(value) => setEditingHost({ ...editingHost, status: value as any })}
                            >
                              <SelectTrigger id="edit_status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="discovered">Discovered</SelectItem>
                                <SelectItem value="scanning">Scanning</SelectItem>
                                <SelectItem value="vulnerable">Vulnerable</SelectItem>
                                <SelectItem value="exploited">Exploited</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>

                        <TabsContent value="services" className="space-y-4">
                          <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="service_port">Port</Label>
                                <Input
                                  id="service_port"
                                  type="number"
                                  value={newService.port}
                                  onChange={(e) =>
                                    setNewService({ ...newService, port: Number.parseInt(e.target.value) || 0 })
                                  }
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="service_protocol">Protocol</Label>
                                <Select
                                  value={newService.protocol}
                                  onValueChange={(value) => setNewService({ ...newService, protocol: value })}
                                >
                                  <SelectTrigger id="service_protocol">
                                    <SelectValue placeholder="Select protocol" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="tcp">TCP</SelectItem>
                                    <SelectItem value="udp">UDP</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="service_name">Service Name</Label>
                                <Input
                                  id="service_name"
                                  value={newService.service_name}
                                  onChange={(e) => setNewService({ ...newService, service_name: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="service_product">Product</Label>
                                <Input
                                  id="service_product"
                                  value={newService.product}
                                  onChange={(e) => setNewService({ ...newService, product: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="service_version">Version</Label>
                                <Input
                                  id="service_version"
                                  value={newService.version}
                                  onChange={(e) => setNewService({ ...newService, version: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="service_banner">Banner</Label>
                                <Input
                                  id="service_banner"
                                  value={newService.banner}
                                  onChange={(e) => setNewService({ ...newService, banner: e.target.value })}
                                />
                              </div>
                            </div>
                            <Button onClick={addServiceToHost}>Add Service</Button>
                          </div>

                          {editingHost.services.length > 0 ? (
                            <div className="border rounded-md p-4">
                              <h4 className="font-medium mb-2">Services</h4>
                              <div className="space-y-2">
                                {editingHost.services.map((service, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                                    <div>
                                      <div className="font-medium">
                                        {service.port}/{service.protocol}: {service.service_name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {service.product} {service.version}
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => removeServiceFromHost(index)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">No services added yet</div>
                          )}
                        </TabsContent>

                        <TabsContent value="vulnerabilities" className="space-y-4">
                          <div className="grid gap-4">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add vulnerability (e.g., CVE-2021-1234)"
                                value={newVulnerability}
                                onChange={(e) => setNewVulnerability(e.target.value)}
                              />
                              <Button onClick={addVulnerabilityToHost}>Add</Button>
                            </div>

                            {editingHost.vulnerabilities.length > 0 ? (
                              <div className="border rounded-md p-4">
                                <h4 className="font-medium mb-2">Vulnerabilities</h4>
                                <div className="flex flex-wrap gap-2">
                                  {editingHost.vulnerabilities.map((vuln, index) => (
                                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      {vuln}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-1"
                                        onClick={() => removeVulnerabilityFromHost(vuln)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4 text-muted-foreground">No vulnerabilities added yet</div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="tags" className="space-y-4">
                          <div className="grid gap-4">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add tag (e.g., critical, webserver)"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                              />
                              <Button onClick={addTagToHost}>Add</Button>
                            </div>

                            {editingHost.tags.length > 0 ? (
                              <div className="border rounded-md p-4">
                                <h4 className="font-medium mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                  {editingHost.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                      <Tag className="h-3 w-3" />
                                      {tag}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 ml-1"
                                        onClick={() => removeTagFromHost(tag)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4 text-muted-foreground">No tags added yet</div>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="notes" className="space-y-4">
                          <div className="grid gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="note_author">Author</Label>
                              <Input
                                id="note_author"
                                value={newNote.author}
                                onChange={(e) => setNewNote({ ...newNote, author: e.target.value })}
                                placeholder="Your name"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="note_content">Note</Label>
                              <Textarea
                                id="note_content"
                                value={newNote.note}
                                onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
                                placeholder="Enter your notes here..."
                                rows={3}
                              />
                            </div>
                            <Button onClick={addNoteToHost}>Add Note</Button>
                          </div>

                          {editingHost.notes.length > 0 ? (
                            <div className="border rounded-md p-4">
                              <h4 className="font-medium mb-2">Notes</h4>
                              <div className="space-y-3">
                                {editingHost.notes.map((note, index) => (
                                  <div key={index} className="border rounded-md p-3">
                                    <div className="flex justify-between items-start">
                                      <div className="text-sm text-muted-foreground">
                                        {note.author} - {formatDate(note.timestamp)}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={() => removeNoteFromHost(index)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                    <div className="mt-1 whitespace-pre-wrap">{note.note}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">No notes added yet</div>
                          )}
                        </TabsContent>
                      </Tabs>
                    )}
                    <DialogFooter className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingHost(null)
                          setIsEditOpen(false)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateHost}>Update Host</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteOpen && hostToDelete === host.host_id}
                  onOpenChange={(open) => {
                    setIsDeleteOpen(open)
                    if (!open) setHostToDelete(null)
                  }}
                >
                  <DialogTrigger asChild onClick={() => setHostToDelete(host.host_id)}>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                      <DialogTitle>Delete Host</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this host? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setHostToDelete(null)
                          setIsDeleteOpen(false)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteHost}>
                        Delete Host
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
