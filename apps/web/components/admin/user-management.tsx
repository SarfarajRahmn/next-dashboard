// components/admin/user-management.tsx
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/providers/auth-providers"
import { authClient } from "@/lib/auth/auth-client"
import { formatBrowserInfo } from "@/lib/auth/browser-info"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { Badge } from "@workspace/ui/components/badge"
import { toast } from "sonner"
import {
  ProhibitInset,
  Trash,
  Eye,
  ArrowsClockwise,
  SpinnerGap,
  UserPlus,
  ShieldCheck,
  ShieldSlash,
} from "@phosphor-icons/react"

interface User {
  id: string
  email: string
  name: string | null
  role: string
  banned?: boolean | null
  banReason?: string | null
  bannedAt?: Date | string | null
  createdAt: Date | string
}

interface Session {
  id: string
  token: string
  userAgent?: string | null
  ipAddress?: string | null
  expiresAt: Date | string
  createdAt: Date | string
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [banDialogOpen, setBanDialogOpen] = useState(false)
  const [banReason, setBanReason] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sessionsDialogOpen, setSessionsDialogOpen] = useState(false)
  const [userSessions, setUserSessions] = useState<Session[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" })
  const [actionLoading, setActionLoading] = useState(false)

  useAuth()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await authClient.admin.listUsers({
        query: { limit: 100 },
      })
      if (error) throw error
      setUsers((data?.users ?? []) as User[])
    } catch (error) {
      console.error("Failed to fetch users:", error)
      toast.error("Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password) {
      toast.error("Email and password are required")
      return
    }
    try {
      setActionLoading(true)
      const { error } = await authClient.admin.createUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: "user",
      })
      if (error) throw error
      toast.success(`User ${newUser.email} created successfully`)
      setCreateDialogOpen(false)
      setNewUser({ name: "", email: "", password: "" })
      fetchUsers()
    } catch (error) {
      console.error("Failed to create user:", error)
      toast.error("Failed to create user")
    } finally {
      setActionLoading(false)
    }
  }

  const handleBanUser = async () => {
    if (!selectedUser) return
    try {
      setActionLoading(true)
      const { error } = await authClient.admin.banUser({
        userId: selectedUser.id,
        banReason: banReason || "No reason provided",
      })
      if (error) throw error
      toast.success(`${selectedUser.email} has been banned`)
      fetchUsers()
      setBanDialogOpen(false)
      setBanReason("")
      setSelectedUser(null)
    } catch (error) {
      console.error("Failed to ban user:", error)
      toast.error("Failed to ban user")
    } finally {
      setActionLoading(false)
    }
  }

  const handleUnbanUser = async (user: User) => {
    try {
      setActionLoading(true)
      const { error } = await authClient.admin.unbanUser({ userId: user.id })
      if (error) throw error
      toast.success(`${user.email} has been unbanned`)
      fetchUsers()
    } catch (error) {
      console.error("Failed to unban user:", error)
      toast.error("Failed to unban user")
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    try {
      setActionLoading(true)
      const { error } = await authClient.admin.removeUser({
        userId: selectedUser.id,
      })
      if (error) throw error
      toast.success(`${selectedUser.email} has been deleted`)
      fetchUsers()
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast.error("Failed to delete user")
    } finally {
      setActionLoading(false)
    }
  }

  const handleViewSessions = async (user: User) => {
    try {
      const { data, error } = await authClient.admin.listUserSessions({
        userId: user.id,
      })
      if (error) throw error
      setUserSessions((data?.sessions ?? []) as Session[])
      setSelectedUser(user)
      setSessionsDialogOpen(true)
    } catch (error) {
      console.error("Failed to fetch sessions:", error)
      toast.error("Failed to fetch user sessions")
    }
  }

  const handleRevokeSession = async (token: string) => {
    try {
      const { error } = await authClient.admin.revokeUserSession({
        sessionToken: token,
      })
      if (error) throw error
      toast.success("Session revoked successfully")
      if (selectedUser) {
        const { data } = await authClient.admin.listUserSessions({
          userId: selectedUser.id,
        })
        setUserSessions((data?.sessions ?? []) as Session[])
      }
    } catch (error) {
      console.error("Failed to revoke session:", error)
      toast.error("Failed to revoke session")
    }
  }

  const handleSetRole = async (user: User, role: "admin" | "user") => {
    try {
      const { error } = await authClient.admin.setRole({
        userId: user.id,
        role,
      })
      if (error) throw error
      toast.success(`${user.email} role updated to ${role}`)
      fetchUsers()
    } catch (error) {
      console.error("Failed to update role:", error)
      toast.error("Failed to update role")
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <SpinnerGap className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={() => setCreateDialogOpen(true)}
              size="sm"
              className="gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
            <Button
              onClick={fetchUsers}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ArrowsClockwise className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-muted-foreground">
              No users found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name || "N/A"}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.banned ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-600 dark:text-green-400"
                        >
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {/* View Sessions */}
                        <Button
                          variant="ghost"
                          size="sm"
                          title="View sessions"
                          onClick={() => handleViewSessions(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {/* Ban / Unban */}
                        {!user.banned ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Ban user"
                            onClick={() => {
                              setSelectedUser(user)
                              setBanDialogOpen(true)
                            }}
                          >
                            <ProhibitInset className="h-4 w-4 text-destructive" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Unban user"
                            onClick={() => handleUnbanUser(user)}
                          >
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                        {/* Toggle role */}
                        <Button
                          variant="ghost"
                          size="sm"
                          title={
                            user.role === "admin"
                              ? "Demote to user"
                              : "Promote to admin"
                          }
                          onClick={() =>
                            handleSetRole(
                              user,
                              user.role === "admin" ? "user" : "admin"
                            )
                          }
                        >
                          {user.role === "admin" ? (
                            <ShieldSlash className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Delete user"
                          onClick={() => {
                            setSelectedUser(user)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user to the platform. They can sign in immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Input
              placeholder="Full name (optional)"
              value={newUser.name}
              onChange={(e) =>
                setNewUser((u) => ({ ...u, name: e.target.value }))
              }
            />
            <Input
              type="email"
              placeholder="Email address"
              value={newUser.email}
              onChange={(e) =>
                setNewUser((u) => ({ ...u, email: e.target.value }))
              }
            />
            <Input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser((u) => ({ ...u, password: e.target.value }))
              }
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={actionLoading}>
              {actionLoading && (
                <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              Are you sure you want to ban {selectedUser?.email}? They will not
              be able to access the platform until unbanned.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Reason for ban (optional)"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBanDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBanUser}
              disabled={actionLoading}
            >
              {actionLoading && (
                <SpinnerGap className="mr-2 h-4 w-4 animate-spin" />
              )}
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <strong>{selectedUser?.email}</strong>&apos;s account and all
              associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Sessions Dialog */}
      <Dialog open={sessionsDialogOpen} onOpenChange={setSessionsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sessions — {selectedUser?.email}</DialogTitle>
            <DialogDescription>
              Active sessions for this user. You can revoke individual sessions.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-100 space-y-3 overflow-y-auto">
            {userSessions.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground">
                No active sessions
              </p>
            ) : (
              userSessions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-start justify-between gap-4 rounded-lg border p-4"
                >
                  <div className="min-w-0 space-y-1 text-sm">
                    <p className="truncate font-medium">
                      {formatBrowserInfo(s.userAgent)}
                    </p>
                    {s.userAgent ? (
                      <p className="truncate text-xs text-muted-foreground">
                        Full UA string: {s.userAgent}
                      </p>
                    ) : (
                      <p className="truncate text-xs text-muted-foreground">
                        Unknown user agent
                      </p>
                    )}
                    <p className="text-muted-foreground">
                      IP: {s.ipAddress || "Unknown"}
                    </p>
                    <p className="text-muted-foreground">
                      Expires: {new Date(s.expiresAt).toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevokeSession(s.token)}
                    className="shrink-0"
                  >
                    Revoke
                  </Button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
