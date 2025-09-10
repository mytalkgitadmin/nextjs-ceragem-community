import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ChannelState } from './model';

export const useChannelStore = create<ChannelState>()(
  persist(
    (set) => ({
      currentChannelUrl: undefined,
      setCurrentChannelUrl: (url) => set({ currentChannelUrl: url }),
    }),
    {
      name: 'last-channel',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
