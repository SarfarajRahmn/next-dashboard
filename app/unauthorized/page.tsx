// app/unauthorized/page.tsx
import Link from "next/link"
import { ShieldSlash } from "@phosphor-icons/react/dist/ssr"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Unauthorized | Admin Panel",
}

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <ShieldSlash className="h-8 w-8 text-destructive" weight="fill" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground max-w-sm">
          You don&apos;t have permission to view this page. Admin access is required.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
        >
          Sign in with admin account
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
