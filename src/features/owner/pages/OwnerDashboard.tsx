import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

// Data and Types
import type { OwnerWithPatients } from "../schemas/owner.schema";
import type { UpdateOwnerForm, CreateOwnerForm } from "../schemas/owner.schema";

// Components
import { OwnerStatsCards } from "../components/owner-stats-cards";
import { OwnerFilters } from "../components/owner-filters";
import { OwnersTable } from "../components/owners-table";
import { OwnerDetailsModal } from "../components/owner-details-modal";
import { EditOwnerModal } from "../components/edit-owner-modal";
import { CreateOwnerModal } from "@/features/patient/components/modals/CreateOwnerModal";

// Hooks
import { useOwnerStats } from "../hooks/owner-stats";

import { toast } from "react-toastify";
import { getAllOwnersWithPatients } from "../services/owner.service";
import useOwners from "../hooks/useOwners";

// Constants
const ITEMS_PER_PAGE = 5;

export default function OwnersDashboard() {
  // State
  const [owners, setOwners] = useState<OwnerWithPatients[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOwner, setSelectedOwner] = useState<OwnerWithPatients | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateOwnerModalOpen, setIsCreateOwnerModalOpen] = useState(false);
  const [petsFilter, setPetsFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Hooks
  const { updateOwner, createOwner } = useOwners();
  const stats = useOwnerStats(owners);

  const filteredOwners = useMemo(() => {
    let filtered = owners.filter(
      (owner) =>
        owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.document.includes(searchTerm) ||
        owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.telephone.includes(searchTerm)
    );

    // Filter by number of pets
    if (petsFilter !== "all") {
      if (petsFilter === "none") {
        filtered = filtered.filter((owner) => owner.patients.length === 0);
      } else if (petsFilter === "single") {
        filtered = filtered.filter((owner) => owner.patients.length === 1);
      } else if (petsFilter === "multiple") {
        filtered = filtered.filter((owner) => owner.patients.length > 1);
      }
    }

    // Sort owners
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "pets":
          return b.patients.length - a.patients.length;
        case "recent":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [owners, searchTerm, petsFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOwners.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOwners = filteredOwners.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, petsFilter, sortBy]);

  // Handlers
  const handleViewDetails = (owner: OwnerWithPatients) => {
    setSelectedOwner(owner);
    setIsDetailsModalOpen(true);
  };

  const handleEditOwner = (owner: OwnerWithPatients) => {
    setSelectedOwner(owner);
    setIsEditModalOpen(true);
  };

  const handleUpdateOwner = async (ownerId: string, data: UpdateOwnerForm) => {
    try {
      const message = await updateOwner(ownerId, data);
      toast.success(message);
      await fetchOwners();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsEditModalOpen(false);
      setSelectedOwner(null);
    }
  };

  const handleCreateOwner = async (data: CreateOwnerForm) => {
    try {
      const response = await createOwner(data);
      toast.success(response.message || "Propietario creado exitosamente");
      await fetchOwners(); // Recargar la lista desde el servidor
      setIsCreateOwnerModalOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al crear el propietario");
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOwner(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedOwner(null);
  };

  const fetchOwners = async () => {
    try {
      const ownersFetched = await getAllOwnersWithPatients();
      setOwners(ownersFetched);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchOwners();
    };
    fetch();
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Gestión de Propietarios
              </h1>
              <p className="text-gray-600 mt-2">
                Administra los propietarios de tu clínica veterinaria
              </p>
            </div>
            <Button
              onClick={() => setIsCreateOwnerModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Propietario
            </Button>
          </div>

          {/* Stats Cards */}
          <OwnerStatsCards stats={stats} />

          {/* Filters */}
          <OwnerFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            petsFilter={petsFilter}
            setPetsFilter={setPetsFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Owners Table */}
          <OwnersTable
            owners={paginatedOwners}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            onViewDetails={handleViewDetails}
            onEditOwner={handleEditOwner}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Modals - Conditional rendering */}
        {isDetailsModalOpen && (
          <OwnerDetailsModal
            owner={selectedOwner}
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
          />
        )}

        {isEditModalOpen && (
          <EditOwnerModal
            owner={selectedOwner}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onUpdate={handleUpdateOwner}
          />
        )}

        {isCreateOwnerModalOpen && (
          <CreateOwnerModal
            isOpen={isCreateOwnerModalOpen}
            onClose={() => setIsCreateOwnerModalOpen(false)}
            onSubmit={handleCreateOwner}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
