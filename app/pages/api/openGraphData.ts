import { OpenGraphData } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchOpenGraphData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const openGraphData = await prisma.openGraphData.findFirst({
    include: {
      images: true,
    },
  });

  if (openGraphData) {
    res.status(200).json(openGraphData);
  } else {
    sendResourceNotFound(res, "Could not find the requested open graph data.");
  }
}

async function handleUpdateOpenGraphData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description, type, image_id } = req.body;
  const openGraphData = await prisma.openGraphData.findFirst();
  let response: OpenGraphData | null = null;

  if (openGraphData) {
    response = await prisma.openGraphData.update({
      where: { id: 1 },
      data: { title, description, type, image_id },
    });
  } else {
    response = await prisma.openGraphData.create({
      data: { title, description, type, image_id },
    });
  }

  res.status(200).json(response);
}

export default new ApiRoute()
  .get(handleFetchOpenGraphData)
  .post(
    handleUpdateOpenGraphData,
    [permissions.ALLOWED_TO_EDIT_OPEN_GRAPH_DATA],
    ["title", "description", "type", "image_id"]
  )
  .build();
