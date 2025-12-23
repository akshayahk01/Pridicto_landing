// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { FiMail, FiArrowLeft, FiLoader } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Here you would call your backend "forgot password" API
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1500)); // mock
      setSent(true);

      // Navigate to email verification page with state
      navigate("/email-verification", { state: { email } });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/70 backdrop-blur-2xl shadow-[0_40px_120px_rgba(15,23,42,0.9)] p-7">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Password reset
          </span>
        </div>

        <h1 className="text-xl font-semibold mb-2">Forgot your password?</h1>
        <p className="text-xs text-slate-300 mb-5">
          We&apos;ll send a secure link to reset your password. This link will be valid
          for a limited time.
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/70 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-1 text-xs text-slate-200">
              <FiMail className="w-4 h-4" /> Email address
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-cyan-400/80"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_14px_45px_rgba(8,47,73,0.9)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {loading && <FiLoader className="animate-spin" />}
            {loading ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-400 text-center">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-cyan-300 hover:text-cyan-100 underline underline-offset-2"
          >
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
