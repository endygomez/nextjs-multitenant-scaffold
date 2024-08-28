import { signOut } from "next-auth/react";
import React from "react";

const Logout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <span className="group-hover:text-gray-700">Cerrar Sesión</span>
    </button>
  );
};

export default Logout;
