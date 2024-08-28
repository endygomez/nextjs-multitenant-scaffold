import { randomBytes } from "crypto";

// Función para generar una clave aleatoria
export const generateRandomKey = (length: number): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};
