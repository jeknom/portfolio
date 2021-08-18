import prisma from '../';

export async function fetchAllSkills() {
  const allSkills = await prisma.skills.findMany({
    include: { images: true },
    orderBy: { score: 'desc' }
  })

  const mapped: Skill[] = allSkills.map(s => ({
    ...s,
    imageUrl: s?.images?.path || null
  }))

  return mapped;
}