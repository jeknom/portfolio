import prisma from '../';

export async function fetchMaintainer() {
  const maintainer = await prisma.maintainers.findFirst({
    include: { images: true }
  });

  const mapped: Maintainer = {
    ...maintainer,
    imageUrl: maintainer.images.path
  }

  return mapped;
}