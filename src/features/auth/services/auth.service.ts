import axios, { isAxiosError } from "axios";
import { api } from "../../../lib/axios";
import { env } from "../../../config/env";
import { ProfileSchema, type Profile } from "../schemas/auth.schema";

type LoginResponse = {
  token: string;
};

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${env.apiUrl}/api/auth/login`,
        credentials
      );
      
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Ha habido un error al iniciar sesión");
    }
  },

  async getProfile(): Promise<Profile> {
    try {
      const { data } = await api.get(`${env.apiUrl}/api/auth`);

      const response = ProfileSchema.safeParse(
        data.profile
      );

      if (!response.success) throw new Error("Error al parsear los datos");
      
      return response.data;
    } catch (error) {
      
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        throw new Error(message || "Error al obtener el perfil");
      }
      throw new Error("Error al obtener el perfil");
    }
  },

};
