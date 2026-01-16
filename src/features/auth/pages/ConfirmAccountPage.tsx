import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export const ConfirmAccountPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { confirmAccount } = useAuth();
  const token = searchParams.get("token");

  const [isValidating, setIsValidating] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const validateAccount = async () => {
      if (!token) {
        setErrorMessage("Token no proporcionado");
        setIsValidating(false);
        toast.error("Token de confirmación no válido");
        return;
      }

      try {
        const message = await confirmAccount(token);
        setIsConfirmed(true);
        toast.success(message || "¡Cuenta confirmada exitosamente!");
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } catch (error) {
        const errorMsg = error instanceof Error 
          ? error.message 
          : "Error al confirmar la cuenta";
        setErrorMessage(errorMsg);
        setIsConfirmed(false);
        toast.error(errorMsg);
      } finally {
        setIsValidating(false);
      }
    };

    validateAccount();
  }, [token, confirmAccount, navigate]);

  // Loading state
  if (isValidating) {
    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Confirmando tu cuenta...
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Por favor espera mientras verificamos tu información
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (isConfirmed) {
    return (
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                ¡Cuenta Confirmada!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Tu cuenta ha sido activada exitosamente. Ahora puedes iniciar sesión.
              </p>
              <div className="mt-6">
                <Link
                  to="/auth/login"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Ir al inicio de sesión
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Serás redirigido automáticamente en 3 segundos...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">
              Error al Confirmar Cuenta
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {errorMessage || "El enlace de confirmación no es válido o ha expirado."}
            </p>
            <div className="mt-6 space-y-3">
              <Link
                to="/auth/login"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Ir al inicio de sesión
              </Link>
              <Link
                to="/auth/forgot-password"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                ¿Necesitas ayuda?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 