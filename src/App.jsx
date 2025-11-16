import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded pages
const PredictoLanding = lazy(() => import('./pages/PredictoLanding'));
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Insights = lazy(() => import('./pages/Insights'));
const GlobalPresence = lazy(() => import('./pages/GlobalPresence'));
const Contact = lazy(() => import('./pages/Contact'));
const EstimationForm = lazy(() => import('./pages/EstimationForm'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Comparison = lazy(() => import('./pages/Comparison'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const FAQ = lazy(() => import('./pages/FAQ'));

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<PredictoLanding />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/estimate" element={<EstimationForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
            <Chatbot />
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
