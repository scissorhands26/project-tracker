"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useProject, type Project } from "@/lib/project-context"
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
import { Shield, Plus, Trash2, Edit, Calendar, ArrowRight } from "lucide-react"
import { format } from "date-fns"

export default function ProjectsPage() {
    const router = useRouter()
    const { projects, currentProject, setCurrentProject, addProject, updateProject, deleteProject } = useProject()
    const [newProject, setNewProject] = useState<Partial<Project>>({
        project_name: "",
        description: "",
        created_by: "",
    })
    const [editingProject, setEditingProject] = useState<Project | null>(null)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

    const handleAddProject = () => {
        addProject(newProject)
        setNewProject({
            project_name: "",
            description: "",
            created_by: "",
        })
        setIsAddOpen(false)
    }

    const handleUpdateProject = () => {
        if (editingProject) {
            updateProject(editingProject)
            setEditingProject(null)
            setIsEditOpen(false)
        }
    }

    const handleDeleteProject = () => {
        if (projectToDelete) {
            deleteProject(projectToDelete)
            setProjectToDelete(null)
            setIsDeleteOpen(false)
        }
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return "Not completed"
        try {
            return format(new Date(dateString), "PPP")
        } catch (error) {
            return dateString
        }
    }

    const handleProjectClick = (project: Project) => {
        setCurrentProject(project)
        router.push(`/project/${project.project_id}`)
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Project</DialogTitle>
                            <DialogDescription>Create a new penetration testing project</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="project_name">Project Name</Label>
                                <Input
                                    id="project_name"
                                    value={newProject.project_name}
                                    onChange={(e) => setNewProject({ ...newProject, project_name: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="created_by">Created By</Label>
                                <Input
                                    id="created_by"
                                    value={newProject.created_by}
                                    onChange={(e) => setNewProject({ ...newProject, created_by: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddProject}>Create Project</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-10">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Create your first penetration testing project to get started.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card
                            key={project.project_id}
                            className={`cursor-pointer hover:border-primary transition-colors ${currentProject?.project_id === project.project_id ? "border-primary" : ""
                                }`}
                            onClick={() => handleProjectClick(project)}
                        >
                            <CardHeader>
                                <CardTitle>{project.project_name}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Started: {formatDate(project.date_started)}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span className="text-muted-foreground">Completed: {formatDate(project.date_completed)}</span>
                                    </div>
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Networks: {project.networks.length}</span>
                                            <span>Hosts: {project.hosts.length}</span>
                                            <span>Exploits: {project.exploits.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <div className="flex gap-2">
                                    <Dialog
                                        open={isEditOpen && editingProject?.project_id === project.project_id}
                                        onOpenChange={(open) => {
                                            setIsEditOpen(open)
                                            if (open) setEditingProject(project)
                                            else setEditingProject(null)
                                        }}
                                    >
                                        <DialogTrigger
                                            asChild
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setEditingProject(project)
                                            }}
                                        >
                                            <Button variant="outline" size="sm">
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent onClick={(e) => e.stopPropagation()}>
                                            <DialogHeader>
                                                <DialogTitle>Edit Project</DialogTitle>
                                                <DialogDescription>Update project details</DialogDescription>
                                            </DialogHeader>
                                            {editingProject && (
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="edit_project_name">Project Name</Label>
                                                        <Input
                                                            id="edit_project_name"
                                                            value={editingProject.project_name}
                                                            onChange={(e) => setEditingProject({ ...editingProject, project_name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="edit_description">Description</Label>
                                                        <Textarea
                                                            id="edit_description"
                                                            value={editingProject.description}
                                                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="edit_created_by">Created By</Label>
                                                        <Input
                                                            id="edit_created_by"
                                                            value={editingProject.created_by}
                                                            onChange={(e) => setEditingProject({ ...editingProject, created_by: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setEditingProject(null)
                                                        setIsEditOpen(false)
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button onClick={handleUpdateProject}>Update Project</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog
                                        open={isDeleteOpen && projectToDelete === project.project_id}
                                        onOpenChange={(open) => {
                                            setIsDeleteOpen(open)
                                            if (!open) setProjectToDelete(null)
                                        }}
                                    >
                                        <DialogTrigger
                                            asChild
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setProjectToDelete(project.project_id)
                                            }}
                                        >
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent onClick={(e) => e.stopPropagation()}>
                                            <DialogHeader>
                                                <DialogTitle>Delete Project</DialogTitle>
                                                <DialogDescription>
                                                    Are you sure you want to delete this project? This action cannot be undone.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setProjectToDelete(null)
                                                        setIsDeleteOpen(false)
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button variant="destructive" onClick={handleDeleteProject}>
                                                    Delete Project
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <Button variant="ghost" size="sm" onClick={() => handleProjectClick(project)}>
                                    View <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
