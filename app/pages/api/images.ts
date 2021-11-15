import { Images } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchImages(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  let response: Images | Images[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.images.findUnique({
      where: { id: parseInt(id as string) },
    });
  } else {
    response = await prisma.images.findMany({
      orderBy: { description: "asc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested image.");
  }
}

async function handleCreateImage(req: NextApiRequest, res: NextApiResponse) {
  const { path, description } = req.body;
  const createdImage = prisma.images.create({ data: { path, description } });

  res.status(200).json(createdImage);
}

async function handleUpdateImage(req: NextApiRequest, res: NextApiResponse) {
  const { id, path, description } = req.body;
  const updatedImage = prisma.images.update({
    where: { id },
    data: { path, description },
  });

  res.status(200).json(updatedImage);
}

async function handleDeleteImage(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const deletedImage = prisma.images.delete({ where: { id } });

  res.status(200).json(deletedImage);
}

export default new ApiRoute()
  .get(handleFetchImages)
  .put(handleCreateImage, [permissions.ALLOWED_TO_EDIT_IMAGES], ["path"])
  .post(handleUpdateImage, [permissions.ALLOWED_TO_EDIT_IMAGES], ["id", "path"])
  .delete(handleDeleteImage, [permissions.ALLOWED_TO_EDIT_IMAGES], ["id"])
  .build();
