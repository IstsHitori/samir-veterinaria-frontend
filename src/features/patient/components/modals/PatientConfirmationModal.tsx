
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Patient } from "../../schemas/patient.schema";

interface DeletePatientConfirmationModalProps {
  isOpen: boolean;
  patient: Patient | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeletePatientConfirmationModal({
  isOpen,
  patient,
  onConfirm,
  onCancel,
}: DeletePatientConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Eliminación de Paciente
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas eliminar al paciente{" "}
            <span className="font-semibold text-gray-900">{patient?.name}</span>
            {patient?.breed && (
              <>
                {" "}
                (<span className="font-medium">{patient.breed}</span>)
              </>
            )}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              <div className="font-semibold mb-1">
                Esta acción no se puede deshacer
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Se eliminará toda la historia clínica del paciente</li>
                <li>Se perderán los registros de vacunación</li>
                <li>La información del propietario se mantendrá</li>
              </ul>
            </div>
          </div>
        </div>
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
            Eliminar Paciente
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface DeactivatePatientConfirmationModalProps {
  isOpen: boolean;
  patient: Patient | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeactivatePatientConfirmationModal({
  isOpen,
  patient,
  onConfirm,
  onCancel,
}: DeactivatePatientConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Desactivación de Paciente
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas desactivar al paciente{" "}
            <span className="font-semibold text-gray-900">{patient?.name}</span>
            {patient?.breed && (
              <>
                {" "}
                (<span className="font-medium">{patient.breed}</span>)
              </>
            )}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-700">
              <div className="font-semibold mb-1">
                El paciente será marcado como inactivo
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>No aparecerá en las búsquedas por defecto</li>
                <li>Se mantendrá toda la información médica</li>
                <li>Podrá ser reactivado en cualquier momento</li>
              </ul>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Desactivar Paciente
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ActivatePatientConfirmationModalProps {
  isOpen: boolean;
  patient: Patient | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActivatePatientConfirmationModal({
  isOpen,
  patient,
  onConfirm,
  onCancel,
}: ActivatePatientConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Confirmar Activación de Paciente
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro de que deseas activar al paciente{" "}
            <span className="font-semibold text-gray-900">{patient?.name}</span>
            {patient?.breed && (
              <>
                {" "}
                (<span className="font-medium">{patient.breed}</span>)
              </>
            )}
            ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-green-700">
              <div className="font-semibold mb-1">
                El paciente será reactivado
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Aparecerá en las búsquedas normales</li>
                <li>Podrá recibir nuevas citas y tratamientos</li>
                <li>Se restaurará el acceso completo a su historial</li>
              </ul>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Activar Paciente
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
