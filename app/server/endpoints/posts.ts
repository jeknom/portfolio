import { PrismaClient } from "@prisma/client";
import { catchAndLogErrors } from "utils";

export const fetchPostById = async (prisma: PrismaClient, id: string) => {
  const [post] = await catchAndLogErrors(
    prisma.post.findUnique({ where: { id } })
  );

  return post;
};
