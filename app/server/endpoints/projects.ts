import { PrismaClient } from ".prisma/client";

export async function fetchAllProjects(
  prisma: PrismaClient
): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    include: {
      projectImages: {
        include: {
          image: true,
        },
      },
      projectVideos: {
        include: {
          video: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return projects.map((p) => {
    const { name, description, content, projectImages, projectVideos, date } =
      p;
    const sortedImages = [...projectImages];
    const sortedVideos = [...projectVideos];

    sortedImages.sort((a, b) => a.priority + b.priority);
    sortedVideos.sort((a, b) => a.priority + b.priority);

    const imageUrl = sortedImages.length > 0 ? sortedImages[0].image?.path : "";
    const imageMedia: MediaItem[] = sortedImages.map((i) => ({
      type: "image",
      url: i.image.path,
    }));
    const videoMedia: MediaItem[] = sortedVideos.map((v) => ({
      type: "youtubeVideo",
      url: v.video.url,
    }));
    const media = videoMedia.concat(imageMedia);

    return {
      name,
      description,
      content,
      imageUrl,
      media,
      date: date.toISOString(),
    };
  });
}
