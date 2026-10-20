import { useState, useMemo, useEffect } from "react";
import usePatients from "@/features/patient/hooks/usePatients";

const ITEMS_PER_PAGE = 5;

export function useMedicalReports() {
  const { patients } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  const activePatientCount = useMemo(() => {
    return filteredPatients.filter((patient) => patient.isActive).length;
  }, [filteredPatients]);

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSpecies, patients.length]);

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
    activePatientCount,
    handleSearchChange,
    handleSpeciesChange,
    setCurrentPage,
  };
}
