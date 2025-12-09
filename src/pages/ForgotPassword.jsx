import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiArrowLeft,
  FiSend
} from 'react-icons/fi';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would call your backend API here
      // await forgotPassword(email);
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950/20 via-indigo-50 to-purple-50 from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-3xl p-8 shadow-2xl border border-gray-200/50 border-slate-700/50 text-center"
          >
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-green-100 bg-green-900/30 flex items-center justify-center mx-auto mb-6">
              <FiMail className="w-8 h-8 text-green-600 text-green-400" />
            </div>

            {/* Header */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg">
                  P
                </div>
                <div>
                  <h1 className="font-semibold text-xl bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Predicto</h1>
                  <p className="text-xs text-gray-500">Smart AI Estimator</p>
                </div>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900 text-white mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 text-gray-300">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            {/* Instructions */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 text-gray-300 mb-4">
                Didn't receive the email? Check your spam folder or try again.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <FiSend className="w-5 h-5" />
                Resend Email
              </button>
              
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 border-gray-600 rounded-lg text-gray-700 text-gray-300 hover:bg-gray-50 hover:bg-slate-700 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                Back to Login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950/20 via-indigo-50 to-purple-50 from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-3xl p-8 shadow-2xl border border-gray-200/50 border-slate-700/50"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg">
                P
              </div>
              <div>
                <h1 className="font-semibold text-xl bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Predicto</h1>
                <p className="text-xs text-gray-500">Smart AI Estimator</p>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 text-white mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600 text-gray-300">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg text-red-700 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 text-gray-300 hover:text-indigo-600 hover:text-indigo-400 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}