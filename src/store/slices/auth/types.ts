export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  photoUrl?: string;
  roles?: string[];
  permissions?: string[];
  organizationId?: string;
  teamIds?: string[];
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken?: string | null;
  expiresAt?: number | null;
  user: AuthUser | null;
  mfaEnabled?: boolean;
  lastLoginAt?: number | null;
  profileComplete?: boolean;
  error?: string | null;
};

export type AuthActions = {
  setLoading: (loading: boolean) => void;
  loginSuccess: (payload: { token: string; user: AuthUser }) => void;
  logout: () => void;
  refreshUser: (user: AuthUser | null) => void;
  setError: (message: string | null) => void;
  setTokens: (payload: { accessToken: string | null; refreshToken?: string | null; expiresAt?: number | null }) => void;
  setRoles: (roles: string[]) => void;
  setPermissions: (permissions: string[]) => void;
};

export type AuthSlice = {
  auth: AuthState & AuthActions;
};

