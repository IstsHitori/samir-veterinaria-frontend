
import { AlertTriangle, XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { type User } from "../schemas/user.schema";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmationModal({
  isOpen,
  user,
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Eliminación
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <span className="font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </span>
            ?
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              <strong>Advertencia:</strong> Esta acción no se puede deshacer. El
              usuario será eliminado permanentemente del sistema.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Eliminar Usuario
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DeactivateConfirmationModalProps {
  isOpen: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeactivateConfirmationModal({
  isOpen,
  user,
  onConfirm,
  onCancel,
}: DeactivateConfirmationModalProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Desactivación
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas desactivar al usuario{" "}
            <span className="font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </span>
            ?
            <div className="mt-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
              <strong>Nota:</strong> El usuario no podrá acceder al sistema
              hasta que sea reactivado.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Desactivar Usuario
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
