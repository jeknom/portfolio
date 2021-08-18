import prisma from '../';

export async function fetchRecentAchievements() {
  const recentAchievements = await prisma.achievements.findMany({
    include: { images: true },
    orderBy: { startDate: 'desc' },
    take: 4
  })

  const mapped: Achievement[] = recentAchievements.map(a => ({
    ...a,
    startDate: a?.startDate?.toISOString() || null,
    endDate: a?.endDate?.toISOString() || null,
    imageUrl: a?.images?.path || null
  }));

  return mapped;
}

export async function fetchAllAchievements() {
  const allAchievements = await prisma.achievements.findMany({
    include: { images: true },
    orderBy: { startDate: 'desc' }
  });

  const mapped: Achievement[] = allAchievements.map(a => ({
    ...a,
    startDate: a?.startDate?.toISOString() || null,
    endDate: a?.endDate?.toISOString() || null,
    imageUrl: a?.images?.path || null,
  }));

  return mapped;
}