"use client";

import { useEffect } from "react";
import { PrimeReactProvider, addLocale, locale } from "primereact/api";

import esLocale from "@/lib/es-locale/es.json";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Props {
  children: React.ReactNode;
}

export const CustomThemeProvider = ({ children, ...rest }: Props) => {
  useEffect(() => {
    addLocale("es-CO", esLocale.es);
    locale("es-CO");
  }, []);
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};
