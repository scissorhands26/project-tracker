"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { sampleData } from "@/lib/sample-data";
import { toast } from "sonner";

export type Status =
  | "discovered"
  | "scanning"
  | "vulnerable"
  | "exploited"
  | "completed";

export interface Service {
  port: number;
  protocol: string;
  service_name: string;
  product: string;
  version: string;
  banner: string;
  vulnerabilities: string[];
}

export interface Note {
  timestamp: string;
  author: string;
  note: string;
}

export interface Network {
  network_id: string;
  name: string;
  cidr_block: string;
  notes: string;
}

export interface Host {
  host_id: string;
  ip_address: string;
  hostname: string;
  os: string;
  status: Status;
  first_seen: string;
  last_updated: string;
  tags: string[];
  services: Service[];
  vulnerabilities: string[];
  notes: Note[];
}

export interface Exploit {
  exploit_id: string;
  host_id: string;
  type: string;
  tool_used: string;
  date_executed: string;
  result: string;
  notes: string;
}

export interface Credential {
  cred_id: string;
  username: string;
  password: string;
  source_host: string;
  obtained_via: string;
  valid_for: string[];
}

// Replace the Session interface with Implant interface
export interface Implant {
  implant_id: string;
  host_id: string;
  implant_type: string;
  user: string;
  privilege: string;
  started_at: string;
  notes: string;
}

// Update the Project interface to use implants instead of sessions
export interface Project {
  project_id: string;
  project_name: string;
  description: string;
  date_started: string;
  date_completed: string | null;
  created_by: string;
  networks: Network[];
  hosts: Host[];
  exploits: Exploit[];
  credentials: Credential[];
  implants: Implant[];
}

