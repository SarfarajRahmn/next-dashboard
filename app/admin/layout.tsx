// app/admin/layout.tsx
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/login")
  }

  // The admin plugin adds role to the user object
  const userRole = (session.user as any).role
  if (userRole !== "admin") {
    redirect("/unauthorized")
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
