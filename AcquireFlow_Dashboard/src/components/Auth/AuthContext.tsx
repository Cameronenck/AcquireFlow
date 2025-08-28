import React, { useEffect, useState, createContext, useContext } from 'react';
import { User as FirebaseUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/firebaseConfig';
import { authService } from '../../services/authService';
import { useAppStore, selectAuth } from '../../store';
import { Navigate, replace, useNavigate } from 'react-router-dom';
type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, cardDetails?: {
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvv: string;
    billingZipCode: string;
  }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  refreshAccessToken: (refreshToken: string) => Promise<string | null>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const authStore = useAppStore();
  const navigate = useNavigate();
  // Function to refresh access token
  const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
      const response = await fetch(`${(import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });
      
      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.data.accessToken;
        
        // Update stored token
        localStorage.setItem('acquireflow-access-token', newAccessToken);
        
        // Update store
        authStore.auth.setTokens({
          accessToken: newAccessToken,
          refreshToken,
          expiresAt: Date.now() + (data.data.expiresIn * 1000)
        });
        
        return newAccessToken;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
    return null;
  };

  // Listen for auth state changes when component mounts
  useEffect(() => {
    // Check if we have valid backend tokens first (for refresh scenarios)
    const checkExistingAuth = async () => {
      // Check localStorage for existing tokens first
      const storedAccessToken = localStorage.getItem('acquireflow-access-token');
      const storedRefreshToken = localStorage.getItem('acquireflow-refresh-token');
      const storedUserData = localStorage.getItem('acquireflow-user-data');
      
      console.log('🔍 Checking existing auth on refresh:', {
        hasStoredToken: !!storedAccessToken,
        hasStoredRefreshToken: !!storedRefreshToken,
        hasStoredUserData: !!storedUserData
      });
      
      // If we have stored tokens and user data, try to restore the session
      if (storedAccessToken && storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          console.log('✅ Found stored tokens, validating token...');
          
          // Validate the token by making a simple API call
          try {
            const response = await fetch(`${(import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'}/api/v1/profile/complete`, {
              headers: {
                'Authorization': `Bearer ${storedAccessToken}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              console.log('✅ Token is valid, restoring session from localStorage');
              
              // Restore the session in the store
              authStore.auth.setTokens({ 
                accessToken: storedAccessToken, 
                refreshToken: storedRefreshToken, 
                expiresAt: Date.now() + (24 * 60 * 60 * 1000) // Assume 24 hours validity
              });
              
              // Restore user data
              const restoredUser = {
                id: userData.id,
                name: `${userData.firstName} ${userData.lastName}`.trim() || userData.email,
                email: userData.email
              };
              
              authStore.auth.loginSuccess({ 
                token: storedAccessToken, 
                user: restoredUser 
              });
              
              setUser(restoredUser);
              setIsLoading(false);
              return;
            } else if (response.status === 401 && storedRefreshToken) {
              // Token expired, try to refresh it
              console.log('🔄 Token expired, attempting to refresh...');
              try {
                const refreshResponse = await fetch(`${(import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'}/api/v1/auth/refresh`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ refreshToken: storedRefreshToken })
                });
                
                if (refreshResponse.ok) {
                  const refreshData = await refreshResponse.json();
                  console.log('✅ Token refreshed successfully');
                  
                  // Update stored tokens
                  localStorage.setItem('acquireflow-access-token', refreshData.data.accessToken);
                  
                  // Restore the session in the store with new token
                  authStore.auth.setTokens({ 
                    accessToken: refreshData.data.accessToken, 
                    refreshToken: storedRefreshToken, 
                    expiresAt: Date.now() + (refreshData.data.expiresIn * 1000)
                  });
                  
                  // Restore user data
                  const restoredUser = {
                    id: userData.id,
                    name: `${userData.firstName} ${userData.lastName}`.trim() || userData.email,
                    email: userData.email
                  };
                  
                  authStore.auth.loginSuccess({ 
                    token: refreshData.data.accessToken, 
                    user: restoredUser 
                  });
                  
                  setUser(restoredUser);
                  setIsLoading(false);
                  return;
                } else {
                  console.log('❌ Token refresh failed, clearing stored data');
                  // Clear invalid data
                  localStorage.removeItem('acquireflow-access-token');
                  localStorage.removeItem('acquireflow-refresh-token');
                  localStorage.removeItem('acquireflow-user-data');
                }
              } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Clear invalid data
                localStorage.removeItem('acquireflow-access-token');
                localStorage.removeItem('acquireflow-refresh-token');
                localStorage.removeItem('acquireflow-user-data');
              }
            } else {
              console.log('❌ Token is invalid, clearing stored data');
              // Clear invalid data
              localStorage.removeItem('acquireflow-access-token');
              localStorage.removeItem('acquireflow-refresh-token');
              localStorage.removeItem('acquireflow-user-data');
            }
          } catch (apiError) {
            console.error('Error validating token:', apiError);
            // Clear invalid data
            localStorage.removeItem('acquireflow-access-token');
            localStorage.removeItem('acquireflow-refresh-token');
            localStorage.removeItem('acquireflow-user-data');
          }
        } catch (error) {
          console.error('Error restoring session from localStorage:', error);
          // Clear invalid data
          localStorage.removeItem('acquireflow-access-token');
          localStorage.removeItem('acquireflow-refresh-token');
          localStorage.removeItem('acquireflow-user-data');
        }
      }
      
      // Get current auth state from the store
      const currentAuth = authStore.auth;
      
      console.log('🔍 Checking store auth state:', {
        hasToken: !!currentAuth.accessToken,
        hasUser: !!currentAuth.user,
        hasExpiresAt: !!currentAuth.expiresAt,
        expiresAt: currentAuth.expiresAt,
        currentTime: Date.now(),
        isExpired: currentAuth.expiresAt ? Date.now() >= currentAuth.expiresAt : true
      });
      
      // If we have a valid token and user in store, restore the session
      if (currentAuth.accessToken && currentAuth.user && currentAuth.expiresAt && Date.now() < currentAuth.expiresAt) {
        console.log('✅ Restoring session from store tokens');
        setUser({ 
          id: currentAuth.user.id, 
          name: currentAuth.user.name || '', 
          email: currentAuth.user.email 
        });
        setIsLoading(false);
        return;
      }
      
      console.log('❌ No valid tokens found, checking Firebase auth state');
      // If no valid tokens, check Firebase auth state
      authStore.auth.setLoading(true);
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email || 'User',
            email: firebaseUser.email || ''
          };
          setUser(appUser);
          authStore.auth.loginSuccess({ token: 'firebase-session', user: { id: appUser.id, email: appUser.email, name: appUser.name } });
        } else {
          setUser(null);
          authStore.auth.logout();
        }
        setIsLoading(false);
        authStore.auth.setLoading(false);
      });
      
      return unsubscribe;
    };
    
    checkExistingAuth();
    
    // Set up periodic token refresh (every 5 minutes)
    const tokenRefreshInterval = setInterval(async () => {
      const currentAuth = authStore.auth;
      if (currentAuth.refreshToken && currentAuth.expiresAt) {
        const timeUntilExpiry = currentAuth.expiresAt - Date.now();
        // Refresh token if it expires in less than 10 minutes
        if (timeUntilExpiry < 10 * 60 * 1000) {
          console.log('🔄 Token expires soon, refreshing...');
          await refreshAccessToken(currentAuth.refreshToken);
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => {
      clearInterval(tokenRefreshInterval);
    };
  }, []);

  // ---------------- Dev bypass (commented out) ----------------
  // useEffect(() => {
  //   // Add this for temporary development bypass
  //   setUser({
  //     id: 'temp-user',
  //     name: 'Developer',
  //     email: 'dev@example.com'
  //   });
  //   setIsLoading(false);
  //   // Return empty cleanup function since we're bypassing auth
  //   return () => {};
  // }, []);
  // -----------------------------------------------------------
  // Login with email and password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { accessToken, refreshToken, expiresIn, user } = await authService.login(email, password);
      
      // Store tokens in localStorage for profile service access
      localStorage.setItem('acquireflow-access-token', accessToken);
      localStorage.setItem('acquireflow-refresh-token', refreshToken);
      localStorage.setItem('acquireflow-user-data', JSON.stringify({
        id: user.id,
        firstName: (user.name || '').split(' ')[0] || '',
        lastName: (user.name || '').split(' ').slice(1).join(' ') || '',
        email: user.email,
        role: user.roles?.[0] || ''
      }));
      
      authStore.auth.setTokens({ accessToken, refreshToken, expiresAt: Date.now() + expiresIn * 1000 });
      authStore.auth.loginSuccess({ token: accessToken, user });
      setUser({ id: user.id, name: user.name || '', email: user.email });
      navigate('/',{replace : true}); // redirect
    } catch (error) {
      console.error('Login error:', error);
      authStore.auth.setError('Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  // Login with Google
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const idToken = await cred.user.getIdToken();

      const { accessToken, refreshToken, expiresIn, user: appUser } = await authService.loginWithGoogle(idToken);

      // Store tokens in localStorage for profile service access
      localStorage.setItem('acquireflow-access-token', accessToken);
      localStorage.setItem('acquireflow-refresh-token', refreshToken);
      localStorage.setItem('acquireflow-user-data', JSON.stringify({
        id: appUser.id,
        firstName: (appUser.name || '').split(' ')[0] || '',
        lastName: (appUser.name || '').split(' ').slice(1).join(' ') || '',
        email: appUser.email,
        role: appUser.roles?.[0] || ''
      }));

      authStore.auth.setTokens({ accessToken, refreshToken, expiresAt: Date.now() + expiresIn * 1000 });
      authStore.auth.loginSuccess({ token: accessToken, user: appUser });
      setUser({ id: appUser.id, name: appUser.name || '', email: appUser.email });
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  // Signup with email and password
  const signup = async (
    name: string, 
    email: string, 
    password: string, 
    cardDetails?: {
      cardNumber: string;
      nameOnCard: string;
      expiryDate: string;
      cvv: string;
      billingZipCode: string;
    }
  ) => {
    setIsLoading(true);
    try {
      // Better name splitting logic
      const nameParts = name.trim().split(' ');
      let firstName, lastName;
      
      if (nameParts.length === 1) {
        // Single name - use it as firstName, set lastName to "User"
        firstName = nameParts[0];
        lastName = "User";
      } else if (nameParts.length === 2) {
        // Two names - first is firstName, second is lastName
        [firstName, lastName] = nameParts;
      } else {
        // Multiple names - first is firstName, rest combined as lastName
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' ');
      }
      
      const signupParams: any = { 
        firstName: firstName || name, 
        lastName: lastName || "User", 
        email, 
        password 
      };
      
      // Add card details if provided
      if (cardDetails) {
        signupParams.cardDetails = cardDetails;
      }
      
      const { accessToken, refreshToken, expiresIn, user } = await authService.register(signupParams);
      
      // Store tokens in localStorage for profile service access
      localStorage.setItem('acquireflow-access-token', accessToken);
      localStorage.setItem('acquireflow-refresh-token', refreshToken);
      localStorage.setItem('acquireflow-user-data', JSON.stringify({
        id: user.id,
        firstName: (user.name || '').split(' ')[0] || '',
        lastName: (user.name || '').split(' ').slice(1).join(' ') || '',
        email: user.email,
        role: user.roles?.[0] || ''
      }));
      
      setUser({ id: user.id, name: user.name || '', email: user.email });
      authStore.auth.setTokens({ accessToken, refreshToken, expiresAt: Date.now() + expiresIn * 1000 });
      authStore.auth.loginSuccess({ token: accessToken, user });
      navigate('/', { replace: true }); // redirect
    } catch (error) {
      console.error('Signup error:', error);
      authStore.auth.setError('Signup failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      // Clear localStorage tokens and user data
      localStorage.removeItem('acquireflow-access-token');
      localStorage.removeItem('acquireflow-refresh-token');
      localStorage.removeItem('acquireflow-user-data');
      // For development bypass, we need to manually reset the user
      setUser(null);
      authStore.auth.logout();
      // Navigate to login page after logout
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
    } catch (error) {
      console.error('Password reset error:', error);
      authStore.auth.setError('Password reset failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    refreshAccessToken // Expose refresh function for external use
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};