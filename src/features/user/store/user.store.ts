import { create } from "zustand";
import type { CreateUserForm, UpdateUserForm, User } from "../schemas/user.schema";
import {
  activateUser,
  createUser,
  deleteUser,
  desactivateUser,
  updateUser,
} from "../services/user.service";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  createUser: (user: CreateUserForm) => Promise<string>;
  updateUser: (userId: string, user: UpdateUserForm) => Promise<string>;
  desactivateUser: (userId: User["_id"]) => Promise<string>;
  activateUser: (userId: User["_id"]) => Promise<string>;
  deleteUser: (userId: User["_id"]) => Promise<string>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  createUser: async (newUser) => {
    return await createUser(newUser);
  },
  updateUser: async (userId, user) => {
    return await updateUser(userId, user);
  },
  desactivateUser: async (userId) => {
    return await desactivateUser(userId);
  },

  activateUser: async (userId) => {
    return await activateUser(userId);
  },
  deleteUser: async (userId) => {
    return await deleteUser(userId);
  },
}));
