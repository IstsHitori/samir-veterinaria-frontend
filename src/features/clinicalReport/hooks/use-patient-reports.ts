import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createPatientReport,
  deletePatientReport,
  getPatientReports,
  updatePatientReport,
} from "../services/medical-reports.service";
import type {
  CreateClinicalReportForm,
  EditClinicalReportForm,
} from "../schemas/clinical-report.schema";

export const clinicalReportKeys = {
  all: ["clinical-reports"] as const,
  byPatient: (patientId: string) =>
    [...clinicalReportKeys.all, "patient", patientId] as const,
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error
    ? error.message
    : "Error al procesar la historia clínica";

/**
 * Reportes clínicos de un paciente. Al crear, editar o eliminar se invalida la
 * caché completa de reportes, de modo que todas las vistas (historias clínicas
 * y detalle del paciente) se refrescan sin recargar la página.
 */
export function usePatientReports(patientId?: string, enabled = true) {
  return useQuery({
    queryKey: clinicalReportKeys.byPatient(patientId ?? ""),
    queryFn: () => getPatientReports(patientId as string),
    enabled: enabled && Boolean(patientId),
    staleTime: 30_000,
  });
}

export function useCreateClinicalReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClinicalReportForm) => createPatientReport(data),
    onSuccess: async (message) => {
      await queryClient.invalidateQueries({
        queryKey: clinicalReportKeys.all,
      });
      toast.success(message);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useUpdateClinicalReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reportId,
      data,
    }: {
      reportId: string;
      data: EditClinicalReportForm;
    }) => updatePatientReport(reportId, data),
    onSuccess: async (message) => {
      await queryClient.invalidateQueries({
        queryKey: clinicalReportKeys.all,
      });
      toast.success(message);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}

export function useDeleteClinicalReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reportId: string) => deletePatientReport(reportId),
    onSuccess: async (message) => {
      await queryClient.invalidateQueries({
        queryKey: clinicalReportKeys.all,
      });
      toast.success(message);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
