<<<<<<< HEAD
// src/pages/ServiceDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaClock,
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaCheckCircle,
  FaLightbulb,
  FaCalendarAlt,
  FaDollarSign,
  FaDownload,
  FaFileAlt,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

/**
 * Ultra-Premium ServiceDetail (Layout B)
 * - Sidebar next to the HERO (desktop). Stacks on mobile.
 * - Fixed premium gradients (purple → cyan → gold).
 * - Front-end-only pseudo-AI estimator + export placeholders.
 *
 * Replace your current ServiceDetail.jsx with this file.
 */

/* ------------------------- Sample data (kept from your version) ------------------------- */
const serviceDetails = {
  1: {
    id: 1,
    slug: "business-plan-writing",
    title: "Business Plan Writing",
    description:
      "We craft detailed, investor-ready business plans including executive summaries, financial projections, and market analysis to help startups attract funding.",
    image:
      "https://img.freepik.com/free-vector/business-plan-concept-illustration_114360-5450.jpg",
    features: [
      "Executive Summary with compelling value proposition",
      "5-year financial projections with multiple scenarios",
      "Market analysis and competitive landscape",
      "Go-to-market strategy and implementation roadmap",
      "Risk assessment and mitigation strategies",
      "Investor presentation materials",
    ],
    pricing: { basic: 999, pro: 1999, enterprise: 3999 },
    timeline: "7-14 days",
    aiFeatures: [
      "AI-powered market size calculations",
      "Automated competitor analysis",
      "Financial projection optimization",
      "Risk assessment algorithms",
    ],
    addons: [
      { key: "priority", name: "Priority Support", desc: "Faster delivery & SLA", price: 299 },
      { key: "consultation", name: "1-on-1 Consultation", desc: "Expert call (60m)", price: 199 },
      { key: "revisions", name: "Unlimited Revisions", desc: "Iterate until perfect", price: 149 },
    ],
    testimonials: [
      { name: "Sarah Chen", company: "TechFlow Inc.", rating: 5, text: "Got $2M funding with their business plan!" },
      { name: "Mike Johnson", company: "GreenEnergy Co.", rating: 5, text: "Professional quality that impressed investors." },
    ],
  },
  2: {
    id: 2,
    slug: "pitch-deck-creation",
    title: "Pitch Deck Creation",
    description:
      "Get a stunning 10-15 slide investor pitch deck with compelling visuals, storytelling, and impactful design to win over investors.",
    image:
      "https://img.freepik.com/free-vector/startup-pitch-presentation-concept-illustration_114360-9131.jpg",
    features: [
      "10-15 slide professional pitch deck",
      "Custom visuals and data visualization",
      "Storytelling framework for maximum impact",
      "Investor psychology optimization",
      "Multiple format exports (PDF, PPT, Keynote)",
      "Rehearsal and presentation coaching",
    ],
    pricing: { basic: 799, pro: 1499, enterprise: 2499 },
    timeline: "5-10 days",
    aiFeatures: [
      "AI-generated compelling narratives",
      "Visual design optimization",
      "Data storytelling algorithms",
      "Investor preference analysis",
    ],
    addons: [
      { key: "priority", name: "Priority Support", desc: "Faster delivery & SLA", price: 199 },
      { key: "design", name: "Custom Visuals Pack", desc: "Extra graphics & icons", price: 249 },
    ],
    testimonials: [
      { name: "Alex Rodriguez", company: "FinTech Solutions", rating: 5, text: "Raised $5M with their pitch deck design!" },
      { name: "Emma Davis", company: "HealthTech App", rating: 5, text: "The storytelling was incredible." },
    ],
  },
  3: {
    id: 3,
    slug: "financial-modelling",
    title: "Financial Modelling",
    description:
      "We create robust financial models in Excel or Google Sheets with P&L, cash flow, and balance sheet forecasts for 3–5 years.",
    image:
      "https://img.freepik.com/free-vector/financial-data-analysis-concept_23-2149150783.jpg",
    features: [
      "3-5 year financial projections",
      "Profit & Loss, Cash Flow, Balance Sheet",
      "Scenario analysis and sensitivity testing",
      "Key financial ratios and KPIs",
      "Automated dashboard with charts",
      "Monthly/quarterly breakdown options",
    ],
    pricing: { basic: 599, pro: 1199, enterprise: 2199 },
    timeline: "3-7 days",
    aiFeatures: [
      "AI-powered revenue forecasting",
      "Automated scenario generation",
      "Risk-adjusted financial modeling",
      "Industry benchmark comparisons",
    ],
    addons: [
      { key: "dashboard", name: "Dashboard Export", desc: "Interactive dashboard", price: 299 },
      { key: "sensitivity", name: "Sensitivity Pack", desc: "Custom scenarios", price: 149 },
    ],
    testimonials: [
      { name: "David Kim", company: "Manufacturing Corp", rating: 5, text: "Accurate projections helped secure bank loan." },
      { name: "Lisa Wang", company: "Retail Chain", rating: 5, text: "The sensitivity analysis was game-changing." },
    ],
  },
  // ... you can extend with more items (4..10) as needed
};

