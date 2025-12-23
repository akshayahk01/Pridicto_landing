import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCalculator,
  FaRobot,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaDownload,
  FaShareAlt,
  FaUpload,
  FaMapMarkerAlt,
  FaUsers,
  FaCodeBranch,
  FaTools,
  FaChartPie,
  FaChartBar,
  FaExclamationTriangle,
} from "react-icons/fa";

// -----------------------------------------------
// GLOBAL ANIMATIONS
// -----------------------------------------------

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// -----------------------------------------------
// AUTOSAVE TO LOCAL STORAGE
// -----------------------------------------------

const STORAGE_KEY = "enterprise_estimator_draft";

const saveDraft = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const loadDraft = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

// -----------------------------------------------
// AI RISK ENGINE
// -----------------------------------------------

function calculateRiskScore({ complexity, teamSize, features }) {
  let score = 0;

  if (complexity === "high") score += 35;
  if (teamSize > 8) score += 20;
  if (features?.length > 8) score += 25;

  return Math.min(score, 100);
}

// -----------------------------------------------
// AI TEAM STRUCTURE ENGINE
// -----------------------------------------------

function predictTeamStructure({ projectType, complexity }) {
  const base = {
    web: ["Frontend Dev", "Backend Dev", "QA"],
    mobile: ["Mobile Dev", "API Dev", "QA"],
    ai: ["ML Engineer", "Data Scientist", "Backend"],
    ecommerce: ["Frontend", "Backend", "DevOps", "QA"],
  };

  let team = base[projectType] || [];

  if (complexity === "high") team.push("Solution Architect");
  if (projectType === "ai" && complexity !== "low") team.push("AI Researcher");

  return team;
}

// -----------------------------------------------
// AI TIMELINE RECOMMENDATION ENGINE
// -----------------------------------------------

function calculateTimeline(duration, complexity) {
  let factor = 1.0;
  if (complexity === "medium") factor = 1.2;
  if (complexity === "high") factor = 1.45;

  return Math.ceil(duration * factor);
}

// -----------------------------------------------
// COST ENGINE
// -----------------------------------------------

