import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchRecentHighlights(prisma: PrismaClient) {
  const [recentHighlights] = await catchAndLogErrors(
    prisma.highlights.findMany({
      include: { images: true },
      orderBy: { date: "desc" },
      take: 4,
    })
  );

  const mapped: Highlight[] = recentHighlights.map((h) => ({
    ...h,
    date: h.date?.toISOString(),
    imageUrl: h.images?.path || null,
  }));

  return mapped;
}

export async function fetchAllHighlights(prisma: PrismaClient) {
  const [allHighlights] = await catchAndLogErrors(
    prisma.highlights.findMany({
      include: { images: true },
      orderBy: { date: "desc" },
    })
  );

  const mapped: Highlight[] = allHighlights.map((h) => ({
    ...h,
    date: h.date?.toISOString(),
    imageUrl: h?.images?.path || null,
  }));

  return mapped;
}
