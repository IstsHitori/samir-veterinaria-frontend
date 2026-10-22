import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginInputs } from "../types/auth";
import { Link } from "react-router-dom";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginInputs>();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const { token } = await authService.login(data);
      if (!token) {
        toast.warning("No se pudo obtener el token de autenticación");
        return;
      }
      await login(token);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-8 lg:p-10">
      <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 items-center justify-center">
          <h3 className="text-3xl font-semibold text-[#0A0903] sm:text-4xl">
            Hola de nuevo!
          </h3>
          <p className="text-gray-600 text-sm">Bienvenido a VETERINARIA PET</p>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/80 focus:border-gray-400/80 rounded-lg p-2 w-full text-sm "
              type="email"
              id="email"
              placeholder="example@example.com"
              {...register("email", {
                required: "Este campo es requerido",
              })}
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <div className="relative">
              <input
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/80 focus:border-gray-400/80 rounded-lg p-2 w-full text-sm pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="******"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Link
          className="text-sm flex justify-end text-red-500/80 underline underline-offset-2 hover:text-red-500 transition-colors font-semibold"
          to={"/auth/forgot-password"}
        >
          Olvidé mi contraseña
        </Link>
        <input
          type="submit"
          value="Iniciar sesión"
          className="p-2 rounded-2xl text-white bg-red-500 hover:bg-red-600 transition-colors w-full cursor-pointer"
        />
      </form>
    </div>
  );
}
