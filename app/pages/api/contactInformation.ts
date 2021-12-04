import { ContactInformation, Images } from ".prisma/client";
import { permissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound } from "utils/requestUtils";

async function handleFetchContactInformation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  let response:
    | (ContactInformation & {
        image: Images;
      })
    | (ContactInformation & {
        image: Images;
      })[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.contactInformation.findUnique({
      where: { id: parseInt(id as string) },
      include: { image: true },
    });
  } else {
    response = await prisma.contactInformation.findMany({
      include: { image: true },
      orderBy: { name: "asc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(
      res,
      "Could not find the requested contact information."
    );
  }
}

async function handleCreateContactInformation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, link, imageId } = req.body;
  const createdContactInformation = await prisma.contactInformation.create({
    data: { name, link, imageId },
  });

  res.status(200).json(createdContactInformation);
}

async function handleUpdateContactInformation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, link, imageId } = req.body;
  const updatedContactInformation = await prisma.contactInformation.update({
    where: { id },
    data: { name, link, imageId },
  });

  res.status(200).json(updatedContactInformation);
}

async function handleDeleteContactInformation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  const deletedContactInformation = await prisma.contactInformation.delete({
    where: { id },
  });

  res.status(200).json(deletedContactInformation);
}

export default new ApiRoute()
  .get(handleFetchContactInformation)
  .put(
    handleCreateContactInformation,
    [permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION],
    ["name", "link", "imageId"]
  )
  .post(
    handleUpdateContactInformation,
    [permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION],
    ["id", "name", "link", "imageId"]
  )
  .delete(
    handleDeleteContactInformation,
    [permissions.ALLOWED_TO_EDIT_CONTACT_INFORMATION],
    ["id"]
  )
  .build();
