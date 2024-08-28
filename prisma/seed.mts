import { forTenant } from "../src/lib/prisma";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Crear tenants uno por uno y guardar sus IDs
  const tenant1 = await prisma.tenant.create({
    data: { name: "Tenant 1", subdomain: "tenant1" },
  });

  const tenant2 = await prisma.tenant.create({
    data: { name: "Tenant 2", subdomain: "tenant2" },
  });

  const tenantTest = await prisma.tenant.create({
    data: { name: "Test", subdomain: "test" },
  });

  const tenantPrisma1 = prisma.$extends(forTenant(tenant1.id));
  const tenantPrisma2 = prisma.$extends(forTenant(tenant2.id));
  const tenantPrisma3 = prisma.$extends(forTenant(tenantTest.id));

  await tenantPrisma1.user.create({
    data: {
      email: "tenant1@test.com",
      tenantId: tenant1.id,
      emailVerified: new Date("2024-08-27"),
      active: true,
      password: bcryptjs.hashSync("123456"),
    },
  });

  await tenantPrisma2.user.create({
    data: {
      email: "tenant2@test.com",
      tenantId: tenant2.id,
      emailVerified: new Date("2024-08-27"),
      active: true,
      password: bcryptjs.hashSync("123456"),
    },
  });

  await tenantPrisma3.user.create({
    data: {
      email: "test@test.com",
      tenantId: tenantTest.id,
      emailVerified: new Date("2024-08-27"),
      active: true,
      password: bcryptjs.hashSync("123456"),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
