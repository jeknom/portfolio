import { Maintainers } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchMaintainer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const maintainer = await prisma.maintainers.findFirst({
    include: {
      images: true,
    },
  });

  if (maintainer) {
    res.status(200).json(maintainer);
  } else {
    sendResourceNotFound(res, "Could not find the requested maintainer.");
  }
}

async function handleUpdateMaintainer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, headline, bio, image_id } = req.body;
  const maintainer = await prisma.maintainers.findFirst();
  let response: Maintainers | null = null;

  if (maintainer) {
    response = await prisma.maintainers.update({
      where: { id: 1 },
      data: { name, headline, bio, image_id },
    });
  } else {
    response = await prisma.maintainers.create({
      data: { name, headline, bio, image_id },
    });
  }

  res.status(200).json(response);
}

export default new ApiRoute()
  .get(handleFetchMaintainer)
  .post(
    handleUpdateMaintainer,
    [permissions.ALLOWED_TO_EDIT_MAINTAINER],
    ["name", "headline", "bio", "image_id"]
  )
  .build();
