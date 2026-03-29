import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // This tells Prisma where to find your database for migrations
    url: process.env.DATABASE_URL, 
  },
});