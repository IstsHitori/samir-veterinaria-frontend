import { useState, useEffect } from "react";
import {
  Lock,
  User,
  AtSign,
  Shield,
  Stethoscope,
  Heart,
  Eye,
  EyeOff,
  Users,
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
import {
  updateUserSchema,
  type UpdateUserForm,
  type User as UserType,
} from "../schemas/user.schema";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateUserForm) => void;
  user: UserType | null;
}

export function EditUserModal({
  isOpen,
  onClose,
  onSubmit,
  user,
}: EditUserModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: undefined,
      password: "",
    },
  });

  // Load user data when modal opens
  useEffect(() => {
    if (user && isOpen) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role as "auxiliar" | "veterinario" | "admin",
        password: "",
      });
    }
  }, [user, isOpen, form]);

  const handleSubmit = (data: UpdateUserForm) => {
    onSubmit(data);
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
            <Users className="h-6 w-6 text-amber-600" />
            Editar Usuario
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
                className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
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
                className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
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
              className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
            />
            {form.formState.errors.email && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-sm font-medium">
              <Shield className="h-4 w-4" />
              Rol
            </Label>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "role",
                  value as "auxiliar" | "veterinario" | "admin"
                )
              }
              value={form.watch("role")}
            >
              <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500">
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
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    Administrador
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

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Lock className="h-4 w-4" />
              Nueva Contraseña{" "}
              <span className="text-gray-400 font-normal text-xs">
                (opcional)
              </span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Dejar vacío para no cambiar"
                {...form.register("password")}
                className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 pr-10"
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
              Dejar vacío para mantener la contraseña actual. Si cambias, debe
              tener al menos 8 caracteres, una mayúscula, una minúscula, un
              número y un carácter especial.
            </p>
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
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <Users className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
