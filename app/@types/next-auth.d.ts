import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string;
      email: string;
      image: string;
      permissions?: string[];
    };
  }
}
