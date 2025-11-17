// Modern Login Page for Project Estimation Tool (Pridicto)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Login() {
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800'}`}>
      <Navbar dark={dark} setDark={setDark} />

      <div className="pt-20 pb-10 md:flex min-h-[calc(100vh-160px)]">

        {/* Left Section with Video Background */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:flex flex-1 relative overflow-hidden rounded-r-xl shadow-2xl"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/estimation.mp4" // Make sure to add your video in public/videos
          ></video>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-blue-800/40 to-transparent p-8 flex items-center justify-start">
            <div className="text-white max-w-lg z-10">
              <h2 className="text-4xl font-bold mb-4 leading-snug">
                Smarter Estimates with <span className="underline decoration-lime-400">Pridicto</span>
              </h2>
              <p className="text-lg mb-6">
                Your AI-powered companion for exact project costing and timelines.
              </p>
              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex items-center gap-2"><span>🧠</span> Data-driven estimations</li>
                <li className="flex items-center gap-2"><span>🚀</span> Automated workflows</li>
                <li className="flex items-center gap-2"><span>📈</span> Dynamic cost projections</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Right Section: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full max-w-md mx-auto p-8"
        >
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-extrabold text-center mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-400">
              Welcome Back
            </h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-colors shadow-md"
              >
                Login
              </button>
            </form>

            <div className="text-center mt-4 space-y-2">
              <p>
                Don’t have an account?{' '}
                <Link to="/signup" className="text-indigo-600 hover:underline">
                  Sign up
                </Link>
              </p>
              <p>
                <Link to="/reset-password" className="text-indigo-600 hover:underline">
                  Forgot password?
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}