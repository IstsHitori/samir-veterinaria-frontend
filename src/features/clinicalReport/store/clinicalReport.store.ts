import { create } from "zustand";
import type { PatientClinicalReports } from "../types/clinicalReport";
import { getPatientReports } from "../services/medical-reports.service";

interface ClinicalReportStore {
  getPatientReports: (id: string) => Promise<PatientClinicalReports[]>;
  
}

export const useClinicalReportStore = create<ClinicalReportStore>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (set, get) => ({
    getPatientReports: async (id) => {
      return await getPatientReports(id);
    },
  })
);
