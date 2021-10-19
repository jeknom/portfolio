import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.info("Starting seeding.");
  await seedImages(prisma);
  await seedMaintainer(prisma);
  await seedOpenGraphData(prisma);
  await seedAchievements(prisma);
  await seedHighlights(prisma);
  await seedSkills(prisma);
  console.info("Finished seeding.");
}

async function seedImages(prisma: PrismaClient) {
  const hasImages = (await prisma.images.count()) > 0;
  if (hasImages) {
    console.warn("Already has images, skipping seed");

    return;
  }

  await prisma.images.create({
    data: {
      path: "https://i.imgur.com/5nBI2Ge.png",
    },
  });

  console.info("Seeded images.");
}

async function seedMaintainer(prisma: PrismaClient) {
  const hasMaintainer = (await prisma.maintainers.count()) > 0;
  if (hasMaintainer) {
    console.warn("Already has maintainer, skipping seed.");

    return;
  }

  await prisma.maintainers.create({
    data: {
      name: "Jane Doe",
      headline: "Unknown professional",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a bibendum purus, ac imperdiet neque. Aenean ut varius est, at pulvinar enim. Curabitur non gravida odio, dapibus semper lectus. Aliquam vulputate, felis vitae scelerisque elementum, nibh tellus dictum nibh, a ultrices ipsum quam vitae nibh. Fusce neque nisi, porta et placerat vel, posuere quis turpis. Vivamus dignissim orci orci, faucibus mattis nunc vestibulum ut. Vestibulum elementum magna ornare neque molestie mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet dapibus justo, eget iaculis dui sodales in. Nulla facilisis nunc eget tempus dignissim.",
      image_id: 1,
    },
  });

  console.info("Seeded maintainers.");
}

async function seedOpenGraphData(prisma: PrismaClient) {
  const hasOpenGraphData = (await prisma.openGraphData.count()) > 0;
  if (hasOpenGraphData) {
    console.warn("Already has open graph data, skipping seed.");

    return;
  }

  await prisma.openGraphData.create({
    data: {
      title: "Example open graph title",
      description: "Example open graph description",
      type: "Example open graph type",
      image_id: 1,
    },
  });

  console.info("Seeded open graph data.");
}

async function seedAchievements(prisma: PrismaClient) {
  const hasAchievements = (await prisma.achievements.count()) > 0;
  if (hasAchievements) {
    console.warn("Already has achievements, skipping seed.");

    return;
  }

  await prisma.achievements.create({
    data: {
      title: "Executive CEO of the Universe",
      subtitle: "Doing thing and thangs",
      image_id: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
  });
}

async function seedHighlights(prisma: PrismaClient) {
  const hasHighlights = (await prisma.highlights.count()) > 0;
  if (hasHighlights) {
    console.warn("Already has highlights, skipping seed.");

    return;
  }

  await prisma.highlights.create({
    data: {
      name: "Employee of the century",
      description:
        "My mom and dad told me that I'm such a champ and nominated me for this cool title.",
      image_id: 1,
      date: new Date(),
    },
  });
}

async function seedSkills(prisma: PrismaClient) {
  const hasSkills = (await prisma.skills.count()) > 0;
  if (hasSkills) {
    console.warn("Already has skills, skipping seed.");

    return;
  }

  await prisma.skills.create({
    data: {
      name: "Microsoft Word",
      score: 5,
      icon_id: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
