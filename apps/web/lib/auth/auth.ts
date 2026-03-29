// lib/auth/auth.ts
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"
import { admin } from "better-auth/plugins"
import { createClient } from "@libsql/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import path from "node:path"

// Initialize Prisma Client with LibSQL Driver Adapter (Prisma 7)
const adapter = new PrismaLibSql({
  url: `file:${path.join(process.cwd(), "dev.db")}`,
})
export const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
  // Use Prisma adapter - this handles all database operations for you
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [admin()],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
})
