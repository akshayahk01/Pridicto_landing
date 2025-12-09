import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/Login'));
const SignupPage = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Insights = lazy(() => import('./pages/Insights'));
const GlobalPresence = lazy(() => import('./pages/GlobalPresence'));
const FAQ = lazy(() => import('./pages/FAQ'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Suggestions = lazy(() => import('./pages/Suggestions'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Layout Components
const MainLayout = lazy(() => import('./components/Layout'));
const DashboardLayout = lazy(() => import('./pages/DashboardLayout'));

// Global styles import
import './index.css';

// App Routes Configuration
const routes = [
  // Public routes
  {
    path: '/',
    element: <HomePage />,
    exact: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    exact: true,
  },
  {
    path: '/signup',
    element: <SignupPage />,
    exact: true,
  },
  {
    path: '/portfolio',
    element: <Portfolio />,
    exact: true,
  },
  {
    path: '/insights',
    element: <Insights />,
    exact: true,
  },
  {
    path: '/global-presence',
    element: <GlobalPresence />,
    exact: true,
  },
  {
    path: '/faq',
    element: <FAQ />,
    exact: true,
  },
  {
    path: '/about',
    element: <About />,
    exact: true,
  },
  {
    path: '/contact',
    element: <Contact />,
    exact: true,
  },
  {
    path: '/services',
    element: <Services />,
    exact: true,
  },
  {
    path: '/pricing',
    element: <Pricing />,
    exact: true,
  },
  // Protected routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'overview',
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'suggestions',
        element: <Suggestions />,
      },
    ],
  },
  // 404 route
  {
    path: '*',
    element: <NotFound />,
  },
];

// Loading Fallback Component
const AppLoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
);

// Route Wrapper with Error Boundary
const RouteWrapper: React.FC<{ 
  children: React.ReactNode;
  requiresAuth?: boolean;
  fallback?: React.ReactNode;
}> = ({ children, requiresAuth = false, fallback }) => {
  if (requiresAuth) {
    return (
      <ProtectedRoute fallback={fallback}>
        {children}
      </ProtectedRoute>
    );
  }
  return <>{children}</>;
};

// Main App Component
const App: React.FC = () => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to external service in production
        console.error('App Error:', error, errorInfo);
      }}
      showDetails={process.env.NODE_ENV === 'development'}
    >
      <Provider store={store}>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <div className="App">
                <Suspense fallback={<AppLoadingFallback />}>
                  <Routes>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={
                          route.children ? (
                            <RouteWrapper requiresAuth={route.path.startsWith('/dashboard')}>
                              <MainLayout>
                                <Routes>
                                  {route.children.map((childRoute, childIndex) => (
                                    <Route
                                      key={childIndex}
                                      path={childRoute.path}
                                      element={childRoute.element}
                                    />
                                  ))}
                                </Routes>
                              </MainLayout>
                            </RouteWrapper>
                          ) : (
                            <RouteWrapper 
                              requiresAuth={route.path.startsWith('/dashboard')}
                              fallback={
                                route.path.startsWith('/dashboard') ? (
                                  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                                    <div className="text-center">
                                      <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
                                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Please log in to access this page.
                                      </p>
                                      <a
                                        href="/login"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                      >
                                        Go to Login
                                      </a>
                                    </div>
                                  </div>
                                ) : undefined
                              }
                            >
                              <MainLayout>
                                {route.element}
                              </MainLayout>
                            </RouteWrapper>
                          )
                        }
                      />
                    ))}
                  </Routes>
                </Suspense>
              </div>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
};

// Export the App component
export default App;

// Development helpers
if (process.env.NODE_ENV === 'development') {
  // Add global error handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You might want to send this to your error reporting service
  });

  // Add global error handler for JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // You might want to send this to your error reporting service
  });

  // Enable React DevTools
  if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    // React DevTools are already available
  }
}

// Hot module replacement for development
if (import.meta.hot) {
  (import.meta as any).hot?.accept();
}