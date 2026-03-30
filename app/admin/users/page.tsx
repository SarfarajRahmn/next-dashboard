// app/admin/users/page.tsx
import { UserManagement } from "@/components/admin/user-management"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage users, ban/unban users, and view user sessions.
        </p>
      </div>
      <UserManagement />
    </div>
  )
}
