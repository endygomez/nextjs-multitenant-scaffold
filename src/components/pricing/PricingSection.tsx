import React from "react";

export default function PricingSection() {
  return (
    <section className="py-6 leading-7 text-gray-900 bg-white sm:py-12 md:py-16">
      <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-0 max-w-7xl">
        <div className="flex flex-col items-center leading-7 text-center text-gray-900 border-0 border-gray-200">
          <h2
            id="pricing"
            className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl"
          >
            Precios claros y sencillos
          </h2>
          <p className="box-border mt-2 text-xl text-gray-900 border-solid sm:text-2xl"></p>
        </div>

        <div
          id="pricing"
          className="grid grid-cols-1 gap-4 mt-4 leading-7 text-gray-900 border-0 border-gray-200 sm:mt-6 sm:gap-6 md:mt-8 md:gap-0 lg:grid-cols-2"
        >
          {/* Plan Emprendedor */}
          <div className="relative z-10 flex flex-col items-center max-w-md p-4 mx-auto my-0 border border-solid rounded-lg lg:-mr-3 sm:my-0 sm:p-6 md:my-8 md:p-8 hover:shadow-lg hover:border-blue-600 transition-all duration-300 ease-in-out">
            <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-3xl md:text-4xl">
              Emprendedor 💜
            </h3>
            <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
              <p className="box-border m-0 text-6xl font-semibold leading-none border-solid">
                $29.900
              </p>
              <p
                className="box-border m-0 border-solid"
                style={{ borderImage: "initial" }}
              >
                / Mes
              </p>
            </div>
            <ul className="flex-1 w-full p-0 mt-4 ml-5 leading-7 text-gray-900 border-0 border-gray-200">
              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                <span>✅</span> Facturas de Venta ilimitadas
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                <span>✅</span> Armar Pedidos
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ 1 usuario con acceso
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ Ingresos hasta $ 10.000.000 COP / Mes
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ 1 bódega de inventario
              </li>
            </ul>
            <a
              href="#"
              className="inlineFlex justify-center w-full px-4 py-3 mt-8 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-blue-600 rounded-md cursor-pointer hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700 focus-within:text-white sm:text-base md:text-lg"
            >
              Prueba Gratis
            </a>
          </div>

          {/* Plan PyMe */}
          <div className="relative z-20 flex flex-col items-center max-w-md p-4 mx-auto my-0 bg-white border-4 border-blue-600 border-solid rounded-lg sm:p-6 md:px-8 md:py-16 hover:shadow-lg hover:border-blue-700 transition-all duration-300 ease-in-out">
            <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-3xl md:text-4xl">
              PyMe 🚀
            </h3>
            <span className="text-xs"> Recomendado</span>
            <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
              <p className="box-border m-0 text-6xl font-semibold leading-none border-solid">
                $59.900
              </p>
              <p
                className="box-border m-0 border-solid"
                style={{ borderImage: "initial" }}
              >
                / Mes
              </p>
            </div>
            <ul className="flex-1 w-full p-0 mt-4 ml-5 leading-7 text-gray-900 border-0 border-gray-200">
              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                <span>✅</span> Facturas de Venta ilimitadas
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ 2 usuarios con acceso
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ Ingresos hasta 40.000.000 COP mensuales
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ 2 bódegas de inventario
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ Soporte en todo momento
              </li>

              <li className="inlineFlex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid">
                ✅ Acceso a nuevas funcionalidades
              </li>
            </ul>

            <a
              href="#"
              className="inlineFlex justify-center w-full px-4 py-3 mt-8 font-sans text-sm leading-none text-center text-white no-underline bg-blue-600 border rounded-md cursor-pointer hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700 focus-within:text-white sm:text-base md:text-lg"
            >
              Prueba Gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
