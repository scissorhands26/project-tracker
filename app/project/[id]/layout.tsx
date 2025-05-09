"use client";

import type React from "react";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useProject } from "@/lib/project-context";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { projects, currentProject, setCurrentProject } = useProject();
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.id as string;

  // Set the current project based on the URL parameter
  useEffect(() => {
    const project = projects.find((p) => p.project_id === projectId);
    if (
      project &&
      (!currentProject || currentProject.project_id !== projectId)
    ) {
      setCurrentProject(project);
    }
  }, [projectId, projects, currentProject, setCurrentProject]);

  if (!currentProject) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center py-10">
          <h3 className="mt-4 text-lg font-semibold">Project not found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The project you're looking for doesn't exist or hasn't been loaded.
          </p>
        </div>
      </div>
    );
  }

  // Determine which tab is active based on the pathname
  const getActiveTab = () => {
    if (pathname.includes("/networks")) return "networks";
    if (pathname.includes("/hosts")) return "hosts";
    if (pathname.includes("/exploits")) return "exploits";
    if (pathname.includes("/credentials")) return "credentials";
    if (pathname.includes("/sessions")) return "sessions";
    if (pathname.includes("/implants")) return "implants";
    return "overview";
  };

  return (
    <div className="container mx-auto py-6">
      {/* <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/project/${currentProject.project_id}`}>{currentProject.project_name}</BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.includes("/networks/") && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/project/${currentProject.project_id}/networks`}>Networks</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Network Details</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {pathname.includes("/hosts/") && !pathname.endsWith("/hosts") && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/project/${currentProject.project_id}/hosts`}>Hosts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Host Details</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </Breadcrumb> */}

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">{currentProject.project_name}</h1>
        <p className="text-muted-foreground">{currentProject.description}</p>
      </div>

      <Tabs defaultValue={getActiveTab()} className="mb-6">
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="overview" asChild>
            <Link href={`/project/${currentProject.project_id}`}>Overview</Link>
          </TabsTrigger>
          <TabsTrigger value="networks" asChild>
            <Link href={`/project/${currentProject.project_id}/networks`}>
              Networks
            </Link>
          </TabsTrigger>
          <TabsTrigger value="hosts" asChild>
            <Link href={`/project/${currentProject.project_id}/hosts`}>
              Hosts
            </Link>
          </TabsTrigger>
          <TabsTrigger value="exploits" asChild>
            <Link href={`/project/${currentProject.project_id}/exploits`}>
              Exploits
            </Link>
          </TabsTrigger>
          <TabsTrigger value="credentials" asChild>
            <Link href={`/project/${currentProject.project_id}/credentials`}>
              Credentials
            </Link>
          </TabsTrigger>
          <TabsTrigger value="implants" asChild>
            <Link href={`/project/${currentProject.project_id}/implants`}>
              Implants
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
