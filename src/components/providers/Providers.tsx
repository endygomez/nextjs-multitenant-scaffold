"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { CustomThemeProvider } from "@/components";

interface Props {
  children: React.ReactNode;
}
export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </SessionProvider>
  );
};
