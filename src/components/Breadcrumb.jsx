import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCalculator,
  FaRobot,
  FaChartLine,
  FaClock,
  FaArrowRight,
  FaArrowLeft,
  FaDownload,
  FaUpload,
  FaMapMarkerAlt,
  FaUsers,
  FaCodeBranch,
  FaTools,
  FaChartPie,
  FaChartBar,
} from "react-icons/fa";

import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import LoadingSpinner from "../components/LoadingSpinner";

// -----------------------------------------------
// GLOBAL ANIMATIONS
// -----------------------------------------------
const fadeIn = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const fadeRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55 } },
};

const fadeLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// ------------------------------------------------------
// AI RISK ENGINE
// ------------------------------------------------------
function calculateRiskScore({ complexity, teamSize, features }) {
  let score = 0;
  if (complexity === "high") score += 40;
  if (teamSize > 8) score += 25;
  if (features?.length > 8) score += 30;
  return Math.min(score, 100);
}

// ------------------------------------------------------
// AI TEAM STRUCTURE ENGINE
// ------------------------------------------------------
function predictTeamStructure({ projectType, complexity }) {
  const base = {
    web: ["Frontend Developer", "Backend Developer", "QA Engineer"],
    mobile: ["Mobile Developer", "API Developer", "QA Engineer"],
    ai: ["ML Engineer", "Data Scientist", "Backend Engineer"],
    ecommerce: ["Frontend Developer", "Backend Developer", "DevOps", "QA"],
  };

  let team = base[projectType] || [];

  if (complexity === "high") team.push("Solution Architect");
  if (projectType === "ai") team.push("AI Researcher");

  return team;
}

// ------------------------------------------------------
// AI TIMELINE ENGINE
// ------------------------------------------------------
function calculateTimeline(duration, complexity) {
  const factor =
    complexity === "high" ? 1.45 : complexity === "medium" ? 1.2 : 1.0;
  return Math.ceil(duration * factor);
}

// ------------------------------------------------------
// COST ENGINE
// ------------------------------------------------------
function generateCostEstimate(data) {
  const baseRates = {
    web: 25000,
    mobile: 40000,
    ai: 75000,
    ecommerce: 60000,
  };

  const complexityFactor = {
    low: 1.0,
    medium: 1.5,
    high: 2.3,
  };

  const featureCost = (data.features?.length || 0) * 3500;

  const addonsCost =
    (data.addons?.cloud ? 18000 : 0) +
    (data.addons?.security ? 23000 : 0) +
    (data.addons?.analytics ? 15000 : 0);

  const result =
    baseRates[data.projectType] * complexityFactor[data.complexity] +
    featureCost +
    addonsCost +
    data.teamSize * 9000;

  return Math.round(result);
}

