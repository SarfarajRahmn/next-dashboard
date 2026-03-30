import * as React from "react"
import { 
  UsersIcon, 
  ActivityIcon, 
  ClockIcon, 
  StarIcon 
} from "@phosphor-icons/react/dist/ssr"
import { Section } from "../section"

const stats = [
  { value: "10K+", label: "Active Users", icon: UsersIcon },
  { value: "99.9%", label: "Uptime", icon: ActivityIcon },
  { value: "24/7", label: "Support", icon: ClockIcon },
  { value: "5★", label: "Rating", icon: StarIcon },
]

export function Stats() {
  return (
    <Section className="border-y py-12 md:py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="mb-2 flex justify-center">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold md:text-3xl">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
