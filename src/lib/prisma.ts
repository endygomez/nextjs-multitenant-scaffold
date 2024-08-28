import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export function bypassRLS() {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            const [, result] = await prisma.$transaction([
              prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
              query(args),
            ]);
            return result;
          },
        },
      },
    })
  );
}

export function forTenant(tenantId: string) {
  return Prisma.defineExtension((prisma) =>
    prisma.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            const [, result] = await prisma.$transaction([
              prisma.$executeRaw`SELECT set_config('app.current_tenant_id', ${tenantId}::text, TRUE)`,
              query(args),
            ]);
            console.log("Current Tenant ID:", tenantId);
            return result;
          },
        },
      },
    })
  );
}

const prisma =
  global.prisma ||
  new PrismaClient({
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
