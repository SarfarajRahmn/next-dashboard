import * as React from "react"
import { 
  UsersIcon, 
  ShieldIcon, 
  LayoutIcon, 
  ChartBarHorizontalIcon, 
  LockIcon, 
  GearIcon, 
  ArrowRightIcon 
} from "@phosphor-icons/react/dist/ssr"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Section } from "../section"
import { SectionHeader } from "../section-header"

const features = [
  {
    icon: UsersIcon,
    title: "User Management",
    description: "Complete control over users with ban/unban, role management, and session tracking.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ShieldIcon,
    title: "Advanced Security",
    description: "Built-in authentication with Better Auth, session management, and security features.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: LayoutIcon,
    title: "Modern Dashboard",
    description: "Beautiful and responsive dashboard with real-time analytics and insights.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: ChartBarHorizontalIcon,
    title: "Analytics",
    description: "Track user activity, growth metrics, and performance indicators.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: LockIcon,
    title: "Role-based Access",
    description: "Granular permissions and role management for different user types.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: GearIcon,
    title: "Customizable",
    description: "Easily customizable components and themes to match your brand.",
    color: "from-rose-500 to-pink-500",
  },
]

export function Features() {
  return (
    <Section id="features">
      <SectionHeader 
        badge="Features"
        title={
          <>
            Everything you need to manage
            <br />
            your application
          </>
        }
        description="Powerful features that help you manage users, monitor activity, and keep your application secure."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="group border-muted/50 transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div
                className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} mb-4 flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="h-auto gap-1 p-0">
                Learn more
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