/* ---------------------- small UI helpers ---------------------- */
function InitialsAvatar({ name = "", size = 44 }) {
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 12,
      background: "linear-gradient(135deg,#7c3aed,#f59e0b)",
      color: "#08070b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      boxShadow: "0 10px 30px rgba(124,58,237,0.18)"
    }}>
      {initials || "U"}
    </div>
  );
}

/* ---------------------- pseudo-AI estimator (frontend only) ---------------------- */
function simpleEstimator({ service, pkgKey, addons = [], timelineKey, budgetRange }) {
  const base = (service.pricing && service.pricing[pkgKey]) || Object.values(service.pricing)[0];
  const addonMap = (service.addons || []).reduce((acc, a) => ({ ...acc, [a.key]: a.price }), {});
  const addonCost = addons.reduce((s, k) => s + (addonMap[k] || 0), 0);

  const timelineMult = { rush: 1.45, standard: 1, flexible: 0.85 }[timelineKey] || 1;
  const pkgMult = pkgKey === "enterprise" ? 1.22 : pkgKey === "pro" ? 1.05 : 1;
  const avgBudget = (budgetRange && (budgetRange[0] + budgetRange[1]) / 2) || base * 1.2;
  const budgetRatio = Math.max(0.4, Math.min(2.2, avgBudget / Math.max(1, base)));

  const complexity = Math.min(0.98, (1 + (addonCost / Math.max(base, 1))) * pkgMult * (1 / budgetRatio));
  const buffer = Math.round(base * complexity * 0.12);

  const total = Math.round((base + addonCost + buffer) * timelineMult);
  const risk = Math.min(0.95, complexity * 0.65);
  const confidence = Math.min(0.98, 0.45 + (budgetRatio - 0.6) / 2 + (pkgKey === "enterprise" ? 0.08 : 0));
  const roi = Math.round(((avgBudget * 0.08 * 12) - total) / Math.max(1, total) * 100);

  return {
    base,
    addonCost,
    buffer,
    total,
    risk,
    confidence,
    complexity,
    roi,
    timelineText: timelineKey === "rush" ? "3–7 days (Rush)" : timelineKey === "flexible" ? "Flexible (longer)" : service.timeline || "7–14 days",
    recommendations: [
      !addons.includes("revisions") ? "Consider 'Unlimited Revisions' for investor-ready materials." : null,
      timelineKey === "rush" && !addons.includes("priority") ? "Add 'Priority Support' for rushed delivery." : null,
    ].filter(Boolean),
  };
}

