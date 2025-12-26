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
<<<<<<< HEAD
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('predicto_theme');
=======
    // You can add logic here to detect system theme or load from localStorage
    const savedTheme = localStorage.getItem('theme');
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
    if (savedTheme) {
      setResolvedMode(savedTheme);
    }
  }, []);

<<<<<<< HEAD
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
=======
  const toggleTheme = () => {
    const newMode = resolvedMode === 'light' ? 'dark' : 'light';
    setResolvedMode(newMode);
    localStorage.setItem('theme', newMode);
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
  };

  return (
    <ThemeContext.Provider value={{ colors, resolvedMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
