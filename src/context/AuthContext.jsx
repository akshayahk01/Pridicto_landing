import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logoutUser, setUser } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  // Check auth status on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user) {
      // Try to decode token or make API call to get user info
      // For now, we'll assume the token is valid if it exists
      // In a real app, you'd validate the token with the backend
      dispatch(setUser({ id: 1, email: 'user@example.com', firstName: 'John', lastName: 'Doe' }));
    }
  }, [dispatch, user]);

  // Show error toast when auth error occurs
  useEffect(() => {
    if (error) {
      dispatch(showToast({
        message: error,
        type: 'error',
      }));
    }
  }, [error, dispatch]);

  const login = async (email, password) => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      dispatch(showToast({
        message: 'Login successful!',
        type: 'success',
      }));
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
      await dispatch(registerUser(signupData)).unwrap();
      dispatch(showToast({
        message: 'Account created successfully! Please log in.',
        type: 'success',
      }));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    dispatch(showToast({
      message: 'Logged out successfully',
      type: 'info',
    }));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
