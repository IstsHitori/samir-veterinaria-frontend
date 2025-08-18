import { create } from "zustand";
import type { PatientClinicalReports } from "../types/clinicalReport";
import {
  craetePatientReport,
  getPatientReports,
} from "../services/medical-reports.service";
import type { CreateClinicalReportForm } from "../schemas/clinical-report.schema";

interface ClinicalReportStore {
  getPatientReports: (id: string) => Promise<PatientClinicalReports[]>;
  createPatientReport: (data: CreateClinicalReportForm) => Promise<string>;
}

export const useClinicalReportStore = create<ClinicalReportStore>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (set, get) => ({
    getPatientReports: async (id) => {
      return await getPatientReports(id);
    },
    createPatientReport: async (data) => {
      return await craetePatientReport(data);
    },
  })
);
