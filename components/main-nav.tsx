"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Shield } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl flex items-center mr-8">
          <Shield className="h-6 w-6 mr-2" />
          PenTest Tracker
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/projects"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/projects" || pathname === "/" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Projects
          </Link>
          <Link
            href="/export-import"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/export-import" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Export/Import
          </Link>
          <Link
            href="/implants"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/implants" ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Implants
          </Link>
        </nav>
      </div>
    </div>
  )
}
