import { Achievements, Images } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchAchievements(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  let response:
    | (Achievements & { images: Images })
    | (Achievements & { images: Images })[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.achievements.findUnique({
      where: { id: parseInt(id as string) },
      include: { images: true },
    });
  } else {
    response = await prisma.achievements.findMany({
      include: { images: true },
      orderBy: { startDate: "desc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested achievement.");
  }
}

async function handleCreateAchievement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, subtitle, image_id, startDate, endDate } = req.body;

  const createdAchievement = await prisma.achievements.create({
    data: { title, subtitle, image_id, startDate, endDate },
  });

  res.status(200).json(createdAchievement);
}

async function handleUpdateAchievement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title, subtitle, image_id, startDate, endDate } = req.body;

  const updatedAchievement = await prisma.achievements.update({
    where: { id },
    data: { title, subtitle, image_id, startDate, endDate },
  });

  res.status(200).json(updatedAchievement);
}

async function handleDeleteAchievement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const deletedAchievement = await prisma.achievements.delete({
    where: { id },
  });

  res.status(200).json(deletedAchievement);
}

export default new ApiRoute()
  .get(handleFetchAchievements)
  .put(
    handleCreateAchievement,
    [permissions.ALLOWED_TO_EDIT_ACHIEVEMENTS],
    ["title", "subtitle", "image_id", "startDate"]
  )
  .post(
    handleUpdateAchievement,
    [permissions.ALLOWED_TO_EDIT_ACHIEVEMENTS],
    ["id", "title", "subtitle", "image_id", "startDate"]
  )
  .delete(
    handleDeleteAchievement,
    [permissions.ALLOWED_TO_EDIT_ACHIEVEMENTS],
    ["id"]
  )
  .build();
