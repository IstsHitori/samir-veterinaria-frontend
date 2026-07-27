import { usePatientStore } from "../store/patient.store";

export default function usePatients() {
  const patients = usePatientStore((state) => state.patients);
  const setPatients = usePatientStore((state) => state.setPatients);
  const createPatient = usePatientStore((state) => state.createPatient);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const desactivatePatient = usePatientStore(
    (state) => state.desactivatePatient
  );
  const activatePatient = usePatientStore((state) => state.activatePatient);
  const deletePatient = usePatientStore((state) => state.deletePatient);
  return {
    patients,
    setPatients,
    createPatient,
    updatePatient,
    desactivatePatient,
    activatePatient,
    deletePatient,
  };
}
