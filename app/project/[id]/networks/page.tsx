"use client";

import { useState } from "react";
import { useProject, type Network } from "@/lib/project-context";
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
import { NetworkIcon, Plus, Trash2, Edit, Server } from "lucide-react";

export default function NetworksPage() {
  const { currentProject, addNetwork, updateNetwork, deleteNetwork } =
    useProject();
  const [newNetwork, setNewNetwork] = useState<Partial<Network>>({
    name: "",
    cidr_block: "",
    notes: "",
  });
  const [editingNetwork, setEditingNetwork] = useState<Network | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [networkToDelete, setNetworkToDelete] = useState<string | null>(null);

  const handleAddNetwork = () => {
    addNetwork(newNetwork);
    setNewNetwork({
      name: "",
      cidr_block: "",
      notes: "",
    });
    setIsAddOpen(false);
  };

  const handleUpdateNetwork = () => {
    if (editingNetwork) {
      updateNetwork(editingNetwork);
      setEditingNetwork(null);
      setIsEditOpen(false);
    }
  };

  const handleDeleteNetwork = () => {
    if (networkToDelete) {
      deleteNetwork(networkToDelete);
      setNetworkToDelete(null);
      setIsDeleteOpen(false);
    }
  };

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

  // Count hosts in each network
  const getHostsInNetwork = (cidrBlock: string) => {
    return currentProject.hosts.filter((host) => {
      // Simple check if the host IP is in the CIDR range
      // In a real app, you'd use a proper IP/CIDR calculation
      const networkParts = cidrBlock.split("/")[0].split(".");
      const hostParts = host.ip_address.split(".");

      // Compare the first parts of the IP based on CIDR mask
      // This is a simplified approach
      const mask = Number.parseInt(cidrBlock.split("/")[1]);
      const octetsToCompare = Math.floor(mask / 8);

      for (let i = 0; i < octetsToCompare; i++) {
        if (networkParts[i] !== hostParts[i]) {
          return false;
        }
      }

      return true;
    }).length;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Networks</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Network
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Network</DialogTitle>
              <DialogDescription>
                Add a new network to your project
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Network Name</Label>
                <Input
                  id="name"
                  value={newNetwork.name}
                  onChange={(e) =>
                    setNewNetwork({ ...newNetwork, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cidr_block">CIDR Block</Label>
                <Input
                  id="cidr_block"
                  value={newNetwork.cidr_block}
                  onChange={(e) =>
                    setNewNetwork({ ...newNetwork, cidr_block: e.target.value })
                  }
                  placeholder="e.g., 10.0.0.0/24"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newNetwork.notes}
                  onChange={(e) =>
                    setNewNetwork({ ...newNetwork, notes: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNetwork}>Add Network</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {currentProject.networks.length === 0 ? (
        <div className="text-center py-10">
          <NetworkIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No networks yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your first network to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentProject.networks.map((network) => (
            <Card key={network.network_id}>
              <CardHeader>
                <CardTitle>{network.name}</CardTitle>
                <CardDescription>{network.cidr_block}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">{network.notes}</div>
                  <div className="flex items-center mt-4">
                    <Server className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Hosts: {getHostsInNetwork(network.cidr_block)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog
                  open={
                    isEditOpen &&
                    editingNetwork?.network_id === network.network_id
                  }
                  onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (open) setEditingNetwork(network);
                    else setEditingNetwork(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setEditingNetwork(network)}
                  >
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Network</DialogTitle>
                      <DialogDescription>
                        Update network details
                      </DialogDescription>
                    </DialogHeader>
                    {editingNetwork && (
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="edit_name">Network Name</Label>
                          <Input
                            id="edit_name"
                            value={editingNetwork.name}
                            onChange={(e) =>
                              setEditingNetwork({
                                ...editingNetwork,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_cidr_block">CIDR Block</Label>
                          <Input
                            id="edit_cidr_block"
                            value={editingNetwork.cidr_block}
                            onChange={(e) =>
                              setEditingNetwork({
                                ...editingNetwork,
                                cidr_block: e.target.value,
                              })
                            }
                            placeholder="e.g., 10.0.0.0/24"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="edit_notes">Notes</Label>
                          <Textarea
                            id="edit_notes"
                            value={editingNetwork.notes}
                            onChange={(e) =>
                              setEditingNetwork({
                                ...editingNetwork,
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
                          setEditingNetwork(null);
                          setIsEditOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateNetwork}>
                        Update Network
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={isDeleteOpen && networkToDelete === network.network_id}
                  onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) setNetworkToDelete(null);
                  }}
                >
                  <DialogTrigger
                    asChild
                    onClick={() => setNetworkToDelete(network.network_id)}
                  >
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Network</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this network? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setNetworkToDelete(null);
                          setIsDeleteOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteNetwork}
                      >
                        Delete Network
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
  );
}
