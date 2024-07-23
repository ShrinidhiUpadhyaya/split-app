import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";

type AppStore = {
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));
