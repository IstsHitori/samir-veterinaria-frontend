import { Crown, Stethoscope, Heart } from "lucide-react";

export const ITEMS_PER_PAGE = 5;

export const roleColors = {
  admin: "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200",
  veterinario:
    "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-blue-200",
  auxiliar:
    "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200",
} as const;

export const roleLabels = {
  admin: "Administrador",
  veterinario: "Veterinario",
  auxiliar: "Auxiliar",
} as const;

export const roleIcons = {
  admin: Crown,
  veterinario: Stethoscope,
  auxiliar: Heart,
} as const;
