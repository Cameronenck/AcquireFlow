import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/Theme/ThemeContext';
import { ProfileProvider } from './components/Context/ProfileContext';
import { DealsProvider } from './components/Context/DealsContext';
import { AuthProvider } from './components/Auth/AuthContext';
import { AppRoutes } from './routes';
export function App() {
  return(
  <BrowserRouter>

  <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <DealsProvider>
            <AppRoutes />
          </DealsProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
    </BrowserRouter>
  );

}