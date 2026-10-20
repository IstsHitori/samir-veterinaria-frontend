"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  type EditClinicalReportForm,
  editClinicalReportSchema,
} from "../schemas/clinical-report.schema";

import type { PatientClinicalReports as ClinicalReport } from "../types/clinicalReport";
import { Edit3, Save, X } from "lucide-react";

interface EditClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ClinicalReport | null;
  onSave: (reportId: string, data: EditClinicalReportForm) => void | Promise<void>;
}

export function EditClinicalReportModal({
  isOpen,
  onClose,
  report,
  onSave,
}: EditClinicalReportModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditClinicalReportForm>({
    resolver: zodResolver(editClinicalReportSchema),
    defaultValues: {
      details: report?.details || "",
    },
  });

  const handleSubmit = async (data: EditClinicalReportForm) => {
    if (!report) return;

    setIsLoading(true);
    try {
      await onSave(report._id, data);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error updating clinical report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sincroniza el formulario cuando se elige otro reporte
  useEffect(() => {
    form.reset({ details: report?.details || "" });
  }, [report, form]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Editar Historia Clínica
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Modifica la información del reporte médico
              </p>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Reporte Clínico *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe el reporte clínico completo incluyendo diagnóstico, tratamiento y observaciones..."
                      className="min-h-[200px] max-h-[300px] overflow-y-auto resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
                className="flex items-center gap-2 bg-transparent"
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
