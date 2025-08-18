import { env } from "@/config/env";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  arrayPatientClinicalReports,
  type PatientClinicalReports,
} from "../types/clinicalReport";
import type {
  CreateClinicalReportForm,
  EditClinicalReportForm,
} from "../schemas/clinical-report.schema";

export async function getPatientReports(
  id: string
): Promise<PatientClinicalReports[]> {
  try {
    const response = await api.get(
      `${env.apiUrl}/api/medical-reports/patient/${id}`
    );
    const result = arrayPatientClinicalReports.safeParse(response.data);
    if (!result.success)
      throw new Error("Error al parsear los reportes clinicos");

    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "Error al obtener los reportes clinicos del usuario"
      );
    }
    throw new Error(
      "Error al obtener los reportes clinicos del usuario. Intentalo más tarde "
    );
  }
}

export async function craetePatientReport(
  data: CreateClinicalReportForm
): Promise<string> {
  try {
    const response = await api.post(`${env.apiUrl}/api/medical-reports`, data);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "Error al crear el reporte clinico del usuario"
      );
    }
    throw new Error(
      "Error al crear el reporte clinico del usuario. Intentalo más tarde "
    );
  }
}

export async function updatePatientReport(
  reportId: string,
  data: EditClinicalReportForm
): Promise<string> {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/medical-reports/${reportId}`,
      data
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data.message ||
          "Error al actualizar el reporte clinico del usuario"
      );
    }
    throw new Error(
      "Error al actualizar el reporte clinico del usuario. Intentalo más tarde "
    );
  }
}
