-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('basic', 'premium', 'free');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'expired', 'unsubscribed');

-- CreateTable Tenant
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "tenant_id" TEXT NOT NULL DEFAULT (current_setting('app.current_tenant_id'::text))::text,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);


-- CreateTable Suscription
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL DEFAULT (current_setting('app.current_tenant_id'::text))::text,
    "type" "SubscriptionType" NOT NULL DEFAULT 'free',
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'unsubscribed',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);



--- Enable RLS on the User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

--- Create a policy for tenant isolation
CREATE POLICY tenant_isolation_policy ON "User" USING ("tenant_id" = current_setting('app.current_tenant_id')::text);

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "User" USING (current_setting('app.bypass_rls', true)::text = 'on');

--- Enable RLS on the User table
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" FORCE ROW LEVEL SECURITY;

--- Create a policy for tenant isolation
CREATE POLICY tenant_isolation_policy ON "Subscription" USING ("tenant_id" = current_setting('app.current_tenant_id')::text);

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "Subscription" USING (current_setting('app.bypass_rls', true)::text = 'on');

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_subdomain_key" ON "Tenant"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Init user
DROP ROLE IF EXISTS app_user;
-- Crear el rol 'app_user' y establecer su contraseña
CREATE ROLE app_user LOGIN PASSWORD '123456';

-- Otorgar permisos de uso del esquema 'public' al rol 'app_user'
GRANT USAGE ON SCHEMA public TO app_user;

-- Otorgar permisos de SELECT, INSERT, UPDATE y DELETE en todas las tablas del esquema 'public' al rol 'app_user'
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;

-- Otorgar permisos de uso y SELECT en todas las secuencias del esquema 'public' al rol 'app_user'
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
