// src/pages/About.jsx
import React, { useState } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

/** Reusable UI components */
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base =
    "px-6 py-2 rounded-full font-semibold transition-all active:scale-95";
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-[1.02]",
    airy:
      "bg-white/10 backdrop-blur text-white border border-white/10 hover:bg-white/20",
    ghost:
      "bg-transparent text-white/70 border border-white/10 hover:bg-white/10",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-start bg-white/80 backdrop-blur rounded-lg px-5 py-4 shadow-md border border-gray-300/50">
    <div className="text-2xl font-extrabold text-indigo-600">{value}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

const Feature = ({ title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="p-5 bg-white/80 backdrop-blur rounded-2xl shadow border border-gray-300/50"
  >
    <h3 className="font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{desc}</p>
  </motion.div>
);

/** ==================== MAIN PAGE ==================== */
export default function About() {
  const [darkHero, setDarkHero] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 relative">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1 }}
            className="absolute left-10 top-10 w-80 h-80 rounded-full blur-3xl bg-blue-400"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute right-10 top-52 w-80 h-80 rounded-full blur-3xl bg-purple-400"
          ></motion.div>
        </div>

      <main className="pt-28 max-w-7xl mx-auto px-6 pb-20 space-y-20">

        {/* ================= HERO ================= */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          {/* left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className={`rounded-3xl p-10 backdrop-blur border border-gray-300/50 shadow-xl ${
                darkHero
                  ? "bg-gradient-to-br from-slate-900/90 to-slate-800/90"
                  : "bg-white/80"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-indigo-300">
                  Enterprise Analytics
                </span>

                {/* theme switch */}
                <button
                  className="w-12 h-6 rounded-full bg-white/20 flex items-center p-1"
                  onClick={() => setDarkHero(!darkHero)}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-all ${
                      darkHero ? "translate-x-6" : ""
                    }`}
                  ></div>
                </button>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                Advanced Analytics for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                  Accurate Estimation
                </span>
              </h1>

              <p className="text-gray-300 mb-6">
                Predicto delivers real-time feasibility, costing, and timeline
                predictions using AI models built for Software + Construction.
              </p>

              <div className="flex gap-3 flex-wrap">
                <Button onClick={() => window.location.assign("/estimation")}>
                  Start Estimation
                </Button>
                <Button
                  variant="airy"
                  onClick={() => window.location.assign("/contact")}
                >
                  Book Demo
                </Button>
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  AI Analysis
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  GDPR Ready
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  Enterprise SLA
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right (analytics image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src="/assets/analytics-dashboard-hero.webp"
              alt="Predicto analytics dashboard"
              className="rounded-3xl shadow-2xl object-cover w-full h-96"
              onError={(e) => (e.target.src = "/assets/OIP.webp")}
            />
          </motion.div>
        </section>

        {/* ================== STATS ================== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="98.4%" label="Accuracy" />
          <StatCard value="12K+" label="Projects Analyzed" />
          <StatCard value="52+" label="Industry Models" />
          <StatCard value="4.9/5" label="User Rating" />
        </section>

        {/* ================== FEATURES ================= */}
        <section className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-3">Why Predicto?</h2>
            <p className="text-gray-300 mb-5">
              Remove estimation guesswork using real-time analytics,
              regulations, and AI-based feasibility models.
            </p>

            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">•</span> AI cost &
                timeline modeling
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">•</span> Real-time
                material & labor pricing
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold">•</span> Vendor
                comparison & risk simulation
              </li>
            </ul>

            <Button
              className="mt-6"
              variant="ghost"
              onClick={() => window.location.assign("/services")}
            >
              Explore Services
            </Button>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Feature
              title="Precision Costing"
              desc="AI models trained on historical pricing + market feeds."
            />
            <Feature
              title="Optimized Timelines"
              desc="Sprint speed forecasting + dependency mapping."
              delay={0.08}
            />
            <Feature
              title="Feasibility Scoring"
              desc="Regulation awareness + compliance checks."
              delay={0.16}
            />
            <Feature
              title="Vendor Simulation"
              desc="Compare suppliers & materials with scenario testing."
              delay={0.24}
            />
          </div>
        </section>

        {/* ================= TIMELINE ================= */}
        <section>
          <h2 className="text-center text-3xl font-bold mb-10">
            Our Milestones
          </h2>

          <div className="relative border-l border-gray-300/50 pl-10 max-w-4xl mx-auto">
            {[
              {
                year: "2021",
                title: "Research Started",
                desc: "Model prototyping",
              },
              {
                year: "2022",
                title: "First Launch",
                desc: "Construction & software pilot",
              },
              {
                year: "2023",
                title: "Scaling",
                desc: "Added pricing feeds & ML tuning",
              },
              {
                year: "2024",
                title: "Enterprise Rollout",
                desc: "APIs + SLA + integrations",
              },
              {
                year: "2025",
                title: "Dual Industry Estimation",
                desc: "Unified IT + Construction",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="mb-10 relative"
              >
                <div className="absolute -left-12 w-6 h-6 bg-indigo-500 rounded-full ring-4 ring-blue-50"></div>
                <div className="text-indigo-400 text-sm">{t.year}</div>
                <h3 className="text-xl font-semibold">{t.title}</h3>
                <p className="text-gray-300">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section>
          <h2 className="text-center text-3xl font-bold mb-6">
            Leadership & Experts
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "RISINTERNATIONAL", role: "Founder & CEO", img: "/assets/team1.webp" },
              { name: "Lead Data Scientist", role: "AI & Modeling", img: "/assets/team2.webp" },
              { name: "Head of Product", role: "Product & UX", img: "/assets/team3.webp" },
              { name: "Operations Lead", role: "Enterprise Delivery", img: "/assets/team4.webp" },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-6 bg-white/80 rounded-2xl border border-gray-300/50 text-center"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-gray-300 shadow"
                />
                <div className="mt-3 font-semibold">{m.name}</div>
                <div className="text-gray-600 text-sm">{m.role}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TRUST BADGES ================= */}
        <section className="flex gap-4 flex-wrap justify-center">
          {[
            "ISO 27001",
            "GDPR Compliant",
            "AES-256 Encryption",
            "Enterprise SLA",
          ].map((txt, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-white/80 rounded-full border border-gray-300/50 text-sm"
            >
              {txt}
            </div>
          ))}
        </section>

        {/* ================= CTA ================= */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-indigo-600/80 p-10 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold">Achievements</h3>
            <p className="mt-3">
              200+ startups served, $20M+ raised, 35% faster estimation cycle.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• 200+ Projects analyzed</li>
              <li>• 35% faster planning</li>
              <li>• 4.9/5 average rating</li>
            </ul>
          </div>

          <div className="bg-white/80 p-10 rounded-3xl border border-gray-300/50">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Get a detailed feasibility report
            </h3>
            <p className="text-gray-600 mb-4">
              Upload your project scope and our team will prepare a complete
              investor-ready report.
            </p>

            <div className="flex gap-3">
              <Button onClick={() => window.location.assign("/contact")}>
                Request Report
              </Button>
              <Button
                variant="airy"
                onClick={() => window.location.assign("/estimation")}
              >
                Try Predicto
              </Button>
            </div>
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </Layout>
  );
}
