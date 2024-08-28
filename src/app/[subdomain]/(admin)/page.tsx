import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { getTenant } from "@/actions/tenants/get-tenant";

export default async function SubdomainPage({
  params,
}: {
  params: { subdomain: string };
}) {
  const { subdomain } = params;
  console.log("SubdomainPage: Rendering page for subdomain:", subdomain);
  const session = await auth();

  let tenant;

  try {
    // tenant = await prisma.tenant.findUnique({
    //   where: { subdomain },
    // });
    tenant = await getTenant(subdomain);
    console.log("SubdomainPage: Tenant retrieved:", tenant);
  } catch (error) {
    console.error("SubdomainPage: Error fetching tenant:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold text-red-500">Error</h1>
        <p>Hay un error cargando la información del Tenant</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  // Redireccionar a 404 si el tenant no se encuentra
  if (!tenant) {
    console.log("SubdomainPage: Tenant not found, redirecting to 404");
    notFound();
  }

  // Redireccionar a login si no hay sesión
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Bienvenid@ {tenant.name}</h1>
      <p>Esto es el sitio MultiTenant de {subdomain}</p>
      <pre>{JSON.stringify(tenant, null, 2)}</pre>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
