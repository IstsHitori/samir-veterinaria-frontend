import { env } from "@/config/env";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  arrayExtendedOwnerSchema,
  arrayOwnerSchema,
  type CreateOwnerForm,
  type UpdateOwnerForm,
} from "../schemas/owner.schema";

export interface CreateOwnerResponse {
  ownerId: string;
  message: string;
}

export async function getAllOwners() {
  try {
    const response = await api.get(`${env.apiUrl}/api/owner`);

    const result = arrayOwnerSchema.safeParse(response.data.owners);

    if (!result.success)
      throw new Error("Error al parsear los datos de los dueños");

    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener los dueños";
      throw new Error(message);
    }
    throw new Error("Error al obtener los dueños. Intenta más tarde");
  }
}

export async function getAllOwnersWithPatients() {
  try {
    const response = await api.get(`${env.apiUrl}/api/owner/pets`);

    const result = arrayExtendedOwnerSchema.safeParse(response.data.owners);

    if (!result.success)
      throw new Error("Error al parsear los datos de los dueños");

    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener los dueños";
      throw new Error(message);
    }
    throw new Error("Error al obtener los dueños. Intenta más tarde");
  }
}

export async function createOwner(
  owner: CreateOwnerForm
): Promise<CreateOwnerResponse> {
  try {
    const response = await api.post(`${env.apiUrl}/api/owner`, owner);

    const data: CreateOwnerResponse = {
      ownerId: response.data.ownerId,
      message: response.data.message,
    };

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener los dueños";
      throw new Error(message);
    }
    throw new Error("Error al obtener los dueños. Intenta más tarde");
  }
}

export async function updateOwner(idOwner: string, dataOwner: UpdateOwnerForm) {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/owner/${idOwner}`,
      dataOwner
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al actualizar el dueño";
      throw new Error(message);
    }
    throw new Error("Error al actualizar el dueño. Intentalo más tarde");
  }
}
