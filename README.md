# Agregar nueva tabla de BD a contexto Multitenant (Prisma)

### 0. Model Tenant inicial

```
model Tenant {
  id String @id @default(cuid())
  name String
  subdomain String @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  User User[]
}
```

### 1. Agregar en el archivo schema.prisma el modelo de la tabla

##### Tener en cuenta la importancia de la línea tenantId

Ejm:

```
model User {
  id         String   @id @default(cuid())
  first_name String?
  last_name  String?
  email      String   @unique
  active     Boolean  @default(false)
  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  tenantId   String   @default(dbgenerated("(current_setting('app.current_tenant_id'::text))::text"))
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

```

### 2. Ejecutar la migración en modo "solo creación"

```
npx prisma migrate dev --create-only
```

### 3. Modificar archivo de migración para agregar las reglas de ROW LEVEL SECURITY

```
#./prisma/migrations/[migration]/[migration].sql
# Agregar las reglas de RLS

--- Enable RLS on the User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

--- Create a policy for tenant isolation
CREATE POLICY tenant_isolation_policy ON "User" USING ("tenantId" = current_setting('app.current_tenant_id')::text);

---Create a bypass RLS policy (for admin purposes)
CREATE POLICY bypass_rls_policy ON "User" USING (current_setting('app.bypass_rls', true)::text = 'on');
```

### 4. Ejecutar la migración

```
npx prisma migrate deploy
```

### 5. Crear usuario app_user con permisos sobre la aplicación

```
CREATE ROLE app_user LOGIN PASSWORD '123456';
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

### 6. Consultar directamente en la BD

```
psql -h localhost -p 5439 -U app_user -d bd_name

# Consultar UUID de Tenant
SELECT * FROM "Tenant";

# Establecer el Tenant actual
SET app.current_tenant_id = '47ac2fc1-05f4-46f0-af8f-dff12e4db374';

# Consultar tablas
SELECT * FROM "User";
```

### 7. Typescript test script

```
import { prisma } from “../src/config”;
import { bypassRLS, forTenant } from "../src/config/prismaClient";

async function main() {
 const tenantPrisma = prisma.$extends(forTenant(1));
 const tenantUsers = await tenantPrisma.user.findMany();
 console.log("Users for Tenant 1:", tenantUsers);

 const tenantPrisma2 = prisma.$extends(forTenant(2));
 const tenantUsers2 = await tenantPrisma2.user.findMany();
 console.log("Users for Tenant 2:", tenantUsers2);
}

await main();
```

### Notas

1. El usuario de la aplicación debe ser app_user y no postgres, ya que postgres es un usuario administrador al que no le aplican las restricciones de consulta por tenantId, mientras que app_user en sus consultas/modificaciones en bd debe siempre quedar establecido el tenantId requerido.

2. Cada vez que agregué una nueva tabla de BD a la que le aplique la restricción de tenant ID debe actualizar el archivo de migración para agregar las reglas de RLS para el usuario app_user.

3. En el archivo .env se encuentran dos variables de BD: DATABASE_URL y DIRECT_URL, donde la primera hace referencia a la conexión utilizada para la aplicación con un usuario con limitaciones como app_user y la segunda hace referencia a la conexión utilizada para las migraciones, las cuales requieren de un usuario administrativo.
