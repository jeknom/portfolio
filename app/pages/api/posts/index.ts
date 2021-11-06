import { permissions } from "@constants/index";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prismaClient";
import { sendResourceNotFound, ApiRoute } from "utils/requestUtils";

async function handleFetchPosts(res: NextApiResponse) {
  const posts = await prisma.post.findMany();

  res.status(200).json(posts);
}

async function handleCreatePost(req: NextApiRequest, res: NextApiResponse) {
  const { title, content } = req.body;
  const createdPost = await prisma.post.create({ data: { title, content } });

  res.status(200).json(createdPost);
}

async function handleUpdatePost(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, content } = req.body;
  const postToUpdate = await prisma.post.findUnique({ where: { id } });
  if (!postToUpdate) {
    sendResourceNotFound(res);
  } else {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.status(200).json(updatedPost);
  }
}

async function handleDeletePost(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const postToDelete = await prisma.post.findUnique({ where: { id } });
  if (!postToDelete) {
    sendResourceNotFound(res);
  } else {
    const deletedPost = await prisma.post.delete({ where: { id } });
    res.status(200).json(deletedPost);
  }
}

export default new ApiRoute()
  .get((req, res) => handleFetchPosts(res), [permissions.ALLOWED_TO_SEE_POSTS])
  .put(
    handleCreatePost,
    [permissions.ALLOWED_TO_EDIT_POSTS],
    ["title", "content"]
  )
  .post(
    handleUpdatePost,
    [permissions.ALLOWED_TO_EDIT_POSTS],
    ["id", "title", "content"]
  )
  .delete(handleDeletePost, [permissions.ALLOWED_TO_EDIT_POSTS], ["id"])
  .build();
