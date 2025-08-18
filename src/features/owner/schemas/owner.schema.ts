import {
  Gender,
  Size,
  Species,
} from "@/features/patient/schemas/patient.schema";
import { z } from "zod";

export const ownerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  document: z.string(),
  address: z.string(),
  email: z.string(),
  telephone: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createOwnerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  document: z.string().min(1, "El documento es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  email: z.string().email("Ingresa un email válido"),
  telephone: z.string().min(1, "El teléfono es requerido"),
});

export type CreateOwnerForm = z.infer<typeof createOwnerSchema>;

export const arrayOwnerSchema = z.array(ownerSchema);

export type Owner = z.infer<typeof ownerSchema>;

const registeredBySchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  role: z.string(),
});

const patientOwnerSchema = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.enum(Species),
  breed: z.string(),
  birthDate: z.string(),
  gender: z.enum(Gender),
  weight: z.string(),
  size: z.enum(Size),
  history: z.string(),
  ownerId: z.string(),
  medicalConditions: z.array(z.string()),
  allergies: z.array(z.string()),
  isVaccinated: z.boolean(),
  vaccines: z.array(z.string()),
  isActive: z.boolean(),
  deletedAt: z.string().nullable(),
  deletedBy: z.string().nullable(),
  isDeleted: z.boolean(),
  registeredBy: registeredBySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const extendedOwnerSchema = ownerSchema.extend({
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  patients: z.array(patientOwnerSchema),
});

export const arrayExtendedOwnerSchema = z.array(extendedOwnerSchema);

export type OwnerWithPatients = z.infer<typeof extendedOwnerSchema>;
export type PatientOwner = z.infer<typeof patientOwnerSchema>;

export const updateOwnerSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  document: z.string().min(1, "El documento es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  email: z.string().email("Ingresa un email válido"),
  telephone: z.string().min(1, "El teléfono es requerido"),
});

export type UpdateOwnerForm = z.infer<typeof updateOwnerSchema>;
