import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchMaintainer(prisma: PrismaClient) {
  const [maintainer] = await catchAndLogErrors(
    prisma.maintainers.findFirst({
      include: { images: true },
    })
  );

  const mapped: Maintainer = {
    ...maintainer,
    imageUrl: maintainer.images.path,
  };

  return mapped;
}
