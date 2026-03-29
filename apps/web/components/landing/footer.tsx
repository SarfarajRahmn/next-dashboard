import * as React from "react"
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr"
import { Section } from "../section"

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
      { label: "Cookies", href: "#cookies" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 backdrop-blur-sm">
      <Section className="py-12 md:py-20 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
                <SparkleIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">AdminHub</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Modern admin dashboard solution for your next project. Experience the future of admin management.
            </p>
          </div>
          {footerLinks.map((group, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                {group.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-16 lg:mt-24 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm font-medium text-muted-foreground">
              © 2024 AdminHub. All rights reserved. Built with ❤️ by the community.
            </p>
            <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
              <span>
                (Press{" "}
                <kbd className="rounded-md border border-muted-foreground/30 bg-muted px-1.5 py-0.5 text-xs shadow-sm">
                  d
                </kbd>{" "}
                to toggle dark mode)
              </span>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  )
}
