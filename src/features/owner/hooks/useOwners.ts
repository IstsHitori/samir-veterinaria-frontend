import { useOwnerStore } from "../store/owner.store";

export default function useOwners() {
  const owners = useOwnerStore((state) => state.owners);
  const setOwners = useOwnerStore((state) => state.setOwners);
  const createOwner = useOwnerStore((state) => state.createOwner);
  const updateOwner = useOwnerStore((state) => state.updateOwner);
  const deleteOwner = useOwnerStore((state) => state.deleteOwner);

  return {
    owners,
    setOwners,
    createOwner,
    deleteOwner,
    updateOwner,
  };
}
