import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export async function fetchOpenGraphData(prisma: PrismaClient) {
  const [openGraphData] = await catchAndLogErrors(
    prisma.openGraphData.findFirst({
      include: { images: true },
    })
  );

  const mapped: OpenGraphData = {
    ...openGraphData,
    imageUrl: openGraphData?.images?.path || "",
  };

  return mapped;
}
