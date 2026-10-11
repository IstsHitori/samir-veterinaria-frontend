import { useUserStore } from "../store/user.store";

export default function useUser() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const createUser = useUserStore((state) => state.createUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const desactivateUser = useUserStore((state) => state.desactivateUser);
  const activateUser = useUserStore((state) => state.activateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  return {
    users,
    setUsers,
    createUser,
    updateUser,
    desactivateUser,
    activateUser,
    deleteUser
  };
}
