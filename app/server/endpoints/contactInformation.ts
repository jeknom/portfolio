import prisma from '../';

export async function fetchAllContactInformation() {
  const contactInformation = await prisma.contactInformation.findMany()

  const mapped: ContactInformation[] = contactInformation.map(c => ({
    ...c
  }));

  return mapped;
}