/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/auth/:path*",
        destination: "/auth/:path*", // Asegúrate de que NextAuth rutas no sean sobreescritas
      },
      {
        source: "/",
        destination: "/api/tenant",
      },
    ];
  },
};

export default nextConfig;
