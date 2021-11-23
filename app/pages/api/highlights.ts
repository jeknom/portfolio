import { Highlights, Images } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchHighlights(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  let response:
    | (Highlights & { images: Images })
    | (Highlights & { images: Images })[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.highlights.findUnique({
      where: { id: parseInt(id as string) },
      include: { images: true },
    });
  } else {
    response = await prisma.highlights.findMany({
      include: { images: true },
      orderBy: { date: "desc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested highlight.");
  }
}

async function handleCreateHighlight(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, date, image_id } = req.body;
  const createdHighlight = await prisma.highlights.create({
    data: { name, description, date, image_id },
  });

  res.status(200).json(createdHighlight);
}

async function handleUpdateHighlight(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, description, date, image_id } = req.body;
  const updatedHighlight = await prisma.highlights.update({
    where: { id },
    data: { name, description, date, image_id },
  });

  res.status(200).json(updatedHighlight);
}

async function handleDeleteHighlight(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const deletedHighlight = await prisma.highlights.delete({ where: { id } });

  res.status(200).json(deletedHighlight);
}

export default new ApiRoute()
  .get(handleFetchHighlights)
  .put(
    handleCreateHighlight,
    [permissions.ALLOWED_TO_EDIT_HIGHLIGHTS],
    ["name", "description", "date", "image_id"]
  )
  .post(
    handleUpdateHighlight,
    [permissions.ALLOWED_TO_EDIT_HIGHLIGHTS],
    ["id", "name", "description", "date", "image_id"]
  )
  .delete(
    handleDeleteHighlight,
    [permissions.ALLOWED_TO_EDIT_HIGHLIGHTS],
    ["id"]
  )
  .build();
