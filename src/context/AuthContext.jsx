import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setUser,
  clearError,
  updateProfile as updateUser,
  logout
} from '../store/slices/authSlice';
import { 
  createSuccessToast, 
  createErrorToast,
  createWarningToast
} from '../store/slices/uiSlice';
import { 
  useLoginMutation,
  useSignupMutation, 
  useLogoutMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation
} from '../services/api';

// Authentication Context Types
const AuthContext = createContext();

// Toast delay utility
const showToastAfter = (dispatch, delay, toastAction) => {
  setTimeout(() => {
    dispatch(toastAction);
  }, delay);
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  
  // RTK Query mutations
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [signupMutation, { isLoading: signupLoading }] = useSignupMutation();
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();
  const [updateProfileMutation, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  
  // Load user on mount (if token exists)
  useEffect(() => {
    const { token, user } = loadFromLocalStorage();
    if (token && user && !authState.user) {
      dispatch(setUser(user));
    }
  }, [dispatch, authState.user]);

  // Show error toasts
  useEffect(() => {
    if (authState.error) {
      dispatch(createErrorToast('Authentication Error', authState.error));
      dispatch(clearError()); // Clear error after showing toast
    }
  }, [authState.error, dispatch]);

  // Auto-logout on token expiration
  useEffect(() => {
    if (authState.isAuthenticated && !authState.loading) {
      // Set up token refresh or expiration check
      // This is a simplified version - you might want to decode JWT tokens
      const tokenExpiration = localStorage.getItem('token_expiration');
      if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
        handleLogout();
      }
    }
  }, [authState.isAuthenticated, authState.loading]);

  // Login function
  const handleLogin = async (credentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();

      // Store JWT token and user data in localStorage
      const userData = {
        id: result.id,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName
      };
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token_expiration', Date.now() + (24 * 60 * 60 * 1000)); // 24 hours

      // Update Redux state
      dispatch(setUser(userData));

      // Show success toast
      dispatch(createSuccessToast('Welcome back!', 'You have been successfully logged in.'));

    } catch (error) {
      const errorMessage = error?.message || 'Login failed. Please check your credentials.';
      dispatch(createErrorToast('Login Failed', errorMessage));
      throw new Error(errorMessage);
    }
  };

  // Signup function
  const handleSignup = async (userData) => {
    try {
      const result = await signupMutation(userData).unwrap();

      // Show success toast - user needs to verify OTP before getting JWT
      dispatch(createSuccessToast(
        'Account Created!',
        'Welcome to Predicto.ai! Please check your email to verify your account.'
      ));

    } catch (error) {
      const errorMessage = error?.message || 'Registration failed. Please try again.';
      dispatch(createErrorToast('Registration Failed', errorMessage));
      throw new Error(errorMessage);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token_expiration');

      // Clear auth state
      dispatch(logout());

      // Show info toast
      dispatch(createSuccessToast('Logged Out', 'You have been successfully logged out.'));

    } catch (error) {
      // Even if server logout fails, clear local state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('token_expiration');

      dispatch(logout());
      dispatch(createWarningToast('Session Ended', 'Your session has ended.'));
    }
  };

  // Update profile function
  const handleUpdateProfile = async (userData) => {
    try {
      const result = await updateProfileMutation(userData).unwrap();
      
      // Update user in Redux state
      dispatch(updateUser(userData));
      
      // Show success toast
      dispatch(createSuccessToast('Profile Updated', 'Your profile has been successfully updated.'));
      
    } catch (error) {
      const errorMessage = error?.message || 'Failed to update profile.';
      dispatch(createErrorToast('Update Failed', errorMessage));
      throw new Error(errorMessage);
    }
  };

  // Refresh user data
  const handleRefreshUser = async () => {
    try {
      const { token, user } = loadFromLocalStorage();
      if (user && token) {
        dispatch(setUser(user));
      }
    } catch (error) {
      const errorMessage = error?.message || 'Failed to refresh user data.';
      dispatch(createErrorToast('Refresh Failed', errorMessage));
    }
  };

  // Context value
  const contextValue = {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    loading: authState.loading || loginLoading || signupLoading || logoutLoading,
    error: authState.error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    clearError: () => dispatch(clearError()),
    refreshUser: handleRefreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected routes
const ProtectedRoute = ({ 
  children, 
  fallback = null,
  requiredRole,
  redirectTo = '/login'
}) => {
  const { isAuthenticated, loading, user } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    if (fallback) return fallback;
    // You can add router navigation here if needed
    return <div>Please log in to access this page.</div>;
  }

  // Check role permissions
  if (requiredRole && user?.role !== requiredRole) {
    return <div>You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
};

// HOC for role-based access
const withRoleGuard = (Component, requiredRole, fallback = null) => {
  return (props) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== requiredRole) {
      return fallback || <div>Access denied.</div>;
    }

    return <Component {...props} />;
  };
};

// Utility functions
const loadFromLocalStorage = () => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token, user };
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return { token: null, user: null };
  }
};

// Auto-cleanup function for expired tokens
const cleanupExpiredAuth = () => {
  const tokenExpiration = localStorage.getItem('token_expiration');
  if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_expiration');
  }
};

// Initialize auth cleanup on module load
if (typeof window !== 'undefined') {
  cleanupExpiredAuth();
}

export { AuthProvider, useAuth, ProtectedRoute, withRoleGuard };
export default AuthContext;
