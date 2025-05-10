"use client";

import { useProject } from "@/lib/project-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Network, Server, Key, Terminal, Calendar, User } from "lucide-react";
import { format } from "date-fns";

export default function ProjectOverview() {
  const { currentProject } = useProject();

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not completed";
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Networks</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentProject.networks.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hosts</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentProject.hosts.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credentials</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentProject.credentials.length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Implants</CardTitle>
            <Terminal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentProject.implants.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Information about this penetration testing project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium mr-2">Started:</span>
              <span>{formatDate(currentProject.date_started)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium mr-2">Completed:</span>
              <span>{formatDate(currentProject.date_completed)}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium mr-2">Created by:</span>
              <span>{currentProject.created_by}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Summary</CardTitle>
            <CardDescription>Overview of host statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "discovered",
                "scanning",
                "vulnerable",
                "exploited",
                "completed",
              ].map((status) => {
                const count = currentProject.hosts.filter(
                  (h) => h.status === status
                ).length;
                const percentage = currentProject.hosts.length
                  ? Math.round((count / currentProject.hosts.length) * 100)
                  : 0;

                return (
                  <div key={status} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="capitalize">{status}</div>
                      <div className="text-sm text-muted-foreground">
                        {count} ({percentage}%)
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className={`h-full rounded-full ${getStatusColor(
                          status
                        )}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
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
}
