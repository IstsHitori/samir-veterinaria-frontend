import { isAxiosError } from "axios";
import {
  patientArraySchema,
  patientSchema,
  type CreatePatientForm,
  type Patient,
} from "../schemas/patient.schema";
import { api } from "@/lib/axios";
import { env } from "@/config/env";

export interface CreatePatientResponse {
  message: string;
  patientId: string;
}

export async function createPatient(
  patient: CreatePatientForm
): Promise<CreatePatientResponse> {
  try {
    
    const response = await api.post(`${env.apiUrl}/api/patient`, patient);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al crear el paciente";
      throw new Error(message);
    }
    throw new Error("Error al crear el paciente. Intentalo de nuevo más tarde");
  }
}

export async function getAllPatients() {
  try {
    const response = await api.get(`${env.apiUrl}/api/patient`);
    const result = patientArraySchema.safeParse(response.data.patients);

    if (!result.success)
      throw new Error("Error al validar los datos de los pacients");
    return result.data;
  } catch (error) {
    console.log(error);
    
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener los pacientes";
      throw new Error(message);
    }
    throw new Error("Error al obtener los pacientes. intentalo más tarde");
  }
}

export async function getOnePatientByID(patientId: string): Promise<Patient> {
  try {
    const response = await api.get(`${env.apiUrl}/api/patient/${patientId}`);
    const result = patientSchema.safeParse(response.data);
    if (!result.success)
      throw new Error("Error al parsear los datos del paciente");
    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener el paciente";
      throw new Error(message);
    }
    throw new Error("Error al obtener el paciente. intentalo más tarde");
  }
}

export async function desactivatePatient(patientId: string): Promise<string> {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/patient/${patientId}/desactivate`
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al desactivar el paciente";
      throw new Error(message);
    }
    throw new Error("Error al desactivar el paciente. Intentalo más tarde");
  }
}

export async function activatePatient(patientId: string): Promise<string> {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/patient/${patientId}/activate`
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al activar el paciente";
      throw new Error(message);
    }
    throw new Error("Error al activar el paciente. Intentalo más tarde");
  }
}

export async function updatePatient(
  patientId: string,
  patient: CreatePatientForm
): Promise<string> {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/patient/${patientId}`,
      patient
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al actualizar el paciente";
      throw new Error(message);
    }
    throw new Error(
      "Error al actualizar el paciente. Intentalo más tarde"
    );
  }
}

export async function deletePatient(patientId: string): Promise<string> {
  try {
    const response = await api.delete(`${env.apiUrl}/api/patient/${patientId}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al eliminar el paciente";
      throw new Error(message);
    }
    throw new Error("Error al eliminar el paciente. Intentalo más tarde");
  }
}
