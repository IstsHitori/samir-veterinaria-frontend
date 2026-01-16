import {
  UserPlus,
  Lock,
  User,
  AtSign,
  Shield,
  Stethoscope,
  Heart,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUserForm } from "../schemas/user.schema";
import { useState } from "react";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserForm) => void;
}

export function CreateUserModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateUserModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: undefined,
    },
  });

  const handleSubmit = (data: CreateUserForm) => {
    onSubmit(data);
    form.reset();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <UserPlus className="h-6 w-6 text-blue-600" />
            Crear Nuevo Usuario
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="flex items-center gap-1 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Nombre
              </Label>
              <Input
                id="firstName"
                placeholder="Ingresa el nombre"
                {...form.register("firstName")}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {form.formState.errors.firstName && (
                <p className="text-red-600 text-sm">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="flex items-center gap-1 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Apellido
              </Label>
              <Input
                id="lastName"
                placeholder="Ingresa el apellido"
                {...form.register("lastName")}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {form.formState.errors.lastName && (
                <p className="text-red-600 text-sm">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <AtSign className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@veterinaria.com"
              {...form.register("email")}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.email && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Lock className="h-4 w-4" />
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña segura"
                {...form.register("password")}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
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
            {form.formState.errors.password && (
              <p className="text-red-600 text-xs leading-tight">
                {form.formState.errors.password.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@, $, !, %, *, ?, &, #)
            </p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-sm font-medium">
              <Shield className="h-4 w-4" />
              Rol
            </Label>
            <Select
              onValueChange={(value) =>
                form.setValue("role", value as "veterinario" | "auxiliar")
              }
            >
              <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veterinario">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                    Veterinario
                  </div>
                </SelectItem>
                <SelectItem value="auxiliar">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-green-600" />
                    Auxiliar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Crear Usuario
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
