import NextAuth, { DefaultSession } from "next-auth";

type Role = "admin" | "user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      tenantId: string;
      firstName: string;
      lastName: string;
      email: string;
      emailVerified?: Date;
      role?: Role;
      image?: string;
      token?: string;
    } & DefaultSession["user"];
  }
}
