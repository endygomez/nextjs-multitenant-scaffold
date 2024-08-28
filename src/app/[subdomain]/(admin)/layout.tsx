import type { Metadata } from "next";
import "../../globals.css";

import SideBarLeftMenu from "@/components/ui/layout/SideBarRLeftMenu";
import NavBar from "@/components/ui/layout/NavBar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* <!-- sidebar --> */}
      <SideBarLeftMenu />

      {/* <!-- Main content --> */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <NavBar />
        <div className="p-4">
          {/* <h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>
          <p className="mt-2 text-gray-600">
            This is an example dashboard using Tailwind CSS.
          </p> */}
          {children}
        </div>
      </div>
    </div>
  );
}
