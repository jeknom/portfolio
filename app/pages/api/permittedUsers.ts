import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";

async function handleFetchPermittedUserEmails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const permittedUserEmails = await prisma.permittedUserEmail.findMany();

  res.status(200).json(permittedUserEmails);
}

async function handleCreatePermittedUserEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;

  const permittedUserEmail = await prisma.permittedUserEmail.create({
    data: { email },
  });

  res.status(200).json(permittedUserEmail);
}

async function handleDeletePermittedUserEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body;
  const deletedUserEmail = await prisma.permittedUserEmail.deleteMany({
    where: { email },
  });

  res.status(200).json(deletedUserEmail);
}

export default new ApiRoute()
  .get(handleFetchPermittedUserEmails, [permissions.ALLOWED_TO_SEE_DASHBOARD])
  .put(
    handleCreatePermittedUserEmail,
    [permissions.ALLOWED_TO_EDIT_USERS],
    ["email"]
  )
  .delete(
    handleDeletePermittedUserEmail,
    [permissions.ALLOWED_TO_EDIT_USERS],
    ["email"]
  )
  .build();
