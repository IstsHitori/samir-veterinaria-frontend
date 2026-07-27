import { useState, useEffect } from "react";
import { Heart, Calendar, Weight, Stethoscope, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPatientSchema,
  Gender,
  Size,
  Species,
  type CreatePatientForm,
  type Patient,
} from "../../schemas/patient.schema";
import {
  speciesLabels,
  speciesIcons,
  genderLabels,
  sizeLabels,
} from "../../constants/patient-constants";
import { OwnerSearchSelector } from "../owner-search-selector";
import { CreateOwnerModal } from "./CreateOwnerModal";
import type { Owner } from "@/features/owner/schemas/owner.schema";
import type { CreateOwnerForm } from "@/features/owner/schemas/owner.schema";

interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePatientForm) => void;
  patient: Patient | null;
  owners: Owner[];
  onCreateOwner: (data: CreateOwnerForm) => Promise<string>;
}

export function EditPatientModal({
  isOpen,
  onClose,
  onSubmit,
  patient,
  owners,
  onCreateOwner,
}: EditPatientModalProps) {
  const [currentCondition, setCurrentCondition] = useState("");
  const [currentAllergy, setCurrentAllergy] = useState("");
  const [currentVaccine, setCurrentVaccine] = useState("");
  const [isCreateOwnerModalOpen, setIsCreateOwnerModalOpen] = useState(false);

  const form = useForm<CreatePatientForm>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      name: "",
      type: undefined,
      breed: "",
      birthDate: "",
      gender: undefined,
      weight: "",
      size: undefined,
      history: "",
      ownerId: "",
      medicalConditions: [],
      allergies: [],
      isVaccinated: false,
      vaccines: [],
    },
  });

  // Load patient data when modal opens
  useEffect(() => {
    if (patient && isOpen) {
      form.reset({
        name: patient.name,
        type: patient.type as Species,
        breed: patient.breed,
        birthDate: patient.birthDate.split("T")[0], // Format date for input
        gender: patient.gender as Gender,
        weight: patient.weight,
        size: patient.size as Size,
        history: patient.history || "",
        ownerId: patient.ownerId._id,
        medicalConditions: patient.medicalConditions || [],
        allergies: patient.allergies || [],
        isVaccinated: patient.isVaccinated || false,
        vaccines: patient.vaccines || [],
      });
    }
  }, [patient, isOpen, form]);

  const watchedConditions = form.watch("medicalConditions");
  const watchedAllergies = form.watch("allergies");
  const watchedVaccines = form.watch("vaccines");
  const watchedIsVaccinated = form.watch("isVaccinated");
  const watchedType = form.watch("type");
  const watchedGender = form.watch("gender");
  const watchedSize = form.watch("size");
  const watchedOwnerId = form.watch("ownerId");

  const handleSubmit = (data: CreatePatientForm) => {
    onSubmit(data);
  };

  const handleClose = () => {
    onClose();
    form.reset();
    setCurrentCondition("");
    setCurrentAllergy("");
    setCurrentVaccine("");
  };

  const handleOwnerSelect = (ownerId: string) => {
    form.setValue("ownerId", ownerId);
    form.clearErrors("ownerId");
  };

  const handleCreateOwner = async (ownerData: CreateOwnerForm) => {
    try {
      const newOwnerId = await onCreateOwner(ownerData);
      form.setValue("ownerId", newOwnerId);
      form.clearErrors("ownerId");
      setIsCreateOwnerModalOpen(false);
    } catch (error) {
      console.error("Error creating owner:", error);
    }
  };

  const addCondition = () => {
    if (currentCondition.trim()) {
      const current = form.getValues("medicalConditions") || [];
      form.setValue("medicalConditions", [...current, currentCondition.trim()]);
      setCurrentCondition("");
    }
  };

  const removeCondition = (index: number) => {
    const current = form.getValues("medicalConditions") || [];
    form.setValue(
      "medicalConditions",
      current.filter((_, i) => i !== index)
    );
  };

  const addAllergy = () => {
    if (currentAllergy.trim()) {
      const current = form.getValues("allergies") || [];
      form.setValue("allergies", [...current, currentAllergy.trim()]);
      setCurrentAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    const current = form.getValues("allergies") || [];
    form.setValue(
      "allergies",
      current.filter((_, i) => i !== index)
    );
  };

  const addVaccine = () => {
    if (currentVaccine.trim()) {
      const current = form.getValues("vaccines") || [];
      form.setValue("vaccines", [...current, currentVaccine.trim()]);
      setCurrentVaccine("");
    }
  };

  const removeVaccine = (index: number) => {
    const current = form.getValues("vaccines") || [];
    form.setValue(
      "vaccines",
      current.filter((_, i) => i !== index)
    );
  };

  const SelectedSpeciesIcon = watchedType
    ? speciesIcons[watchedType as keyof typeof speciesIcons]
    : Heart;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
          <DialogHeader className="relative p-6 pb-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/20 rounded-lg">
                <SelectedSpeciesIcon className="h-6 w-6" />
              </div>
              Editar Paciente
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="p-6 space-y-8"
          >
            {/* Información del Paciente */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Información del Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="flex items-center gap-1 text-sm font-medium"
                    >
                      <Heart className="h-4 w-4" />
                      Nombre del Paciente
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ej: Max, Luna, Rocky..."
                      {...form.register("name")}
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-1 text-sm font-medium">
                      <Stethoscope className="h-4 w-4" />
                      Tipo de Animal
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("type", value as Species)
                      }
                      value={watchedType}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Selecciona el tipo de animal" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(speciesLabels).map(([key, label]) => {
                          const Icon =
                            speciesIcons[key as keyof typeof speciesIcons];
                          return (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.type && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.type.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="breed" className="text-sm font-medium">
                      Raza
                    </Label>
                    <Input
                      id="breed"
                      placeholder="Ej: Golden Retriever, Siamés..."
                      {...form.register("breed")}
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    {form.formState.errors.breed && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.breed.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="birthDate"
                      className="flex items-center gap-1 text-sm font-medium"
                    >
                      <Calendar className="h-4 w-4" />
                      Fecha de Nacimiento
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      {...form.register("birthDate")}
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    {form.formState.errors.birthDate && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.birthDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Género</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("gender", value as Gender)
                      }
                      value={watchedGender}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Selecciona el género" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(genderLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.gender && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.gender.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="weight"
                      className="flex items-center gap-1 text-sm font-medium"
                    >
                      <Weight className="h-4 w-4" />
                      Peso (kg)
                    </Label>
                    <Input
                      id="weight"
                      placeholder="Ej: 25.5"
                      {...form.register("weight")}
                      className="border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    {form.formState.errors.weight && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.weight.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tamaño</Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("size", value as Size)
                      }
                      value={watchedSize}
                    >
                      <SelectTrigger className="border-gray-200 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Selecciona el tamaño" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(sizeLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.size && (
                      <p className="text-red-600 text-sm">
                        {form.formState.errors.size.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="history" className="text-sm font-medium">
                    Historia Clínica (Opcional)
                  </Label>
                  <Textarea
                    id="history"
                    placeholder="Describe el historial médico del paciente..."
                    {...form.register("history")}
                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Selección del Propietario */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Propietario del Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <OwnerSearchSelector
                  owners={owners}
                  selectedOwnerId={watchedOwnerId}
                  onOwnerSelect={handleOwnerSelect}
                  onCreateOwner={() => setIsCreateOwnerModalOpen(true)}
                  error={form.formState.errors.ownerId?.message}
                />
              </CardContent>
            </Card>

            {/* Información Médica */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Información Médica
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Condiciones Médicas */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Condiciones Médicas
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Agregar condición médica..."
                      value={currentCondition}
                      onChange={(e) => setCurrentCondition(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addCondition())
                      }
                      className="flex-1 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Button
                      type="button"
                      onClick={addCondition}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(watchedConditions || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(watchedConditions || []).map((condition, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          {condition}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCondition(index)}
                            className="ml-1 h-4 w-4 p-0 hover:bg-orange-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Alergias */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Alergias</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Agregar alergia..."
                      value={currentAllergy}
                      onChange={(e) => setCurrentAllergy(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addAllergy())
                      }
                      className="flex-1 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                    <Button
                      type="button"
                      onClick={addAllergy}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(watchedAllergies || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {(watchedAllergies || []).map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          {allergy}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAllergy(index)}
                            className="ml-1 h-4 w-4 p-0 hover:bg-red-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vacunación */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isVaccinated"
                      checked={watchedIsVaccinated || false}
                      onCheckedChange={(checked) =>
                        form.setValue("isVaccinated", !!checked)
                      }
                    />
                    <Label
                      htmlFor="isVaccinated"
                      className="text-sm font-medium"
                    >
                      El paciente está vacunado
                    </Label>
                  </div>

                  {(watchedIsVaccinated || false) && (
                    <>
                      <Label className="text-sm font-medium">
                        Vacunas Aplicadas
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Agregar vacuna..."
                          value={currentVaccine}
                          onChange={(e) => setCurrentVaccine(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addVaccine())
                          }
                          className="flex-1 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                        />
                        <Button
                          type="button"
                          onClick={addVaccine}
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {(watchedVaccines || []).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {(watchedVaccines || []).map((vaccine, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {vaccine}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeVaccine(index)}
                                className="ml-1 h-4 w-4 p-0 hover:bg-green-200"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Botones */}
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
                <Heart className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal para crear propietario */}
      <CreateOwnerModal
        isOpen={isCreateOwnerModalOpen}
        onClose={() => setIsCreateOwnerModalOpen(false)}
        onSubmit={handleCreateOwner}
      />
    </>
  );
}
