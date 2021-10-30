import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.info("Starting seeding.");
  await seedImages(prisma);
  await seedVideos(prisma);
  await seedMaintainer(prisma);
  await seedOpenGraphData(prisma);
  await seedAchievements(prisma);
  await seedHighlights(prisma);
  await seedSkills(prisma);
  await seedContactInformation(prisma);
  await seedProjects(prisma);
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
      description: "Unknown user image",
    },
  });

  console.info("Seeded images.");
}

async function seedVideos(prisma: PrismaClient) {
  const hasVideos = (await prisma.video.count()) > 0;
  if (hasVideos) {
    console.warn("Already has videos, skipping seed");

    return;
  }

  await prisma.video.create({
    data: {
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Young man who'll never give up",
    },
  });

  console.info("Seeded videos.");
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

  await prisma.achievements.createMany({
    data: [
      {
        title: "Executive CEO of the Universe",
        subtitle: "Monsters Inc.",
        image_id: 1,
        startDate: new Date(2021, 13, 5),
      },
      {
        title: "Senior VP of Product",
        subtitle: "Duff Ltd.",
        image_id: 1,
        startDate: new Date(2020, 12, 1),
        endDate: new Date(2021, 7, 3),
      },
      {
        title: "Associate Secretary of Defence",
        subtitle: "Wakanda",
        image_id: 1,
        startDate: new Date(2015, 3, 23),
        endDate: new Date(2018, 3, 5),
      },
    ],
  });

  console.info("Seeded achievements.");
}

async function seedHighlights(prisma: PrismaClient) {
  const hasHighlights = (await prisma.highlights.count()) > 0;
  if (hasHighlights) {
    console.warn("Already has highlights, skipping seed.");

    return;
  }

  await prisma.highlights.createMany({
    data: [
      {
        name: "Employee of the century",
        description:
          "My mom and dad told me that I'm such a champ and nominated me for this cool title.",
        image_id: 1,
        date: new Date(2021, 13, 2),
      },
      {
        name: "Nobel prize for most pull-ups",
        description:
          "I trained and trained and was finally able to do 0.5 pull-ups. Thanks for the award Tom Hanks!",
        image_id: 1,
        date: new Date(2016, 4, 16),
      },
      {
        name: "Album with JAY-Z",
        description: "I met him at Walmart and we really hit it off!",
        image_id: 1,
        date: new Date(2013, 1, 2),
      },
    ],
  });

  console.info("Seeded highlights.");
}

async function seedSkills(prisma: PrismaClient) {
  const hasSkills = (await prisma.skills.count()) > 0;
  if (hasSkills) {
    console.warn("Already has skills, skipping seed.");

    return;
  }

  await prisma.skills.createMany({
    data: [
      {
        name: "Microsoft Word",
        score: 5,
        icon_id: 1,
      },
      {
        name: "Microsoft Excel",
        score: 4,
        icon_id: 1,
      },
      {
        name: "Microsoft PowerPoint",
        score: 3,
        icon_id: 1,
      },
      {
        name: "Adobe Photoshop",
        score: 2,
        icon_id: 1,
      },
      {
        name: "MS Paint",
        score: 1,
        icon_id: 1,
      },
    ],
  });

  console.info("Seeded skills.");
}

async function seedContactInformation(prisma: PrismaClient) {
  const hasContactInformation = (await prisma.contactInformation.count()) > 0;
  if (hasContactInformation) {
    console.warn("Already has contact information, skipping seed.");

    return;
  }

  await prisma.contactInformation.createMany({
    data: [
      {
        name: "Facebook",
        link: "https://www.facebook.com/",
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/",
      },
      {
        name: "GitHub",
        link: "https://www.github.com/jeknom",
      },
    ],
  });

  console.info("Seeded contact information.");
}

