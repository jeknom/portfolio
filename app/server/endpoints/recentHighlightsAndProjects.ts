import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchRecentHighlights(prisma: PrismaClient) {
  const [[highlights, projects]] = await catchAndLogErrors(
    prisma.$transaction([
      prisma.highlights.findMany({
        include: { images: true },
        orderBy: { date: "desc" },
        take: 4,
      }),
      prisma.project.findMany({
        include: {
          projectImages: {
            include: { image: true },
            orderBy: { priority: "desc" },
            take: 1,
          },
        },
        orderBy: { date: "desc" },
        take: 5,
      }),
    ])
  );

  const recentHighlights: RecentHighlight[] = highlights.map((h) => ({
    title: h.name,
    description: h.description,
    imageUrl: h?.images?.path || null,
    date: h.date.toISOString(),
  }));

  const recentProjects: RecentHighlight[] = projects.map((p) => {
    const { name, description, projectImages, date } = p;
    const imageUrl =
      projectImages.length > 0 ? projectImages[0]?.image?.path : null;

    return {
      title: name,
      description,
      imageUrl,
      date: date.toISOString(),
    };
  });

  const combined = recentHighlights.concat(recentProjects);
  combined.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    }

    return 0;
  });

  return combined;
}
