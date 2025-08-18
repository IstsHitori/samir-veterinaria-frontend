import { useEffect, useState } from "react";
import type { Patient } from "@/features/patient/schemas/patient.schema";
import { useMedicalReports } from "../hooks/useMedicalRerpots";
import { PatientMedicalCard } from "../components/patient-medical-card";
import { PatientDetailsModal } from "../components/patient-details-modal";
import { AddClinicalReportWithSearchModal } from "../components/add-clinical-report-with-search-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Stethoscope,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Species } from "@/features/patient/schemas/patient.schema";
import type { PatientClinicalReports } from "../types/clinicalReport";
import { getAllPatients } from "@/features/patient/services/patient.service";
import usePatients from "@/features/patient/hooks/usePatients";
import { toast } from "react-toastify";
import { useMemo } from "react";

export default function MedicalReportsDashboard() {
  const { setPatients } = usePatients();
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    patients,
    searchTerm,
    selectedSpecies,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage,
    handleSearchChange,
    handleSpeciesChange,
    setCurrentPage,
    getClinicalReportsSync,
    updateReportCache,
  } = useMedicalReports();

  // Fetch patients first
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsFetched = await getAllPatients();
        setPatients(patientsFetched);
        setIsLoaded(true);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${error.message}`);
        } else {
          toast.error("Error al cargar los pacientes");
        }
        setIsLoaded(true);
      }
    };

    fetchPatients();
  }, [setPatients]);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [clinicalReports, setClinicalReports] = useState<
    PatientClinicalReports[]
  >([]);

  const handleViewDetails = async (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);

    console.log("[v0] Loading clinical reports for patient:", patient._id);
    try {
      // Usar updateReportCache en lugar de getClinicalReports para asegurar datos frescos
      const reports = await updateReportCache(patient._id);
      setClinicalReports(reports);
      console.log(reports);
    } catch (error) {
      console.error("[v0] Error loading clinical reports:", error);
      setClinicalReports([]);
    }
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedPatient(null);
    setClinicalReports([]);
  };

  const totalPatients = useMemo(() => patients.length, [patients]);

  // Show loading state while patients are being fetched
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <h2 className="text-xl font-semibold">Cargando pacientes...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-emerald-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl space-y-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-white shadow-xl">
          <div className="absolute inset-0 bg-[url('/placeholder-di6ki.png')] opacity-10"></div>
          <div className="relative flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Reportes Médicos</h1>
                  <p className="text-cyan-100 text-lg mt-2">
                    Sistema integral de historias clínicas veterinarias
                  </p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsAddReportModalOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nueva Historia Clínica
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                    Total Pacientes
                  </p>
                  <p className="text-3xl font-bold mt-2">{totalPatients}</p>
                  <p className="text-blue-200 text-xs mt-1">
                    Registrados en sistema
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">
                    Con Historias
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {
                      patients.filter(
                        (p) => getClinicalReportsSync(p._id).length > 0
                      ).length
                    }
                  </p>
                  <p className="text-emerald-200 text-xs mt-1">
                    Tienen reportes médicos
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">
                    Activos
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {patients.filter((p) => p.isActive).length}
                  </p>
                  <p className="text-purple-200 text-xs mt-1">
                    En tratamiento actual
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">
                    Promedio
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {totalPatients > 0
                      ? Math.round(
                          (patients.reduce(
                            (acc, p) =>
                              acc + getClinicalReportsSync(p._id).length,
                            0
                          ) /
                            totalPatients) *
                            10
                        ) / 10
                      : 0}
                  </p>
                  <p className="text-orange-200 text-xs mt-1">
                    Reportes por paciente
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-card-foreground">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Filter className="h-5 w-5 text-primary" />
              </div>
              <span>Filtros y Búsqueda</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Buscar paciente
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nombre, propietario, raza..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 bg-input border-border focus:ring-ring"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Filtrar por especie
                </label>
                <Select
                  value={selectedSpecies}
                  onValueChange={handleSpeciesChange}
                >
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Todas las especies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las especies</SelectItem>
                    {Object.values(Species).map((species) => (
                      <SelectItem key={species} value={species}>
                        {species.charAt(0).toUpperCase() + species.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-card-foreground">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-secondary" />
                </div>
                <span>Pacientes Registrados</span>
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-secondary/10 text-secondary border-secondary/20"
              >
                {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, totalPatients)} de{" "}
                {totalPatients}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {patients.length > 0 ? (
              <div className="space-y-4">
                {patients.map((patient) => (
                  <PatientMedicalCard
                    key={patient._id}
                    patient={patient}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="p-4 bg-muted/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No se encontraron pacientes
                </h3>
                <p className="text-muted-foreground">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground font-medium">
                  Página {currentPage} de {totalPages}
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "border-border hover:bg-accent hover:text-accent-foreground"
                        }
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal de Detalles del Paciente */}
        <PatientDetailsModal
          patient={selectedPatient}
          clinicalReports={clinicalReports}
          isOpen={isDetailsModalOpen}
          onClose={handleCloseModal}
        />

        <AddClinicalReportWithSearchModal
          isOpen={isAddReportModalOpen}
          onClose={() => setIsAddReportModalOpen(false)}
        />
      </div>
    </div>
  );
}
