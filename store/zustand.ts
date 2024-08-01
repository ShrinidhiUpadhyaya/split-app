import {create} from "zustand";
import {persist} from "zustand/middleware";

type AppStoreProps = {
  user: Object | null;
  setUserID: (user: Object | null) => void;
  friends: Array<Object | null>;
  setFriends: (friends: Array<Object>) => void;
  clearAll: () => void;
};

export const useAppStore = create<AppStoreProps>()(
  persist(
    (set) => ({
      user: null,
      setUserID: (user) => set({user: user}),
      friends: [],
      setFriends: (friends) => set({friends: friends}),
      clearAll: () => set({user: null, friends: []}),
    }),
    {
      name: "user_storage",
      getStorage: () => localStorage,
    },
  ),
);
