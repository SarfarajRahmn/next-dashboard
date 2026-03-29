import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { 
  SparkleIcon, 
  ArrowRightIcon, 
  PlayIcon, 
  CheckCircleIcon 
} from "@phosphor-icons/react/dist/ssr"
import { Section } from "../section"

export function Hero() {
  return (
    <Section className="relative overflow-hidden">
      <div className="bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.02] absolute inset-0 bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      <div className="relative flex flex-col items-center text-center">
        <Badge className="mb-6 gap-1 border-primary/30 bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-2 text-sm">
          <SparkleIcon className="mr-1 h-3 w-3" />
          Next Generation Admin Dashboard
        </Badge>
        <h1 className="mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
          Modern Admin
          <br />
          Dashboard Solution
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Built with Next.js, shadcn/ui, and Better Auth. Experience the
          future of admin management with beautiful UI and powerful
          features.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 px-8 text-lg hover:from-primary/90 hover:to-primary/70"
          >
            Start Free Trial
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 px-8 text-lg"
          >
            Watch Demo
            <PlayIcon weight="fill" className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-1">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            14-day free trial
          </div>
        </div>
      </div>
    </Section>
  )
}
