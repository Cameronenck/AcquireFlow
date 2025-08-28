import type { StateCreator } from 'zustand';
import type { AuthActions, AuthSlice, AuthState, AuthUser } from './types';

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  user: null,
  mfaEnabled: false,
  lastLoginAt: null,
  profileComplete: false,
  error: null,
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  auth: {
    ...initialAuthState,
    setLoading: (loading: boolean) => set((state) => ({
      auth: { ...state.auth, isLoading: loading }
    })),
    loginSuccess: (payload: { token: string; user: AuthUser }) => set((state) => ({
      auth: {
        ...state.auth,
        isAuthenticated: true,
        isLoading: false,
        accessToken: payload.token,
        user: payload.user,
        lastLoginAt: Date.now(),
        error: null,
      }
    })),
    logout: () => set((state) => ({
      auth: { ...state.auth, ...initialAuthState }
    })),
    refreshUser: (user: AuthUser | null) => set((state) => ({
      auth: { ...state.auth, user }
    })),
    setError: (message: string | null) => set((state) => ({
      auth: { ...state.auth, error: message }
    })),
    setTokens: ({ accessToken, refreshToken, expiresAt }) => set((state) => ({
      auth: { ...state.auth, accessToken, refreshToken: refreshToken ?? null, expiresAt: expiresAt ?? null }
    })),
    setRoles: (roles: string[]) => set((state) => ({
      auth: { ...state.auth, user: state.auth.user ? { ...state.auth.user, roles } : state.auth.user }
    })),
    setPermissions: (permissions: string[]) => set((state) => ({
      auth: { ...state.auth, user: state.auth.user ? { ...state.auth.user, permissions } : state.auth.user }
    })),
  }
});

