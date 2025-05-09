"use client";

import { useState } from "react";
import { useProject } from "@/lib/project-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileJson, Download, Upload, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function ExportImportPage() {
  const { currentProject, exportData, importData, loadSampleData } =
    useProject();
  const [jsonData, setJsonData] = useState("");
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    if (!currentProject) {
      toast.error("No project selected", {
        description: "Please select a project first",
      });
      return;
    }

    const data = exportData();
    setJsonData(data);
  };

  const handleImport = () => {
    if (!jsonData) {
      toast.error("No data to import", {
        description: "Please paste JSON data first",
      });
      return;
    }

    try {
      importData(jsonData);
      toast.success("Import successful", {
        description: "Project data has been imported",
      });
      setJsonData("");
    } catch (error) {
      toast.error("Import failed", {
        description:
          error instanceof Error ? error.message : "Invalid JSON data",
      });
    }
  };

  const handleCopy = () => {
    if (!jsonData) return;

    navigator.clipboard.writeText(jsonData);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (!jsonData) return;

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentProject?.project_name || "project"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Export/Import</h1>
          <p className="text-muted-foreground">
            Export your project data as JSON or import from a JSON file
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export
              </CardTitle>
              <CardDescription>
                Export your current project data as JSON
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleExport}
                className="w-full"
                disabled={!currentProject}
              >
                Export Current Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import
              </CardTitle>
              <CardDescription>Import project data from JSON</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleImport}
                className="w-full"
                disabled={!jsonData}
              >
                Import JSON Data
              </Button>
              <Button
                onClick={loadSampleData}
                className="w-full mt-2"
                variant="outline"
              >
                Load Sample Data
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5" />
              JSON Data
            </CardTitle>
            <CardDescription>
              View, edit, or paste JSON data here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="Paste JSON data here or export a project to see its data"
              className="min-h-[300px] font-mono text-sm"
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCopy} disabled={!jsonData}>
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={!jsonData}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
