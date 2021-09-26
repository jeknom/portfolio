import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.info("Starting seeding.");
  await seedImages(prisma);
  await seedMaintainer(prisma);
  await seedOpenGraphData(prisma);
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });