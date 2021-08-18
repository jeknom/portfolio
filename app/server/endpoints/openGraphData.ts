import prisma from '../';

export async function fetchOpenGraphData() {
  const openGraphData = await prisma.openGraphData.findFirst({
    include: { images: true }
  });

  const mapped: OpenGraphData = {
    ...openGraphData,
    imageUrl: openGraphData.images.path
  }

  return mapped;
}