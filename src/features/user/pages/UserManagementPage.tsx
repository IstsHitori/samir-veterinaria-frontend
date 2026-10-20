import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

// Hooks
import { useUserFilters } from "../hooks/use-user-filters";
import { useUserStats } from "../hooks/use-user-stats";
import useUser from "../hooks/useUser";

// Data and Types
import type { CreateUserForm, UpdateUserForm, User } from "../schemas/user.schema";
import { ITEMS_PER_PAGE } from "../constants/user-constants";
import {
  DeleteConfirmationModal,
  DeactivateConfirmationModal,
} from "../components/ConfirmationModal";
import { StatsCards } from "../components/stats-cards";
import { UserFilters } from "../components/user-filters";
import { UserDetailsModal } from "../components/UserDetailsModal";
import { UsersTable } from "../components/users-table";
import { CreateUserModal } from "../components/createUserModal";
import { EditUserModal } from "../components/EditUserModal";
import { toast } from "react-toastify";
import { getAllUsers } from "../services/user.service";
import { ActivateConfirmationModal } from "../components/ActivateConfirmationModa";

export default function UserManagementPage() {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false);
  const [isActivateConfirmOpen, setIsActivateConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);
  const [userToActivate, setUserToActivate] = useState<User | null>(null);
  // Hooks
  const {
    users: mockUsers,
    setUsers,
    createUser,
    updateUser,
    desactivateUser,
    activateUser,
    deleteUser,
  } = useUser(); // Assuming this hook fetches the user data
  const filteredUsers = useUserFilters({
    users: mockUsers,
    searchTerm,
    roleFilter,
    statusFilter,
  });

  const stats = useUserStats(mockUsers);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  // Handlers
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const handleDesactivateUser = (user: User) => {
    setUserToDeactivate(user);
    setIsDeactivateConfirmOpen(true);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setIsEditUserModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        const response = await deleteUser(userToDelete._id);
        toast.success(response);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setIsDeleteConfirmOpen(false);
        setUserToDelete(null);
        await fetchUsers();
      }
    }
  };

  const confirmDeactivateUser = async () => {
    if (userToDeactivate) {
      try {
        const response = await desactivateUser(userToDeactivate._id);
        toast.success(response);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setIsDeactivateConfirmOpen(false);
        setUserToDeactivate(null);
        await fetchUsers();
      }
    }
  };

  const confirmActivateUser = async () => {
    if (userToActivate) {
      try {
        const response = await activateUser(userToActivate._id);
        toast.success(response);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      } finally {
        setIsActivateConfirmOpen(false);
        setUserToActivate(null);
        await fetchUsers();
      }
    }
  };

  const onCreateUser = async (data: CreateUserForm): Promise<boolean> => {
    try {
      const response = await createUser(data);
      toast.success(response);
      return true;
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      return false;
    } finally {
      await fetchUsers();
    }
  };

  const onEditUser = async (data: UpdateUserForm) => {
    try {
      if (!userToEdit) return;
      const response = await updateUser(userToEdit._id, data);
      toast.success(response);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsEditUserModalOpen(false);
      setUserToEdit(null);
      await fetchUsers();
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDeactivate = () => {
    setIsDeactivateConfirmOpen(false);
    setUserToDeactivate(null);
  };
  const handleActivateUser = (user: User) => {
    setUserToActivate(user);
    setIsActivateConfirmOpen(true);
  };

  const handleCancelActivate = () => {
    setIsActivateConfirmOpen(false);
    setUserToActivate(null);
  };

  const fetchUsers = async () => {
    try {
      const usersFetched = await getAllUsers();
      setUsers(usersFetched);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      } else {
        toast.error("Error al cargar los usuarios");
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await fetchUsers();
    };
    fetch();
    console.log("se ecjuto");
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Gestión de Usuarios
              </h1>
              <p className="text-gray-600 mt-2">
                Administra el equipo de tu clínica veterinaria
              </p>
            </div>
            <Button
              onClick={() => setIsCreateUserModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Filters */}
          <UserFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Users Table */}
          <UsersTable
            users={paginatedUsers}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={ITEMS_PER_PAGE}
            onViewDetails={handleViewDetails}
            onEditUser={handleEditUser}
            onDeactivateUser={handleDesactivateUser}
            onActivateUser={handleActivateUser}
            onDeleteUser={handleDeleteUser}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modals */}
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        user={selectedUser}
      />

      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
        onSubmit={onCreateUser}
      />

      <EditUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setUserToEdit(null);
        }}
        onSubmit={onEditUser}
        user={userToEdit}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        user={userToDelete}
        onConfirm={confirmDeleteUser}
        onCancel={handleCancelDelete}
      />

      <DeactivateConfirmationModal
        isOpen={isDeactivateConfirmOpen}
        user={userToDeactivate}
        onConfirm={confirmDeactivateUser}
        onCancel={handleCancelDeactivate}
      />
      <ActivateConfirmationModal
        isOpen={isActivateConfirmOpen}
        user={userToActivate}
        onConfirm={confirmActivateUser}
        onCancel={handleCancelActivate}
      />
    </TooltipProvider>
  );
}
