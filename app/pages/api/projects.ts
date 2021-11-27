import {
  Project,
  Images,
  Video,
  ProjectImage,
  ProjectVideo,
} from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendBadRequest, sendResourceNotFound } from "utils/requestUtils";

async function handleFetchProjects(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  let response:
    | (Project & {
        projectImages: (ProjectImage & {
          image: Images;
        })[];
        projectVideos: (ProjectVideo & {
          video: Video;
        })[];
      })
    | (Project & {
        projectImages: (ProjectImage & {
          image: Images;
        })[];
        projectVideos: (ProjectVideo & {
          video: Video;
        })[];
      })[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.project.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        projectImages: { include: { image: true } },
        projectVideos: { include: { video: true } },
      },
    });
  } else {
    response = await prisma.project.findMany({
      include: {
        projectImages: { include: { image: true } },
        projectVideos: { include: { video: true } },
      },
      orderBy: { date: "desc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested project(s).");
  }
}

async function handleCreateProject(req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    description,
    content,
    date,
    projectImages,
    projectVideos,
  }: {
    name: string;
    description: string;
    content: string;
    date: Date;
    projectImages: { imageId: number; priority: number }[];
    projectVideos: { videoId: number; priority: number }[];
  } = req.body;
  const createdProject = await prisma.project.create({
    data: { name, description, content, date },
  });
  const { id } = createdProject;
  const createdMedia = await prisma.$transaction([
    ...projectImages.map((i) =>
      prisma.projectImage.create({
        data: { imageId: i.imageId, projectId: id, priority: i.priority },
      })
    ),
    ...projectVideos.map((v) =>
      prisma.projectVideo.create({
        data: { videoId: v.videoId, projectId: id, priority: v.priority },
      })
    ),
  ]);

  res.status(200).json({
    project: createdProject,
    media: createdMedia,
  });
}

async function handleUpdateProject(req: NextApiRequest, res: NextApiResponse) {
  const {
    id,
    name,
    description,
    content,
    date,
    projectImages,
    projectVideos,
  }: {
    id: number;
    name: string;
    description: string;
    content: string;
    date: Date;
    projectImages: { imageId?: number; priority: number }[];
    projectVideos: { videoId?: number; priority: number }[];
  } = req.body;
  const updatedProject = await prisma.project.update({
    where: { id },
    data: { name, description, content, date },
  });

  const updatedMedia = await prisma.$transaction([
    prisma.projectImage.deleteMany({ where: { projectId: id } }),
    prisma.projectVideo.deleteMany({ where: { projectId: id } }),
    ...projectImages.map((i) =>
      prisma.projectImage.create({
        data: { imageId: i.imageId, projectId: id, priority: i.priority },
      })
    ),
    ...projectVideos.map((v) =>
      prisma.projectVideo.create({
        data: { videoId: v.videoId, projectId: id, priority: v.priority },
      })
    ),
  ]);

  res.status(200).json({
    project: updatedProject,
    updatedMedia,
  });
}

async function handleDeleteProject(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  const deletedData = await prisma.$transaction([
    prisma.projectImage.deleteMany({ where: { projectId: id } }),
    prisma.projectVideo.deleteMany({ where: { projectId: id } }),
    prisma.project.delete({ where: { id } }),
  ]);

  res.status(200).json(deletedData);
}

export default new ApiRoute()
  .get(handleFetchProjects)
  .put(
    handleCreateProject,
    [permissions.ALLOWED_TO_EDIT_PROJECTS],
    ["name", "description", "content", "date", "projectImages", "projectVideos"]
  )
  .post(
    handleUpdateProject,
    [permissions.ALLOWED_TO_EDIT_PROJECTS],
    [
      "id",
      "name",
      "description",
      "content",
      "date",
      "projectImages",
      "projectVideos",
    ]
  )
  .delete(handleDeleteProject, [permissions.ALLOWED_TO_EDIT_PROJECTS], ["id"])
  .build();
