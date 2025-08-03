import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 min-h-screen">
      {/* Lado izquierdo */}
      <div className="bg-[url('/lado-izq.png')] rounded-4xl bg-cover bg-center h-full hidden md:block">
        <nav className="flex justify-between text-sm p-10 px-12 font-semibold text-[#0A0903]">
          <p className="text-lg underline underline-offset-2 decoration-2">
            VETERINARIA PET
          </p>
          <div className="flex items-center justify-center gap-5">
            <Link
              to={"/auth/login"}
              className="relative inline-block font-semibold text-black transition-colors hover:text-black/75 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              Iniciar sesión
            </Link>
            <Link
              className="relative inline-block font-semibold text-black transition-colors hover:text-black/75 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              to={"/auth/forgot-password"}
            >
              Recuperar contraseña
            </Link>
          </div>
        </nav>
      </div>
      {/* LoginForm */}
      <div>
        <LoginForm />
      </div>
    </div>
  );
};