// ------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------
export default function EstimationForm() {
  const navigate = useNavigate();
  const { register, watch, setValue, handleSubmit } = useForm();

  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState(null);
  const [theme, setTheme] = useState("dark"); // manual theme

  const formWatch = watch();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const projectType = watch("projectType");
  const complexity = watch("complexity");
  const duration = watch("duration");
  const teamSize = watch("teamSize") || 0;
  const features = watch("features") || [];

  // ------------------------------------------------------
  // STEP 1: PROJECT TYPE
  // ------------------------------------------------------
  const Step1 = () => (
    <motion.div variants={fadeIn} initial="initial" animate="animate" className="p-10 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border dark:border-slate-700">
      <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white">
        <FaCalculator className="text-indigo-500" />
        Project Classification
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Select your project category so AI can accurately benchmark cost.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {[
          { id: "web", label: "Web App", icon: "🌐" },
          { id: "mobile", label: "Mobile App", icon: "📱" },
          { id: "ai", label: "AI / ML System", icon: "🤖" },
          { id: "ecommerce", label: "E-commerce Platform", icon: "🛒" },
        ].map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setValue("projectType", p.id)}
            className={`p-6 rounded-2xl cursor-pointer border transition-all ${
              projectType === p.id
                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900"
                : "border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            }`}
          >
            <div className="text-4xl">{p.icon}</div>
            <h3 className="font-semibold mt-3 dark:text-white">{p.label}</h3>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <button
          disabled={!projectType}
          onClick={nextStep}
          className={`px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2 transition ${
            projectType
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );

  // ------------------------------------------------------
  // STEP 2: DETAILS + FEATURES + ADDONS
  // ------------------------------------------------------
  const Step2 = () => (
    <motion.div variants={fadeRight} initial="initial" animate="animate"
      className="p-10 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border dark:border-slate-700">

      <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white">
        <FaChartLine className="text-green-600" />
        Project Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div>
          <label className="dark:text-white">Team Size</label>
          <input
            type="number"
            {...register("teamSize")}
            className="mt-2 w-full p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="e.g., 4 developers"
          />
        </div>

        <div>
          <label className="dark:text-white">Project Duration (weeks)</label>
          <input
            type="number"
            {...register("duration")}
            className="mt-2 w-full p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="e.g., 8"
          />
        </div>

        <div>
          <label className="dark:text-white">Complexity</label>
          <select
            {...register("complexity")}
            className="mt-2 w-full p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="">Select complexity…</option>
            <option value="low">Low (Basic)</option>
            <option value="medium">Medium (Standard)</option>
            <option value="high">High (Advanced)</option>
          </select>
        </div>

        <div>
          <label className="dark:text-white">Location</label>
          <input
            type="text"
            {...register("location")}
            className="mt-2 w-full p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* FEATURES */}
      <h3 className="text-xl font-bold mt-10 mb-4 flex items-center gap-2 dark:text-white">
        <FaTools className="text-purple-600" /> Features
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {[
          "Authentication",
          "Admin Dashboard",
          "User Dashboard",
          "Real-time Chat",
          "Payment Gateway",
          "Analytics",
          "Push Notifications",
          "AI Automation",
          "API Integrations",
        ].map((f) => (
          <label key={f} className="p-4 border rounded-xl cursor-pointer flex gap-3 dark:border-slate-700 dark:text-white">
            <input type="checkbox" value={f} {...register("features")} />
            {f}
          </label>
        ))}
      </div>

      {/* ADDONS */}
      <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2 dark:text-white">
        <FaChartPie className="text-orange-500" /> Add-On Services
      </h3>

      <div className="space-y-4 dark:text-white">
        <label className="flex items-center gap-3 p-4 border rounded-xl dark:border-slate-700">
          <input type="checkbox" {...register("addons.cloud")} />
          Cloud Setup (+ ₹18,000)
        </label>
        <label className="flex items-center gap-3 p-4 border rounded-xl dark:border-slate-700">
          <input type="checkbox" {...register("addons.security")} />
          Security Hardening (+ ₹23,000)
        </label>
        <label className="flex items-center gap-3 p-4 border rounded-xl dark:border-slate-700">
          <input type="checkbox" {...register("addons.analytics")} />
          Analytics Dashboard (+ ₹15,000)
        </label>
      </div>

      {/* NAVIGATION */}
      <div className="flex justify-between mt-10">
        <button onClick={prevStep} className="px-8 py-3 rounded-xl border font-bold dark:border-slate-600 dark:text-white flex items-center gap-2">
          <FaArrowLeft /> Back
        </button>

        <button
          disabled={!complexity || !teamSize || !duration}
          onClick={nextStep}
          className={`px-8 py-3 rounded-xl text-white font-bold ${
            complexity && teamSize && duration
              ? "bg-indigo-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
  // ------------------------------------------------------
  // STEP 3 — TECH STACK + REQUIREMENTS + DOCUMENTS
  // ------------------------------------------------------
  const Step3 = () => {
    const summary = {
      projectType: projectType || "—",
      complexity: complexity || "—",
      duration: duration ? duration + " weeks" : "—",
      teamSize: teamSize || "—",
      features: features.length ? features.join(", ") : "None selected",
    };

    return (
      <motion.div
        variants={fadeLeft}
        initial="initial"
        animate="animate"
        className="grid md:grid-cols-3 gap-10 p-10 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border dark:border-slate-700"
      >
        {/* LEFT SECTION */}
        <div className="md:col-span-2">

          <h2 className="text-3xl font-bold flex items-center gap-3 dark:text-white">
            <FaCodeBranch className="text-indigo-500" />
            Select Tech Stack & Requirements
          </h2>

          {/* TECH STACK SELECTION */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[
              "MERN",
              "MEAN",
              "Django",
              "Spring Boot",
              "Laravel",
              "Ruby on Rails",
              "Serverless / Firebase",
              "Custom Stack",
            ].map((stack) => (
              <motion.div
                key={stack}
                whileHover={{ scale: 1.05 }}
                onClick={() => setValue("techStack", stack)}
                className={`p-5 rounded-xl border cursor-pointer ${
                  watch("techStack") === stack
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900"
                    : "border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                }`}
              >
                <h3 className="dark:text-white font-semibold">{stack}</h3>
              </motion.div>
            ))}
          </div>

          {/* REQUIREMENTS */}
          <div className="mt-10">
            <label className="font-semibold dark:text-white">Additional Requirements</label>
            <textarea
              {...register("requirements")}
              rows="4"
              className="mt-2 w-full p-4 rounded-xl border dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Describe advanced features, workflows, or integrations"
            />
          </div>

          {/* DOCUMENT UPLOAD */}
          <div className="mt-10">
            <label className="font-semibold dark:text-white flex items-center gap-2">
              <FaUpload className="text-indigo-500" />
              Upload Documents
            </label>

            <input
              type="file"
              multiple
              {...register("documents")}
              className="mt-3 block w-full text-sm text-gray-700 dark:text-white
              file:bg-indigo-50 dark:file:bg-slate-700 file:px-4 file:py-2 file:rounded-lg"
            />

            {watch("documents")?.length > 0 && (
              <div className="mt-4 space-y-2">
                {[...watch("documents")].map((file, i) => (
                  <div key={i} className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg border dark:border-slate-700 text-sm dark:text-white">
                    📄 {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevStep}
              className="px-8 py-3 rounded-xl border dark:border-slate-600 dark:text-white font-bold flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>

            <button
              onClick={generateAIResults}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 
              text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
            >
              <FaRobot /> Generate AI Estimate
            </button>
          </div>
        </div>

        {/* RIGHT — LIVE SUMMARY CARD */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block p-6 rounded-2xl bg-slate-900 text-white shadow-xl sticky top-24 h-fit"
        >
          <h3 className="text-xl font-bold mb-4">Live Summary</h3>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-slate-400">Project Type</p>
              <p className="font-semibold">{summary.projectType}</p>
            </div>
            <div>
              <p className="text-slate-400">Complexity</p>
              <p className="font-semibold">{summary.complexity}</p>
            </div>
            <div>
              <p className="text-slate-400">Duration</p>
              <p className="font-semibold">{summary.duration}</p>
            </div>
            <div>
              <p className="text-slate-400">Team Size</p>
              <p className="font-semibold">{summary.teamSize}</p>
            </div>
            <div>
              <p className="text-slate-400">Features</p>
              <p className="font-semibold">{summary.features}</p>
            </div>

            <hr className="border-slate-700 mt-4" />

            <p className="text-slate-400 text-xs">
              Summary updates automatically as you modify your project.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // ------------------------------------------------------
  // GENERATE AI RESULT (STEP 4)
  // ------------------------------------------------------
  const [estimateResult, setEstimateResult] = useState(null);

  function generateAIResults() {
    const cost = generateCostEstimate(formWatch);
    const timeline = calculateTimeline(duration, complexity);
    const risk = calculateRiskScore(formWatch);
    const team = predictTeamStructure(formWatch);

    setEstimateResult({
      totalCost: cost,
      timeline,
      riskScore: risk,
      teamStructure: team,
      breakdown: {
        development: Math.round(cost * 0.55),
        design: Math.round(cost * 0.15),
        testing: Math.round(cost * 0.12),
        projectManagement: Math.round(cost * 0.10),
        contingency: Math.round(cost * 0.08),
      },
      aiInsights: [
        `Estimated team productivity: ${Math.round(teamSize * 1.4)} units/week`,
        risk > 60
          ? "High risk detected — consider phased delivery"
          : "Risk level acceptable for standard delivery",
        `Market fluctuation range: ₹${Math.round(cost * 0.9)} - ₹${Math.round(
          cost * 1.25
        )}`,
      ],
    });

    setStep(4);
  }

  // ------------------------------------------------------
  // STEP 4 — RESULTS PAGE
  // ------------------------------------------------------
  const Step4 = () => {
    if (!estimateResult) return null;

    return (
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="space-y-10">

        {/* HEADER */}
        <div className="p-10 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl text-center">
          <h2 className="text-4xl font-bold">AI Estimate Complete</h2>
          <p className="opacity-90 text-lg">Your personalized project estimate is ready</p>
        </div>

        {/* COST PANEL */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border dark:border-slate-700">
          <h3 className="text-2xl font-bold dark:text-white mb-4">Total Estimated Cost</h3>

          <div className="text-center">
            <div className="text-6xl font-extrabold text-indigo-600">
              ₹{estimateResult.totalCost.toLocaleString()}
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              AI-generated confidence score: {100 - estimateResult.riskScore}%
            </p>
          </div>
        </div>
        {/* COST BREAKDOWN */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border dark:border-slate-700">
          <h3 className="text-2xl font-bold dark:text-white mb-6">Cost Breakdown</h3>

          <div className="space-y-4">
            {Object.entries(estimateResult.breakdown).map(([key, val], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 flex justify-between items-center rounded-xl bg-gray-50 dark:bg-slate-800 border dark:border-slate-700"
              >
                <span className="font-semibold dark:text-gray-200 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="text-indigo-600 font-bold text-lg">
                  ₹{val.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border dark:border-slate-700">
          <h3 className="text-2xl font-bold dark:text-white mb-4">Project Timeline</h3>

          <div className="text-center">
            <div className="text-5xl font-bold text-green-500">
              {estimateResult.timeline} weeks
            </div>
            <p className="text-gray-600 dark:text-gray-400">Estimated completion timeframe</p>
          </div>
        </div>

        {/* STEP 5 — AI INSIGHTS */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border dark:border-slate-700">
          <h3 className="text-2xl font-bold dark:text-white mb-6 flex items-center gap-3">
            <FaRobot className="text-purple-600" /> AI Insights & Recommendations
          </h3>

          <div className="space-y-4">
            {estimateResult.aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border dark:border-purple-700 flex gap-4"
              >
                <FaRobot className="text-purple-600 text-xl mt-1" />
                <span className="dark:text-gray-200">{insight}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* STEP 6 — TEAM STRUCTURE */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border dark:border-slate-700">
          <h3 className="text-2xl font-bold dark:text-white mb-6 flex items-center gap-3">
            <FaUsers className="text-indigo-500" /> Recommended Team Structure
          </h3>

          <div className="space-y-4">
            {estimateResult.teamStructure.map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex gap-3"
              >
                <FaCheckCircle className="text-green-500 text-xl mt-1" />
                <span className="dark:text-white">{role}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* STEP 7 — ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

          <button
            onClick={downloadEstimate}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-xl flex items-center gap-2"
          >
            <FaDownload /> Download Estimate JSON
          </button>

          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl flex items-center gap-2"
          >
            <FaShareAlt /> Request Full Proposal
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl font-bold shadow-xl"
          >
            View Dashboard
          </button>
        </div>
      </motion.div>
    );
  };

  // ------------------------------------------------------
  // DOWNLOAD FUNCTION
  // ------------------------------------------------------
  function downloadEstimate() {
    const data = JSON.stringify(estimateResult, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `AI-Estimate-${Date.now()}.json`;
    a.click();
  }

  // ------------------------------------------------------
  // FINAL RETURN — RENDER BASED ON STEP
  // ------------------------------------------------------
  return (
    <div className="min-h-screen px-6 py-20 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 
    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <motion.h1
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="text-4xl font-extrabold text-center dark:text-white flex items-center justify-center gap-3 mb-10"
        >
          <FaCalculator className="text-indigo-600" /> Enterprise AI Estimator
        </motion.h1>

        {/* STEP RENDERING */}
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
      </div>
    </div>
  );
}
