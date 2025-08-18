
import { User, Phone, Mail, MapPin, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOwnerSchema,
  type CreateOwnerForm,
} from "@/features/owner/schemas/owner.schema";

interface CreateOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateOwnerForm) => void;
}

export function CreateOwnerModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateOwnerModalProps) {
  const form = useForm<CreateOwnerForm>({
    resolver: zodResolver(createOwnerSchema),
    defaultValues: {
      name: "",
      document: "",
      address: "",
      email: "",
      telephone: "",
    },
  });

  const handleSubmit = (data: CreateOwnerForm) => {
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
            <User className="h-6 w-6 text-blue-600" />
            Crear Nuevo Propietario
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <User className="h-4 w-4" />
              Nombre Completo
            </Label>
            <Input
              id="name"
              placeholder="Nombre del propietario"
              {...form.register("name")}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.name && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="document"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <FileText className="h-4 w-4" />
              Documento de Identidad
            </Label>
            <Input
              id="document"
              placeholder="Número de documento"
              {...form.register("document")}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.document && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.document.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="propietario@email.com"
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
              htmlFor="telephone"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <Phone className="h-4 w-4" />
              Teléfono
            </Label>
            <Input
              id="telephone"
              placeholder="+34 600 123 456"
              {...form.register("telephone")}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.telephone && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.telephone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <MapPin className="h-4 w-4" />
              Dirección
            </Label>
            <Input
              id="address"
              placeholder="Dirección completa"
              {...form.register("address")}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {form.formState.errors.address && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.address.message}
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
              <User className="mr-2 h-4 w-4" />
              Crear Propietario
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
