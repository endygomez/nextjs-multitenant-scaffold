import NextAuth, { type NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { z } from "zod";
import bcryptjs from "bcryptjs";

import prisma, { forTenant } from "@/lib/prisma";
import { generateRandomKey } from "@/utils";
import { cookies } from "next/headers";

const authenticatedRoutes = [""];

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       domain: ".localhost:*", // Asegúrate de que el dominio principal esté configurado aquí
  //       path: "/",
  //       secure: true,
  //     },
  //   },
  // },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      /*  */
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token, user }: any) {
      //Cambiar esta funcionalidad cuando se crea la sesión:
      // analizar el token, ir a la BD, establecer si el usuario esta activo, tiene roles, etc
      session.user = token.data as any;
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (
          !profile?.email_verified! ||
          !profile?.email?.endsWith("@gmail.com")
        ) {
          return false;
        }

        const cookiesStore = cookies();
        const tenantId = cookiesStore.get("tenantId")!.value;
        const tenantPrisma = prisma.$extends(forTenant(tenantId));

        const user = await tenantPrisma.user.findUnique({
          where: { email: profile.email },
        });

        console.log(user);
        console.log(tenantId);

        if (!user) {
          const resp = await prisma.user.create({
            data: {
              email: profile.email.toLowerCase(),
              password: bcryptjs.hashSync(generateRandomKey(12)),
              emailVerified: new Date(),
              role: "user",
            },
            select: {
              id: true,
              //name: true,
              email: true,
              emailVerified: true,
              role: true,
            },
          });

          console.log({ resp });
        }
      }
      return true;
    },
  },
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // buscar el correo
        const cookiesStore = cookies();
        const tenantId = cookiesStore.get("tenantId")!.value;
        const tenantPrisma = prisma.$extends(forTenant(tenantId));

        const user = await tenantPrisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        console.log(user);
        console.log(tenantId);

        if (!user) return null;

        // comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
