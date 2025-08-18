"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, User, Phone, Plus } from "lucide-react";
import type { Patient } from "@/features/patient/schemas/patient.schema";
import type { CreateClinicalReportForm } from "../schemas/clinical-report.schema";
import { createClinicalReportSchema } from "../schemas/clinical-report.schema";
import usePatients from "@/features/patient/hooks/usePatients";
import { toast } from "react-toastify";
import useClinicalReports from "../hooks/useClinicalReports";

interface AddClinicalReportWithSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddClinicalReportWithSearchModal({
  isOpen,
  onClose,
}: AddClinicalReportWithSearchModalProps) {
  const { patients } = usePatients();
  const { createPatientReport } = useClinicalReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [step, setStep] = useState<"search" | "form">("search");

  const form = useForm<CreateClinicalReportForm>({
    resolver: zodResolver(createClinicalReportSchema),
    defaultValues: {
      patientId: "",
      details: "",
    },
  });

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ownerId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.ownerId.telephone.includes(searchTerm)
  );

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    form.setValue("patientId", patient._id);
    setStep("form");
  };

  const handleBackToSearch = () => {
    setStep("search");
    setSelectedPatient(null);
    form.reset();
  };

  const handleClose = () => {
    setStep("search");
    setSelectedPatient(null);
    setSearchTerm("");
    form.reset();
    onClose();
  };

  const onSubmit = async (data: CreateClinicalReportForm) => {
    try {
      const message = await createPatientReport(data);
      toast.success(message);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      // Here you would typically call an API to create the clinical report
      handleClose();
    }
  };

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case "perro":
        return "🐕";
      case "gato":
        return "🐱";
      case "ave":
        return "🐦";
      case "conejo":
        return "🐰";
      case "hamster":
        return "🐹";
      case "tortuga":
        return "🐢";
      case "pez":
        return "🐠";
      case "huron":
        return "🦫";
      default:
        return "🐾";
    }
  };

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case "perro":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "gato":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "ave":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "conejo":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "hamster":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "tortuga":
        return "bg-green-100 text-green-800 border-green-200";
      case "pez":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "huron":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            {step === "search"
              ? "Seleccionar Paciente"
              : "Nueva Historia Clínica"}
          </DialogTitle>
        </DialogHeader>

        {step === "search" ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre del paciente, propietario, raza o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-96">
              <div className="space-y-3">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <Card
                      key={patient._id}
                      className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">
                              {getSpeciesIcon(patient.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {patient.name}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge
                                  className={`${getSpeciesColor(
                                    patient.type
                                  )} text-xs`}
                                >
                                  {patient.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {patient.breed}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{patient.ownerId.name}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Phone className="h-3 w-3" />
                              <span>{patient.ownerId.telephone}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron pacientes</p>
                    <p className="text-gray-400 text-sm">
                      Intenta con otros términos de búsqueda
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Selected Patient Info */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getSpeciesIcon(selectedPatient!.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {selectedPatient!.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Propietario: {selectedPatient!.ownerId.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToSearch}
                  >
                    Cambiar Paciente
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reporte Clínico *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe el motivo de la consulta, hallazgos, diagnóstico, tratamiento y observaciones..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Historia Clínica
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
