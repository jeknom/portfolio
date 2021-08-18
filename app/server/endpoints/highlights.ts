import prisma from '../';

export async function fetchRecentHighlights() {
  const recentHighlights = await prisma.highlights.findMany({
    include: { images: true },
    orderBy: { date: 'desc' },
    take: 4
  })
  
  const mapped: Highlight[] = recentHighlights.map(h => ({
    ...h,
    date: h.date?.toISOString(),
    imageUrl: h.images.path
  }))

  return mapped
}

export async function fetchAllHighlights() {
  const allHighlights = await prisma.highlights.findMany({
    include: { images: true },
    orderBy: { date: 'desc' }
  })

  const mapped: Highlight[] = allHighlights.map(h => ({
    ...h,
    date: h.date?.toISOString(),
    imageUrl: h?.images?.path || null
  }))

  return mapped
}