import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/internals/utils";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "server/prismaClient";

const isDebugEnabled = process.env.DEBUG === "true";

async function fillUserPermissions(
  session: Session,
  user: User
): Promise<Session> {
  const userPermissions = await prisma.permission.findMany({
    where: {
      userPermission: {
        some: {
          user: {
            id: user.id,
          },
        },
      },
    },
  });

  session.user.permissions = userPermissions.map((p) => p.key);

  return session;
}

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  debug: isDebugEnabled,
  callbacks: {
    async session(session, user) {
      return await fillUserPermissions(session, user);
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
