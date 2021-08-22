import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchAllSkills(prisma: PrismaClient) {
  const [allSkills] = await catchAndLogErrors(
    prisma.skills.findMany({
      include: { images: true },
      orderBy: { score: "desc" },
    })
  );

  const mapped: Skill[] = allSkills.map((s) => ({
    ...s,
    imageUrl: s?.images?.path || null,
  }));

  return mapped;
}
