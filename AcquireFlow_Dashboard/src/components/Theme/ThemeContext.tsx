import React, { useEffect, createContext, useContext } from 'react';
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  // Always use light mode
  const isDarkMode = false;
  // Remove dark mode class if it exists
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);
  // Keep the toggle function to avoid breaking any other components
  const toggleTheme = () => {
    // Do nothing as we're always in light mode
  };
  return <ThemeContext.Provider value={{
    isDarkMode,
    toggleTheme
  }}>
      {children}
    </ThemeContext.Provider>;
};
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};