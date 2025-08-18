import { env } from "@/config/env";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  arrayPatientClinicalReports,
  type PatientClinicalReports,
} from "../types/clinicalReport";

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
