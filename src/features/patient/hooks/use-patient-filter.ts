import { useMemo } from "react";
import type { Patient } from "../schemas/patient.schema";

interface UsePatientFiltersProps {
  patients: Patient[];
  searchTerm: string;
  genderFilter: string;
  sizeFilter: string;
  statusFilter: string;
  speciesFilter: string;
}

export const usePatientFilters = ({
  patients,
  searchTerm,
  genderFilter,
  sizeFilter,
  statusFilter,
  speciesFilter,
}: UsePatientFiltersProps) => {
  return useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.ownerId.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "all" || patient.gender === genderFilter;
      const matchesSize = sizeFilter === "all" || patient.size === sizeFilter;
      const matchesSpecies =
        speciesFilter === "all" || patient.type === speciesFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && patient.isActive) ||
        (statusFilter === "inactive" && !patient.isActive);

      return (
        matchesSearch &&
        matchesGender &&
        matchesSize &&
        matchesSpecies &&
        matchesStatus &&
        !patient.isDeleted
      );
    });
  }, [
    patients,
    searchTerm,
    genderFilter,
    sizeFilter,
    speciesFilter,
    statusFilter,
  ]);
};
