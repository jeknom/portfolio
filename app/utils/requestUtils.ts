import { NextApiResponse } from "next";

export const sendResourceNotFound = (
  res: NextApiResponse,
  error: string = "The requested resource does not exist"
) => {
  console.warn(error);
  res.status(404).json({ code: 404, error });
};

export const sendBadRequest = (
  res: NextApiResponse,
  error: string = "Bad request"
) => {
  console.warn(error);
  res.status(400).json({ code: 400, error });
};
