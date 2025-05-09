import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import { ProjectProvider } from "@/lib/project-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PenTest Tracker",
  description:
    "Track your penetration testing projects, networks, hosts, and exploits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <ProjectProvider>
          <div className="min-h-screen flex flex-col">
            <MainNav />
            <div className="flex-1">{children}</div>
          </div>
        </ProjectProvider>
      </body>
    </html>
  );
}
