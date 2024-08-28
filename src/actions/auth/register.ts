"use server";

import prisma, { forTenant } from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";

export const registerUser = async (email: string, password: string) => {
  try {
    const cookiesStore = cookies();
    const tenantId = cookiesStore.get("tenantId")!.value;
    const tenantPrisma = prisma.$extends(forTenant(tenantId));

    const user = await tenantPrisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
