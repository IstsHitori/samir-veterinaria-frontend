"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import { PatientStatsCards } from "../components/patient-stats-cards";
import { PatientFilters } from "../components/patient-filters";
import { PatientsTable } from "../components/patients-table";
import { CreatePatientModal } from "../components/modals/CreatePatientModal";
import { EditPatientModal } from "../components/modals/EditPatientModal";
import { PatientDetailsModal } from "../components/modals/PatientDetailsModal";

// Hooks
import {
  DeletePatientConfirmationModal,
  DeactivatePatientConfirmationModal,
  ActivatePatientConfirmationModal,
} from "../components/modals/PatientConfirmationModal";
import { ITEMS_PER_PAGE } from "../constants/patient-constants";
import type { CreateOwnerForm } from "@/features/owner/schemas/owner.schema";
import type { CreatePatientForm, Patient } from "../schemas/patient.schema";
import { usePatientFilters } from "../hooks/use-patient-filter";
import { usePatientStats } from "../hooks/use-patient-stats";
import usePatients from "../hooks/usePatients";
import { getAllPatients } from "../services/patient.service";
import { toast } from "react-toastify";
import useOwners from "@/features/owner/hooks/useOwners";
import { getAllOwners } from "@/features/owner/services/owner.service";

export default function PatientsDashboard() {
  //custom hooks

  const { setPatients, patients: mockPatients, createPatient, updatePatient, desactivatePatient, activatePatient, deletePatient } = usePatients();
  const {
    setOwners: setOwnersFetch,
    owners: mockOwners,
    createOwner,
  } = useOwners();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [sizeFilter, setSizeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] =
    useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false);
  const [isActivateConfirmOpen, setIsActivateConfirmOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [patientToDeactivate, setPatientToDeactivate] =
    useState<Patient | null>(null);
  const [patientToActivate, setPatientToActivate] = useState<Patient | null>(
    null
  );

  // Hooks
  const filteredPatients = usePatientFilters({
    patients: mockPatients,
    searchTerm,
    genderFilter,
    sizeFilter,
    statusFilter,
    speciesFilter,
  });

  const stats = usePatientStats(mockPatients);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPatients = filteredPatients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, sizeFilter, statusFilter, speciesFilter]);

  // Handlers
  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = (patient: Patient) => {
    setPatientToDelete(patient);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeactivatePatient = (patient: Patient) => {
    setPatientToDeactivate(patient);
    setIsDeactivateConfirmOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setPatientToEdit(patient);
    setIsEditPatientModalOpen(true);
  };

  const handleActivatePatient = (patient: Patient) => {
    setPatientToActivate(patient);
    setIsActivateConfirmOpen(true);
  };

  // Funciones de cierre simplificadas - solo manejan el cierre
  const closeDeleteModal = () => {
    setIsDeleteConfirmOpen(false);
    setPatientToDelete(null);
  };

  const closeDeactivateModal = () => {
    setIsDeactivateConfirmOpen(false);
    setPatientToDeactivate(null);
  };

  const closeActivateModal = () => {
    setIsActivateConfirmOpen(false);
    setPatientToActivate(null);
  };

  // Funciones de confirmación
  const confirmDeletePatient = async () => {
    try {
      if (!patientToDelete) return;
      const response = await deletePatient(patientToDelete._id)
      toast.success(response)
      await fetchPateints()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      closeDeleteModal();
    }
  };

  const confirmDeactivatePatient = async () => {
    try {
      if (!patientToDeactivate) return;
      const response = await desactivatePatient(patientToDeactivate._id)
      toast.success(response)
      await fetchPateints()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      closeDeactivateModal();
    }
  };

  const confirmActivatePatient = async () => {
    try {
      if (!patientToActivate) return;
      const response = await activatePatient(patientToActivate._id)
      toast.success(response)
      await fetchPateints()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      closeActivateModal();
    }
  };

  const onCreatePatient = async (data: CreatePatientForm) => {
    try {
      // El backend guarda la historia clínica del alta como primer reporte
      const { message } = await createPatient(data);
      toast.success(message);
      await fetchPateints();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsCreatePatientModalOpen(false);
    }
  };

  const onEditPatient = async (data: CreatePatientForm) => {
    try {
      if (!patientToEdit) return;
      const response = await updatePatient(patientToEdit._id, data);
      toast.success(response);
      await fetchPateints();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsEditPatientModalOpen(false);
      setPatientToEdit(null);
    }
  };

  const onCreateOwner = async (data: CreateOwnerForm): Promise<string> => {
    let ownerId: string | null = null;
    try {
      const response = await createOwner(data);
      toast.success(response.message);
      await fetchOwners();
      ownerId = response.ownerId;
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      return "";
    }
    // Aquí iría la lógica real para crear el propietario en la base de datos
    return ownerId;
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const fetchPateints = async () => {
    try {
      const patientsFetched = await getAllPatients();
      setPatients(patientsFetched);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("Error al cargar los pacientes");
      }
    }
  };

  const fetchOwners = async () => {
    try {
      const ownersFetched = await getAllOwners();
      setOwnersFetch(ownersFetched);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("Error al cargar los dueños");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchPateints();
      await fetchOwners();
    };

    fetch();
  }, [setPatients, setOwnersFetch]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Gestión de Pacientes
              </h1>
              <p className="text-gray-600 mt-2">
                Administra los pacientes de tu clínica veterinaria
              </p>
            </div>
            <Button
              onClick={() => setIsCreatePatientModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Paciente
            </Button>
          </div>

          {/* Stats Cards */}
          <PatientStatsCards stats={stats} />

          {/* Filters */}
          <PatientFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            sizeFilter={sizeFilter}
            setSizeFilter={setSizeFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            speciesFilter={speciesFilter}
            setSpeciesFilter={setSpeciesFilter}
          />

          {/* Patients Table */}
          <PatientsTable
            patients={paginatedPatients}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            onViewDetails={handleViewDetails}
            onEditPatient={handleEditPatient}
            onDeactivatePatient={handleDeactivatePatient}
            onActivatePatient={handleActivatePatient}
            onDeletePatient={handleDeletePatient}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Modals - Renderizado condicional */}
        {isDetailsModalOpen && (
          <PatientDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
            patient={selectedPatient}
          />
        )}

        {isCreatePatientModalOpen && (
          <CreatePatientModal
            isOpen={isCreatePatientModalOpen}
            onClose={() => setIsCreatePatientModalOpen(false)}
            onSubmit={onCreatePatient}
            owners={mockOwners}
            onCreateOwner={onCreateOwner}
          />
        )}

        {isEditPatientModalOpen && (
          <EditPatientModal
            isOpen={isEditPatientModalOpen}
            onClose={() => {
              setIsEditPatientModalOpen(false);
              setPatientToEdit(null);
            }}
            onSubmit={onEditPatient}
            patient={patientToEdit}
            owners={mockOwners}
            onCreateOwner={onCreateOwner}
          />
        )}

        {isDeleteConfirmOpen && (
          <DeletePatientConfirmationModal
            isOpen={isDeleteConfirmOpen}
            patient={patientToDelete}
            onConfirm={confirmDeletePatient}
            onCancel={closeDeleteModal}
          />
        )}

        {isDeactivateConfirmOpen && (
          <DeactivatePatientConfirmationModal
            isOpen={isDeactivateConfirmOpen}
            patient={patientToDeactivate}
            onConfirm={confirmDeactivatePatient}
            onCancel={closeDeactivateModal}
          />
        )}

        {isActivateConfirmOpen && (
          <ActivatePatientConfirmationModal
            isOpen={isActivateConfirmOpen}
            patient={patientToActivate}
            onConfirm={confirmActivatePatient}
            onCancel={closeActivateModal}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
