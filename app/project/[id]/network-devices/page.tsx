"use client";

import { useState, useMemo } from "react";
import { useProject, type NetworkDevice } from "@/lib/project-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Router,
  Plus,
  Trash2,
  Edit,
  Clock,
  Tag,
  Network,
  Key,
  LayoutGrid,
  LayoutList,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { format } from "date-fns";

type SortField =
  | "name"
  | "device_type"
  | "status"
  | "first_seen"
  | "connected_networks";
type SortDirection = "asc" | "desc";

export default function NetworkDevicesPage() {
  const {
    currentProject,
    addNetworkDevice,
    updateNetworkDevice,
    deleteNetworkDevice,
  } = useProject();
  const [newDevice, setNewDevice] = useState<Partial<NetworkDevice>>({
    name: "",
    device_type: "router",
    ip_addresses: [],
    connected_networks: [],
    credentials: [],
    status: "discovered",
    notes: "",
    tags: [],
  });
  const [editingDevice, setEditingDevice] = useState<NetworkDevice | null>(
    null
  );
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // IP address management
  const [newIpAddress, setNewIpAddress] = useState("");

  // Tag management
  const [newTag, setNewTag] = useState("");

  const handleAddDevice = () => {
    addNetworkDevice(newDevice);
    setNewDevice({
      name: "",
      device_type: "router",
      ip_addresses: [],
      connected_networks: [],
      credentials: [],
      status: "discovered",
      notes: "",
      tags: [],
    });
    setIsAddOpen(false);
  };

  const handleUpdateDevice = () => {
    if (editingDevice) {
      updateNetworkDevice(editingDevice);
      setEditingDevice(null);
      setIsEditOpen(false);
    }
  };

  const handleDeleteDevice = () => {
    if (deviceToDelete) {
      deleteNetworkDevice(deviceToDelete);
      setDeviceToDelete(null);
      setIsDeleteOpen(false);
    }
  };

  const addIpAddressToDevice = (target: "new" | "edit") => {
    if (newIpAddress) {
      if (target === "new") {
        setNewDevice({
          ...newDevice,
          ip_addresses: [...(newDevice.ip_addresses || []), newIpAddress],
        });
      } else if (editingDevice) {
        setEditingDevice({
          ...editingDevice,
          ip_addresses: [...editingDevice.ip_addresses, newIpAddress],
        });
      }
      setNewIpAddress("");
    }
  };

  const removeIpAddressFromDevice = (
    ipAddress: string,
    target: "new" | "edit"
  ) => {
    if (target === "new") {
      setNewDevice({
        ...newDevice,
        ip_addresses: (newDevice.ip_addresses || []).filter(
          (ip) => ip !== ipAddress
        ),
      });
    } else if (editingDevice) {
      setEditingDevice({
        ...editingDevice,
        ip_addresses: editingDevice.ip_addresses.filter(
          (ip) => ip !== ipAddress
        ),
      });
    }
  };

  const addTagToDevice = () => {
    if (editingDevice && newTag) {
      setEditingDevice({
        ...editingDevice,
        tags: [...editingDevice.tags, newTag],
      });
      setNewTag("");
    }
  };

  const removeTagFromDevice = (tag: string) => {
    if (editingDevice) {
      setEditingDevice({
        ...editingDevice,
        tags: editingDevice.tags.filter((t) => t !== tag),
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP p");
    } catch (error) {
      return dateString;
    }
  };

  const getNetworkNameById = (networkId: string) => {
    const network = currentProject?.networks.find(
      (n) => n.network_id === networkId
    );
    return network ? network.name : networkId;
  };

  const getCredentialNameById = (credId: string) => {
    const cred = currentProject?.credentials.find((c) => c.cred_id === credId);
    return cred ? `${cred.username}` : credId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "discovered":
        return "bg-blue-500";
      case "scanning":
        return "bg-yellow-500";
      case "vulnerable":
        return "bg-orange-500";
      case "exploited":
        return "bg-red-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Sort network devices based on selected field and direction
  const sortedDevices = useMemo(() => {
    if (!currentProject) return [];

    return [...currentProject.network_devices].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "device_type":
          comparison = a.device_type.localeCompare(b.device_type);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "first_seen":
          comparison =
            new Date(a.first_seen).getTime() - new Date(b.first_seen).getTime();
          break;
        case "connected_networks":
          comparison =
            a.connected_networks.length - b.connected_networks.length;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [currentProject, sortField, sortDirection]);

  if (!currentProject) {
    return (
      <div className="text-center py-10">
        <h3 className="mt-4 text-lg font-semibold">Project not found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The project you're looking for doesn't exist or hasn't been loaded.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Network Devices</h2>
          <p className="text-muted-foreground">
            Manage network devices like routers, switches, and firewalls
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "card" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("card")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Card View</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              className="rounded-none"
              onClick={() => setViewMode("table")}
            >
              <LayoutList className="h-4 w-4" />
              <span className="sr-only">Table View</span>
            </Button>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Network Device</DialogTitle>
                <DialogDescription>
                  Add a new network device to your project
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Device Name</Label>
                  <Input
                    id="name"
                    value={newDevice.name}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="device_type">Device Type</Label>
                  <Select
                    value={newDevice.device_type}
                    onValueChange={(value) =>
                      setNewDevice({ ...newDevice, device_type: value })
                    }
                  >
                    <SelectTrigger id="device_type">
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="router">Router</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                      <SelectItem value="firewall">Firewall</SelectItem>
                      <SelectItem value="access-point">Access Point</SelectItem>
                      <SelectItem value="load-balancer">
                        Load Balancer
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newDevice.status}
                    onValueChange={(value) =>
                      setNewDevice({ ...newDevice, status: value as any })
                    }
                  >
                    <SelectTrigger id="status">
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

                <div className="grid gap-2">
                  <Label>IP Addresses</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add IP address"
                      value={newIpAddress}
                      onChange={(e) => setNewIpAddress(e.target.value)}
                    />
                    <Button onClick={() => addIpAddressToDevice("new")}>
                      Add
                    </Button>
                  </div>

                  {(newDevice.ip_addresses || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(newDevice.ip_addresses || []).map((ip, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {ip}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeIpAddressFromDevice(ip, "new")}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Connected Networks</Label>
                  <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                    {currentProject.networks.map((network) => (
                      <div
                        key={network.network_id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`network-${network.network_id}`}
                          checked={(
                            newDevice.connected_networks || []
                          ).includes(network.network_id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewDevice({
                                ...newDevice,
                                connected_networks: [
                                  ...(newDevice.connected_networks || []),
                                  network.network_id,
                                ],
                              });
                            } else {
                              setNewDevice({
                                ...newDevice,
                                connected_networks: (
                                  newDevice.connected_networks || []
                                ).filter((id) => id !== network.network_id),
                              });
                            }
                          }}
                        />
                        <Label
                          htmlFor={`network-${network.network_id}`}
                          className="text-sm"
                        >
                          {network.name} ({network.cidr_block})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Credentials</Label>
                  <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                    {currentProject.credentials.map((credential) => (
                      <div
                        key={credential.cred_id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`credential-${credential.cred_id}`}
                          checked={(newDevice.credentials || []).includes(
                            credential.cred_id
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewDevice({
                                ...newDevice,
                                credentials: [
                                  ...(newDevice.credentials || []),
                                  credential.cred_id,
                                ],
                              });
                            } else {
                              setNewDevice({
                                ...newDevice,
                                credentials: (
                                  newDevice.credentials || []
                                ).filter((id) => id !== credential.cred_id),
                              });
                            }
                          }}
                        />
                        <Label
                          htmlFor={`credential-${credential.cred_id}`}
                          className="text-sm"
                        >
                          {credential.username}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newDevice.notes}
                    onChange={(e) =>
                      setNewDevice({ ...newDevice, notes: e.target.value })
                    }
                    placeholder="Enter notes about this device"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDevice}>Add Device</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {sortedDevices.length === 0 ? (
        <div className="text-center py-10">
          <Router className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No network devices yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first network device to get started.
          </p>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedDevices.map((device) => (
            <Card key={device.device_id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Router className="h-4 w-4" />
                      {device.name}
                    </CardTitle>
                    <CardDescription className="capitalize">
                      {device.device_type}
                    </CardDescription>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      device.status
                    )}`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {device.ip_addresses.length > 0 && (
                    <div>
                      <div className="text-sm font-medium">IP Addresses:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {device.ip_addresses.map((ip, index) => (
                          <Badge key={index} variant="outline">
                            {ip}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {device.connected_networks.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium">
                        Connected Networks:
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {device.connected_networks.map((networkId, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Network className="h-3 w-3" />
                            {getNetworkNameById(networkId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {device.credentials.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium">Credentials:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {device.credentials.map((credId, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <Key className="h-3 w-3" />
                            {getCredentialNameById(credId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {device.tags.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium">Tags:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {device.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-sm mt-2">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      First seen: {formatDate(device.first_seen)}
                    </span>
                  </div>

                  {device.notes && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm">{device.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog
                  open={
                    isEditOpen && editingDevice?.device_id === device.device_id
                  }
                  onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (open) setEditingDevice(device);
                    else setEditingDevice(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setEditingDevice(device)}
                  >
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Network Device</DialogTitle>
                      <DialogDescription>
                        Update network device details
                      </DialogDescription>
                    </DialogHeader>
                    {editingDevice && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit_name">Device Name</Label>
                          <Input
                            id="edit_name"
                            value={editingDevice.name}
                            onChange={(e) =>
                              setEditingDevice({
                                ...editingDevice,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="edit_device_type">Device Type</Label>
                          <Select
                            value={editingDevice.device_type}
                            onValueChange={(value) =>
                              setEditingDevice({
                                ...editingDevice,
                                device_type: value,
                              })
                            }
                          >
                            <SelectTrigger id="edit_device_type">
                              <SelectValue placeholder="Select device type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="router">Router</SelectItem>
                              <SelectItem value="switch">Switch</SelectItem>
                              <SelectItem value="firewall">Firewall</SelectItem>
                              <SelectItem value="access-point">
                                Access Point
                              </SelectItem>
                              <SelectItem value="load-balancer">
                                Load Balancer
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="edit_status">Status</Label>
                          <Select
                            value={editingDevice.status}
                            onValueChange={(value) =>
                              setEditingDevice({
                                ...editingDevice,
                                status: value as any,
                              })
                            }
                          >
                            <SelectTrigger id="edit_status">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="discovered">
                                Discovered
                              </SelectItem>
                              <SelectItem value="scanning">Scanning</SelectItem>
                              <SelectItem value="vulnerable">
                                Vulnerable
                              </SelectItem>
                              <SelectItem value="exploited">
                                Exploited
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label>IP Addresses</Label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add IP address"
                              value={newIpAddress}
                              onChange={(e) => setNewIpAddress(e.target.value)}
                            />
                            <Button
                              onClick={() => addIpAddressToDevice("edit")}
                            >
                              Add
                            </Button>
                          </div>

                          {editingDevice.ip_addresses.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {editingDevice.ip_addresses.map((ip, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  {ip}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1"
                                    onClick={() =>
                                      removeIpAddressFromDevice(ip, "edit")
                                    }
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid gap-2">
                          <Label>Connected Networks</Label>
                          <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                            {currentProject.networks.map((network) => (
                              <div
                                key={network.network_id}
                                className="flex items-center space-x-2 mb-2"
                              >
                                <Checkbox
                                  id={`edit-network-${network.network_id}`}
                                  checked={editingDevice.connected_networks.includes(
                                    network.network_id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setEditingDevice({
                                        ...editingDevice,
                                        connected_networks: [
                                          ...editingDevice.connected_networks,
                                          network.network_id,
                                        ],
                                      });
                                    } else {
                                      setEditingDevice({
                                        ...editingDevice,
                                        connected_networks:
                                          editingDevice.connected_networks.filter(
                                            (id) => id !== network.network_id
                                          ),
                                      });
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`edit-network-${network.network_id}`}
                                  className="text-sm"
                                >
                                  {network.name} ({network.cidr_block})
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label>Credentials</Label>
                          <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                            {currentProject.credentials.map((credential) => (
                              <div
                                key={credential.cred_id}
                                className="flex items-center space-x-2 mb-2"
                              >
                                <Checkbox
                                  id={`edit-credential-${credential.cred_id}`}
                                  checked={editingDevice.credentials.includes(
                                    credential.cred_id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setEditingDevice({
                                        ...editingDevice,
                                        credentials: [
                                          ...editingDevice.credentials,
                                          credential.cred_id,
                                        ],
                                      });
                                    } else {
                                      setEditingDevice({
                                        ...editingDevice,
                                        credentials:
                                          editingDevice.credentials.filter(
                                            (id) => id !== credential.cred_id
                                          ),
                                      });
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`edit-credential-${credential.cred_id}`}
                                  className="text-sm"
                                >
                                  {credential.username}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Label>Tags</Label>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add tag (e.g., cisco, critical)"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                            />
                            <Button onClick={addTagToDevice}>Add</Button>
                          </div>

                          {editingDevice.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {editingDevice.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  <Tag className="h-3 w-3" />
                                  {tag}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1"
                                    onClick={() => removeTagFromDevice(tag)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="edit_notes">Notes</Label>
                          <Textarea
                            id="edit_notes"
                            value={editingDevice.notes}
                            onChange={(e) =>
                              setEditingDevice({
                                ...editingDevice,
                                notes: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter className="mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingDevice(null);
                          setIsEditOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateDevice}>
                        Update Device
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteOpen && deviceToDelete === device.device_id}
                  onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) setDeviceToDelete(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setDeviceToDelete(device.device_id)}
                  >
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Network Device</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this network device?
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDeviceToDelete(null);
                          setIsDeleteOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteDevice}
                      >
                        Delete Device
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name {getSortIcon("name")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("device_type")}
                >
                  <div className="flex items-center">
                    Type {getSortIcon("device_type")}
                  </div>
                </TableHead>
                <TableHead>IP Addresses</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("connected_networks")}
                >
                  <div className="flex items-center">
                    Networks {getSortIcon("connected_networks")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDevices.map((device) => (
                <TableRow key={device.device_id}>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell className="capitalize">
                    {device.device_type}
                  </TableCell>
                  <TableCell>
                    {device.ip_addresses.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {device.ip_addresses.map((ip, index) => (
                          <div key={index} className="text-xs">
                            {ip}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {device.connected_networks.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {device.connected_networks
                          .slice(0, 2)
                          .map((networkId, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {getNetworkNameById(networkId)}
                            </Badge>
                          ))}
                        {device.connected_networks.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{device.connected_networks.length - 2} more
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(
                          device.status
                        )}`}
                      />
                      <span className="capitalize">{device.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {device.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {device.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {device.tags.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{device.tags.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog
                        open={
                          isEditOpen &&
                          editingDevice?.device_id === device.device_id
                        }
                        onOpenChange={(open) => {
                          setIsEditOpen(open);
                          if (open) setEditingDevice(device);
                          else setEditingDevice(null);
                        }}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() => setEditingDevice(device)}
                        >
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {/* Edit dialog content (same as in card view) */}
                      </Dialog>

                      <Dialog
                        open={
                          isDeleteOpen && deviceToDelete === device.device_id
                        }
                        onOpenChange={(open) => {
                          setIsDeleteOpen(open);
                          if (!open) setDeviceToDelete(null);
                        }}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() => setDeviceToDelete(device.device_id)}
                        >
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
