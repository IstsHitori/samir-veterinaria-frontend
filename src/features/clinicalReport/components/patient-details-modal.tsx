import type { Patient } from "@/features/patient/schemas/patient.schema";
import type { PatientClinicalReports as PatientClinicalReport } from "../types/clinicalReport";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  Weight,
  Ruler,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Stethoscope,
  AlertTriangle,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { EditClinicalReportModal } from "./edit-clinical-report-modal";
import { DeleteClinicalReportModal } from "./delete-clinical-report-modal";
import { AddClinicalReportModal } from "./add-clinical-report-modal";
import type {
  CreateClinicalReportForm,
  EditClinicalReportForm,
} from "../schemas/clinical-report.schema";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  useCreateClinicalReport,
  useDeleteClinicalReport,
  usePatientReports,
  useUpdateClinicalReport,
} from "../hooks/use-patient-reports";

interface PatientDetailsModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

const REPORTS_PER_PAGE = 3;

export function PatientDetailsModal({
  patient,
  isOpen,
  onClose,
}: PatientDetailsModalProps) {
  const { user: currentUser } = useAuth();
  const {
    data: clinicalReports = [],
    isLoading: isLoadingReports,
    isError: isReportsError,
    error: reportsError,
  } = usePatientReports(patient?._id, isOpen);
  const { mutateAsync: createReport } = useCreateClinicalReport();
  const { mutateAsync: updateReport } = useUpdateClinicalReport();
  const { mutateAsync: deleteReport } = useDeleteClinicalReport();

  const [currentReportPage, setCurrentReportPage] = useState(1);
  const [selectedReport, setSelectedReport] =
    useState<PatientClinicalReport | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const totalReportPages =
    Math.ceil(clinicalReports.length / REPORTS_PER_PAGE) || 1;

  // Si la página actual deja de existir (crear/eliminar), volver a la última válida
  useEffect(() => {
    if (currentReportPage > totalReportPages) {
      setCurrentReportPage(totalReportPages);
    }
  }, [currentReportPage, totalReportPages]);

  if (!patient) return null;
  if (!currentUser) return null;

  const startReportIndex = (currentReportPage - 1) * REPORTS_PER_PAGE;
  const endReportIndex = startReportIndex + REPORTS_PER_PAGE;
  const currentReports = clinicalReports.slice(
    startReportIndex,
    endReportIndex
  );

  const handleReportPageChange = (page: number) => {
    setCurrentReportPage(page);
  };

  const handleModalClose = () => {
    setCurrentReportPage(1);
    onClose();
  };

  const handleEditReport = (report: PatientClinicalReport) => {
    setSelectedReport(report);
    setIsEditModalOpen(true);
  };

  const handleDeleteReport = (report: PatientClinicalReport) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEditedReport = async (
    reportId: string,
    data: EditClinicalReportForm
  ) => {
    await updateReport({ reportId, data });
    setIsEditModalOpen(false);
    setSelectedReport(null);
  };

  const handleConfirmDeleteReport = async (reportId: string) => {
    await deleteReport(reportId);
    setIsDeleteModalOpen(false);
    setSelectedReport(null);
  };

  const handleSaveNewReport = async (newReport: CreateClinicalReportForm) => {
    await createReport(newReport);
    setIsAddModalOpen(false);
  };

  const canEditReport = (report: PatientClinicalReport) => {
    return report.userId?._id === currentUser._id;
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

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();

    if (years > 0) {
      return `${years} año${years > 1 ? "s" : ""}`;
    } else {
      return `${months} mes${months > 1 ? "es" : ""}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent sm:text-2xl">
              Detalles del Paciente
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[calc(90vh-120px)]">
            <div className="space-y-6 pr-4">
              {/* Información Principal del Paciente */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <Avatar className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-600">
                      <AvatarFallback className="text-white text-2xl">
                        {getSpeciesIcon(patient.type)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
                        {patient.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge
                          className={`${getSpeciesColor(
                            patient.type
                          )} font-medium`}
                        >
                          {patient.type}
                        </Badge>
                        <Badge variant="outline">{patient.breed}</Badge>
                        <Badge
                          variant={patient.isActive ? "default" : "secondary"}
                        >
                          {patient.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Edad</p>
                        <p className="font-medium">
                          {calculateAge(patient.birthDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Weight className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Peso</p>
                        <p className="font-medium">{patient.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Ruler className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Tamaño</p>
                        <p className="font-medium capitalize">{patient.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart
                        className={`h-5 w-5 ${
                          patient.isVaccinated
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <div>
                        <p className="text-sm text-gray-500">Vacunación</p>
                        <p className="font-medium">
                          {patient.isVaccinated ? "Al día" : "Pendiente"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información del Propietario */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <span>Información del Propietario</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Nombre</p>
                        <p className="font-medium">{patient.ownerId.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-medium">
                          {patient.ownerId.telephone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{patient.ownerId.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Dirección</p>
                        <p className="font-medium">{patient.ownerId.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información Médica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Condiciones Médicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <span>Condiciones Médicas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.medicalConditions.length > 0 ? (
                      <div className="space-y-2">
                        {patient.medicalConditions.map((condition, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="mr-2 mb-2"
                          >
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Sin condiciones médicas registradas
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Alergias */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-red-500" />
                      <span>Alergias</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {patient.allergies.length > 0 ? (
                      <div className="space-y-2">
                        {patient.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="mr-2 mb-2 border-red-200 text-red-700"
                          >
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Sin alergias registradas
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Historial Clínico */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-green-500" />
                      <span className="text-lg font-semibold">
                        Historial Clínico
                      </span>
                      <Badge variant="secondary">
                        {clinicalReports.length} reportes
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-green-800 hover:shadow-xl sm:w-auto"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Nueva Historia Clínica
                      </Button>
                      {clinicalReports.length > REPORTS_PER_PAGE && (
                        <div className="text-sm text-gray-500">
                          Mostrando {startReportIndex + 1}-
                          {Math.min(endReportIndex, clinicalReports.length)} de{" "}
                          {clinicalReports.length}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingReports ? (
                    <div className="flex items-center justify-center py-8 text-gray-500">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mr-3" />
                      Cargando historias clínicas...
                    </div>
                  ) : isReportsError ? (
                    <p className="text-center py-8 text-red-600">
                      {reportsError instanceof Error
                        ? reportsError.message
                        : "No se pudieron cargar las historias clínicas"}
                    </p>
                  ) : currentReports.length > 0 ? (
                    <div className="space-y-4">
                      {currentReports.map((report) => (
                        <div
                          key={report._id}
                          className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="font-medium text-gray-900">
                                {report.userId?.firstName}{" "}
                                {report.userId?.lastName}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {report.userId?.role}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{formatDate(report.createdAt)}</span>
                              </div>
                              {canEditReport(report) && (
                                <div className="flex items-center space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditReport(report)}
                                    className="h-8 w-8 p-0 hover:bg-blue-100"
                                  >
                                    <Edit className="h-4 w-4 text-blue-600" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteReport(report)}
                                    className="h-8 w-8 p-0 hover:bg-red-100"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {report.details}
                          </p>
                        </div>
                      ))}

                      {totalReportPages > 1 && (
                        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-sm text-gray-500">
                            Página {currentReportPage} de {totalReportPages}
                          </div>
                          <div className="flex flex-wrap items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleReportPageChange(currentReportPage - 1)
                              }
                              disabled={currentReportPage === 1}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {Array.from(
                              { length: totalReportPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <Button
                                key={page}
                                variant={
                                  currentReportPage === page
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => handleReportPageChange(page)}
                                className="h-8 w-8 p-0"
                              >
                                {page}
                              </Button>
                            ))}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleReportPageChange(currentReportPage + 1)
                              }
                              disabled={currentReportPage === totalReportPages}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        No hay reportes clínicos registrados
                      </p>
                      <Button
                        onClick={() => setIsAddModalOpen(true)}
                        variant="outline"
                        className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Primera Historia Clínica
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Modals for editing, deleting and adding clinical reports */}
      <EditClinicalReportModal
        report={selectedReport}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedReport(null);
        }}
        onSave={handleSaveEditedReport}
      />

      <DeleteClinicalReportModal
        report={selectedReport}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedReport(null);
        }}
        onConfirm={handleConfirmDeleteReport}
      />

      <AddClinicalReportModal
        patient={patient}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewReport}
      />
    </>
  );
}
