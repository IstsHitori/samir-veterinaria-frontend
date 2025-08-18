import { create } from "zustand";
import type { CreatePatientForm, Patient } from "../schemas/patient.schema";
import {
  activatePatient,
  createPatient,
  deletePatient,
  desactivatePatient,
} from "../services/patient.service";

interface PatientStore {
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  createPatient: (patient: CreatePatientForm) => Promise<string>;
  desactivatePatient: (patientId: string) => Promise<string>;
  activatePatient: (patientId: string) => Promise<string>;
  deletePatient: (patientId: string) => Promise<string>;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: [],
  setPatients: (patients) => set({ patients }),
  createPatient: async (patient) => {
    return await createPatient(patient);
  },
  desactivatePatient: async (patientId) => {
    return await desactivatePatient(patientId);
  },
  activatePatient: async (patientId) => {
    return await activatePatient(patientId);
  },
  deletePatient: async (patientId) => {
    return await deletePatient(patientId);
  },
}));
