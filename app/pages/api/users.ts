import { User, UserPermission } from ".prisma/client";
import { permissions as constPermissions } from "@constants/index";
import ApiRoute from "lib/ApiRoute";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "server/prismaClient";
import { sendBadRequest, sendResourceNotFound } from "utils/requestUtils";

async function handleFetchUsers(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  let response:
    | (User & { UserPermission: UserPermission[] })
    | (User & { UserPermission: UserPermission[] })[];
  if (id && id !== "undefined" && id !== "") {
    response = await prisma.user.findFirst({
      include: { UserPermission: true },
      where: { id },
    });
  } else {
    response = await prisma.user.findMany({
      include: { UserPermission: true },
      orderBy: { name: "asc" },
    });
  }

  if (response) {
    res.status(200).json(response);
  } else {
    sendResourceNotFound(res, "Could not find the requested user(s).");
  }
}

async function handleUpdateUserPermissions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, permissions } = req.body;
  const session = await getSession({ req });
  const requesterPermissions = session?.user?.permissions;
  const isAdmin = requesterPermissions.includes(constPermissions.ADMIN);

  if (!isAdmin) {
    for (let permission of permissions) {
      if (!requesterPermissions.includes(permission)) {
        sendBadRequest(
          res,
          "You do not have the required permissions for this request."
        );

        return;
      }
    }
  }

  const updatedPermissions = await prisma.$transaction([
    prisma.userPermission.deleteMany({
      where: { userId: id },
    }),
    prisma.userPermission.createMany({
      data: permissions.map((p: string) => ({ userId: id, permission: p })),
    }),
  ]);

  res.status(200).json(updatedPermissions);
}

export default new ApiRoute()
  .get(handleFetchUsers, [constPermissions.ALLOWED_TO_SEE_DASHBOARD])
  .post(
    handleUpdateUserPermissions,
    [constPermissions.ALLOWED_TO_EDIT_USERS],
    ["id", "permissions"]
  )
  .build();
