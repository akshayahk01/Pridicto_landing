import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [resolvedMode, setResolvedMode] = useState('light');

  const colors = {
    primary: resolvedMode === 'dark' ? '#3b82f6' : '#2563eb',
    secondary: resolvedMode === 'dark' ? '#8b5cf6' : '#7c3aed',
  };

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('predicto_theme');
    if (savedTheme) {
      setResolvedMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to document
    if (resolvedMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedMode]);

  const toggleTheme = () => {
    const newMode = resolvedMode === 'light' ? 'dark' : 'light';
    setResolvedMode(newMode);
    localStorage.setItem('predicto_theme', newMode);
  };

  return (
    <ThemeContext.Provider value={{ colors, resolvedMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
