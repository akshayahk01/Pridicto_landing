import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import FeedbackModal from "../components/FeedbackModal";
import RealtimeActivityFeed from "../components/RealtimeActivityFeed";
import { motion, useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DollarSign, Clock, Zap, Target, Users, TrendingUp, Award, Activity } from "lucide-react"; // icons
import { useRef } from "react";

// ---------------------------
// Reusable Button
// ---------------------------
const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const base = "px-7 py-3 rounded-full font-semibold transition transform focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-[1.02] focus:ring-indigo-300",
    ghost:
      "bg-transparent text-white border border-white/20 hover:bg-white/5",
    secondary:
      "bg-white text-indigo-700 hover:bg-white/90 dark:bg-slate-800 dark:text-white",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ---------------------------
// Feature Card
// ---------------------------
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="p-6 bg-white/70 dark:bg-slate-800/60 backdrop-blur rounded-2xl shadow-lg border border-white/10"
    aria-label={title}
  >
    <div className="w-12 h-12 rounded-lg bg-white/30 dark:bg-white/5 flex items-center justify-center mb-4">
      <Icon size={22} className="text-indigo-600" />
    </div>
    <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
  </motion.article>
);

// ---------------------------
// Animated decorative SVG blobs
// ---------------------------
const FloatingBlob = ({ className = "", style = {}, delay = 0, size = 220 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 0.18, scale: [0.95, 1.05, 0.98] }}
    transition={{ duration: 8, repeat: Infinity, delay }}
    className={`pointer-events-none absolute ${className}`}
    style={{ width: size, height: size, ...style }}
    aria-hidden
  >
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <path fill="url(#g1)" d="M43.6,-55.7C55.3,-48.6,64.9,-36.3,68.7,-22.7C72.4,-9,70.3,5.1,64.5,18.6C58.7,32.1,49.1,44.9,36.3,51.9C23.5,59,7.6,60.2,-7.8,63.1C-23.2,66,-46.4,70.6,-56.6,61.7C-66.9,52.9,-64.1,30.6,-64.9,10.5C-65.8,-9.6,-70.3,-27.9,-64.4,-38.9C-58.5,-49.9,-42.2,-53.6,-26.1,-58.3C-10.1,-63,5.6,-68.8,20.5,-66.3C35.4,-63.8,50,-52.9,43.6,-55.7Z" transform="translate(100 100)" />
    </svg>
  </motion.div>
);

// ---------------------------
// Animated Counter Component
// ---------------------------
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ---------------------------
// Live Statistics Section
// ---------------------------
const LiveStatsSection = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: 15420, suffix: "+", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingUp, label: "Projects Completed", value: 8920, suffix: "+", color: "from-green-500 to-emerald-500" },
    { icon: Award, label: "Accuracy Rate", value: 99, suffix: "%", color: "from-purple-500 to-pink-500" },
    { icon: Activity, label: "Real-time Updates", value: 247, suffix: "/min", color: "from-orange-500 to-red-500" },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-3xl mx-4 md:mx-0">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Live Platform Statistics
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Real-time metrics showing our growing community and success
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress bars for visual appeal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">User Satisfaction</span>
              <span className="text-sm font-bold text-indigo-600">98%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "98%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.7 }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
              />
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">On-Time Delivery</span>
              <span className="text-sm font-bold text-green-600">95%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "95%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.9 }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
              />
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cost Accuracy</span>
              <span className="text-sm font-bold text-purple-600">97%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "97%" }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.1 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ---------------------------
