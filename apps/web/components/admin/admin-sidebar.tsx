// components/admin/admin-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth/auth-client"
import { useAuth } from "@/components/providers/auth-providers"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import {
  Users,
  House,
  SignOut,
  ShieldCheck,
  Gauge,
} from "@phosphor-icons/react"

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Gauge,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { session, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/login"
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <ShieldCheck className="h-5 w-5 text-primary-foreground" weight="fill" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Admin Panel</p>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" weight={isActive ? "fill" : "regular"} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User info + sign out */}
      <div className="border-t px-3 py-4 space-y-2">
        {session && (
          <div className="px-3 py-2">
            <p className="text-xs font-medium truncate">{session.user?.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground truncate">
              {session.user?.email}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <SignOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
