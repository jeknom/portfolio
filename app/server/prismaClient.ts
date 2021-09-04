import { PrismaClient } from "@prisma/client";

const isDev = process.env.ENVIRONMENT === "development";
if (isDev) {
  globalThis.prisma = new PrismaClient();
}

const prisma = global.prisma || new PrismaClient();

export default prisma;
