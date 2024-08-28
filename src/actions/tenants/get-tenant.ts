"use server";

import prisma from "@/lib/prisma";

export const getTenant = async (subdomain: string): Promise<any> => {
  const tenant = await prisma.tenant.findUnique({
    where: { subdomain },
  });
  return tenant;
};
