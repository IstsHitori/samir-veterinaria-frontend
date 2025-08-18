import { z } from "zod";

export const clinicalReportUserSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
});

export const patientClinicalReportSchema = z.object({
  _id: z.string(),
  userId: clinicalReportUserSchema,
  patientId: z.string(),
  details: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const arrayPatientClinicalReports = z.array(patientClinicalReportSchema);

export type ClinicalReportUser = z.infer<typeof clinicalReportUserSchema>;
export type PatientClinicalReports = z.infer<
  typeof patientClinicalReportSchema
>;
