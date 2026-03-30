// app/admin/sessions/page.tsx
import { auth, prisma } from "@/lib/auth/auth"
import { formatBrowserInfo } from "@/lib/auth/browser-info"
import { headers } from "next/headers"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { formatDistanceToNow } from "date-fns"
import { ShieldCheck, User } from "@phosphor-icons/react/dist/ssr"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sessions | Admin Dashboard",
}

export default async function AdminSessionsPage() {
  await auth.api.getSession({ headers: await headers() })

  const allSessions = await prisma.session.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    where: { user: { banned: false } },
  })

  // This is a server component, so we use auth.api to verify auth

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
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allSessions.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No active sessions available.
                    </TableCell>
                  </TableRow>
                ) : (
                  allSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {session.user?.email || "Unknown user"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.user?.name || "Unknown name"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {formatBrowserInfo(session.userAgent)}
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {session.userAgent || "Unknown user agent"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{session.ipAddress || "Unknown"}</TableCell>
                      <TableCell>
                        {new Date(session.expiresAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(session.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
