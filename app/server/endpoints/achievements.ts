import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchRecentAchievements(prisma: PrismaClient) {
  const [recentAchievements] = await catchAndLogErrors(prisma.achievements.findMany({
    include: { images: true },
    orderBy: { startDate: 'desc' },
    take: 4
  }));

  const mapped: Achievement[] = recentAchievements.map(a => ({
    ...a,
    startDate: a?.startDate?.toISOString() || null,
    endDate: a?.endDate?.toISOString() || null,
    imageUrl: a?.images?.path || null
  }));

  return mapped;
}

export async function fetchAllAchievements(prisma: PrismaClient) {
  const [allAchievements] = await catchAndLogErrors(prisma.achievements.findMany({
    include: { images: true },
    orderBy: { startDate: 'desc' }
  }));

  const mapped: Achievement[] = allAchievements.map(a => ({
    ...a,
    startDate: a?.startDate?.toISOString() || null,
    endDate: a?.endDate?.toISOString() || null,
    imageUrl: a?.images?.path || null,
  }));

  return mapped;
}