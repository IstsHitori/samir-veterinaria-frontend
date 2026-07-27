import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  Shield,
  AlertTriangle,
  Pencil,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { Patient } from "../schemas/patient.schema";
import {
  genderColors,
  genderLabels,
  sizeColors,
  sizeLabels,
  speciesColors,
  speciesLabels,
  speciesIcons,
} from "../constants/patient-constants";
import {
  getPatientInitials,
  calculateAge,
  getSpeciesIcon,
} from "../utils/patient-utils";

interface PatientsTableProps {
  patients: Patient[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  onViewDetails: (patient: Patient) => void;
  onEditPatient: (patient: Patient) => void;
  onDeactivatePatient: (patient: Patient) => void;
  onActivatePatient: (patient: Patient) => void;
  onDeletePatient: (patient: Patient) => void;
  onPageChange: (page: number) => void;
}

export function PatientsTable({
  patients,
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  onViewDetails,
  onEditPatient,
  onDeactivatePatient,
  onActivatePatient,
  onDeletePatient,
  onPageChange,
}: PatientsTableProps) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Heart className="h-5 w-5 text-blue-600" />
          Lista de Pacientes
        </CardTitle>
        <CardDescription>
          Mostrando {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, patients.length)} de{" "}
          {patients.length} pacientes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  Paciente
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Propietario
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Especie
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Raza
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Edad
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Género
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Tamaño
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Estado
                </TableHead>
                <TableHead className="text-right font-semibold text-gray-700">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => {
                const speciesKey = getSpeciesIcon(patient.type);
                const SpeciesIcon = speciesIcons[speciesKey as keyof typeof speciesIcons] || speciesIcons.otro;
                return (
                  <TableRow
                    key={patient._id}
                    className="hover:bg-blue-50/50 transition-colors border-gray-100"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&query=${patient.name} ${patient.type}`}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-semibold">
                            {getPatientInitials(patient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            {patient.name}
                            <SpeciesIcon className="h-4 w-4 text-gray-500" />
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {patient._id}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {patient.ownerId.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {patient.ownerId.telephone}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${
                          speciesColors[patient.type]
                        } font-medium flex items-center gap-1 w-fit`}
                      >
                        <SpeciesIcon className="h-3 w-3" />
                        {speciesLabels[patient.type]}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm font-medium text-gray-700">
                        {patient.breed}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-sm font-medium text-gray-700">
                        {calculateAge(patient.birthDate)}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${
                          genderColors[patient.gender]
                        } font-medium flex items-center gap-1 w-fit`}
                      >
                        {genderLabels[patient.gender]}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${
                          sizeColors[patient.size]
                        } font-medium flex items-center gap-1 w-fit`}
                      >
                        {sizeLabels[patient.size]}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={patient.isActive ? "default" : "secondary"}
                          className={
                            patient.isActive
                              ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200 font-medium"
                              : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border-gray-200 font-medium"
                          }
                        >
                          {patient.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                        <TooltipProvider>
                          {patient.isVaccinated ? (
                            <Tooltip>
                              <TooltipTrigger>
                                <Shield className="h-4 w-4 text-green-600" />
                              </TooltipTrigger>
                              <TooltipContent>Vacunas al día</TooltipContent>
                            </Tooltip>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger>
                                <AlertTriangle className="h-4 w-4 text-orange-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                Vacunas pendientes
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => onViewDetails(patient)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditPatient(patient)}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Pencil className="h-4 w-4" />
                            Editar paciente
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              patient.isActive
                                ? onDeactivatePatient(patient)
                                : onActivatePatient(patient)
                            }
                            className="flex items-center gap-2"
                          >
                            {patient.isActive ? (
                              <>
                                <XCircle className="h-4 w-4" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Activar
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onDeletePatient(patient)}
                            className="text-red-600 flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Eliminar paciente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "hover:bg-blue-50"
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
