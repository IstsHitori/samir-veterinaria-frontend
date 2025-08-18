import { useClinicalReportStore } from "../store/clinicalReport.store";

export default function useClinicalReports() {
  const getPatientReports = useClinicalReportStore(
    (state) => state.getPatientReports
  );
  const createPatientReport = useClinicalReportStore(
    (state) => state.createPatientReport
  );

  const updatePatientReport = useClinicalReportStore(
    (state) => state.updatePatientReport
  );

  const deletePatientReport = useClinicalReportStore(
    (state) => state.deletePatientReport
  );

  return {
    getPatientReports,
    createPatientReport,
    updatePatientReport,
    deletePatientReport,
  };
}
