"use client";

import { useState, useMemo } from "react";
import { useProject, type Implant } from "@/lib/project-context";
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
import {
  Terminal,
  Plus,
  Trash2,
  Edit,
  Clock,
  User,
  Shield,
  LayoutGrid,
  LayoutList,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

type SortField =
  | "implant_type"
  | "host_id"
  | "user"
  | "privilege"
  | "started_at";
type SortDirection = "asc" | "desc";

export default function ImplantsPage() {
  const { currentProject, addImplant, updateImplant, deleteImplant } =
    useProject();
  const [newImplant, setNewImplant] = useState<Partial<Implant>>({
    host_id: "",
    implant_type: "",
    user: "",
    privilege: "",
    notes: "",
  });
  const [editingImplant, setEditingImplant] = useState<Implant | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [implantToDelete, setImplantToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [sortField, setSortField] = useState<SortField>("started_at");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleAddImplant = () => {
    addImplant(newImplant);
    setNewImplant({
      host_id: "",
      implant_type: "",
      user: "",
      privilege: "",
      notes: "",
    });
    setIsAddOpen(false);
  };

  const handleUpdateImplant = () => {
    if (editingImplant) {
      updateImplant(editingImplant);
      setEditingImplant(null);
      setIsEditOpen(false);
    }
  };

  const handleDeleteImplant = () => {
    if (implantToDelete) {
      deleteImplant(implantToDelete);
      setImplantToDelete(null);
      setIsDeleteOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP p");
    } catch (error) {
      return dateString;
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

  // Get host name by ID
  const getHostNameById = (hostId: string) => {
    const host = currentProject?.hosts.find((h) => h.host_id === hostId);
    return host ? host.hostname || host.ip_address : hostId;
  };

  // Sort implants based on selected field and direction
  const sortedImplants = useMemo(() => {
    if (!currentProject) return [];

    return [...currentProject.implants].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "implant_type":
          comparison = a.implant_type.localeCompare(b.implant_type);
          break;
        case "host_id":
          comparison = a.host_id.localeCompare(b.host_id);
          break;
        case "user":
          comparison = a.user.localeCompare(b.user);
          break;
        case "privilege":
          comparison = a.privilege.localeCompare(b.privilege);
          break;
        case "started_at":
          comparison =
            new Date(a.started_at).getTime() - new Date(b.started_at).getTime();
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
          The project you are looking for does not exist or has not been loaded.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Implants</h2>
          <p className="text-muted-foreground">
            Manage implants in your project
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
                <Plus className="mr-2 h-4 w-4" /> Add Implant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Implant</DialogTitle>
                <DialogDescription>
                  Add a new implant to your project
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="host_id">Host</Label>
                  <Select
                    value={newImplant.host_id}
                    onValueChange={(value) =>
                      setNewImplant({ ...newImplant, host_id: value })
                    }
                  >
                    <SelectTrigger id="host_id">
                      <SelectValue placeholder="Select host" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentProject.hosts.map((host) => (
                        <SelectItem key={host.host_id} value={host.host_id}>
                          {host.hostname || host.ip_address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="implant_type">Implant Type</Label>
                  <Input
                    id="implant_type"
                    value={newImplant.implant_type}
                    onChange={(e) =>
                      setNewImplant({
                        ...newImplant,
                        implant_type: e.target.value,
                      })
                    }
                    placeholder="e.g., meterpreter, beacon, empire"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user">User</Label>
                  <Input
                    id="user"
                    value={newImplant.user}
                    onChange={(e) =>
                      setNewImplant({ ...newImplant, user: e.target.value })
                    }
                    placeholder="e.g., NT AUTHORITY\SYSTEM, Administrator"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="privilege">Privilege Level</Label>
                  <Input
                    id="privilege"
                    value={newImplant.privilege}
                    onChange={(e) =>
                      setNewImplant({
                        ...newImplant,
                        privilege: e.target.value,
                      })
                    }
                    placeholder="e.g., SYSTEM, Administrator, User"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newImplant.notes}
                    onChange={(e) =>
                      setNewImplant({ ...newImplant, notes: e.target.value })
                    }
                    placeholder="Enter notes about this implant"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddImplant}>Add Implant</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {sortedImplants.length === 0 ? (
        <div className="text-center py-10">
          <Terminal className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No implants yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first implant to get started.
          </p>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedImplants.map((implant) => (
            <Card key={implant.implant_id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  {implant.implant_type}
                </CardTitle>
                <CardDescription>
                  Host: {getHostNameById(implant.host_id)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{implant.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Privilege: {implant.privilege}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Started: {formatDate(implant.started_at)}
                    </span>
                  </div>
                  {implant.notes && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm">{implant.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog
                  open={
                    isEditOpen &&
                    editingImplant?.implant_id === implant.implant_id
                  }
                  onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (open) setEditingImplant(implant);
                    else setEditingImplant(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setEditingImplant(implant)}
                  >
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Implant</DialogTitle>
                      <DialogDescription>
                        Update implant details
                      </DialogDescription>
                    </DialogHeader>
                    {editingImplant && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit_host_id">Host</Label>
                          <Select
                            value={editingImplant.host_id}
                            onValueChange={(value) =>
                              setEditingImplant({
                                ...editingImplant,
                                host_id: value,
                              })
                            }
                          >
                            <SelectTrigger id="edit_host_id">
                              <SelectValue placeholder="Select host" />
                            </SelectTrigger>
                            <SelectContent>
                              {currentProject.hosts.map((host) => (
                                <SelectItem
                                  key={host.host_id}
                                  value={host.host_id}
                                >
                                  {host.hostname || host.ip_address}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_implant_type">
                            Implant Type
                          </Label>
                          <Input
                            id="edit_implant_type"
                            value={editingImplant.implant_type}
                            onChange={(e) =>
                              setEditingImplant({
                                ...editingImplant,
                                implant_type: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_user">User</Label>
                          <Input
                            id="edit_user"
                            value={editingImplant.user}
                            onChange={(e) =>
                              setEditingImplant({
                                ...editingImplant,
                                user: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_privilege">
                            Privilege Level
                          </Label>
                          <Input
                            id="edit_privilege"
                            value={editingImplant.privilege}
                            onChange={(e) =>
                              setEditingImplant({
                                ...editingImplant,
                                privilege: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_notes">Notes</Label>
                          <Textarea
                            id="edit_notes"
                            value={editingImplant.notes}
                            onChange={(e) =>
                              setEditingImplant({
                                ...editingImplant,
                                notes: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingImplant(null);
                          setIsEditOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateImplant}>
                        Update Implant
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteOpen && implantToDelete === implant.implant_id}
                  onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) setImplantToDelete(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setImplantToDelete(implant.implant_id)}
                  >
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Implant</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this implant? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setImplantToDelete(null);
                          setIsDeleteOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteImplant}
                      >
                        Delete Implant
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
                  onClick={() => handleSort("implant_type")}
                >
                  <div className="flex items-center">
                    Implant Type {getSortIcon("implant_type")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("host_id")}
                >
                  <div className="flex items-center">
                    Host {getSortIcon("host_id")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("user")}
                >
                  <div className="flex items-center">
                    User {getSortIcon("user")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("privilege")}
                >
                  <div className="flex items-center">
                    Privilege {getSortIcon("privilege")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("started_at")}
                >
                  <div className="flex items-center">
                    Started At {getSortIcon("started_at")}
                  </div>
                </TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedImplants.map((implant) => (
                <TableRow key={implant.implant_id}>
                  <TableCell className="font-medium">
                    {implant.implant_type}
                  </TableCell>
                  <TableCell>{getHostNameById(implant.host_id)}</TableCell>
                  <TableCell>{implant.user}</TableCell>
                  <TableCell>{implant.privilege}</TableCell>
                  <TableCell>{formatDate(implant.started_at)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {implant.notes}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog
                        open={
                          isEditOpen &&
                          editingImplant?.implant_id === implant.implant_id
                        }
                        onOpenChange={(open) => {
                          setIsEditOpen(open);
                          if (open) setEditingImplant(implant);
                          else setEditingImplant(null);
                        }}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() => setEditingImplant(implant)}
                        >
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {/* Edit dialog content (same as in card view) */}
                      </Dialog>

                      <Dialog
                        open={
                          isDeleteOpen && implantToDelete === implant.implant_id
                        }
                        onOpenChange={(open) => {
                          setIsDeleteOpen(open);
                          if (!open) setImplantToDelete(null);
                        }}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() => setImplantToDelete(implant.implant_id)}
                        >
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {/* Delete dialog content (same as in card view) */}
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
