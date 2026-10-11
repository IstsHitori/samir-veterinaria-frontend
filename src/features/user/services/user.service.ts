import { api } from "@/lib/axios";
import { env } from "@/config/env";
import { isAxiosError } from "axios";
import type { ProfileUpdate } from "../types";
import type { UpdateUserForm } from "../schemas/user.schema";
import {
  UserArraySchema,
  type CreateUserForm,
  type User,
} from "../schemas/user.schema";

export async function updateProfile(
  data: ProfileUpdate,
  userId: string
): Promise<string> {
  try {
    if (data.email === "") {
      delete data.email; // Remove email if it's empty
    }
    const response = await api.patch(`${env.apiUrl}/api/user/${userId}`, data);
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al actualizar el perfil";
      throw new Error(message);
    }
    throw new Error(
      "Error al actualizar el perfil. Inténtalo de nuevo más tarde."
    );
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await api.get(`${env.apiUrl}/api/user`);

    const result = UserArraySchema.safeParse(response.data.users);

    if (!result.success) {
      throw new Error("Error al validar los datos de los usuarios");
    }

    return result.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener los usuarios";
      throw new Error(message);
    }
    throw new Error(
      "Error al obtener los usuarios. Inténtalo de nuevo más tarde."
    );
  }
}

export async function createUser(newUser: CreateUserForm): Promise<string> {
  try {
    const response = await api.post(`${env.apiUrl}/api/auth/register`, newUser);

    return response.data as string;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al obtener los usuarios";
      throw new Error(message);
    }
    throw new Error(
      "Error al obtener los usuarios. Inténtalo de nuevo más tarde."
    );
  }
}

export async function desactivateUser(userId: string) {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/user/${userId}/desactivate`
    );
    console.log(response);

    return response.data as string;
  } catch (error) {
    console.log(error);

    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al desactivar el usuario";
      throw new Error(message);
    }
    throw new Error(
      "Error al desactivar el usuario. Inténtalo de nuevo más tarde."
    );
  }
}

export async function activateUser(userId: string) {
  try {
    const response = await api.patch(
      `${env.apiUrl}/api/user/${userId}/activate`
    );
    return response.data as string;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al activar el usuario";
      throw new Error(message);
    }
    throw new Error("Error al activar el usuario, intentalo más tarde");
  }
}

export async function updateUser(
  userId: string,
  data: UpdateUserForm
): Promise<string> {
  try {
    const body: Partial<UpdateUserForm> = { ...data };
    if (!body.password) {
      delete body.password; // Don't send empty password
    }
    const response = await api.patch(`${env.apiUrl}/api/user/${userId}`, body);
    return response.data.message || response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al actualizar el usuario";
      throw new Error(message);
    }
    throw new Error(
      "Error al actualizar el usuario. Inténtalo de nuevo más tarde."
    );
  }
}

export async function deleteUser(userId: string) {
  try {
    const response = await api.delete(
      `${env.apiUrl}/api/user/${userId}`
    );
    return response.data as string;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.message || "Error al eliminar el usuario";
      throw new Error(message);
    }
    throw new Error("Error al eliminar el usuario, intentalo más tarde");
  }
}
