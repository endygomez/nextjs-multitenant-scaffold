"use server";

import { auth } from "@/auth.config";
import { Tenant } from "@/lib/interfaces";
import { revalidatePath, revalidateTag } from "next/cache";

const getSession = async () => await auth();

export const addTenant = async (tenant: Tenant): Promise<Tenant> => {
  const session = await getSession();
  const body = { name: tenant.name };

  const data = await fetch(`${process.env.BACKEND_URL}/brand`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());

  revalidateTag("brands");
  return data;
};
