import * as React from "react"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string
  title: string | React.ReactNode
  description?: string
  centered?: boolean
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        centered && "text-center",
        className
      )}
      {...props}
    >
      {badge && (
        <Badge variant="outline" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="mb-4 text-3xl font-bold md:text-4xl tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className={cn(
          "text-muted-foreground max-w-2xl",
          centered && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  )
}
