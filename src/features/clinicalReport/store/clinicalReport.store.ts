import { create } from "zustand";
import type { PatientClinicalReports } from "../types/clinicalReport";
import {
  craetePatientReport,
  getPatientReports,
  updatePatientReport,
} from "../services/medical-reports.service";
import type {
  CreateClinicalReportForm,
  EditClinicalReportForm,
} from "../schemas/clinical-report.schema";

interface ClinicalReportStore {
  getPatientReports: (id: string) => Promise<PatientClinicalReports[]>;
  createPatientReport: (data: CreateClinicalReportForm) => Promise<string>;
  updatePatientReport: (
    reportId: string,
    data: EditClinicalReportForm
  ) => Promise<string>;
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
    updatePatientReport: async (reportId, data) => {
      return await updatePatientReport(reportId, data);
    },
  })
);
