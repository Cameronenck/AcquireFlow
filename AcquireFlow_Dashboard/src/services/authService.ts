import type { AuthUser } from '../store/slices/auth/types';

const API_BASE = `${(import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'}`;

type BackendAuthResponse = {
  success: boolean;
  message?: string;
  data?: {
    user: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      role?: string;
      cardDetails?: {
        cardNumber: string;
        nameOnCard: string;
        expiryDate: string;
        cvv: string;
        billingZipCode: string;
      };
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
};

export const authService = {
  async login(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: AuthUser;
  }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = (await res.json()) as BackendAuthResponse;
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Login failed');
    }
    const { user, accessToken, refreshToken, expiresIn } = json.data;
    const mappedUser: AuthUser = {
      id: user._id,
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      roles: user.role ? [user.role] : undefined,
    };
    return { accessToken, refreshToken, expiresIn, user: mappedUser };
  },

  async forgotPassword(email: string): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message || 'Failed to send password reset email');
    }
  },

  async logout(accessToken?: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        }
      });
    } catch (_) {
      // non-fatal
    }
  },

  async register(params: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string;
    cardDetails?: {
      cardNumber: string;
      nameOnCard: string;
      expiryDate: string;
      cvv: string;
      billingZipCode: string;
    };
  }): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: AuthUser;
  }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const json = (await res.json()) as BackendAuthResponse;
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Signup failed');
    }
    const { user, accessToken, refreshToken, expiresIn } = json.data;
    const mappedUser: AuthUser = {
      id: user._id,
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      roles: user.role ? [user.role] : undefined,
    };
    return { accessToken, refreshToken, expiresIn, user: mappedUser };
  },

  async loginWithGoogle(idToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: AuthUser;
  }> {
    const res = await fetch(`${API_BASE}/v1/auth/login/firebase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    });
    const json = (await res.json()) as BackendAuthResponse;
    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || 'Google login failed');
    }
    const { user, accessToken, refreshToken, expiresIn } = json.data;
    const mappedUser: AuthUser = {
      id: user._id,
      email: user.email,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      roles: user.role ? [user.role] : undefined,
    };
    return { accessToken, refreshToken, expiresIn, user: mappedUser };
  },

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetToken, newPassword })
    });
    if (!res.ok) {
      throw new Error('Reset password failed');
    }
  }
};

