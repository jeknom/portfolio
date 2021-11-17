import { Video } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchVideos(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  let response: Video | Video[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.video.findUnique({
      where: { id: parseInt(id as string) },
    });
  } else {
    response = await prisma.video.findMany({
      orderBy: { description: "asc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested video.");
  }
}

async function handleCreateVideo(req: NextApiRequest, res: NextApiResponse) {
  const { url, description } = req.body;
  const createdVideo = await prisma.video.create({
    data: { url, description },
  });

  res.status(200).json(createdVideo);
}

async function handleUpdateVideo(req: NextApiRequest, res: NextApiResponse) {
  const { id, url, description } = req.body;
  const updatedVideo = await prisma.video.update({
    where: { id },
    data: { url, description },
  });

  res.status(200).json(updatedVideo);
}

async function handleDeleteVideo(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const deletedVideo = await prisma.video.delete({ where: { id } });

  res.status(200).json(deletedVideo);
}

export default new ApiRoute()
  .get(handleFetchVideos)
  .put(
    handleCreateVideo,
    [permissions.ALLOWED_TO_EDIT_MEDIA],
    ["url", "description"]
  )
  .post(
    handleUpdateVideo,
    [permissions.ALLOWED_TO_EDIT_MEDIA],
    ["id", "url", "description"]
  )
  .delete(handleDeleteVideo, [permissions.ALLOWED_TO_EDIT_MEDIA], ["id"])
  .build();
