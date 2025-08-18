import { useState, useMemo, useCallback, useEffect } from "react";
import type { PatientClinicalReports } from "../types/clinicalReport";
import usePatients from "@/features/patient/hooks/usePatients";
import useClinicalReports from "./useClinicalReports";

export function useMedicalReports() {
  const { patients } = usePatients();
  const { getPatientReports } = useClinicalReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [clinicalReportsCache, setClinicalReportsCache] = useState<
    Record<string, PatientClinicalReports[]>
  >({});
  const [loadingReports, setLoadingReports] = useState<Record<string, boolean>>(
    {}
  );
  const ITEMS_PER_PAGE = 5;
  
  // Filtrar pacientes
  const filteredPatients = useMemo(() => {
    if (!patients || patients.length === 0) {
      return [];
    }
    
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.ownerId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.breed.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecies =
        selectedSpecies === "all" || patient.type === selectedSpecies;

      return matchesSearch && matchesSpecies && patient.isActive;
    });
  }, [patients, searchTerm, selectedSpecies]);

  // Paginación
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset page when filters change or patients load/change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSpecies, patients.length]);

  // Obtener reportes clínicos por paciente
  const getClinicalReports = useCallback(
    async (patientId: string): Promise<PatientClinicalReports[]> => {
      // Return cached data if available
      if (clinicalReportsCache[patientId]) {
        return clinicalReportsCache[patientId];
      }

      // Return empty array if already loading
      if (loadingReports[patientId]) {
        return [];
      }

      try {
        setLoadingReports((prev) => ({ ...prev, [patientId]: true }));
        console.log("[v0] Fetching clinical reports for patient:", patientId);

        const reports = await getPatientReports(patientId);

        // Cache the results
        setClinicalReportsCache((prev) => ({ ...prev, [patientId]: reports }));

        return reports;
      } catch (error) {
        console.error("[v0] Error fetching clinical reports:", error);
        return [];
      } finally {
        setLoadingReports((prev) => ({ ...prev, [patientId]: false }));
      }
    },
    [clinicalReportsCache, loadingReports]
  );

  const getClinicalReportsSync = useCallback(
    (patientId: string): PatientClinicalReports[] => {
      return clinicalReportsCache[patientId] || [];
    },
    [clinicalReportsCache]
  );

  const isLoadingReports = useCallback(
    (patientId: string): boolean => {
      return loadingReports[patientId] || false;
    },
    [loadingReports]
  );

  // Reset página cuando cambian los filtros
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSpeciesChange = (value: string) => {
    setSelectedSpecies(value);
    setCurrentPage(1);
  };

  return {
    patients: paginatedPatients,
    searchTerm,
    selectedSpecies,
    currentPage,
    totalPages,
    startIndex,
    itemsPerPage: ITEMS_PER_PAGE,
    totalPatients: filteredPatients.length,
    handleSearchChange,
    handleSpeciesChange,
    setCurrentPage,
    getClinicalReports,
    getClinicalReportsSync,
    isLoadingReports,
  };
}
