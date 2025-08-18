
import { useMemo } from "react"
import type { OwnerWithPatients } from "../schemas/owner.schema"

export function useOwnerStats(owners: OwnerWithPatients[]) {
  return useMemo(() => {
    const safeOwners = owners || []

    const totalOwners = safeOwners.length
    const totalPatients = safeOwners.reduce((sum, owner) => sum + (owner.patients?.length || 0), 0)
    const ownersWithMultiplePets = safeOwners.filter((owner) => (owner.patients?.length || 0) > 1).length
    const averagePetsPerOwner = totalOwners > 0 ? (totalPatients / totalOwners).toFixed(1) : "0"

    return {
      totalOwners,
      totalPatients,
      ownersWithMultiplePets,
      averagePetsPerOwner,
    }
  }, [owners])
}
