import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { 
  Card, 
  CardContent, 
  CardHeader 
} from "@workspace/ui/components/card"
import { 
  Avatar, 
  AvatarFallback 
} from "@workspace/ui/components/avatar"
import { 
  CheckCircleIcon, 
  ArrowRightIcon, 
  BellIcon 
} from "@phosphor-icons/react/dist/ssr"
import { Section } from "../section"

const benefits = [
  "Real-time user activity monitoring",
  "Advanced search and filtering",
  "Bulk user actions and management",
  "Comprehensive audit logs",
]

const users = [
  { name: "John Doe", email: "john@example.com", initial: "JD" },
  { name: "Jane Smith", email: "jane@example.com", initial: "JS" },
  { name: "Bob Wilson", email: "bob@example.com", initial: "BW" },
]

export function DashboardPreview() {
  return (
    <Section className="bg-muted/30">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/20">
            Dashboard Preview
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl tracking-tight">
            Beautiful, modern interface
            <br />
            built for productivity
          </h2>
          <p className="mb-6 text-muted-foreground text-lg">
            Experience a clean and intuitive dashboard that makes managing
            your application a breeze. Every component is carefully crafted
            for the best user experience.
          </p>
          <ul className="mb-8 space-y-3">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="gap-2">
            Explore Dashboard
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl opacity-50" />
          <Card className="relative border-muted/50 bg-background/50 shadow-2xl backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/20 py-4 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User Management
                </div>
                <BellIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {users.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-muted/30 p-3 border border-muted/50 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-background shadow-sm">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {user.initial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-500/20 bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-wider h-5 flex items-center"
                    >
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}
