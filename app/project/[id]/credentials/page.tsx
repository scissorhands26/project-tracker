"use client";

import { useState, useMemo } from "react";
import { useProject, type Credential } from "@/lib/project-context";
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
  Key,
  Plus,
  Trash2,
  Edit,
  Server,
  Copy,
  Check,
  Eye,
  EyeOff,
  LayoutGrid,
  LayoutList,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

type SortField =
  | "username"
  | "password"
  | "source_host"
  | "obtained_via"
  | "valid_for";
type SortDirection = "asc" | "desc";

export default function CredentialsPage() {
  const { currentProject, addCredential, updateCredential, deleteCredential } =
    useProject();
  const [newCredential, setNewCredential] = useState<Partial<Credential>>({
    username: "",
    password: "",
    source_host: "",
    obtained_via: "",
    valid_for: [],
  });
  const [editingCredential, setEditingCredential] = useState<Credential | null>(
    null
  );
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [credentialToDelete, setCredentialToDelete] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [sortField, setSortField] = useState<SortField>("username");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddCredential = () => {
    addCredential(newCredential);
    setNewCredential({
      username: "",
      password: "",
      source_host: "",
      obtained_via: "",
      valid_for: [],
    });
    setIsAddOpen(false);
  };

  const handleUpdateCredential = () => {
    if (editingCredential) {
      updateCredential(editingCredential);
      setEditingCredential(null);
      setIsEditOpen(false);
    }
  };

  const handleDeleteCredential = () => {
    if (credentialToDelete) {
      deleteCredential(credentialToDelete);
      setCredentialToDelete(null);
      setIsDeleteOpen(false);
    }
  };

  const togglePasswordVisibility = (credId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [credId]: !prev[credId],
    }));
  };

  const copyToClipboard = (text: string, credId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(credId);
    setTimeout(() => setCopiedId(null), 2000);
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

  // Sort credentials based on selected field and direction
  const sortedCredentials = useMemo(() => {
    if (!currentProject) return [];

    return [...currentProject.credentials].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "username":
          comparison = a.username.localeCompare(b.username);
          break;
        case "password":
          comparison = a.password.localeCompare(b.password);
          break;
        case "source_host":
          comparison = a.source_host.localeCompare(b.source_host);
          break;
        case "obtained_via":
          comparison = a.obtained_via.localeCompare(b.obtained_via);
          break;
        case "valid_for":
          comparison = a.valid_for.length - b.valid_for.length;
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
          <h2 className="text-2xl font-bold">Credentials</h2>
          <p className="text-muted-foreground">
            Manage credentials in your project
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
                <Plus className="mr-2 h-4 w-4" /> Add Credential
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Credential</DialogTitle>
                <DialogDescription>
                  Add a new credential to your project
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newCredential.username}
                    onChange={(e) =>
                      setNewCredential({
                        ...newCredential,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newCredential.password}
                    onChange={(e) =>
                      setNewCredential({
                        ...newCredential,
                        password: e.target.value,
                      })
                    }
                    placeholder="Plain text or hashed password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="source_host">Source Host</Label>
                  <Select
                    value={newCredential.source_host}
                    onValueChange={(value) =>
                      setNewCredential({ ...newCredential, source_host: value })
                    }
                  >
                    <SelectTrigger id="source_host">
                      <SelectValue placeholder="Select source host" />
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
                  <Label htmlFor="obtained_via">Obtained Via</Label>
                  <Input
                    id="obtained_via"
                    value={newCredential.obtained_via}
                    onChange={(e) =>
                      setNewCredential({
                        ...newCredential,
                        obtained_via: e.target.value,
                      })
                    }
                    placeholder="e.g., sam_dump, mimikatz, brute-force"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Valid For</Label>
                  <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                    {currentProject.hosts.map((host) => (
                      <div
                        key={host.host_id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`host-${host.host_id}`}
                          checked={(newCredential.valid_for || []).includes(
                            host.host_id
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewCredential({
                                ...newCredential,
                                valid_for: [
                                  ...(newCredential.valid_for || []),
                                  host.host_id,
                                ],
                              });
                            } else {
                              setNewCredential({
                                ...newCredential,
                                valid_for: (
                                  newCredential.valid_for || []
                                ).filter((id) => id !== host.host_id),
                              });
                            }
                          }}
                        />
                        <Label
                          htmlFor={`host-${host.host_id}`}
                          className="text-sm"
                        >
                          {host.hostname || host.ip_address}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCredential}>Add Credential</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {sortedCredentials.length === 0 ? (
        <div className="text-center py-10">
          <Key className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No credentials yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first credential to get started.
          </p>
        </div>
      ) : viewMode === "card" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedCredentials.map((credential) => (
            <Card key={credential.cred_id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  {credential.username}
                </CardTitle>
                <CardDescription>
                  Source: {getHostNameById(credential.source_host)} via{" "}
                  {credential.obtained_via}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Password:</Label>
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-sm">
                        {showPasswords[credential.cred_id]
                          ? credential.password
                          : "••••••••••••"}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          togglePasswordVisibility(credential.cred_id)
                        }
                      >
                        {showPasswords[credential.cred_id] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          copyToClipboard(
                            credential.password,
                            credential.cred_id
                          )
                        }
                      >
                        {copiedId === credential.cred_id ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {credential.valid_for.length > 0 && (
                    <div>
                      <Label className="text-sm">Valid for:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {credential.valid_for.map((hostId) => (
                          <Badge
                            key={hostId}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Server className="h-3 w-3" />
                            {getHostNameById(hostId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog
                  open={
                    isEditOpen &&
                    editingCredential?.cred_id === credential.cred_id
                  }
                  onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (open) setEditingCredential(credential);
                    else setEditingCredential(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setEditingCredential(credential)}
                  >
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Credential</DialogTitle>
                      <DialogDescription>
                        Update credential details
                      </DialogDescription>
                    </DialogHeader>
                    {editingCredential && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit_username">Username</Label>
                          <Input
                            id="edit_username"
                            value={editingCredential.username}
                            onChange={(e) =>
                              setEditingCredential({
                                ...editingCredential,
                                username: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_password">Password</Label>
                          <div className="flex gap-2">
                            <Input
                              id="edit_password"
                              type={
                                showPasswords[editingCredential.cred_id]
                                  ? "text"
                                  : "password"
                              }
                              value={editingCredential.password}
                              onChange={(e) =>
                                setEditingCredential({
                                  ...editingCredential,
                                  password: e.target.value,
                                })
                              }
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                togglePasswordVisibility(
                                  editingCredential.cred_id
                                )
                              }
                            >
                              {showPasswords[editingCredential.cred_id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_source_host">Source Host</Label>
                          <Select
                            value={editingCredential.source_host}
                            onValueChange={(value) =>
                              setEditingCredential({
                                ...editingCredential,
                                source_host: value,
                              })
                            }
                          >
                            <SelectTrigger id="edit_source_host">
                              <SelectValue placeholder="Select source host" />
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
                          <Label htmlFor="edit_obtained_via">
                            Obtained Via
                          </Label>
                          <Input
                            id="edit_obtained_via"
                            value={editingCredential.obtained_via}
                            onChange={(e) =>
                              setEditingCredential({
                                ...editingCredential,
                                obtained_via: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Valid For</Label>
                          <div className="border rounded-md p-4 max-h-40 overflow-y-auto">
                            {currentProject.hosts.map((host) => (
                              <div
                                key={host.host_id}
                                className="flex items-center space-x-2 mb-2"
                              >
                                <Checkbox
                                  id={`edit-host-${host.host_id}`}
                                  checked={editingCredential.valid_for.includes(
                                    host.host_id
                                  )}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setEditingCredential({
                                        ...editingCredential,
                                        valid_for: [
                                          ...editingCredential.valid_for,
                                          host.host_id,
                                        ],
                                      });
                                    } else {
                                      setEditingCredential({
                                        ...editingCredential,
                                        valid_for:
                                          editingCredential.valid_for.filter(
                                            (id) => id !== host.host_id
                                          ),
                                      });
                                    }
                                  }}
                                />
                                <Label
                                  htmlFor={`edit-host-${host.host_id}`}
                                  className="text-sm"
                                >
                                  {host.hostname || host.ip_address}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingCredential(null);
                          setIsEditOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateCredential}>
                        Update Credential
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={
                    isDeleteOpen && credentialToDelete === credential.cred_id
                  }
                  onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) setCredentialToDelete(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setCredentialToDelete(credential.cred_id)}
                  >
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Credential</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this credential? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCredentialToDelete(null);
                          setIsDeleteOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteCredential}
                      >
                        Delete Credential
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
                  onClick={() => handleSort("username")}
                >
                  <div className="flex items-center">
                    Username {getSortIcon("username")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("password")}
                >
                  <div className="flex items-center">
                    Password {getSortIcon("password")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("source_host")}
                >
                  <div className="flex items-center">
                    Source Host {getSortIcon("source_host")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("obtained_via")}
                >
                  <div className="flex items-center">
                    Obtained Via {getSortIcon("obtained_via")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("valid_for")}
                >
                  <div className="flex items-center">
                    Valid For {getSortIcon("valid_for")}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCredentials.map((credential) => (
                <TableRow key={credential.cred_id}>
                  <TableCell className="font-medium">
                    {credential.username}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="font-mono">
                        {showPasswords[credential.cred_id]
                          ? credential.password
                          : "••••••••••••"}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          togglePasswordVisibility(credential.cred_id)
                        }
                      >
                        {showPasswords[credential.cred_id] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() =>
                          copyToClipboard(
                            credential.password,
                            credential.cred_id
                          )
                        }
                      >
                        {copiedId === credential.cred_id ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getHostNameById(credential.source_host)}
                  </TableCell>
                  <TableCell>{credential.obtained_via}</TableCell>
                  <TableCell>
                    {credential.valid_for.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {credential.valid_for.slice(0, 2).map((hostId) => (
                          <Badge
                            key={hostId}
                            variant="outline"
                            className="text-xs"
                          >
                            {getHostNameById(hostId)}
                          </Badge>
                        ))}
                        {credential.valid_for.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{credential.valid_for.length - 2} more
                          </Badge>
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
                          editingCredential?.cred_id === credential.cred_id
                        }
                        onOpenChange={(open) => {
                          setIsEditOpen(open);
                          if (open) setEditingCredential(credential);
                          else setEditingCredential(null);
                        }}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() => setEditingCredential(credential)}
                        >
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        {/* Edit dialog content (same as in card view) */}
                      </Dialog>

                      <Dialog
                        open={
                          isDeleteOpen &&
                          credentialToDelete === credential.cred_id
                        }
                        onOpenChange={(open) => {
                          setIsDeleteOpen(open);
                          if (!open) setCredentialToDelete(null);
                        }}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() =>
                            setCredentialToDelete(credential.cred_id)
                          }
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
