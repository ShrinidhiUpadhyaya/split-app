import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";

type AppStore = {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser) => void;
};

export const useAuthStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));