// Main HomePage
// ---------------------------
export default function HomePage() {
  const navigate = useNavigate();
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const featureData = [
    {
      icon: DollarSign,
      title: "Precision Costing",
      description: "Deep-learning models predict project costs and reduce budget overruns.",
      delay: 0,
    },
    {
      icon: Clock,
      title: "Optimized Timelines",
      description: "Data-driven timeline estimates for realistic planning and faster delivery.",
      delay: 0.08,
    },
    {
      icon: Zap,
      title: "Risk Identification",
      description: "Auto-flag risky dependencies and feasibility issues before execution.",
      delay: 0.16,
    },
    {
      icon: Target,
      title: "Strategic Benchmarking",
      description: "Compare against industry peers using historical and live datasets.",
      delay: 0.24,
    },
  ];

  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-950/20 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 text-gray-900 dark:text-gray-100">
        {/* Floating decorative blobs (positioned absolute inside page) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <FloatingBlob className="left-10 top-12" style={{ filter: "blur(36px)" }} delay={0} size={360} />
          <FloatingBlob className="right-6 top-36" style={{ filter: "blur(40px)", transform: "rotate(30deg)" }} delay={2} size={300} />
          <FloatingBlob className="left-1/2 -translate-x-1/2 bottom-20" style={{ filter: "blur(44px)" }} delay={4} size={420} />
          {/* subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 dark:to-black/30 pointer-events-none" />
        </div>

      <main className="flex-grow pt-24 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* HERO */}
        <section className="relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Hero text + glass card */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/60 dark:to-slate-800/40 backdrop-blur border border-white/10 shadow-2xl">
                <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 mb-3">The Future of Project Planning</p>
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                  Smarter <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Project Estimation</span>
                  <br />
                  for Confident Decisions
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
                  Predicto turns requirements into precise, data-backed cost, timeline, and feasibility analysis — for software and construction projects.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => navigate("/estimation")}>Start Free Estimation</Button>
                  <Button variant="ghost" onClick={() => navigate("/contact")}>Book a Demo</Button>
                </div>

                {/* small feature badges */}
                <div className="mt-6 flex gap-3 flex-wrap">
                  <div className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-sm">AI-driven •</div>
                  <div className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-sm">99% reproducibility •</div>
                  <div className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-sm">Enterprise ready</div>
                </div>
              </div>
            </motion.div>

            {/* Hero illustration (analytics dashboard) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <motion.figure
                whileHover={{ scale: 1.02, rotateZ: 0.6 }}
                className="rounded-3xl shadow-2xl overflow-hidden border-4 border-white/60 dark:border-slate-800/60 bg-white"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4f5a5f2d8d4c11cc0f4a9f78bce5a64b"
                  alt="Analytics dashboard showing charts and predictions"
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
              </motion.figure>
            </motion.div>
          </div>
        </section>

        {/* Trusted logos / clients */}
        <section className="mt-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-center text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">Trusted by teams across industries</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {/* Replace these spans with SVG logos in production */}
              {["Nova Labs", "Vertex Systems", "Apex Infra", "BlueGrid", "ConstructPro"].map((name, i) => (
                <motion.span key={name} initial={{ opacity: 0 }} whileInView={{ opacity: 0.7 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white/30 px-4 py-2 rounded-full">
                  {name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Live Statistics Section */}
        <section className="mt-16">
          <LiveStatsSection />
        </section>

        {/* Realtime Activity Feed */}
        <section className="mt-16">
          <RealtimeActivityFeed />
        </section>

        {/* Features grid */}
        <section className="mt-14">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Stop Guessing, Start Predicting</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Core capabilities that make your project planning reliable and repeatable.</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {featureData.map((f, idx) => (
              <FeatureCard key={idx} {...f} delay={f.delay} />
            ))}
          </div>
        </section>



        {/* Estimation Highlights with analytics image and parallax */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid md:grid-cols-12 gap-8 items-center mt-16">
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-2xl font-bold dark:text-white">Data-driven Confidence, Across Industries</h3>
            <p className="text-gray-700 dark:text-gray-300">Input your scope and receive a detailed estimate, including resource allocation, cost breakdown, and timeline — tailored to your project's region and code requirements.</p>

            <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✔</span>
                <span>Detailed resource allocation for development sprints</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✔</span>
                <span>Instant feasibility checks with local compliance hints</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3">✔</span>
                <span>Side-by-side vendor comparison and scenario simulation</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-4">
              <Button onClick={() => navigate("/estimation")}>Calculate Your Estimate</Button>
              <Button variant="ghost" onClick={() => setIsFeedbackModalOpen(true)}>Give Feedback</Button>
            </div>
          </div>

          <div className="md:col-span-6">
            <motion.div whileHover={{ scale: 1.03, rotateX: 0 }} className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 dark:border-slate-800/60">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4f2b2b3298f1c2f8f1e1f6c0e1a3a0a9"
                alt="Interactive analytics charts and dashboard"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Banner */}
        <section className="mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">Ready to transform your planning?</h3>
                <p className="text-indigo-100 mt-1">Join teams using Predicto to deliver projects on-time and within budget.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => navigate("/signup")}>Get Started</Button>
                <Button variant="ghost" onClick={() => setIsFeedbackModalOpen(true)}>Give Feedback</Button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

        <Footer />

        <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
      </div>
    </Layout>
  );
}
