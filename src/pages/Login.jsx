import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiLoader } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, signup, loading } = useAuth();

  // Login form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Validation functions
  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginForm.email))
      errors.email = "Email is invalid";
    if (!loginForm.password) errors.password = "Password is required";
    return errors;
  };

  const validateSignupForm = () => {
    const errors = {};
    if (!signupForm.firstName) errors.firstName = "First name is required";
    if (!signupForm.lastName) errors.lastName = "Last name is required";
    if (!signupForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupForm.email))
      errors.email = "Email is invalid";
    if (!signupForm.password) errors.password = "Password is required";
    else if (signupForm.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (signupForm.password !== signupForm.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errors = validateLoginForm();

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    try {
      await login(loginForm.email, loginForm.password);
      setLoginForm({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      setSubmitError(error.message || "Login failed. Please try again.");
    }
  };

  // Handle signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errors = validateSignupForm();

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    try {
      await signup(signupForm.email, signupForm.password, {
        firstName: signupForm.firstName,
        lastName: signupForm.lastName,
      });
      setSignupForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsLogin(true);
      setLoginForm({ email: signupForm.email, password: "" });
    } catch (error) {
      setSubmitError(error.message || "Signup failed. Please try again.");
    }
  };

  // Handle Google login
  const handleGoogleAuth = () => {
    // TODO: Implement Google OAuth
    setSubmitError("Google authentication coming soon");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-4xl bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Left Promo Section */}
          <div className="hidden md:flex flex-col justify-center items-center p-10 bg-gradient-to-br from-blue-900 to-teal-600">
            <h2 className="text-4xl font-extrabold mb-4">Welcome to Pridicto</h2>
            <p className="text-lg mb-6 text-center">
              Smart, powerful project estimation tailored for teams that deliver.
            </p>
            <div className="space-y-3 text-left">
              <p>✔ AI-powered cost & time estimation</p>
              <p>✔ Predict risks before they occur</p>
              <p>✔ Custom workflows for construction, IT, and more</p>
            </div>
          </div>

          {/* Right Auth Section */}
          <motion.div
            layout
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="p-10 bg-white/5 dark:bg-gray-900/60"
          >
            <AnimatePresence mode="wait">
              {/* Login Form */}
              {isLogin && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-semibold mb-6 text-center">Log In</h2>
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                      {submitError}
                    </div>
                  )}
                  <form className="space-y-6" onSubmit={handleLoginSubmit}>
                    <div>
                      <label className="flex items-center gap-2 mb-1" htmlFor="email">
                        <FiMail />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                          loginErrors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="example@mail.com"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                      />
                      {loginErrors.email && (
                        <p className="text-red-400 text-sm mt-1">{loginErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1" htmlFor="password">
                        <FiLock />
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                          loginErrors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="********"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, password: e.target.value })
                        }
                      />
                      {loginErrors.password && (
                        <p className="text-red-400 text-sm mt-1">{loginErrors.password}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading && <FiLoader className="animate-spin" />}
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-full mt-4 py-3 border rounded-lg flex justify-center items-center gap-3 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FcGoogle className="text-2xl" /> Continue with Google
                  </button>

                  <div className="text-sm text-center mt-4">
                    <p>
                      Don't have an account?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-blue-300 hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Signup Form */}
              {!isLogin && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-semibold mb-6 text-center">Create Account</h2>
                  {submitError && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
                      {submitError}
                    </div>
                  )}
                  <form className="space-y-5" onSubmit={handleSignupSubmit}>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="flex items-center gap-2 mb-1">
                          <FiUser /> First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none ${
                            signupErrors.firstName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-indigo-500"
                          }`}
                          value={signupForm.firstName}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {signupErrors.firstName && (
                          <p className="text-red-400 text-sm mt-1">
                            {signupErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 mb-1">
                          <FiUser /> Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none ${
                            signupErrors.lastName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-indigo-500"
                          }`}
                          value={signupForm.lastName}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {signupErrors.lastName && (
                          <p className="text-red-400 text-sm mt-1">
                            {signupErrors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1">
                        <FiMail /> Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none ${
                          signupErrors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
                        }`}
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, email: e.target.value })
                        }
                      />
                      {signupErrors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {signupErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1">
                        <FiLock /> Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none ${
                          signupErrors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
                        }`}
                        value={signupForm.password}
                        onChange={(e) =>
                          setSignupForm({ ...signupForm, password: e.target.value })
                        }
                      />
                      {signupErrors.password && (
                        <p className="text-red-400 text-sm mt-1">
                          {signupErrors.password}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-1">
                        <FiLock /> Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className={`w-full p-3 rounded-lg border focus:ring-2 focus:outline-none ${
                          signupErrors.confirmPassword
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-indigo-500"
                        }`}
                        value={signupForm.confirmPassword}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                      {signupErrors.confirmPassword && (
                        <p className="text-red-400 text-sm mt-1">
                          {signupErrors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading && <FiLoader className="animate-spin" />}
                      {loading ? "Creating account..." : "Sign Up"}
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-full mt-4 py-3 border rounded-lg flex justify-center items-center gap-3 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FcGoogle className="text-2xl" /> Continue with Google
                  </button>

                  <div className="text-sm text-center mt-4">
                    <p>
                      Already have an account?{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-blue-300 hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;