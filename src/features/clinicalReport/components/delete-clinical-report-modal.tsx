import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import type { PatientClinicalReports as ClinicalReport } from "../types/clinicalReport";

import { AlertTriangle } from "lucide-react";

interface DeleteClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ClinicalReport | null;
  onConfirm: (reportId: string) => void | Promise<void>;
}

export function DeleteClinicalReportModal({
  isOpen,
  onClose,
  report,
  onConfirm,
}: DeleteClinicalReportModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!report) return;
    setIsDeleting(true);
    try {
      await onConfirm(report._id);
      onClose();
    } catch (error) {
      console.error("Error deleting clinical report:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                Eliminar Historia Clínica
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-gray-600 mt-3">
            ¿Estás seguro de que deseas eliminar esta historia clínica? Esta
            acción no se puede deshacer.
            {report && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  Reporte a eliminar:
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {report.details}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Fecha:{" "}
                  {new Date(report.createdAt).toLocaleDateString("es-ES")}
                </p>
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
