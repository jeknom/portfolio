import { Skills, Images } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchSkills(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  let response: (Skills & { images: Images }) | (Skills & { images: Images })[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.skills.findUnique({
      where: { id: parseInt(id as string) },
      include: { images: true },
    });
  } else {
    response = await prisma.skills.findMany({
      include: { images: true },
      orderBy: { score: "desc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested skill(s).");
  }
}

async function handleCreateSkill(req: NextApiRequest, res: NextApiResponse) {
  const { name, score, icon_id } = req.body;
  const createdSkill = await prisma.skills.create({
    data: { name, score, icon_id },
  });

  res.status(200).json(createdSkill);
}

async function handleUpdateSkill(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, score, icon_id } = req.body;
  const updatedSkill = await prisma.skills.update({
    where: { id },
    data: { name, score, icon_id },
  });

  res.status(200).json(updatedSkill);
}

async function handleDeleteSkill(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const deletedSkill = await prisma.skills.delete({ where: { id } });

  res.status(200).json(deletedSkill);
}

export default new ApiRoute()
  .get(handleFetchSkills)
  .put(
    handleCreateSkill,
    [permissions.ALLOWED_TO_EDIT_SKILLS],
    ["name", "score", "icon_id"]
  )
  .post(
    handleUpdateSkill,
    [permissions.ALLOWED_TO_EDIT_SKILLS],
    ["id", "name", "score", "icon_id"]
  )
  .delete(handleDeleteSkill, [permissions.ALLOWED_TO_EDIT_SKILLS], ["id"])
  .build();
