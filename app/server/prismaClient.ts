import { PrismaClient } from "@prisma/client";

// This prevents hot-reload from creating extra prisma clients in a development environment.
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management/#prismaclient-in-long-running-applications
const prisma = (global.prisma as PrismaClient) || new PrismaClient();

export default prisma;
