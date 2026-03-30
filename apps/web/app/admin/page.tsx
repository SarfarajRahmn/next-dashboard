// app/admin/page.tsx
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Users,
  ShieldCheck,
  ShieldSlash,
  Gauge,
  ShieldCheckIcon,
} from "@phosphor-icons/react/dist/ssr"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Admin Panel",
}

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {session?.user?.name || "Admin"}. Here&apos;s an
          overview of your platform.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Go to Users tab to see details
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Sessions
            </CardTitle>
            <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Manage via user sessions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Your Role
            </CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {session?.user?.role ?? "admin"}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {session?.user?.email}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use the <strong>Users</strong> section in the sidebar to manage
            accounts — create users, ban/unban users, promote to admin, delete
            accounts, and inspect active sessions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
