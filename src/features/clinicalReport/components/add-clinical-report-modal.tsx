import { useState } from "react";
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
  type CreateClinicalReportForm,
  createClinicalReportSchema,
} from "../schemas/clinical-report.schema";

import { Plus, Save, X } from "lucide-react";
import type { Patient } from "@/features/patient/schemas/patient.schema";

interface AddClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onSave: (data: CreateClinicalReportForm) => void;
}

export function AddClinicalReportModal({
  isOpen,
  onClose,
  patient,
  onSave,
}: AddClinicalReportModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateClinicalReportForm>({
    resolver: zodResolver(createClinicalReportSchema),
    defaultValues: {
      patientId: patient?._id || "",
      message: "",
    },
  });

  const handleSubmit = async (data: CreateClinicalReportForm) => {
    setIsLoading(true);
    try {
      onSave(data);
      onClose();
      form.reset();
    } catch (error) {
      console.error("Error creating clinical report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Nueva Historia Clínica
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Agregar nueva historia clínica para {patient?.name}
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Reporte Clínico *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe el motivo de la consulta, hallazgos, diagnóstico, tratamiento y observaciones..."
                      className="min-h-[150px] resize-none"
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
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Guardando..." : "Crear Historia Clínica"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
