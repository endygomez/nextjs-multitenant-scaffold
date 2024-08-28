"use client";

import { useState } from "react";

export const HeroSection = () => {
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error

  const handleIngressToWorkspace = () => {
    if (!subdomain) {
      setError("Por favor, ingresa el nombre de tu espacio de trabajo.");
      return;
    }
    setError(""); // Limpiar el error si se ha ingresado un subdominio
    //console.log("Prueba");
    //window.location.href = `http://localhost:3000/auth/new-account?subdomain=${subdomain}`;
    window.location.href = `http://${subdomain}.localhost:3000`;
  };

  return (
    <div className="dark:bg-gray-800 bg-white">
      <div className="dark:bg-transparent">
        <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
          <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-gray-800 dark:text-white font-black leading-10">
              Vender &nbsp;
              <span className="text-violet-800 dark:text-violet-500">
                fácil y rápido,&nbsp;
              </span>
              es posible.
            </h1>
            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-600 dark:text-gray-300 font-normal text-center text-xl">
              Gestiona tus pedidos de forma ágil y sencilla.
            </p>
          </div>
          <div className="flex rounded-md justify-start">
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
          <div className="flex w-11/12 md:w-8/12 xl:w-6/12">
            <div className="flex flex-col w-full">
              <div className="flex rounded-md justify-center">
                <input
                  id="q"
                  type="text"
                  name="q"
                  aria-label="Prueba"
                  value={subdomain}
                  required
                  autoComplete="off"
                  className="w-3/5 p-3 rounded-md rounded-r-none border-2 border-gray-300 
             placeholder-gray-500 placeholder-opacity-50 dark:bg-gray-500  
             dark:text-gray-300 dark:border-none"
                  placeholder="Nombre de su espacio de trabajo"
                  onChange={(e) => setSubdomain(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleIngressToWorkspace}
                  className="inline-flex items-center gap-2 bg-violet-700 text-white text-lg font-semibold py-3 px-6 rounded-r-md"
                >
                  <span>Ingresar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
