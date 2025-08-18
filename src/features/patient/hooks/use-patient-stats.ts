"use client";

import { useMemo } from "react";
import type { Patient } from "../schemas/patient.schema";

export const usePatientStats = (patients: Patient[]) => {
  return useMemo(() => {
    const activePatients = patients.filter((p) => p.isActive && !p.isDeleted);
    const totalPatients = patients.filter((p) => !p.isDeleted);
    const vaccinatedCount = totalPatients.filter((p) => p.isVaccinated).length;
    const dogCount = totalPatients.filter((p) => p.type === "perro").length;
    const catCount = totalPatients.filter((p) => p.type === "gato").length;
    const otherCount = totalPatients.filter(
      (p) => !["perro", "gato"].includes(p.type)
    ).length;

    return {
      total: totalPatients.length,
      active: activePatients.length,
      vaccinated: vaccinatedCount,
      dogs: dogCount,
      cats: catCount,
      others: otherCount,
    };
  }, [patients]);
};
