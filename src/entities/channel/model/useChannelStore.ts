import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ChannelState {
  currentChannelUrl: string | undefined;
  setCurrentChannelUrl: (url: string | undefined) => void;
}

export const useChannelStore = create<ChannelState>()(
  persist(
    (set) => ({
      currentChannelUrl: undefined,
      setCurrentChannelUrl: (url) => set({ currentChannelUrl: url }),
    }),
    {
      name: "last-channel",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