// Update the ProjectContextType interface
interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Partial<Project>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  addNetwork: (network: Partial<Network>) => void;
  updateNetwork: (network: Network) => void;
  deleteNetwork: (networkId: string) => void;
  addHost: (host: Partial<Host>) => void;
  updateHost: (host: Host) => void;
  deleteHost: (hostId: string) => void;
  addExploit: (exploit: Partial<Exploit>) => void;
  updateExploit: (exploit: Exploit) => void;
  deleteExploit: (exploitId: string) => void;
  addCredential: (credential: Partial<Credential>) => void;
  updateCredential: (credential: Credential) => void;
  deleteCredential: (credentialId: string) => void;
  addImplant: (implant: Partial<Implant>) => void;
  updateImplant: (implant: Implant) => void;
  deleteImplant: (implantId: string) => void;
  exportData: () => string;
  importData: (jsonData: string) => void;
  loadSampleData: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem("pentestProjects");
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects);

        // Set the first project as current if available
        if (parsedProjects.length > 0) {
          setCurrentProject(parsedProjects[0]);
        }
      } catch (error) {
        console.error("Failed to parse saved projects:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pentestProjects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Partial<Project>) => {
    const newProject: Project = {
      project_id: project.project_id || `proj-${uuidv4().slice(0, 8)}`,
      project_name: project.project_name || "New Project",
      description: project.description || "",
      date_started: project.date_started || new Date().toISOString(),
      date_completed: project.date_completed || null,
      created_by: project.created_by || "user",
      networks: project.networks || [],
      hosts: project.hosts || [],
      exploits: project.exploits || [],
      credentials: project.credentials || [],
      implants: project.implants || [],
    };

    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(
      projects.map((p) =>
        p.project_id === updatedProject.project_id ? updatedProject : p
      )
    );

    if (currentProject?.project_id === updatedProject.project_id) {
      setCurrentProject(updatedProject);
    }
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.project_id !== projectId));

    if (currentProject?.project_id === projectId) {
      setCurrentProject(
        projects.length > 1
          ? projects.find((p) => p.project_id !== projectId) || null
          : null
      );
    }
  };

  // Network operations
  const addNetwork = (network: Partial<Network>) => {
    if (!currentProject) return;

    const newNetwork: Network = {
      network_id: network.network_id || `net-${uuidv4().slice(0, 8)}`,
      name: network.name || "New Network",
      cidr_block: network.cidr_block || "",
      notes: network.notes || "",
    };

    const updatedProject = {
      ...currentProject,
      networks: [...currentProject.networks, newNetwork],
    };

    updateProject(updatedProject);
  };

  const updateNetwork = (updatedNetwork: Network) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      networks: currentProject.networks.map((n) =>
        n.network_id === updatedNetwork.network_id ? updatedNetwork : n
      ),
    };

    updateProject(updatedProject);
  };

  const deleteNetwork = (networkId: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      networks: currentProject.networks.filter(
        (n) => n.network_id !== networkId
      ),
    };

    updateProject(updatedProject);
  };

  // Host operations
  const addHost = (host: Partial<Host>) => {
    if (!currentProject) return;

    const newHost: Host = {
      host_id: host.host_id || `host-${uuidv4().slice(0, 8)}`,
      ip_address: host.ip_address || "",
      hostname: host.hostname || "",
      os: host.os || "",
      status: host.status || "discovered",
      first_seen: host.first_seen || new Date().toISOString(),
      last_updated: host.last_updated || new Date().toISOString(),
      tags: host.tags || [],
      services: host.services || [],
      vulnerabilities: host.vulnerabilities || [],
      notes: host.notes || [],
    };

    const updatedProject = {
      ...currentProject,
      hosts: [...currentProject.hosts, newHost],
    };

    updateProject(updatedProject);
  };

  const updateHost = (updatedHost: Host) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      hosts: currentProject.hosts.map((h) =>
        h.host_id === updatedHost.host_id ? updatedHost : h
      ),
    };

    updateProject(updatedProject);
  };

  const deleteHost = (hostId: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      hosts: currentProject.hosts.filter((h) => h.host_id !== hostId),
    };

    updateProject(updatedProject);
  };

  // Exploit operations
  const addExploit = (exploit: Partial<Exploit>) => {
    if (!currentProject) return;

    const newExploit: Exploit = {
      exploit_id: exploit.exploit_id || `exp-${uuidv4().slice(0, 8)}`,
      host_id: exploit.host_id || "",
      type: exploit.type || "",
      tool_used: exploit.tool_used || "",
      date_executed: exploit.date_executed || new Date().toISOString(),
      result: exploit.result || "",
      notes: exploit.notes || "",
    };

    const updatedProject = {
      ...currentProject,
      exploits: [...currentProject.exploits, newExploit],
    };

    updateProject(updatedProject);
  };

  const updateExploit = (updatedExploit: Exploit) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      exploits: currentProject.exploits.map((e) =>
        e.exploit_id === updatedExploit.exploit_id ? updatedExploit : e
      ),
    };

    updateProject(updatedProject);
  };

  const deleteExploit = (exploitId: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      exploits: currentProject.exploits.filter(
        (e) => e.exploit_id !== exploitId
      ),
    };

    updateProject(updatedProject);
  };

  // Credential operations
  const addCredential = (credential: Partial<Credential>) => {
    if (!currentProject) return;

    const newCredential: Credential = {
      cred_id: credential.cred_id || `cred-${uuidv4().slice(0, 8)}`,
      username: credential.username || "",
      password: credential.password || "",
      source_host: credential.source_host || "",
      obtained_via: credential.obtained_via || "",
      valid_for: credential.valid_for || [],
    };

    const updatedProject = {
      ...currentProject,
      credentials: [...currentProject.credentials, newCredential],
    };

    updateProject(updatedProject);
  };

  const updateCredential = (updatedCredential: Credential) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      credentials: currentProject.credentials.map((c) =>
        c.cred_id === updatedCredential.cred_id ? updatedCredential : c
      ),
    };

    updateProject(updatedProject);
  };

  const deleteCredential = (credentialId: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      credentials: currentProject.credentials.filter(
        (c) => c.cred_id !== credentialId
      ),
    };

    updateProject(updatedProject);
  };

  // Replace the session operations with implant operations
  // Implant operations
  const addImplant = (implant: Partial<Implant>) => {
    if (!currentProject) return;

    const newImplant: Implant = {
      implant_id: implant.implant_id || `implant-${uuidv4().slice(0, 8)}`,
      host_id: implant.host_id || "",
      implant_type: implant.implant_type || "",
      user: implant.user || "",
      privilege: implant.privilege || "",
      started_at: implant.started_at || new Date().toISOString(),
      notes: implant.notes || "",
    };

    const updatedProject = {
      ...currentProject,
      implants: [...currentProject.implants, newImplant],
    };

    updateProject(updatedProject);
  };

  const updateImplant = (updatedImplant: Implant) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      implants: currentProject.implants.map((i) =>
        i.implant_id === updatedImplant.implant_id ? updatedImplant : i
      ),
    };

    updateProject(updatedProject);
  };

  const deleteImplant = (implantId: string) => {
    if (!currentProject) return;

    const updatedProject = {
      ...currentProject,
      implants: currentProject.implants.filter(
        (i) => i.implant_id !== implantId
      ),
    };

    updateProject(updatedProject);
  };

  // Export/Import
  const exportData = () => {
    return JSON.stringify(currentProject, null, 2);
  };

  const importData = (jsonData: string) => {
    try {
      const importedProject = JSON.parse(jsonData);

      // Basic validation
      if (!importedProject.project_id || !importedProject.project_name) {
        throw new Error("Invalid project data");
      }

      // Check if project already exists
      const existingProject = projects.find(
        (p) => p.project_id === importedProject.project_id
      );

      if (existingProject) {
        // Update existing project
        updateProject(importedProject);
      } else {
        // Add as new project
        setProjects([...projects, importedProject]);
        setCurrentProject(importedProject);
      }
    } catch (error) {
      console.error("Failed to import project data:", error);
      throw error;
    }
  };

  // Update the ProjectContext.Provider value to include implant operations
  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        setCurrentProject,
        addProject,
        updateProject,
        deleteProject,
        addNetwork,
        updateNetwork,
        deleteNetwork,
        addHost,
        updateHost,
        deleteHost,
        addExploit,
        updateExploit,
        deleteExploit,
        addCredential,
        updateCredential,
        deleteCredential,
        addImplant,
        updateImplant,
        deleteImplant,
        exportData,
        importData,
        loadSampleData: () => {
          const sampleProject = sampleData;

          // Check if project already exists
          const existingProject = projects.find(
            (p) => p.project_id === sampleProject.project_id
          );

          if (existingProject) {
            // Update existing project
            updateProject(sampleProject);
          } else {
            // Add as new project
            setProjects([...projects, sampleProject]);
            setCurrentProject(sampleProject);
          }

          toast.success("Sample data loaded", {
            description: "Sample penetration testing project has been loaded",
          });
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
