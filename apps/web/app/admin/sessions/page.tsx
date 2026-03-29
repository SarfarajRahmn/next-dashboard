// app/admin/sessions/page.tsx
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { formatDistanceToNow } from "date-fns"
import { ShieldCheck, User } from "@phosphor-icons/react/dist/ssr"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sessions | Admin Dashboard",
}

export default async function AdminSessionsPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  // This is a server component, so we use auth.api
  // In a real app with many sessions, we'd use listSessions with pagination
  // But Better Auth's admin plugin provides listUserSessions specifically.
  // To list ALL sessions across the app, we might need a custom query or check admin plugin docs.
  // For now, let's provide a view that's useful for the current admin.

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Sessions</h1>
        <p className="text-muted-foreground">
          Monitor and manage active user sessions across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Global Session Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Device / Browser</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    To manage specific user sessions, please use the "View Sessions" action in the <strong>Users</strong> tab.
                    This page will eventually show a global audit log.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
