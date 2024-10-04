import {create} from "zustand";
import {persist} from "zustand/middleware";

type AppStoreProps = {
  user: Object | null;
  setUserID: (user: Object | null) => void;
  clearAll: () => void;
};

export const useAppStore = create<AppStoreProps>()(
  persist(
    (set) => ({
      user: null,
      setUserID: (user) => set({user: user}),
      clearAll: () => set({user: null, friends: []}),
    }),
    {
      name: "user_storage",
      getStorage: () => localStorage,
    },
  ),
);