/* ---------------------- component ---------------------- */
export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[id] || serviceDetails[1];

  const [pkg, setPkg] = useState(Object.keys(service.pricing)[1] || Object.keys(service.pricing)[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [timeline, setTimeline] = useState("standard");
  const [budgetRange, setBudgetRange] = useState(() => {
    const prices = Object.values(service.pricing);
    const low = Math.max(500, Math.round(prices[0] * 0.8));
    const high = Math.max(1500, Math.round(prices[prices.length - 1] * 2.5));
    return [low, high];
  });

  const [isEstimating, setIsEstimating] = useState(false);
  const [estimate, setEstimate] = useState(() => simpleEstimator({ service, pkgKey: pkg, addons: selectedAddons, timelineKey: timeline, budgetRange }));

  // recalc estimate with debounce when inputs change
  useEffect(() => {
    setIsEstimating(true);
    const t = setTimeout(() => {
      const out = simpleEstimator({ service, pkgKey: pkg, addons: selectedAddons, timelineKey: timeline, budgetRange });
      setEstimate(out);
      setIsEstimating(false);
    }, 420);
    return () => clearTimeout(t);
  }, [service, pkg, selectedAddons, timeline, budgetRange]);

  const toggleAddon = (key) => {
    setSelectedAddons((prev) => (prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]));
  };

  const exportJSON = () => {
    const payload = {
      createdAt: new Date().toISOString(),
      service: { id: service.id, title: service.title },
      selection: { pkg, addons: selectedAddons, timeline, budgetRange },
      estimate,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(service.slug || service.title).replace(/\s+/g, "_")}_estimate.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
=======
// This canvas contains ALL split components for the new ultra‑premium Service Detail page.
// Copy each component into its own file inside /src/components/services/ and import them.
// ---------------------------
// FILE: /src/components/services/ServiceHero.jsx
// ---------------------------
import React from 'react';
import { FaClock, FaRocket, FaShieldAlt } from 'react-icons/fa';

export default function ServiceHero({ service }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
      <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />

      <div className="p-8 space-y-4">
        <h1 className="text-4xl font-bold text-indigo-600">{service.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">{service.description}</p>

        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2"><FaClock className="text-indigo-500" />{service.timeline}</div>
          <div className="flex items-center gap-2"><FaShieldAlt className="text-green-500" />Quality Assurance</div>
          <div className="flex items-center gap-2"><FaRocket className="text-purple-500" />AI Powered</div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/FeatureList.jsx
// ---------------------------
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export function FeatureList({ features }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <FaCheckCircle className="text-green-500" /> Features Included
      </h2>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <FaCheckCircle className="text-green-500 mt-1" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/AIFeatures.jsx
// ---------------------------
import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

export function AIFeatures({ ai }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <FaLightbulb className="text-yellow-500" /> AI Features
      </h2>
      <ul className="space-y-3">
        {ai.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <FaLightbulb className="text-yellow-500 mt-1" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/PricingCard.jsx
// ---------------------------
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

export function PricingCard({ service, selectedPackage, setSelectedPackage }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-gray-100 dark:border-slate-700 sticky top-28">
      <h3 className="font-semibold mb-3 text-gray-500">Select Package</h3>
      <div className="grid gap-3">
        {Object.entries(service.pricing).map(([tier, price]) => (
          <button
            key={tier}
            onClick={() => setSelectedPackage(tier)}
            className={`text-left p-3 rounded-xl border-2 transition duration-300 ${
              selectedPackage === tier
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="capitalize font-semibold">{tier}</span>
              <span className="text-indigo-600 font-bold text-xl">${price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/Addons.jsx
// ---------------------------
import React from 'react';

export function Addons({ addons, toggleAddon, addonPrices }) {
  const options = [
    { key: 'priority', label: 'Priority Support' },
    { key: 'consultation', label: '1-on-1 Consultation' },
    { key: 'revisions', label: 'Unlimited Revisions' },
    { key: 'templates', label: 'Custom Templates' }
  ];
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b

  const exportPDFPlaceholder = () => {
    alert("PDF export placeholder. Integrate jsPDF or server-side PDF generation to enable real PDF export.");
  };

  const handleRequest = () => {
    // example: navigate to contact with pre-filled state
    navigate("/contact", { state: { serviceId: service.id, selection: { pkg, selectedAddons, timeline, budgetRange }, estimate } });
  };

  /* gradients / theme (fixed) */
  const heroGradientText = { background: "linear-gradient(90deg,#7c3aed,#06b6d4,#f59e0b)", WebkitBackgroundClip: "text", color: "transparent" };
  const pageBg = "linear-gradient(180deg,#05060b 0%, #0b1220 60%)";

  return (
<<<<<<< HEAD
    <Layout>
      <div style={{ minHeight: "100vh", background: pageBg, color: "#e6eef8" }}>
        <main className="pt-28 max-w-7xl mx-auto px-6 pb-24">
          <Breadcrumb />

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-indigo-200 hover:underline">
                <FaArrowLeft /> Back to Services
              </button>
            </div>

            {/* HERO + SIDEBAR layout (Layout B) */}
            <section className="grid lg:grid-cols-3 gap-6 items-start">
              {/* HERO (left / main) */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="lg:col-span-2 rounded-3xl p-6" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex gap-6 items-start">
                  <div style={{ width: 120, height: 84, borderRadius: 14, overflow: "hidden", boxShadow: "0 14px 40px rgba(2,6,23,0.6)" }}>
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={heroGradientText}>{service.title}</h1>
                    <p className="mt-3 text-slate-200/85 max-w-3xl">{service.description}</p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <div className="inline-flex items-center gap-2 bg-white/4 px-3 py-1 rounded-md text-xs">
                        <FaClock /> {service.timeline}
                      </div>
                      <div className="inline-flex items-center gap-2 bg-white/4 px-3 py-1 rounded-md text-xs">
                        <FaShieldAlt /> Confidential
                      </div>
                      <div className="inline-flex items-center gap-2 bg-white/4 px-3 py-1 rounded-md text-xs">
                        <FaRocket /> AI-assisted
                      </div>
                    </div>

                    {/* quick CTAs */}
                    <div className="mt-6 flex gap-3">
                      <button onClick={() => document.getElementById("ai-deep")?.scrollIntoView({ behavior: "smooth" })} className="px-6 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(90deg,#7c3aed,#f59e0b)", color: "#08070b", boxShadow: "0 12px 34px rgba(124,58,237,0.18)" }}>
                        Get AI Estimate
                      </button>
                      <button onClick={() => navigate("/contact")} className="px-5 py-3 rounded-full border border-white/6">Talk to Sales</button>
                    </div>

                    {/* features */}
                    <div className="mt-8 grid sm:grid-cols-2 gap-4">
                      {service.features.map((f, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
                          <div className="flex items-start gap-3">
                            <div style={{ padding: 8, borderRadius: 8, background: "linear-gradient(90deg,#7c3aed,#06b6d4)", color: "#08070b" }}>
                              <FaCheckCircle />
                            </div>
                            <div>
                              <div className="font-semibold">{f}</div>
                              <div className="text-xs text-slate-300 mt-1">Premium delivery & docs</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Sticky AI Summary (next to hero on desktop; stacks on small screens) */}
              <motion.aside initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-2xl p-5" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-300">Selected package</div>
                    <div className="font-bold text-xl" style={{ color: "#f8e0a7" }}>{pkg.toUpperCase()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">From</div>
                    <div className="font-bold text-lg">${service.pricing[pkg].toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {Object.entries(service.pricing).map(([tier, price]) => (
                    <button key={tier} onClick={() => setPkg(tier)} className={`w-full text-left p-3 rounded-lg ${pkg === tier ? "shadow-xl" : ""}`} style={{ background: pkg === tier ? "linear-gradient(90deg,#7c3aed,#f59e0b)" : "transparent", color: pkg === tier ? "#08070b" : "#e6eef8", border: "1px solid rgba(255,255,255,0.03)" }}>
                      <div className="flex items-center justify-between">
                        <div className="capitalize font-semibold">{tier}</div>
                        <div className="font-bold">${price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-300 mb-2">Add-ons</div>
                  <div className="grid gap-2">
                    {(service.addons || []).map((a) => (
                      <label key={a.key} className="flex items-center justify-between p-2 rounded-md" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.02)" }}>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" checked={selectedAddons.includes(a.key)} onChange={() => toggleAddon(a.key)} />
                          <div>
                            <div className="font-medium">{a.name}</div>
                            <div className="text-xs text-slate-300">{a.desc}</div>
                          </div>
                        </div>
                        <div className="font-semibold">${a.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-300 mb-2">Timeline</div>
                  <div className="grid gap-2">
                    {[
                      { key: "rush", label: "Rush (3–7 days)" },
                      { key: "standard", label: "Standard" },
                      { key: "flexible", label: "Flexible" },
                    ].map((t) => (
                      <button key={t.key} onClick={() => setTimeline(t.key)} className={`w-full text-left p-2 rounded-md ${timeline === t.key ? "ring-2 ring-offset-1" : ""}`} style={{ background: "rgba(255,255,255,0.01)" }}>
                        <div className="flex items-center justify-between">
                          <div>{t.label}</div>
                          <div className="text-sm text-slate-300">{timeline === t.key ? "Selected" : ""}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-300 mb-2">Budget range</div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <div>${budgetRange[0]}</div>
                    <div>${budgetRange[1]}</div>
                  </div>
                  <input type="range" min="500" max="50000" step="100" value={budgetRange[0]} onChange={(e) => setBudgetRange([Number(e.target.value), budgetRange[1]])} className="w-full mt-2" />
                  <input type="range" min="500" max="50000" step="100" value={budgetRange[1]} onChange={(e) => setBudgetRange([budgetRange[0], Number(e.target.value)])} className="w-full mt-2" />
                </div>

                <div className="mt-5">
                  <div className="text-xs text-slate-300">Estimated total</div>
                  <div className="text-3xl font-extrabold mt-1" style={{ color: "#f8e0a7" }}>
                    {isEstimating ? <span className="inline-flex items-center gap-2"><LoadingSpinner /> Estimating...</span> : `$${(estimate?.total ?? 0).toLocaleString()}`}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button onClick={() => document.getElementById("ai-deep")?.scrollIntoView({ behavior: "smooth" })} className="flex-1 py-2 rounded-md" style={{ background: "linear-gradient(90deg,#7c3aed,#f59e0b)", color: "#08070b", fontWeight: 700 }}>
                    View details
                  </button>
                  <button onClick={handleRequest} className="py-2 px-3 rounded-md border">Request</button>
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={exportJSON} className="flex-1 py-2 rounded-md bg-white/6"><FaDownload className="inline mr-2" /> JSON</button>
                  <button onClick={exportPDFPlaceholder} className="py-2 px-3 rounded-md border"><FaFileAlt className="inline mr-2" /> PDF</button>
                </div>
              </motion.aside>
            </section>

            {/* AI Deep Dive (full width) */}
            <section id="ai-deep" className="mt-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.03)" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">AI Estimate & Executive Summary</h3>
                    <div className="text-xs text-slate-300 mt-1">Deterministic frontend estimator for quick decisions</div>
                  </div>
                  <div className="text-sm text-slate-300">Confidence: <strong>{Math.round((estimate?.confidence || 0) * 100)}%</strong></div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <div className="text-xs text-slate-300">Base price</div>
                    <div className="font-bold text-2xl mt-1">${estimate?.base?.toLocaleString() ?? "-"}</div>
                    <div className="text-xs text-slate-400 mt-1">Selected package base</div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <div className="text-xs text-slate-300">Add-ons</div>
                    <div className="font-bold text-2xl mt-1">${estimate?.addonCost?.toLocaleString() ?? "0"}</div>
                    <div className="text-xs text-slate-400 mt-1">Selected add-ons total</div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <div className="text-xs text-slate-300">AI buffer</div>
                    <div className="font-bold text-2xl mt-1">${estimate?.buffer?.toLocaleString() ?? "-"}</div>
                    <div className="text-xs text-slate-400 mt-1">Complexity & risk buffer</div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.01)" }}>
                    <div className="text-xs text-slate-300">Timeline</div>
                    <div className="font-bold text-2xl mt-1">{estimate?.timelineText}</div>
                    <div className="text-xs text-slate-400 mt-1">Estimated delivery window</div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg" style={{ background: "linear-gradient(90deg,#7c3aed22,#f59e0b22)", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs">Total estimated investment</div>
                      <div className="text-3xl font-extrabold">${estimate?.total?.toLocaleString() ?? "-"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs">Estimated ROI (annualized)</div>
                      <div className="font-semibold">{estimate?.roi}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <h4 className="font-semibold">Why this estimate?</h4>
                  <ul className="list-disc pl-5 mt-3 text-sm text-slate-200">
                    <li>Base price derived from package selection.</li>
                    <li>Complexity buffer accounts for add-ons and scope uncertainty.</li>
                    <li>Timeline multiplier applied to reflect delivery speed & cost.</li>
                  </ul>

                  <h4 className="font-semibold mt-4">Executive summary</h4>
                  <p className="text-sm text-slate-200 mt-2">
                    This frontend estimate provides a quick, conservative projection for planning and client discussions. For a firm proposal, request a full scoped feasibility and signed engagement.
                  </p>

                  <div className="mt-4">
                    <div className="font-semibold">Recommendations</div>
                    <ul className="list-disc pl-5 mt-2 text-sm text-slate-200">
                      {estimate?.recommendations?.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right intelligence column */}
              <div className="p-6 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.03)" }}>
                <div className="flex items-center gap-3">
                  <InitialsAvatar name={service.title} />
                  <div>
                    <div className="font-semibold">{service.title}</div>
                    <div className="text-xs text-slate-300">AI quick summary</div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-md" style={{ background: "rgba(0,0,0,0.12)" }}>
                    <div className="text-xs text-slate-300">Complexity</div>
                    <div className="font-semibold mt-1">{Math.round((estimate?.complexity || 0) * 100)} / 100</div>
                    <div className="h-2 mt-2 bg-white/6 rounded overflow-hidden">
                      <div style={{ width: `${Math.round((estimate?.complexity || 0) * 100)}%`, height: "100%", background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-md" style={{ background: "rgba(0,0,0,0.12)" }}>
                    <div className="text-xs text-slate-300">Risk</div>
                    <div className="font-semibold mt-1">{Math.round((estimate?.risk || 0) * 100)}%</div>
                    <div className="h-2 mt-2 bg-white/6 rounded overflow-hidden">
                      <div style={{ width: `${Math.round((estimate?.risk || 0) * 100)}%`, height: "100%", background: "linear-gradient(90deg,#f59e0b,#ef4444)" }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-md" style={{ background: "rgba(0,0,0,0.12)" }}>
                    <div className="text-xs text-slate-300">Confidence</div>
                    <div className="font-semibold mt-1">{Math.round((estimate?.confidence || 0) * 100)}%</div>
                    <div className="h-2 mt-2 bg-white/6 rounded overflow-hidden">
                      <div style={{ width: `${Math.round((estimate?.confidence || 0) * 100)}%`, height: "100%", background: "linear-gradient(90deg,#f59e0b,#f97316)" }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-md" style={{ background: "rgba(0,0,0,0.08)" }}>
                    <div className="text-xs text-slate-300">Quick actions</div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={handleRequest} className="flex-1 py-2 rounded-md" style={{ background: "linear-gradient(90deg,#7c3aed,#f59e0b)", color: "#08070b", fontWeight: 700 }}>Request proposal</button>
                      <button onClick={exportJSON} className="py-2 px-3 rounded-md border">JSON</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            {service.testimonials?.length > 0 && (
              <section className="mt-8 p-6 rounded-2xl" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.03)" }}>
                <h3 className="font-semibold text-lg">What clients say</h3>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {service.testimonials.map((t, i) => (
                    <div key={i} className="p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <InitialsAvatar name={t.name} size={40} />
                        <div>
                          <div className="font-semibold">{t.name}</div>
                          <div className="text-xs text-slate-300">{t.company}</div>
                        </div>
                      </div>
                      <p className="text-sm italic text-slate-200">"{t.text}"</p>
                      <div className="mt-3">
                        {Array.from({ length: t.rating }).map((_, ii) => <FaStar key={ii} className="text-yellow-400" />)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom CTA */}
            <section className="mt-8 p-8 rounded-3xl" style={{ background: "linear-gradient(90deg,#0b1220,#071032)", border: "1px solid rgba(255,255,255,0.03)" }}>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to convert this into a funded project?</h3>
                  <p className="mt-3 text-slate-300">We can provide a tailored engagement, milestones, and investor-ready deliverables.</p>
                </div>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => navigate("/contact", { state: { serviceId: service.id } })} className="px-6 py-3 rounded-full" style={{ background: "linear-gradient(90deg,#7c3aed,#f59e0b)", color: "#08070b", fontWeight: 700 }}>Schedule Call</button>
                  <button onClick={() => navigate("/estimation")} className="px-6 py-3 rounded-full border">Start a sample estimation</button>
                </div>
              </div>
            </section>
          </div>
        </main>
=======
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4">Add‑ons</h3>
      <div className="grid gap-3">
        {options.map((a) => (
          <label
            key={a.key}
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={addons.includes(a.key)}
                onChange={() => toggleAddon(a.key)}
              />
              <span className="font-medium">{a.label}</span>
            </div>
            <span className="text-indigo-600 font-semibold">+${addonPrices[a.key]}</span>
          </label>
        ))}
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

// ---------------------------
// FILE: /src/components/services/TimelineSelector.jsx
// ---------------------------
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

export function TimelineSelector({ timeline, setTimeline }) {
  const options = [
    { key: 'rush', label: 'Rush (3-5 days)', multiplier: 1.5 },
    { key: 'standard', label: 'Standard', multiplier: 1 },
    { key: 'flexible', label: 'Flexible', multiplier: 0.85 }
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-blue-500" /> Timeline
      </h3>
      <div className="grid gap-3">
        {options.map((t) => (
          <label
            key={t.key}
            onClick={() => setTimeline(t.key)}
            className={`p-3 rounded-lg cursor-pointer border flex items-center justify-between ${
              timeline === t.key
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-slate-700'
            }`}
          >
            <span>{t.label}</span>
            <span>x{t.multiplier}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/Testimonials.jsx
// ---------------------------
import React from 'react';
import { FaStar } from 'react-icons/fa';

export function Testimonials({ testimonials }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaStar className="text-yellow-500" /> Success Stories
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="border p-5 rounded-xl">
            <div className="flex gap-1 mb-2">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-3">"{t.text}"</p>
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-500">{t.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/FAQ.jsx
// ---------------------------
import React from 'react';

export function FAQ({ faqs }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="p-4 border rounded-lg cursor-pointer">
            <summary className="font-semibold">{f.q}</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// END OF COMPONENT BUNDLE
// ---------------------------
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
