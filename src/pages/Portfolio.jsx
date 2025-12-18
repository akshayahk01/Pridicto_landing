// src/pages/Portfolio.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import ShareButtons from "../components/ShareButtons";
import SuggestionBox from "../components/SuggestionBox";
import PersonalizedSuggestions from "../components/PersonalizedSuggestions";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  ShieldCheck,
  Target,
  Rocket,
  LineChart,
  PieChart,
  Sparkles,
  ChevronDown,
  TrendingUp,
  UserCheck,
  CheckCircle,
} from "lucide-react";

/**
 * LEVEL 3 — ULTRA PREMIUM PORTFOLIO PAGE
 * - Tailwind CSS + Framer Motion required
 * - Canvas particle system + aurora wave (canvas) + cursor sparkles
 * - Frontend-only (no API calls)
 *
 * Paste as src/pages/Portfolio.jsx
 */

/* ---------- demo content (replace with real later if needed) ---------- */
const caseStudies = [
  {
    id: 1,
    title: "FinTech Startup Raised $1.2M Seed Funding",
    description:
      "Investor-ready pitch deck, 5-year model, KPI dashboards & GTM — enabling VC traction.",
    industry: "Finance",
    region: "USA",
    impact: "Raised $1.2M • 38% CAC Reduction • 2.4x Growth",
    category: "Pitch Deck • Modeling",
    image: "https://images.unsplash.com/photo-1559523182-a284c3fb7cff?q=80&w=1400",
  },
  {
    id: 2,
    title: "AgriTech Market Expansion Across 4 States",
    description:
      "Multi-region research, pricing & adoption roadmaps for mass rollout.",
    industry: "Agriculture",
    region: "India",
    impact: "4-State Rollout • 62% Accuracy • 3x Adoption",
    category: "Market Research • GTM",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400",
  },
  {
    id: 3,
    title: "AI Startup Pitch for UK VC Network",
    description:
      "Deep-tech deck, TAM/SAM/SOM, technical architecture and forecasts.",
    industry: "Technology",
    region: "UK",
    impact: "27% Faster Approval • 120% Outreach",
    category: "AI • Deck Design",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1400",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Rina Patel",
    role: "Founder — FinEdge",
    quote:
      "Their deck & modeling helped us close a seed round faster than expected. Execution was immaculate.",
    rating: 5,
  },
  {
    id: 2,
    name: "Omar Al-Fayed",
    role: "COO — ShopHub",
    quote:
      "Logistics automation cut costs and improved delivery SLAs. Highly recommended for growth-stage brands.",
    rating: 5,
  },
  {
    id: 3,
    name: "James Carter",
    role: "Head of Growth — AgroNext",
    quote:
      "Practical research and stellar GTM helped us expand across states with minimal friction.",
    rating: 5,
  },
];

/* ---------- framer variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ---------- small helper components ---------- */
function SparkleButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-700 to-yellow-400 px-6 py-3 rounded-full text-black font-semibold shadow-2xl transform-gpu hover:scale-[1.03] transition"
    >
      <Sparkles className="w-4 h-4" /> {children}
    </button>
  );
}

/* ---------- Canvas Particle System (Level 3) ---------- */
/**
 * - Three layers (depth): back slow, mid normal, front fast
 * - Each particle has velocity, size, color, alpha
 * - Responds to mouse movement (parallax) and scroll (subtle)
 * - Cursor sparkles emit small particles that fade (separate list)
 */

