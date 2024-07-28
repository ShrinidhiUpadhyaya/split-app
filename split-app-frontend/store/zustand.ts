import { create } from "zustand";
import { User as FirebaseUser } from "firebase/auth";

type AppStore = {
  user: string | null;
  setUser: (user: string | null) => void;
  friends: Array<Object | null>;
  setFriends: (friends: Array<Object>) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  friends: [],
  setFriends: (friends) => set({ friends: friends }),
}));
