import { Heart, Dog, Cat, Bird, Rabbit, Fish, Turtle, Zap } from "lucide-react"

export const ITEMS_PER_PAGE = 5

export const genderColors = {
  masculino: "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-blue-200",
  femenino: "bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 border-pink-200",
} as const

export const genderLabels = {
  masculino: "Macho",
  femenino: "Hembra",
} as const

export const sizeColors = {
  pequeno: "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200",
  mediano: "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border-yellow-200",
  grande: "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200",
} as const

export const sizeLabels = {
  pequeno: "Pequeño",
  mediano: "Mediano",
  grande: "Grande",
} as const

export const speciesColors = {
  perro: "bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 border-amber-200",
  gato: "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border-purple-200",
  ave: "bg-gradient-to-r from-sky-100 to-sky-50 text-sky-800 border-sky-200",
  conejo: "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border-gray-200",
  hamster: "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border-orange-200",
  tortuga: "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-800 border-emerald-200",
  pez: "bg-gradient-to-r from-cyan-100 to-cyan-50 text-cyan-800 border-cyan-200",
  huron: "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-800 border-indigo-200",
  otro: "bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border-slate-200",
} as const

export const speciesLabels = {
  perro: "Perro",
  gato: "Gato",
  ave: "Ave",
  conejo: "Conejo",
  hamster: "Hámster",
  tortuga: "Tortuga",
  pez: "Pez",
  huron: "Hurón",
  otro: "Otro",
} as const

export const speciesIcons = {
  perro: Dog,
  gato: Cat,
  ave: Bird,
  conejo: Rabbit,
  hamster: Zap,
  tortuga: Turtle,
  pez: Fish,
  huron: Heart,
  otro: Heart,
} as const
