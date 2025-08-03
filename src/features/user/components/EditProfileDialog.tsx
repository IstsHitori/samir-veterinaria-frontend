import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { updateProfile } from "../services/user.service";
import ErrorMessage from "@/shared/components/ErrorMessage";
import type { ProfileUpdate } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: ProfileUpdate;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  profile,
}: EditProfileDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileUpdate>({
    defaultValues: profile,
  });

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return <p>Cargando perfil</p>;

  const onSubmit: SubmitHandler<ProfileUpdate> = async (data) => {
    setIsLoading(true);
    try {
      const message = await updateProfile(data, user._id);
      toast.success(message);
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error(
          "Error al actualizar el perfil. Inténtalo de nuevo más tarde."
        );
      }
    }

    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        reset(profile); // Reset form to initial profile data
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Actualiza tu información personal. Los cambios se guardarán
            automáticamente.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                Nombre
              </Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres",
                  },
                })}
                className="col-span-3"
                required
              />
              {errors.firstName?.message && (
                <ErrorMessage message={errors.firstName.message} />
              )}
            </div>
            <div className="grid grid-cols-4  items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Apellido
              </Label>
              <Input
                id="lastName"
                className="col-span-3"
                required
                {...register("lastName", {
                  required: "El apellido es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El apellido debe tener al menos 2 caracteres",
                  },
                })}
              />
              {errors.lastName?.message && (
                <ErrorMessage message={errors.lastName.message} />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                reset(profile); // Reset form to initial profile data
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
