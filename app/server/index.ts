import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.ENVIRONMENT === 'development' && !globalThis.prisma) {
  globalThis.prisma = new PrismaClient()
}

export default globalThis.prisma