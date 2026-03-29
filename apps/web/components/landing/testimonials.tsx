import * as React from "react"
import { StarIcon } from "@phosphor-icons/react/dist/ssr"
import { 
  Card, 
  CardContent 
} from "@workspace/ui/components/card"
import { 
  Avatar, 
  AvatarFallback 
} from "@workspace/ui/components/avatar"
import { Section } from "../section"
import { SectionHeader } from "../section-header"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechStart",
    content: "The best admin dashboard I've ever used. The UI is beautiful and the features are exactly what we needed.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content: "Incredible attention to detail. The user management features saved us countless hours of development time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Developer",
    content: "Built with modern tech stack and best practices. The code quality is outstanding and easy to customize.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader 
        badge="Testimonials"
        title={
          <>
            Loved by developers and
            <br />
            business owners
          </>
        }
        description="See what our customers have to say about their experience."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="transition-shadow hover:shadow-lg bg-background/50 backdrop-blur-sm border-muted/50">
            <CardContent className="p-6">
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <StarIcon
                    key={j}
                    className="h-4 w-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="mb-6 text-muted-foreground italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
