import { useMemo } from "react";
import type { Owner } from "@/features/owner/schemas/owner.schema";

interface UseOwnerSearchProps {
  owners: Owner[];
  searchTerm: string;
}

export const useOwnerSearch = ({ owners, searchTerm }: UseOwnerSearchProps) => {
  return useMemo(() => {
    if (!searchTerm.trim()) return [];

    return owners.filter((owner) => {
      const term = searchTerm.toLowerCase();
      return (
        owner.name.toLowerCase().includes(term) ||
        owner.document.toLowerCase().includes(term) ||
        owner.telephone.toLowerCase().includes(term) ||
        owner.email.toLowerCase().includes(term)
      );
    });
  }, [owners, searchTerm]);
};
