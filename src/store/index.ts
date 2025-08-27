import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { createAuthSlice } from './slices/auth/authSlice';
import type { AuthSlice } from './slices/auth/types';

export type AppStore = AuthSlice;

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
      }),
      {
        name: 'acquireflow-app-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          auth: {
            isAuthenticated: state.auth.isAuthenticated,
            accessToken: state.auth.accessToken,
            user: state.auth.user,
          },
        }),
        merge: (persistedState: any, currentState: AppStore) => {
          // Preserve methods on slices; only merge persisted fields into existing slice objects
          const next: AppStore = { ...currentState } as AppStore;
          if (persistedState && persistedState.auth) {
            next.auth = { ...currentState.auth, ...persistedState.auth };
          }
          return next;
        },
        onRehydrateStorage: () => (state) => {
          // Turn off loading once persisted state rehydrates
          if (!state) return;
          if (state.auth && typeof state.auth.setLoading === 'function') {
            state.auth.setLoading(false);
          }
        },
      }
    )
  )
);

export const selectAuth = (state: AppStore) => state.auth;

