"use client";

import { useUiStore } from "@/stores";
import clsx from "clsx";

// className={clsx(
//   "w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out",
//   {
//     "-translate-x-full": sidebarIsHidden,
//     "translate-x-0": !sidebarIsHidden,
//   }
// )}
export const SideBarLeftMenu = () => {
  const sidebarIsHidden = useUiStore((state) => state.sidebarIsHidden);
  return (
    <div
      className={clsx(
        "w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out",
        {
          "hidden -translate-x-full": sidebarIsHidden,
          "md:flex flex-col translate-x-0": !sidebarIsHidden,
        }
      )}
    >
      <div className="flex items-center justify-center h-12 bg-gray-900">
        <span className="text-white font-bold uppercase">Vendisy</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-gray-800">
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clientes
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Productos
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SideBarLeftMenu;
