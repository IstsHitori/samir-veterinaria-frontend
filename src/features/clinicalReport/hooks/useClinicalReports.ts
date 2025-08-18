import { useClinicalReportStore } from "../store/clinicalReport.store";

export default function useClinicalReports() {
  const getPatientReports = useClinicalReportStore(
    (state) => state.getPatientReports
  );

  return { getPatientReports };
}
