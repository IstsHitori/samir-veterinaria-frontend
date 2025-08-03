import { CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { User } from "../schemas/user.schema";

interface ActivateConfirmationModalProps {
  isOpen: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActivateConfirmationModal({
  isOpen,
  user,
  onConfirm,
  onCancel,
}: ActivateConfirmationModalProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Confirmar Activación
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas activar al usuario{" "}
            <span className="font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </span>
            ?
            <div className="mt-2 text-sm text-green-600 bg-green-50 p-2 rounded">
              <strong>Nota:</strong> El usuario podrá acceder al sistema
              nuevamente y realizar sus funciones asignadas.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Activar Usuario
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
