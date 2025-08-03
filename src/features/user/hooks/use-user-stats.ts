
import { useMemo } from "react"
import type { User } from "../schemas/user.schema"

export const useUserStats = (users: User[]) => {
  return useMemo(() => {
    const activeUsers = users.filter((u) => u.isActive && !u.isDelted)
    const totalUsers = users.filter((u) => !u.isDelted)
    const adminCount = totalUsers.filter((u) => u.role === "admin").length
    const vetCount = totalUsers.filter((u) => u.role === "veterinario").length
    const auxCount = totalUsers.filter((u) => u.role === "auxiliar").length

    return {
      total: totalUsers.length,
      active: activeUsers.length,
      admin: adminCount,
      veterinario: vetCount,
      auxiliar: auxCount,
    }
  }, [users])
}
