import { create } from "zustand";
import type {
  CreateOwnerForm,
  Owner,
  UpdateOwnerForm,
} from "../schemas/owner.schema";
import {
  createOwner,
  updateOwner,
  type CreateOwnerResponse,
} from "../services/owner.service";

interface OwnerStore {
  owners: Owner[];
  setOwners: (owners: Owner[]) => void;
  createOwner: (owner: CreateOwnerForm) => Promise<CreateOwnerResponse>;
  deleteOwner: (ownerId: string) => Promise<string>;
  updateOwner: (
    ownerId: string,
    updateOwnerData: UpdateOwnerForm
  ) => Promise<string>;
}

export const useOwnerStore = create<OwnerStore>((set) => ({
  owners: [],
  setOwners: (owners) => set({ owners }),
  createOwner: async (owner) => {
    return await createOwner(owner);
  },
  deleteOwner: async (ownerId) => {
    console.log(ownerId);
    return "";
  },
  updateOwner: async (idOwner, dataOwner) => {
    return await updateOwner(idOwner, dataOwner);
  },
}));
