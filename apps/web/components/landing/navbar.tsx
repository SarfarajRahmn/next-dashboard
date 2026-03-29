import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <SparkleIcon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-bold text-transparent">
            AdminHub
          </span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Pricing
          </a>
          <a
            href="#docs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Docs
          </a>
          <a
            href="#community"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Community
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
