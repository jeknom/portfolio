import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "server/prismaClient";

const isDebugEnabled = process.env.DEBUG === "true";
const authSecret = require("../../../secrets/auth-secret.json");
const { client_id, client_secret } = authSecret.web;
const options: NextAuthOptions = {
  providers: [
    Providers.Google({ clientId: client_id, clientSecret: client_secret }),
  ],
  adapter: PrismaAdapter(prisma),
  debug: isDebugEnabled,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
