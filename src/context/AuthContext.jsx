import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      // Decode token or fetch user info if needed
      setUser({ email: 'user@example.com' }); // Mock user
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token: newToken } = res.data;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser({ email });
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password, additionalData) => {
    try {
      const signupData = {
        email,
        password,
        firstName: additionalData?.firstName || '',
        lastName: additionalData?.lastName || '',
        phone: additionalData?.phone || '',
        company: additionalData?.company || ''
      };
      console.log('Signup data:', signupData); // Debug log
      const res = await axios.post('/api/auth/register', signupData);
      // Registration successful, but user needs to verify email before login
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