async function seedProjects(prisma: PrismaClient) {
  const hasProjects = (await prisma.project.count()) > 0;
  if (hasProjects) {
    console.warn("Already has projects, skipping seed.");

    return;
  }

  await prisma.$transaction([
    prisma.project.createMany({
      data: [
        {
          name: "War against Thanos",
          description:
            "We showed that purple scumbag that the power of the unyielding human will and dedication",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat mi nec lectus pellentesque tristique. Quisque dignissim elit interdum, mattis justo sed, facilisis nisi. Pellentesque pretium libero a scelerisque luctus. Maecenas congue facilisis erat, a ornare velit vehicula ac. Donec rutrum erat sit amet venenatis porttitor. Sed rhoncus a sapien ut fringilla. Maecenas pharetra augue sed orci molestie luctus. Mauris eu finibus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla suscipit est ut ex scelerisque, ac ornare nunc porta.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac volutpat nibh. Donec vel eros in dui fermentum posuere in eget nisi. Phasellus vel auctor turpis. Vestibulum arcu odio, pellentesque nec rutrum et, sodales a justo. Morbi accumsan, nulla dignissim tempor ullamcorper, libero metus sollicitudin magna, sit amet interdum velit ligula sit amet elit. Integer id vulputate magna, eget convallis arcu. Fusce viverra massa at nulla iaculis, sed maximus ligula mattis. Cras a diam nec ipsum mattis iaculis. Etiam non odio ante. Suspendisse ac lorem massa. Nulla commodo ultrices imperdiet. Nulla et ultrices ex. Praesent lobortis vehicula arcu id sagittis. Sed lacinia id ante ac auctor. Aliquam dapibus lorem eu ipsum sodales, non vestibulum tortor ultricies.\n\nDonec sed urna iaculis, pretium eros nec, varius urna. Mauris ac pharetra nisl. Ut a est sed massa finibus condimentum in semper lacus. Suspendisse a congue mauris. Suspendisse mattis orci varius enim accumsan cursus et eget purus. Donec aliquam turpis a aliquet gravida. Sed justo erat, commodo et accumsan fermentum, dignissim non purus. Nullam vulputate porta scelerisque. Donec gravida pellentesque enim, in facilisis urna pulvinar nec. Ut neque erat, feugiat nec tincidunt eget, lacinia finibus nulla. Aliquam consectetur, risus vitae congue molestie, nisl orci pulvinar purus, ultrices ultrices erat ligula vel eros. Morbi sed erat sit amet enim finibus pellentesque. Integer sed ligula tellus. Proin ut neque sit amet mauris facilisis porttitor. Donec ut nisl consectetur, egestas orci vel, euismod orci.\n\nUt elementum quam purus, a fringilla sem aliquam et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec pellentesque, lectus vel pretium varius, purus nisi consectetur lorem, id elementum purus sem nec tellus. Phasellus venenatis leo eget rhoncus tempor. Etiam nulla lacus, dictum ut vehicula eu, varius sit amet libero. Morbi posuere ligula ut ex semper, vitae viverra dui vehicula. Donec ante augue, tincidunt eu porttitor et, semper eu tellus. Nam pellentesque tempus facilisis. Fusce at sem sed turpis gravida congue nec quis nulla.\n\nMauris hendrerit et dolor ac viverra. Proin dignissim dolor justo, eget dapibus enim fringilla at. Donec sit amet orci lacus. Mauris at quam sollicitudin, iaculis elit luctus, ultrices dui. Suspendisse maximus convallis felis. Donec et vehicula lacus. Integer vel vulputate risus. Donec dictum lacus nec vehicula vehicula. Nunc mauris est, placerat ut elementum sit amet, fermentum non augue. Praesent auctor aliquam lectus, in efficitur risus dignissim id.",
          date: new Date(2018, 4, 25),
        },
        {
          name: "Premium Duff delight",
          description:
            "I got to be a part of creating a beverage which has reached such a big demand that there is not enough to go around.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat mi nec lectus pellentesque tristique. Quisque dignissim elit interdum, mattis justo sed, facilisis nisi. Pellentesque pretium libero a scelerisque luctus. Maecenas congue facilisis erat, a ornare velit vehicula ac. Donec rutrum erat sit amet venenatis porttitor. Sed rhoncus a sapien ut fringilla. Maecenas pharetra augue sed orci molestie luctus. Mauris eu finibus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla suscipit est ut ex scelerisque, ac ornare nunc porta.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac volutpat nibh. Donec vel eros in dui fermentum posuere in eget nisi. Phasellus vel auctor turpis. Vestibulum arcu odio, pellentesque nec rutrum et, sodales a justo. Morbi accumsan, nulla dignissim tempor ullamcorper, libero metus sollicitudin magna, sit amet interdum velit ligula sit amet elit. Integer id vulputate magna, eget convallis arcu. Fusce viverra massa at nulla iaculis, sed maximus ligula mattis. Cras a diam nec ipsum mattis iaculis. Etiam non odio ante. Suspendisse ac lorem massa. Nulla commodo ultrices imperdiet. Nulla et ultrices ex. Praesent lobortis vehicula arcu id sagittis. Sed lacinia id ante ac auctor. Aliquam dapibus lorem eu ipsum sodales, non vestibulum tortor ultricies.\n\nDonec sed urna iaculis, pretium eros nec, varius urna. Mauris ac pharetra nisl. Ut a est sed massa finibus condimentum in semper lacus. Suspendisse a congue mauris. Suspendisse mattis orci varius enim accumsan cursus et eget purus. Donec aliquam turpis a aliquet gravida. Sed justo erat, commodo et accumsan fermentum, dignissim non purus. Nullam vulputate porta scelerisque. Donec gravida pellentesque enim, in facilisis urna pulvinar nec. Ut neque erat, feugiat nec tincidunt eget, lacinia finibus nulla. Aliquam consectetur, risus vitae congue molestie, nisl orci pulvinar purus, ultrices ultrices erat ligula vel eros. Morbi sed erat sit amet enim finibus pellentesque. Integer sed ligula tellus. Proin ut neque sit amet mauris facilisis porttitor. Donec ut nisl consectetur, egestas orci vel, euismod orci.\n\nUt elementum quam purus, a fringilla sem aliquam et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec pellentesque, lectus vel pretium varius, purus nisi consectetur lorem, id elementum purus sem nec tellus. Phasellus venenatis leo eget rhoncus tempor. Etiam nulla lacus, dictum ut vehicula eu, varius sit amet libero. Morbi posuere ligula ut ex semper, vitae viverra dui vehicula. Donec ante augue, tincidunt eu porttitor et, semper eu tellus. Nam pellentesque tempus facilisis. Fusce at sem sed turpis gravida congue nec quis nulla.\n\nMauris hendrerit et dolor ac viverra. Proin dignissim dolor justo, eget dapibus enim fringilla at. Donec sit amet orci lacus. Mauris at quam sollicitudin, iaculis elit luctus, ultrices dui. Suspendisse maximus convallis felis. Donec et vehicula lacus. Integer vel vulputate risus. Donec dictum lacus nec vehicula vehicula. Nunc mauris est, placerat ut elementum sit amet, fermentum non augue. Praesent auctor aliquam lectus, in efficitur risus dignissim id.",
          date: new Date(2021, 1, 1),
        },
        {
          name: "Energy from human laughter",
          description:
            "I'm overseering the production of energy at the Monster's Inc. What can I say, life is good.",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat mi nec lectus pellentesque tristique. Quisque dignissim elit interdum, mattis justo sed, facilisis nisi. Pellentesque pretium libero a scelerisque luctus. Maecenas congue facilisis erat, a ornare velit vehicula ac. Donec rutrum erat sit amet venenatis porttitor. Sed rhoncus a sapien ut fringilla. Maecenas pharetra augue sed orci molestie luctus. Mauris eu finibus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla suscipit est ut ex scelerisque, ac ornare nunc porta.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ac volutpat nibh. Donec vel eros in dui fermentum posuere in eget nisi. Phasellus vel auctor turpis. Vestibulum arcu odio, pellentesque nec rutrum et, sodales a justo. Morbi accumsan, nulla dignissim tempor ullamcorper, libero metus sollicitudin magna, sit amet interdum velit ligula sit amet elit. Integer id vulputate magna, eget convallis arcu. Fusce viverra massa at nulla iaculis, sed maximus ligula mattis. Cras a diam nec ipsum mattis iaculis. Etiam non odio ante. Suspendisse ac lorem massa. Nulla commodo ultrices imperdiet. Nulla et ultrices ex. Praesent lobortis vehicula arcu id sagittis. Sed lacinia id ante ac auctor. Aliquam dapibus lorem eu ipsum sodales, non vestibulum tortor ultricies.\n\nDonec sed urna iaculis, pretium eros nec, varius urna. Mauris ac pharetra nisl. Ut a est sed massa finibus condimentum in semper lacus. Suspendisse a congue mauris. Suspendisse mattis orci varius enim accumsan cursus et eget purus. Donec aliquam turpis a aliquet gravida. Sed justo erat, commodo et accumsan fermentum, dignissim non purus. Nullam vulputate porta scelerisque. Donec gravida pellentesque enim, in facilisis urna pulvinar nec. Ut neque erat, feugiat nec tincidunt eget, lacinia finibus nulla. Aliquam consectetur, risus vitae congue molestie, nisl orci pulvinar purus, ultrices ultrices erat ligula vel eros. Morbi sed erat sit amet enim finibus pellentesque. Integer sed ligula tellus. Proin ut neque sit amet mauris facilisis porttitor. Donec ut nisl consectetur, egestas orci vel, euismod orci.\n\nUt elementum quam purus, a fringilla sem aliquam et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec pellentesque, lectus vel pretium varius, purus nisi consectetur lorem, id elementum purus sem nec tellus. Phasellus venenatis leo eget rhoncus tempor. Etiam nulla lacus, dictum ut vehicula eu, varius sit amet libero. Morbi posuere ligula ut ex semper, vitae viverra dui vehicula. Donec ante augue, tincidunt eu porttitor et, semper eu tellus. Nam pellentesque tempus facilisis. Fusce at sem sed turpis gravida congue nec quis nulla.\n\nMauris hendrerit et dolor ac viverra. Proin dignissim dolor justo, eget dapibus enim fringilla at. Donec sit amet orci lacus. Mauris at quam sollicitudin, iaculis elit luctus, ultrices dui. Suspendisse maximus convallis felis. Donec et vehicula lacus. Integer vel vulputate risus. Donec dictum lacus nec vehicula vehicula. Nunc mauris est, placerat ut elementum sit amet, fermentum non augue. Praesent auctor aliquam lectus, in efficitur risus dignissim id.",
          date: new Date(2021, 4, 24),
        },
      ],
    }),
    prisma.projectImage.createMany({
      data: [
        {
          projectId: 1,
          imageId: 1,
          priority: 1,
        },
        {
          projectId: 2,
          imageId: 1,
          priority: 1,
        },
        {
          projectId: 3,
          imageId: 1,
          priority: 1,
        },
      ],
    }),
    prisma.projectVideo.createMany({
      data: [
        {
          projectId: 1,
          videoId: 1,
          priority: 1,
        },
        {
          projectId: 2,
          videoId: 1,
          priority: 1,
        },
        {
          projectId: 3,
          videoId: 1,
          priority: 1,
        },
      ],
    }),
  ]);

  console.info("Seeded projects.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
