"use client";

import React from "react";
import { SideBarRightMenu } from "./SideBarRightMenu";
import { useUiStore } from "@/stores";

const NavBar = () => {
  const sidebarIsHidden = useUiStore((state) => state.sidebarIsHidden);
  const showSidebar = useUiStore((state) => state.showSidebar);
  const hideSidebar = useUiStore((state) => state.hideSidebar);

  const changeSidebarStatus = () => {
    if (sidebarIsHidden) {
      hideSidebar();
    } else {
      showSidebar();
    }
  };

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
      <div className="flex items-center px-4 h-12">
        <button
          className="text-gray-500 focus:outline-none focus:text-gray-700"
          onClick={changeSidebarStatus}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center pr-4">
        <SideBarRightMenu />
      </div>
    </div>
  );
};

export default NavBar;
