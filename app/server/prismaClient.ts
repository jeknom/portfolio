import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

// This prevents hot-reload from creating extra prisma clients in a development environment.
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/#prismaclient-in-long-running-applications
declare const global: CustomNodeJsGlobal;
const prisma = (global.prisma as PrismaClient) || new PrismaClient();

if (process.env.ENVIRONMENT === "development") {
  global.prisma = prisma;
}

export default prisma;
