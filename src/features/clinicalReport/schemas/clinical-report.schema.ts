import { z } from "zod";

export const createClinicalReportSchema = z.object({
  patientId: z.string().min(1, "El paciente es requerido"),
  message: z.string().min(10, "El reporte debe tener al menos 10 caracteres"),
});

export const editClinicalReportSchema = z.object({
  details: z.string().min(10, "El reporte debe tener al menos 10 caracteres"),
});

export type CreateClinicalReportForm = z.infer<
  typeof createClinicalReportSchema
>;
export type EditClinicalReportForm = z.infer<typeof editClinicalReportSchema>;
