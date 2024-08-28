import React from "react";

export const ShowcaseSection = () => {
  return (
    <section
      id="new-features"
      className="w-full py-8 bg-white sm:py-10 lg:py-16"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
            Aumente su productividad
          </h2>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
            Mejore su flujo de venta con funciones avanzadas
          </p>
        </div>
        <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 xl:mt-24">
          {/* <!-- Feature 1: Trabajamos para ti --> */}
          <div className="md:p-8 lg:p-14 flex flex-col justify-center items-center">
            <div className="w-14 h-14 rounded-full bg-orange-200 flex justify-center items-center">
              <i className="fa-solid fa-rocket text-3xl text-gray-900"></i>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900">
              Trabajamos para ti
            </h3>
            <p className="mt-5 text-base text-gray-600">
              Nuestra plataforma se actualiza con frecuencia con nuevas
              funcionalidades enfocadas a mejorar tu gestión de ventas.
            </p>
          </div>

          {/* <!-- Feature 2: Prepara tus pedidos --> */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 flex flex-col justify-center items-center">
            <div className="w-14 h-14 rounded-full bg-teal-200 flex justify-center items-center">
              <i className="fa-solid fa-truck-fast text-3xl text-gray-900"></i>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900">
              Prepara tus pedidos
            </h3>
            <p className="mt-5 text-base text-gray-600">
              Facilitamos el armado de tus pedidos de manera rápida y cómoda.
              Evita el error humano.
            </p>
          </div>

          {/* <!-- Feature 3: Accede en todo momento --> */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 flex flex-col justify-center items-center">
            <div className="w-14 h-14 rounded-full bg-red-200 flex justify-center items-center">
              <i className="fa-solid fa-cloud text-3xl text-gray-900"></i>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900">
              Accede en todo momento
            </h3>
            <p className="mt-5 text-base text-gray-600">
              Su información se encuentra disponible en la nube en todo momento.
              Accede al sistema cuando lo necesites.
            </p>
          </div>

          {/* <!-- Feature 4: Seguimiento --> */}
          <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200 flex flex-col justify-center items-center">
            <div className="w-14 h-14 rounded-full bg-purple-200 flex justify-center items-center">
              <i className="fa-solid fa-chart-column text-3xl text-gray-900"></i>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900">
              Seguimiento
            </h3>
            <p className="mt-5 text-base text-gray-600">
              Observa en todo momento tus ventas del día, de la semana y el mes.
              Obtenga información valiosa para tomar mejores decisiones.
            </p>
          </div>

          {/* <!-- Feature 5: Gestión de Ventas --> */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t flex flex-col justify-center items-center">
            <div className="w-14 h-14 rounded-full bg-green-200 flex justify-center items-center">
              <i className="fa-solid fa-pen-nib text-3xl text-gray-900"></i>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900">
              Gestión de Ventas
            </h3>
            <p className="mt-5 text-base text-gray-600">
              Nos importa que tus procesos sean sencillos y cómodos. Gestión de
              clientes, productos, ventas y envíos desde un solo lugar.
            </p>
          </div>

          {/* <!-- Feature 6: Seguridad --> */}
          <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t flex flex-col justify-center items-center">
            <div className="w-14 h-14 rounded-full bg-yellow-200 flex justify-center items-center">
              <i className="fa-solid fa-shield text-3xl text-gray-900"></i>
            </div>
            <h3 className="mt-12 text-xl font-bold text-gray-900">Seguridad</h3>
            <p className="mt-5 text-base text-gray-600">
              Nuestro equipo está centrado en la seguridad de su información. Su
              privacidad es nuestra prioridad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
