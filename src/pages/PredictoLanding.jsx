// FULL LANDING PAGE WITH ALL SECTIONS (STYLE 3 + STYLE 2)
// Includes: Hero, Features, Pipeline, Team, Testimonials, Stats, Pricing, FAQ, Blog, Newsletter, Footer

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, CheckCircle } from "lucide-react";

export default function PredictoAIModern() {
  return (
    <div className="min-h-screen bg-[#0A0016] text-white overflow-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-12 py-6 sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Predicto.AI
        </h1>
        <div className="hidden md:flex gap-10 text-sm font-medium">
          <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link to="/features" className="hover:text-emerald-400 transition">Features</Link>
          <Link to="/estimate" className="hover:text-emerald-400 transition">Estimate</Link>
          <Link to="/contact" className="hover:text-emerald-400 transition">Contact</Link>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative grid md:grid-cols-2 items-center px-12 py-24 max-w-7xl mx-auto">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,#6b00ff,transparent_40%),radial-gradient(circle_at_80%_80%,#00d0ff,transparent_40%)]"></div>

        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-xl text-emerald-300">
            <Sparkles className="w-4 h-4" /> AI-POWERED PREDICTION
          </div>

          <h2 className="text-6xl font-extrabold leading-tight">
            Build Faster With <span className="text-emerald-400">AI Estimation</span>
          </h2>

          <p className="text-slate-300 text-lg max-w-lg">
            Predict cost, timeline, team structure & risk with next-gen neural engines.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => alert("Start free clicked")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-all"
              aria-label="Start Free"
            >
              Start Free
            </button>
            <button
              onClick={() => alert("Watch demo clicked")}
              className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all"
              aria-label="Watch Demo"
            >
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* RIGHT PREVIEW */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
          <img src="https://doofer.io/wp-content/uploads/2025/02/Group-63.png" className="rounded-3xl shadow-2xl border border-white/10" />

          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-xl border border-emerald-400/40 p-4 rounded-xl shadow-xl">
            <Cpu className="text-emerald-300 mb-1" />
            <p className="text-sm text-emerald-300">Neural Engine v3.0</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-[#120026]">
        <h3 className="text-4xl font-bold text-center mb-16">AI Features To Power Your Workflow</h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-12">
          {["Cost Intelligence", "Timeline Prediction", "Team Optimization", "Risk Neural Scan", "Tech Stack Mapping", "Exportable Reports"].map(
            (f) => (
              <motion.div whileHover={{ scale: 1.05 }} key={f} className="p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl hover:shadow-emerald-500/30 transition-all">
                <h4 className="text-xl font-semibold text-emerald-300">{f}</h4>
                <p className="text-slate-400 text-sm mt-2">
                  Powered by multi-layer neural decision models.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ================= PIPELINE ================= */}
      <section className="py-24 bg-black">
        <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>

        <div className="max-w-5xl mx-auto relative px-10">
          <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-emerald-500 to-blue-500 opacity-30"></div>

          {["Upload Inputs", "AI Engine Processing", "Risk Analysis", "Timeline & Cost Prediction", "Final Smart Report"].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex mb-20 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="w-[45%] p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl shadow-lg">
                <h4 className="font-bold text-xl text-emerald-400">{step}</h4>
                <p className="text-slate-400 text-sm mt-2">Fast neural-model processing.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-24 bg-[#0D001A] text-center">
        <h3 className="text-4xl font-bold mb-16">Meet The Creators</h3>

        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-12">
          {["Akshay", "Sanjana", "Madhu", "Rakshitha"].map((name) => (
            <motion.div whileHover={{ scale: 1.1 }} key={name} className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
              <img src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" className="w-24 mx-auto mb-4" />
              <h4 className="font-bold text-xl">{name}</h4>
              <p className="text-slate-400 text-sm">AI Estimation Specialist</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="py-24 bg-black text-center">
        <h3 className="text-4xl font-bold text-emerald-400 mb-10">Client Feedback</h3>
        <div className="max-w-3xl mx-auto bg-white/5 p-10 rounded-3xl shadow-xl border border-white/10 backdrop-blur-xl">
          <p className="text-lg italic text-slate-300">
            “Predicto improved our planning accuracy by 70%. Truly a game changer.”
          </p>
          <p className="mt-4 font-bold text-emerald-400">— Juliana, CTO</p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-24 bg-[#05000A]">
        <div className="max-w-6xl mx-auto px-12 grid md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Projects Estimated", value: "1,200+" },
            { label: "Avg. Accuracy", value: "90%" },
            { label: "Teams Onboarded", value: "75+" },
            { label: "Time Saved", value: "5x" },
          ].map((item) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 py-8 shadow-lg">
              <p className="text-3xl font-extrabold text-emerald-400">{item.value}</p>
              <p className="text-slate-400 text-sm mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24 bg-[#0B0014] text-center">
        <h3 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h3>
        <p className="text-slate-400 mb-12">Start free, scale as your projects grow.</p>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-12">
          {[
            { name: "Starter", price: "Free", desc: "For freelancers & students", highlight: false },
            { name: "Pro", price: "$29/mo", desc: "For teams & agencies", highlight: true },
            { name: "Enterprise", price: "Custom", desc: "For large organizations", highlight: false },
          ].map((plan) => (
            <motion.div key={plan.name} whileHover={{ scale: 1.06 }} className={`rounded-3xl border backdrop-blur-xl p-8 shadow-xl bg-white/5 border-white/10 ${plan.highlight ? "ring-2 ring-emerald-400" : ""}`}>
              <p className="text-sm uppercase tracking-wide text-slate-400">{plan.name}</p>
              <p className="mt-4 text-3xl font-extrabold text-emerald-300">{plan.price}</p>
              <p className="mt-2 text-slate-400 text-sm">{plan.desc}</p>
              <ul className="mt-6 space-y-2 text-left text-sm text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> AI Estimation Engine</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Unlimited Projects</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> PDF Export Reports</li>
              </ul>
              <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 font-semibold hover:opacity-90 transition-all">Choose {plan.name}</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              { q: "Is Predicto free to start?", a: "Yes, Starter plan includes core AI features." },
              { q: "Can I export reports?", a: "All plans support PDF export and sharing." },
              { q: "Does it support custom stacks?", a: "Yes, you can input any tech stack." },
              { q: "Is my data secure?", a: "We use encrypted storage & industry standards." },
            ].map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-400/60 transition-all">
                <summary className="cursor-pointer list-none flex justify-between items-center">
                  <span className="font-semibold text-slate-100">{faq.q}</span>
                  <span className="text-emerald-300 group-open:rotate-180 transition-transform">⌄</span>
                </summary>
                <p className="mt-3 text-slate-300 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="py-24 bg-[#05000A]">
        <div className="max-w-6xl mx-auto px-12">
          <h3 className="text-4xl font-bold mb-10 text-center">Latest Articles</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "5 Ways AI Improves Accuracy", tag: "AI & Predictive" },
              { title: "Smart Planning for Teams", tag: "Team Workflow" },
              { title: "Cost Forecasting for Startups", tag: "Startup Guide" },
            ].map((post) => (
              <motion.div key={post.title} whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg">
                <p className="text-xs uppercase tracking-wide text-emerald-300">{post.tag}</p>
                <h4 className="mt-3 font-semibold text-lg">{post.title}</h4>
                <button className="mt-4 text-sm text-emerald-300 inline-flex items-center gap-1">Read More <ArrowRight className="w-4 h-4" /></button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-center">
        <h3 className="text-3xl font-bold mb-4">Stay Ahead with AI Insights</h3>
        <p className="text-sm md:text-base mb-8 max-w-xl mx-auto text-emerald-50">Get updates, tips and AI estimation strategies.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
          <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl text-black focus:outline-none" />
          <button className="px-8 py-3 rounded-xl bg-black text-white font-semibold hover:bg-slate-900 transition-all">Subscribe</button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black py-10 text-center text-slate-500">
        © 2025 Predicto.AI — Retouch IT Services Pvt Ltd
      </footer>
    </div>
  );
}



