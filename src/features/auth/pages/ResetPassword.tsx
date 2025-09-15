import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

interface ResetPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}

export default function ResetPassword() {
  const { validateToken, resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordForm>();

  const password = watch("newPassword");

  // Validar token al cargar la página
  useEffect(() => {
    const validateResetToken = async () => {
      if (!token) {
        toast.error("Token inválido o no proporcionado");
        setIsValidatingToken(false);
        return;
      }

      try {
        const message = await validateToken(token);
        setIsTokenValid(true);
        toast.success(
          message || "Token válido. Puedes restablecer tu contraseña."
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Token inválido o expirado";
        toast.error(errorMessage);
        setIsTokenValid(false);
      } finally {
        setIsValidatingToken(false);
      }
    };

    validateResetToken();
  }, [token, validateToken]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Token no disponible");
      return;
    }

    try {
      setIsSubmitting(true);
      const message = await resetPassword(
        token,
        data.newPassword,
        data.confirmNewPassword
      );
      toast.success(message || "Contraseña actualizada exitosamente");

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al actualizar la contraseña";
      toast.error(errorMessage);

      // Si el error es por token inválido, marcar como tal
      if (
        errorMessage.toLowerCase().includes("token") ||
        errorMessage.toLowerCase().includes("expirado")
      ) {
        setIsTokenValid(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state mientras valida el token
  if (isValidatingToken) {
    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-600 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Validando token...
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Por favor espera mientras verificamos tu solicitud
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Token inválido o expirado
  if (!isTokenValid) {
    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Token inválido o expirado
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                El enlace de recuperación no es válido o ha expirado. Solicita
                un nuevo enlace de recuperación.
              </p>
              <div className="mt-6 flex flex-col space-y-3">
                <Link
                  to="/auth/forgot-password"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Solicitar nuevo enlace
                </Link>
                <Link
                  to="/auth/login"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Formulario para nueva contraseña
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Nueva Contraseña
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ingresa tu nueva contraseña para completar la recuperación
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Nueva contraseña
              </label>
              <div className="mt-1">
                <input
                  {...register("newPassword", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
                    },
                  })}
                  type="password"
                  autoComplete="new-password"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors ${
                    errors.newPassword
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Ingresa tu nueva contraseña"
                />
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar nueva contraseña
              </label>
              <div className="mt-1">
                <input
                  {...register("confirmNewPassword", {
                    required: "La confirmación de contraseña es requerida",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                  type="password"
                  autoComplete="new-password"
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors ${
                    errors.confirmNewPassword
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirma tu nueva contraseña"
                />
                {errors.confirmNewPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Actualizando contraseña...
                  </div>
                ) : (
                  "Actualizar contraseña"
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/auth/login"
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                ← Volver al inicio de sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
