import {
  Heart,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Weight,
  Shield,
  AlertTriangle,
  Stethoscope,
  Clock,
  UserCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Patient } from "../../schemas/patient.schema";
import { formatDate } from "@/shared/utils";
import { usePatientReports } from "@/features/clinicalReport/hooks/use-patient-reports";
import { FileText } from "lucide-react";
import {
  getPatientInitials,
  calculateAge,
  getSpeciesIcon,
} from "../../utils/patient-utils";
import {
  genderColors,
  genderLabels,
  sizeColors,
  sizeLabels,
  speciesColors,
  speciesLabels,
  speciesIcons,
} from "../../constants/patient-constants";

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export function PatientDetailsModal({
  isOpen,
  onClose,
  patient,
}: PatientDetailsModalProps) {
  const {
    data: clinicalReports = [],
    isLoading: isLoadingReports,
    isError: isReportsError,
    error: reportsError,
  } = usePatientReports(patient?._id, isOpen);

  if (!patient) return null;

  const speciesKey = getSpeciesIcon(patient.type);
  const SpeciesIcon = speciesIcons[speciesKey as keyof typeof speciesIcons] || speciesIcons.otro;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50/30 p-0">
        {/* Header */}
        <DialogHeader className="relative p-6 pb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-green-600/10 to-purple-600/10 rounded-t-lg"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative flex-shrink-0">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 ring-4 ring-white shadow-xl">
                <AvatarImage
                  src={`/placeholder.svg?height=96&width=96&query=${patient.name} ${patient.type}`}
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-600 text-white text-xl sm:text-2xl font-bold">
                  {getPatientInitials(patient.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg">
                <SpeciesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 break-words">
                {patient.name}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge
                  className={`${
                    speciesColors[patient.type]
                  } font-semibold text-sm px-3 py-1 flex items-center gap-1`}
                >
                  <SpeciesIcon className="h-4 w-4" />
                  {speciesLabels[patient.type]}
                </Badge>
                <Badge
                  className={`${
                    genderColors[patient.gender]
                  } font-semibold text-sm px-3 py-1`}
                >
                  {genderLabels[patient.gender]}
                </Badge>
                <Badge
                  className={`${
                    sizeColors[patient.size]
                  } font-semibold text-sm px-3 py-1`}
                >
                  {sizeLabels[patient.size]}
                </Badge>
                <Badge
                  className={
                    patient.isActive
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-3 py-1"
                      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold px-3 py-1"
                  }
                >
                  {patient.isActive ? "Activo" : "Inactivo"}
                </Badge>
                {patient.isVaccinated && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-3 py-1 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Vacunado
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Stethoscope className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">
                  {patient.breed}
                </span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm sm:text-base">
                  {calculateAge(patient.birthDate)}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-blue-100 text-xs font-medium">Peso</p>
                    <p className="text-white text-lg font-bold">
                      {patient.weight} kg
                    </p>
                  </div>
                  <Weight className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600">
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-green-100 text-xs font-medium">Edad</p>
                    <p className="text-white text-lg font-bold">
                      {calculateAge(patient.birthDate)}
                    </p>
                  </div>
                  <Calendar className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-purple-100 text-xs font-medium">
                      Vacunas
                    </p>
                    <p className="text-white text-lg font-bold">
                      {patient.vaccines.length}
                    </p>
                  </div>
                  <Shield className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-orange-100 text-xs font-medium">
                      Condiciones
                    </p>
                    <p className="text-white text-lg font-bold">
                      {patient.medicalConditions.length}
                    </p>
                  </div>
                  <AlertTriangle className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Owner Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl p-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white m-0 rounded-none p-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <User className="h-5 w-5" />
                  </div>
                  Información del Propietario
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <User className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Nombre Completo
                    </p>
                    <p className="font-semibold text-gray-900 text-lg">
                      {patient.ownerId.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Doc: {patient.ownerId.document}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Teléfono
                      </p>
                      <p className="font-medium text-gray-900">
                        {patient.ownerId.telephone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">Email</p>
                      <p className="font-medium text-gray-900 break-all">
                        {patient.ownerId.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-gray-600 flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500 font-medium">
                        Dirección
                      </p>
                      <p className="font-medium text-gray-900">
                        {patient.ownerId.address}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl p-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white m-0 rounded-none p-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  Información Médica
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Medical Conditions */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Condiciones Médicas
                  </h4>
                  {patient.medicalConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalConditions.map((condition, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Sin condiciones médicas registradas
                    </p>
                  )}
                </div>

                <Separator />

                {/* Allergies */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Alergias
                  </h4>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Sin alergias registradas
                    </p>
                  )}
                </div>

                <Separator />

                {/* Vaccines */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    Vacunas Aplicadas
                  </h4>
                  {patient.vaccines.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.vaccines.map((vaccine, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {vaccine}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      Sin vacunas registradas
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medical History */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl p-0">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white m-0 rounded-none p-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Heart className="h-5 w-5" />
                </div>
                Historia Clínica
                <Badge variant="secondary" className="ml-auto">
                  {clinicalReports.length} reportes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isLoadingReports ? (
                <div className="flex items-center justify-center py-6 text-gray-500">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent mr-3" />
                  Cargando historias clínicas...
                </div>
              ) : isReportsError ? (
                <p className="text-sm text-red-600">
                  {reportsError instanceof Error
                    ? reportsError.message
                    : "No se pudieron cargar las historias clínicas"}
                </p>
              ) : clinicalReports.length > 0 ? (
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
                  {clinicalReports.map((report) => (
                    <div
                      key={report._id}
                      className="rounded-lg p-4 border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {report.userId?.firstName} {report.userId?.lastName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(report.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap break-words">
                        {report.details}
                      </p>
                    </div>
                  ))}
                </div>
              ) : patient.history ? (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-500">
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    Historia registrada al crear el paciente
                  </p>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    {patient.history}
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    No hay historia clínica registrada para este paciente.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Registration Info */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-xl p-0">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white m-0 rounded-none p-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                Información de Registro
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border-l-4 border-teal-500">
                  <UserCheck className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Registrado por
                    </p>
                    <p className="font-semibold text-gray-900">
                      {patient.registeredBy.firstName}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">
                      {patient.registeredBy.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                  <Calendar className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Fecha de Registro
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatDate(patient.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-500">
                  <Clock className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Última Actualización
                    </p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatDate(patient.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
