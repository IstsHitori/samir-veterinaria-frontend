import { useMemo } from "react"
import type { User } from "../schemas/user.schema"

interface UseUserFiltersProps {
  users: User[]
  searchTerm: string
  roleFilter: string
  statusFilter: string
}

export const useUserFilters = ({ users, searchTerm, roleFilter, statusFilter }: UseUserFiltersProps) => {
  return useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive)

      return matchesSearch && matchesRole && matchesStatus && !user.isDeleted
    })
  }, [users, searchTerm, roleFilter, statusFilter])
}