function useParticles({ canvasRef, cursorRef, enabled = true }) {
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.scale(DPR, DPR);

    let mouse = { x: w / 2, y: h / 2, moved: false };
    let scrollY = window.scrollY || 0;

    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
    };

    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) {
        mouse.x = t.clientX;
        mouse.y = t.clientY;
        mouse.moved = true;
      }
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth * DPR;
      h = canvas.height = window.innerHeight * DPR;
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    // particle layers
    const layers = [
      { count: 45, speed: 0.12, size: [1, 3], color: "rgba(120,84,245,", z: 0.6 },
      { count: 28, speed: 0.28, size: [2, 5], color: "rgba(245,158,11,", z: 1.0 },
      { count: 18, speed: 0.55, size: [2, 6], color: "rgba(14,165,233,", z: 1.6 },
    ];

    const particles = [];
    const sparkleParticles = [];

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    // initial population
    layers.forEach((layer, li) => {
      for (let i = 0; i < layer.count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * layer.speed * 2,
          vy: rand(-0.2, 0.6) * layer.speed,
          size: rand(...layer.size),
          alpha: rand(0.06, 0.45),
          color: layer.color,
          z: layer.z,
          layer: li,
        });
      }
    });

    function emitSpark(x, y) {
      for (let i = 0; i < 6; i++) {
        sparkleParticles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.8) * 6,
          size: Math.random() * 3 + 1,
          life: Math.random() * 38 + 18,
          alpha: 1,
          color: ["#ffd966", "#ffb86b", "#a78bfa", "#60a5fa"][
            Math.floor(Math.random() * 4)
          ],
        });
      }
    }

    // track cursorRef for custom sparkles on mousemove
    const onMouseSpark = (e) => {
      if (!cursor) return;
      const now = performance.now();
      // throttle a bit
      if (cursor._last && now - cursor._last < 40) {
        cursor._last = now;
        return;
      }
      cursor._last = now;
      emitSpark(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMouseSpark);

    function draw() {
      frame++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // aurora-like faint sine overlay behind particles
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let k = 0; k < 3; k++) {
        const shift = (Math.sin((frame / 60) * (0.12 + k * 0.05) + k * 1.5) * 60) * (k + 1);
        const grad = ctx.createLinearGradient(0, h * (0.18 + k * 0.06), w, h);
        if (k === 0) {
          grad.addColorStop(0, "rgba(124,58,237,0.06)");
          grad.addColorStop(0.5, "rgba(99,102,241,0.03)");
          grad.addColorStop(1, "rgba(2,6,23,0)");
        } else if (k === 1) {
          grad.addColorStop(0, "rgba(245,158,11,0.04)");
          grad.addColorStop(0.5, "rgba(245,158,11,0.02)");
          grad.addColorStop(1, "rgba(2,6,23,0)");
        } else {
          grad.addColorStop(0, "rgba(6,182,212,0.03)");
          grad.addColorStop(0.5, "rgba(99,102,241,0.02)");
          grad.addColorStop(1, "rgba(2,6,23,0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-200 + shift, h * (0.18 + k * 0.04));
        // draw smooth wave
        const steps = 6;
        for (let s = 0; s <= steps; s++) {
          const px = (s / steps) * (w + 400) - 200;
          const py =
            h * (0.18 + k * 0.04) +
            Math.sin((s / steps) * Math.PI * 2 + frame / (120 - k * 8)) * (18 + k * 8);
          ctx.lineTo(px + shift * (0.6 - k * 0.1), py);
        }
        ctx.lineTo(w + 400, h);
        ctx.lineTo(-400, h);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // particles
      particles.forEach((p) => {
        // parallax influence from mouse
        const dx = (mouse.x - w / 2) / w;
        const dy = (mouse.y - h / 2) / h;
        p.x += p.vx + dx * 0.3 * p.z;
        p.y += p.vy + dy * 0.25 * p.z - scrollY * 0.0002 * p.z;
        if (p.x > window.innerWidth + 40) p.x = -40;
        if (p.x < -40) p.x = window.innerWidth + 40;
        if (p.y > window.innerHeight + 40) p.y = -40;
        if (p.y < -40) p.y = window.innerHeight + 40;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.max(0.03, Math.min(p.alpha, 0.9))})`;
        // small glow: draw radial gradient
        const rad = p.size;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 6);
        g.addColorStop(0, `${p.color}${p.alpha})`);
        g.addColorStop(0.3, `${p.color}${p.alpha * 0.35})`);
        g.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * (1 + (p.z - 0.6) * 0.6), 0, Math.PI * 2);
        ctx.fill();
      });

      // sparkle particles
      for (let i = sparkleParticles.length - 1; i >= 0; i--) {
        const sp = sparkleParticles[i];
        sp.vy += 0.08; // gravity
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life--;
        sp.alpha = Math.max(0, sp.life / 80);
        if (sp.life <= 0) {
          sparkleParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const g = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sp.size * 6);
        g.addColorStop(0, `rgba(255,255,255,${sp.alpha})`);
        g.addColorStop(0.2, `${hexToRgba(sp.color, sp.alpha * 0.9)}`);
        g.addColorStop(1, `${hexToRgba(sp.color, 0)}`);
        ctx.fillStyle = g;
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // small subtle vignette/film grain overlay
      if (frame % 6 === 0) {
        ctx.fillStyle = "rgba(0,0,0,0.01)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      requestAnimationFrame(draw);
    }

    // helper: hex color -> rgba
    function hexToRgba(hex, alpha = 1) {
      // supports #rgb, #rrggbb
      let c = hex.replace("#", "");
      if (c.length === 3) {
        c = c.split("").map((ch) => ch + ch).join("");
      }
      const num = parseInt(c, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }

    draw();

    // cleanup
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseSpark);
      // clear arrays to release memory
      particles.length = 0;
      sparkleParticles.length = 0;
    };
  }, [canvasRef, cursorRef, enabled]);
}

/* ---------- Main Page Component ---------- */
export default function Portfolio() {
  const userId = useSelector((s) => s.auth?.user?.id);
  const { resolvedMode } = useTheme();
  const [filter, setFilter] = useState("All");
  const [faqOpen, setFaqOpen] = useState(null);
  const [testiIndex, setTestiIndex] = useState(0);

  // parallax reactive state for CSS-based layers
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const cursorRef = useRef({}); // used for throttle timestamp

  const filtered = caseStudies.filter((c) => filter === "All" || c.industry === filter);

  // rotate testimonials
  useEffect(() => {
    const id = setInterval(() => setTestiIndex((i) => (i + 1) % testimonials.length), 4200);
    return () => clearInterval(id);
  }, []);

  // pointer movement -> parallax
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // instantiate particles (level 3)
  useParticles({ canvasRef, cursorRef, enabled: true });

  /* ---------- page JSX ---------- */
  return (
    <Layout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`min-h-screen relative overflow-hidden ${
            resolvedMode === "dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {/* ---------------- BACKGROUND LAYERS (HTML + CSS) ---------------- */}
          <div className="absolute inset-0 -z-20 pointer-events-none">
            {/* solid deep base */}
            <div
              className="absolute inset-0"
              style={{
                background: resolvedMode === "dark"
                  ? "radial-gradient(circle at 10% 10%, #0b0226 0%, #03010a 25%, #000000 80%)"
                  : "radial-gradient(circle at 10% 10%, #fff7ed 0%, #fffdf6 25%, #f8fafc 80%)",
              }}
            />

            {/* large soft nebulas (pure CSS divs for GPU-blur) */}
            <div
              style={{
                transform: `translate3d(${parallax.x * 18}px, ${parallax.y * -14}px, 0)`,
              }}
              className="absolute -left-40 -top-36 w-[720px] h-[720px] rounded-full blur-[160px] opacity-80"
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #7c3aed 0%, #4f46e5 45%, transparent 70%)",
                  opacity: 0.32,
                }}
              />
            </div>

            <div
              style={{
                transform: `translate3d(${parallax.x * -22}px, ${parallax.y * 20}px, 0)`,
              }}
              className="absolute right-8 top-28 w-[560px] h-[560px] rounded-full blur-[150px] opacity-70"
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: "radial-gradient(circle at 50% 40%, #f59e0b 0%, #fbbf24 40%, transparent 80%)",
                }}
              />
            </div>

            <div
              className="absolute bottom-[-10%] left-[10%] w-[900px] h-[900px] rounded-full blur-[220px] opacity-50"
              style={{
                transform: `translate3d(${parallax.x * 12}px, ${parallax.y * -8}px, 0)`,
                background: "radial-gradient(circle at 20% 40%, #06b6d4 0%, #3b82f6 35%, transparent 75%)",
              }}
            />
          </div>

          {/* ---------- animation canvas (particles & sparkles) ---------- */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 w-full h-full"
            aria-hidden
          />

          {/* subtle glass overlay for premium sheen */}
          <div
            className="absolute inset-0 -z-5 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.00) 50%, rgba(0,0,0,0.06) 100%)",
              mixBlendMode: "overlay",
            }}
          />

          <main className="pt-28 max-w-7xl mx-auto px-6 pb-28 space-y-20 relative z-10">
            <Breadcrumb />

            {/* HERO */}
            <motion.section initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="text-center max-w-4xl mx-auto">
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#fbbf24,#7c3aed)" }}>
                The Royal Standard of Digital Excellence
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-4 text-lg text-gray-200/90">
                Luxury-grade product thinking, data-driven execution and measurable outcomes — crafted for companies that scale with sophistication.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-4">
                <SparkleButton onClick={() => (window.location.href = "/contact")}>Start Your Project</SparkleButton>
                <a href="#case-studies" className={`px-5 py-3 rounded-full border transition ${resolvedMode === "dark" ? "border-white/10 text-white/90 hover:bg-white/5" : "border-gray-200 text-gray-800 hover:bg-gray-100"}`}>
                  View Case Studies
                </a>
              </motion.div>
            </motion.section>

            {/* STATS */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6">
              {[
                { icon: <Crown className="w-6 h-6 text-yellow-300" />, title: "Clients", value: "200+" },
                { icon: <ShieldCheck className="w-6 h-6 text-yellow-300" />, title: "Industries", value: "18+" },
                { icon: <Target className="w-6 h-6 text-yellow-300" />, title: "Success Rate", value: "93%" },
                { icon: <Rocket className="w-6 h-6 text-yellow-300" />, title: "Countries", value: "12+" },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} className="p-6 rounded-2xl border border-white/6 shadow-xl bg-black/30">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/6">{s.icon}</div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-yellow-300">{s.value}</h3>
                      <p className="text-sm text-gray-300">{s.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* CASE STUDIES */}
            <motion.section id="case-studies" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
              {filtered.map((c) => (
                <motion.article key={c.id} variants={fadeUp} className="rounded-3xl overflow-hidden border border-white/6 shadow-2xl backdrop-blur-md bg-gradient-to-br from-white/3 to-transparent">
                  <div className="relative h-56 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover brightness-90" />
                    <div className="absolute left-4 top-4 bg-gradient-to-r from-purple-700/70 to-yellow-400/40 px-3 py-1 rounded-full text-xs font-semibold text-black/90">
                      {c.industry}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-yellow-300">{c.title}</h4>
                    <p className="text-sm mt-2 text-gray-200/90">{c.description}</p>
                    <p className="text-yellow-400 text-sm mt-3">{c.impact}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <ShareButtons url={`${window.location.origin}/portfolio#${c.id}`} title={c.title} description={c.description} />
                      <a className="text-yellow-300 font-medium cursor-pointer">Read →</a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.section>

            {/* VISUALS + INSIGHTS (placeholders for charts) */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="rounded-2xl p-6 border border-white/6 shadow-xl bg-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <LineChart className="w-5 h-5 text-yellow-300" />
                  <h5 className="font-semibold text-white">Growth Forecast Impact</h5>
                </div>
                <div className="h-48 rounded-lg flex items-center justify-center text-gray-400">[Insert Chart Component]</div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl p-6 border border-white/6 shadow-xl bg-black/20">
                <div className="flex items-center gap-3 mb-4">
                  <PieChart className="w-5 h-5 text-yellow-300" />
                  <h5 className="font-semibold text-white">Industry Distribution</h5>
                </div>
                <div className="h-48 rounded-lg flex items-center justify-center text-gray-400">[Insert Chart Component]</div>
              </motion.div>
            </motion.section>

            {/* WHY CHOOSE US */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-4 gap-6">
              {[
                { icon: <TrendingUp className="w-5 h-5 text-yellow-300" />, title: "Growth First", desc: "KPIs designed to move the needle." },
                { icon: <UserCheck className="w-5 h-5 text-yellow-300" />, title: "Investor Ready", desc: "Decks & financials that close rounds." },
                { icon: <ShieldCheck className="w-5 h-5 text-yellow-300" />, title: "Compliant", desc: "Regulatory & data compliant processes." },
                { icon: <CheckCircle className="w-5 h-5 text-yellow-300" />, title: "Execution", desc: "Full-stack delivery & managed ops." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="p-6 rounded-2xl border border-white/6 shadow-lg bg-black/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white/6">{f.icon}</div>
                    <div>
                      <h6 className="font-semibold text-white">{f.title}</h6>
                      <p className="text-sm text-gray-300">{f.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* TESTIMONIALS */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8">
              <h3 className="text-2xl font-bold text-yellow-300 text-center mb-6">Client Testimonials</h3>
              <div className="relative max-w-4xl mx-auto">
                <div className="overflow-hidden rounded-2xl p-6 shadow-2xl bg-black/20">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 font-semibold">
                      {testimonials[testiIndex].name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="text-gray-200 italic">“{testimonials[testiIndex].quote}”</p>
                      <div className="mt-3 text-sm text-gray-300">
                        {testimonials[testiIndex].name} • {testimonials[testiIndex].role}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-3">
                  {testimonials.map((t, i) => (
                    <button key={t.id} onClick={() => setTestiIndex(i)} className={`w-3 h-3 rounded-full ${i === testiIndex ? "bg-yellow-300" : "bg-white/30"}`} />
                  ))}
                </div>
              </div>
            </motion.section>

            {/* PRICING / CTA */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { plan: "Starter", price: "₹50k", bullets: ["Audit & roadmap", "1-month support"], featured: false },
                { plan: "Growth", price: "₹2.5L", bullets: ["Full GTM", "Dashboard & analytics", "3-month support"], featured: true },
                { plan: "Enterprise", price: "Custom", bullets: ["Dedicated team", "SLA & Integrations"], featured: false },
              ].map((p, i) => (
                <motion.div key={i} variants={fadeUp} className={`p-6 rounded-2xl ${p.featured ? "bg-gradient-to-br from-purple-700 to-yellow-400 text-black shadow-2xl" : "bg-black/20 border border-white/6"}`}>
                  <h5 className="font-bold text-lg">{p.plan}</h5>
                  <div className="mt-4 text-3xl font-extrabold">{p.price}</div>
                  <ul className="mt-4 text-sm space-y-2 text-gray-200">
                    {p.bullets.map((b, j) => <li key={j}>• {b}</li>)}
                  </ul>
                  <div className="mt-6">
                    <button className={`px-5 py-2 rounded-full ${p.featured ? "bg-black text-yellow-300" : "bg-yellow-300 text-black"}`}>Choose</button>
                  </div>
                </motion.div>
              ))}
            </motion.section>

            {/* FAQ */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
              <h4 className="text-xl font-bold text-yellow-300 mb-4">Frequently Asked Questions</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { q: "How do you price projects?", a: "We price based on scope, timelines and deliverables — with flexible contracts and milestone payments." },
                  { q: "Do you handle end-to-end delivery?", a: "Yes — from research, design to engineering and operations." },
                  { q: "Can you prepare investor-ready decks?", a: "Absolutely — decks, financials and investor materials are our forte." },
                  { q: "What industries do you serve?", a: "Fintech, Agritech, E-commerce, Enterprise SaaS and more." },
                ].map((f, i) => (
                  <div key={i} className="rounded-xl bg-black/20 p-4">
                    <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full text-left flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{f.q}</div>
                        {faqOpen === i && <div className="text-sm text-gray-300 mt-2">{f.a}</div>}
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Team */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
              <h4 className="text-xl font-bold text-yellow-300 mb-6">Meet the Team</h4>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { name: "Asha R", role: "Head - Strategy" },
                  { name: "Rahul M", role: "Lead - Engineering" },
                  { name: "Nina S", role: "Head - Design" },
                  { name: "Vikram K", role: "Data Science Lead" },
                ].map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/20 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/6 mx-auto flex items-center justify-center text-yellow-300 font-bold mb-3">
                      {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="font-semibold text-white">{p.name}</div>
                    <div className="text-sm text-gray-300">{p.role}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* AI Suggestions + SuggestionBox */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 mt-12">
              <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-black/20 border border-white/6">
                <PersonalizedSuggestions userId={userId} limit={3} />
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-black/20 border border-white/6">
                <SuggestionBox context="portfolio" maxSuggestions={3} />
              </motion.div>
            </motion.section>

            {/* Final CTA */}
            <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 p-12 rounded-3xl bg-gradient-to-r from-purple-700 to-yellow-400 text-black text-center shadow-2xl">
              <h3 className="text-2xl font-bold">Ready to build something remarkable?</h3>
              <p className="text-sm mt-2 text-black/80">Book a consultation and get a tailored growth plan.</p>
              <div className="mt-6">
                <a href="/contact" className="px-6 py-3 rounded-full bg-black/90 text-yellow-300 font-semibold">Get Started</a>
              </div>
            </motion.section>

          </main>

          {/* Inline styles + animations */}
          <style jsx>{`
            @keyframes slowFloat { 0% { transform: translateY(0px) } 50% { transform: translateY(-22px) } 100% { transform: translateY(0px) } }
            @keyframes slowFloatReverse { 0% { transform: translateY(0px) } 50% { transform: translateY(18px) } 100% { transform: translateY(0px) } }
            .animate-slow-float { animation: slowFloat 10s ease-in-out infinite; }
            .animate-slow-float-reverse { animation: slowFloatReverse 12s ease-in-out infinite; }
          `}</style>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
