import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchAllContactInformation(prisma: PrismaClient) {
  const [contactInformation] = await catchAndLogErrors(
    prisma.contactInformation.findMany()
  );

  const mapped: ContactInformation[] = contactInformation.map((c) => ({
    ...c,
  }));

  return mapped;
}
