import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "server/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

const isDebugEnabled = process.env.DEBUG === "true";

async function fillUserPermissions(
  session: Session,
  user: User
): Promise<Session> {
  const userPermissions = await prisma.userPermission.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
  });

  session.user.permissions = userPermissions.map((p) => p.permission);

  return session;
}

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  debug: isDebugEnabled,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isFirstUser = (await prisma.user.count()) === 0;
      const permittedEmail = await prisma.permittedUserEmail.findFirst({
        where: { email: email as string },
      });

      if (isFirstUser || permittedEmail) {
        return true;
      }

      return "/unauthorized";
    },
    async session({ session, user }) {
      const sessionWithPermissions = await fillUserPermissions(session, user);
      return sessionWithPermissions;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
