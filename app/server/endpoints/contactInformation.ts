import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchAllContactInformation(prisma: PrismaClient) {
  const [contactInformation] = await catchAndLogErrors(
    prisma.contactInformation.findMany({ include: { image: true } })
  );

  const mapped: ContactInformation[] = contactInformation.map((c) => ({
    name: c.name,
    link: c.link,
    imageUrl: c.image?.path || null,
  }));

  return mapped;
}
