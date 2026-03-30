import * as React from "react"
import { RocketIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Section } from "../section"

export function CTA() {
  return (
    <Section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <Card className="border-primary/20 bg-background/50 backdrop-blur shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 -tranzlate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <CardContent className="p-12 text-center relative z-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <RocketIcon className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl tracking-tight text-foreground">
            Ready to get started?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Join thousands of developers who are already using our platform
            to build amazing applications. Experience the future of admin dashboards today.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Get Started Now
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-lg font-semibold backdrop-blur-sm transition-all hover:bg-muted/50 border-muted-foreground/20">
              Contact Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </Section>
  )
}
