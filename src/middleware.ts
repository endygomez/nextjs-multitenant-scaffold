import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)"],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let hostname = req.headers.get("host") || "";

  // Remove port if it exists
  hostname = hostname.split(":")[0];

  // Define allowed domains (including main domain and localhost)
  const allowedDomains = ["tudominio.ar", "www.tudominio.ar", "localhost"];

  // Check if the current hostname is in the list of allowed domains
  const isMainDomain = allowedDomains.includes(hostname);

  // Extract subdomain if not a main domain
  const subdomain = isMainDomain ? null : hostname.split(".")[0];

  console.log("Middleware: Hostname:", hostname);
  console.log("Middleware: Subdomain:", subdomain);

  // If it's a main domain, allow the request to proceed
  if (isMainDomain) {
    console.log("Middleware: Main domain detected, passing through");
    return NextResponse.next();
  }

  // Handle subdomain logic
  if (subdomain) {
    try {
      // Use fetch to verify if the subdomain exists
      const response = await fetch(
        `${url.origin}/api/tenant?subdomain=${subdomain}`
      );

      if (response.ok) {
        console.log("Middleware: Valid subdomain detected, rewriting URL");

        // Parse the response to extract the tenant ID
        const tenant = await response.json();
        const res = NextResponse.rewrite(
          new URL(`/${subdomain}${url.pathname}`, req.url)
        );

        // Set the cookie with the tenant ID
        res.cookies.set("tenantId", tenant.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });

        return res;
      }
    } catch (error) {
      console.error("Middleware: Error fetching tenant:", error);
    }
  }

  console.log("Middleware: Invalid subdomain or domain, returning 404");

  return new NextResponse(
    `<html>
      <head><title>404 - Not Found</title></head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The domain or subdomain you are trying to access does not exist.</p>
        <a href="http://${url.host}">Go to root</a>
      </body>
    </html>`,
    { status: 404, headers: { "Content-Type": "text/html" } }
  );
}