function generateCostEstimate(data) {
  const baseRates = {
    web: 25000,
    mobile: 40000,
    ai: 70000,
    ecommerce: 55000,
  };

  const complexityFactor = {
    low: 1.0,
    medium: 1.45,
    high: 2.2,
  };

  const featureCost = data.features?.length * 3000;

  const addOnsCost =
    (data.addons?.cloud ? 18000 : 0) +
    (data.addons?.security ? 22000 : 0) +
    (data.addons?.analytics ? 12000 : 0);

  const result =
    baseRates[data.projectType] * complexityFactor[data.complexity] +
    featureCost +
    addOnsCost +
    data.teamSize * 8000;

  return Math.round(result);
}
export default function UltraEstimator() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: loadDraft(),
  });

  const [step, setStep] = useState(1);
  const [estimate, setEstimate] = useState(null);

  // Watch all form fields for autosave
  const formWatch = watch();
  useEffect(() => {
    saveDraft(formWatch);
  }, [formWatch]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // Selected values
  const projectType = watch("projectType");
  const complexity = watch("complexity");
  const duration = watch("duration");
  const teamSize = watch("teamSize");
  const features = watch("features") || [];
  const addons = watch("addons") || {};

  // -----------------------------------------------
  // SUBMIT HANDLER (AI ESTIMATION)
  // -----------------------------------------------
  const onSubmit = () => {
    const cost = generateCostEstimate(formWatch);
    const timeline = calculateTimeline(duration, complexity);
    const risk = calculateRiskScore(formWatch);
    const team = predictTeamStructure(formWatch);

    setEstimate({
      cost,
      risk,
      timeline,
      team,
      data: formWatch,
    });

    setStep(4);
  };

  // -----------------------------------------------
  // STEP 1 — PROJECT TYPE
  // -----------------------------------------------
  const ProjectTypeStep = () => (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="p-10 rounded-3xl bg-white shadow-xl backdrop-blur-xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
        <FaCalculator className="text-indigo-600" />
        Project Classification
      </h2>

      <p className="text-gray-600 mb-6">
        Choose the project category so AI can benchmark cost and effort.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { id: "web", label: "Web Application", icon: "🌐" },
          { id: "mobile", label: "Mobile App", icon: "📱" },
          { id: "ai", label: "AI / ML Project", icon: "🤖" },
          { id: "ecommerce", label: "E-commerce Platform", icon: "🛒" },
        ].map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            className={`p-6 rounded-2xl cursor-pointer border transition-all ${
              projectType === p.id
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-300 bg-white"
            }`}
            onClick={() => setValue("projectType", p.id)}
          >
            <div className="text-4xl mb-3">{p.icon}</div>
            <h3 className="font-semibold">{p.label}</h3>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          disabled={!projectType}
          onClick={nextStep}
          className={`px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2 ${
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

  // -----------------------------------------------
  // STEP 2 — DETAILS + FEATURES + ADDONS
  // -----------------------------------------------
  const ProjectDetailsStep = () => (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeRight}
      className="p-10 rounded-3xl bg-white shadow-xl backdrop-blur-xl border border-gray-200"
    >
      <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
        <FaChartLine className="text-green-600" />
        Project Details
      </h2>

      {/* TEAM + DURATION */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="font-medium flex items-center gap-2">
            <FaUsers className="text-indigo-600" /> Team Size
          </label>
          <input
            type="number"
            {...register("teamSize", { min: 1 })}
            className="mt-2 w-full p-4 rounded-xl border border-gray-300"
            placeholder="Number of developers"
          />
        </div>

        <div>
          <label className="font-medium">Estimated Duration (weeks)</label>
          <input
            type="number"
            {...register("duration", { min: 1 })}
            className="mt-2 w-full p-4 rounded-xl border border-gray-300"
            placeholder="e.g., 8 weeks"
          />
        </div>

        <div>
          <label className="font-medium">Complexity Level</label>
          <select
            {...register("complexity")}
            className="mt-2 w-full p-4 rounded-xl border border-gray-300"
          >
            <option value="">Select complexity…</option>
            <option value="low">Low — Basic</option>
            <option value="medium">Medium — Moderate</option>
            <option value="high">High — Advanced</option>
          </select>
        </div>

        <div>
          <label className="font-medium flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-600" />
            Location (optional)
          </label>
          <input
            type="text"
            {...register("location")}
            className="mt-2 w-full p-4 rounded-xl border border-gray-300"
            placeholder="City, Country"
          />
        </div>
      </div>

      {/* FEATURES SELECTION */}
      <h3 className="text-xl font-bold mt-6 mb-4 flex items-center gap-2">
        <FaTools className="text-purple-600" />
        Features
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {[
          "Authentication",
          "Admin Dashboard",
          "User Dashboard",
          "Real-time Chat",
          "Payment Gateway",
          "Analytics Reporting",
          "Multi-language Support",
          "Push Notifications",
          "AI Automation",
          "API Integrations",
        ].map((f) => (
          <label
            key={f}
            className="p-4 border rounded-xl cursor-pointer flex items-center gap-3 hover:bg-gray-50"
          >
            <input
              type="checkbox"
              value={f}
              {...register("features")}
              className="w-4 h-4"
            />
            {f}
          </label>
        ))}
      </div>

      {/* ADDONS */}
      <h3 className="text-xl font-bold mt-6 mb-4 flex items-center gap-2">
        <FaChartPie className="text-orange-600" />
        Add-On Services
      </h3>

      <div className="space-y-4">
        <label className="flex items-center gap-3 p-4 border rounded-xl">
          <input type="checkbox" {...register("addons.cloud")} />
          Cloud Hosting Setup (+ ₹18,000)
        </label>
        <label className="flex items-center gap-3 p-4 border rounded-xl">
          <input type="checkbox" {...register("addons.security")} />
          Security Hardening (+ ₹22,000)
        </label>
        <label className="flex items-center gap-3 p-4 border rounded-xl">
          <input type="checkbox" {...register("addons.analytics")} />
          Analytics Dashboard (+ ₹12,000)
        </label>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          className="px-8 py-3 rounded-xl border font-bold flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>

        <button
          disabled={!complexity || !teamSize || !duration}
          onClick={nextStep}
          className={`px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2 ${
            complexity && teamSize && duration
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
  // -----------------------------------------------
  // STEP 3 — TECH STACK + REQUIREMENTS + DOCUMENTS
  // -----------------------------------------------
  const TechStackStep = () => {
    const summary = {
      projectType: projectType || "—",
      complexity: complexity || "—",
      duration: duration ? duration + " weeks" : "—",
      teamSize: teamSize || "—",
      features: features.length ? features.join(", ") : "None Selected",
    };

    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeLeft}
        className="relative grid md:grid-cols-3 gap-10 p-10 rounded-3xl bg-white shadow-xl border border-gray-200"
      >
        {/* ---------------- LEFT SIDE: FORM ---------------- */}
        <div className="md:col-span-2">

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FaCodeBranch className="text-indigo-600" />
            Tech Stack & Requirements
          </h2>

          {/* TECH STACK CHOICES */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
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
                whileHover={{ scale: 1.03 }}
                onClick={() => setValue("techStack", stack)}
                className={`p-5 rounded-xl border cursor-pointer ${
                  watch("techStack") === stack
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 bg-white"
                }`}
              >
                <h3 className="font-semibold">{stack}</h3>
              </motion.div>
            ))}
          </div>

          {/* REQUIREMENTS */}
          <div className="mb-10">
            <label className="font-semibold text-gray-700">Project Requirements</label>
            <textarea
              {...register("requirements")}
              rows="4"
              className="mt-2 w-full p-4 rounded-xl border border-gray-300"
              placeholder="Describe key features, workflows, integrations…"
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="mb-10">
            <label className="font-semibold text-gray-700 flex items-center gap-2">
              <FaUpload className="text-indigo-600" />
              Upload Documents
            </label>

            <input
              type="file"
              multiple
              {...register("documents")}
              className="mt-3 block w-full text-sm text-gray-600 file:bg-indigo-50 
              file:px-4 file:py-2 file:rounded-lg file:border-none file:mr-4 file:text-indigo-700"
            />

            {/* FILE PREVIEW */}
            {watch("documents")?.length > 0 && (
              <div className="mt-4 space-y-2">
                {[...watch("documents")].map((file, i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm"
                  >
                    📄 {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="px-8 py-3 rounded-xl border font-bold flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>

            <button
              onClick={onSubmit}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 
              text-white rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition"
            >
              <FaRobot /> Generate AI Estimate
            </button>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE: LIVE SUMMARY ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
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
              <p className="font-semibold leading-snug">{summary.features}</p>
            </div>

            <hr className="border-slate-600 my-3" />

            <p className="text-xs text-slate-400">
              Summary updates automatically as you modify your project.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  // -----------------------------------------------
  // STEP 4 — AI RESULTS PAGE (ULTRA PREMIUM OUTPUT)
  // -----------------------------------------------
  const ResultsStep = () => {
    if (!estimateResult) return null;

    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUp}
        className="space-y-10"
      >
        {/* ---------------- HEADER ---------------- */}
        <motion.div
          variants={fadeIn}
          className="p-10 rounded-3xl text-center bg-gradient-to-br
          from-indigo-600 to-purple-600 text-white shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-2">AI Estimate Complete</h2>
          <p className="text-lg opacity-80">
            Your personalized project cost • Risk • Timeline analysis
          </p>
        </motion.div>

        {/* ---------------- TOTAL COST PANEL ---------------- */}
        <motion.div
          variants={fadeUp}
          className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-4">Total Estimated Cost</h3>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="text-6xl font-extrabold text-indigo-600">
              ₹{estimateResult.totalCost.toLocaleString()}
            </div>
            <p className="text-gray-500 mt-2">
              {estimateResult.confidence}% confidence score
            </p>
          </motion.div>
        </motion.div>

        {/* ---------------- COST BREAKDOWN ---------------- */}
        <motion.div
          variants={fadeUp}
          className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-6">
            Cost Breakdown (AI-Weighted)
          </h3>

          <div className="space-y-4">
            {Object.entries(estimateResult.breakdown).map(
              ([category, amount], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 flex justify-between items-center rounded-xl bg-gray-50 border border-gray-200"
                >
                  <span className="font-semibold text-gray-700 capitalize">
                    {category.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-indigo-600 font-bold text-lg">
                    ₹{amount.toLocaleString()}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        {/* ---------------- TIMELINE ---------------- */}
        <motion.div
          variants={fadeUp}
          className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-4">Project Timeline</h3>

          <div className="text-center">
            <div className="text-5xl text-green-600 font-bold">
              {estimateResult.timeline} weeks
            </div>
            <p className="text-gray-500 mt-2">Estimated Completion Time</p>
          </div>
        </motion.div>

        {/* ---------------- AI INSIGHTS ---------------- */}
        <motion.div
          variants={fadeUp}
          className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <FaRobot className="text-purple-600" />
            AI Insights & Recommendations
          </h3>

          <div className="grid gap-4">
            {estimateResult.aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-xl bg-purple-50 text-gray-800 border border-purple-200 flex gap-4"
              >
                <FaRobot className="text-purple-600 text-xl mt-1" />
                <span>{insight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ---------------- MARKET COMPARISON ---------------- */}
        <motion.div
          variants={fadeUp}
          className="p-10 bg-white rounded-3xl shadow-xl border border-gray-200"
        >
          <h3 className="text-2xl font-bold mb-6">Market Comparison</h3>

          <p className="text-gray-600 mb-4">
            How your estimated cost compares to the real market:
          </p>

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-semibold">
              <span>Low Market Rate</span>
              <span>
                ₹{Math.round(estimateResult.totalCost * 0.85).toLocaleString()}
              </span>
            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: "50%",
                }}
                transition={{ duration: 1 }}
                className="h-3 bg-green-400 rounded-full"
              />
            </div>

            <div className="flex justify-between text-sm font-semibold">
              <span>High Market Rate</span>
              <span>
                ₹{Math.round(estimateResult.totalCost * 1.3).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* ---------------- WHAT INCREASES COST ---------------- */}
        <motion.div
          variants={fadeUp}
          className="p-10 rounded-3xl bg-white border border-gray-200 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6">What Increased Your Cost?</h3>

          <ul className="space-y-3 text-gray-700">
            {projectType === "ai" && (
              <li>• AI projects typically require senior developers & data experts.</li>
            )}
            {complexity === "high" && (
              <li>• High complexity adds architecture, integrations, and extra testing.</li>
            )}
            {duration > 12 && <li>• Long timelines increase labor cost.</li>}
            {teamSize > 5 && <li>• Large teams require additional coordination overhead.</li>}
          </ul>
        </motion.div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <button
            onClick={handleDownloadEstimate}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FaDownload /> Download Estimate (JSON)
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <FaShare /> Request Detailed Proposal
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-600 hover:text-white shadow-lg"
          >
            View Dashboard
          </button>
        </motion.div>
      </motion.div>
    );
  };


