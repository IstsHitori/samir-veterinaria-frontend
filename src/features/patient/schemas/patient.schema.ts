import { z } from "zod";

export enum Gender {
  MALE = "masculino",
  FEMALE = "femenino",
}

export enum Size {
  SMALL = "pequeno",
  MEDIUM = "mediano",
  LARGE = "grande",
}

export enum Species {
  DOG = "perro",
  CAT = "gato",
  BIRD = "ave",
  RABBIT = "conejo",
  HAMSTER = "hamster",
  TURTLE = "tortuga",
  FISH = "pez",
  FERRET = "huron",
  OTHER = "otro",
}

const ownerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  document: z.string(),
  address: z.string(),
  email: z.string(),
  telephone: z.string(),
});

const registeredBySchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  role: z.string(),
});

export const patientSchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.enum(Species),
  breed: z.string(),
  birthDate: z.string(),
  gender: z.enum(Gender),
  weight: z.string(),
  size: z.enum(Size),
  history: z.string(),
  ownerId: ownerSchema,
  medicalConditions: z.array(z.string()),
  allergies: z.array(z.string()),
  isVaccinated: z.boolean(),
  vaccines: z.array(z.string()),
  isActive: z.boolean(),
  deletedAt: z.string().nullable(),
  isDeleted: z.boolean(),
  registeredBy: registeredBySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createPatientSchema = z.object({
  // Información del paciente
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  type: z.enum(Species, { error: "Selecciona una especie de animal" }),
  breed: z.string().min(1, "La raza es requerida"),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida"),
  gender: z.enum(Gender, {
    error: "Selecciona el género",
  }),
  weight: z.string().min(1, "El peso es requerido"),
  size: z.enum(Size, {
    error: "Selecciona el tamaño",
  }),
  history: z.string().optional(),

  // ID del propietario (ahora solo necesitamos el ID)
  ownerId: z.string().min(1, "Debes seleccionar un propietario"),

  // Información médica
  medicalConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  isVaccinated: z.boolean().optional(),
  vaccines: z.array(z.string()).optional(),
});

export type CreatePatientForm = z.infer<typeof createPatientSchema>;

export const patientArraySchema = z.array(patientSchema);

export type Patient = z.infer<typeof patientSchema>;
export type RegisteredBy = z.infer<typeof registeredBySchema>;
export type Owner = z.infer<typeof ownerSchema>;
