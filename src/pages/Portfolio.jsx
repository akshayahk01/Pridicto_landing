import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ShareButtons from '../components/ShareButtons';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, 
  Briefcase, 
  Target, 
  Users, 
  PieChart, 
  LineChart, 
  BarChart3, 
  ArrowUpRight,
  Play,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Star,
  Shield,
  Heart
} from "lucide-react";

// EXTENSIVE, REAL-WORLD, ENTERPRISE-LEVEL CASE STUDIES
const caseStudies = [
  {
    id: 1,
    title: 'FinTech Startup Raised $1.2M Seed Funding',
    description: 'We created an investor-ready pitch deck, 5-year valuation model, KPI dashboard, and GTM strategy. Result: 3+ international VCs invested.',
    industry: 'Finance',
    region: 'USA',
    impact: 'Raised $1.2M | 38% CAC Reduction | 2.4x User Growth',
    category: 'Pitch Deck • Market Research • Financial Modeling',
    image: 'https://images.unsplash.com/photo-1559523182-a284c3fb7cff?q=80&w=1200',
    gradient: 'from-blue-500 to-cyan-500',
    duration: '6 weeks',
    results: ['$1.2M raised', '38% CAC reduction', '2.4x user growth']
  },
  {
    id: 2,
    title: 'AgriTech Market Entry Strategy Across 4 Indian States',
    description: 'Conducted multi-region research, competitor mapping, pricing strategy, regulatory compliance documentation & product adoption roadmap.',
    industry: 'Agriculture',
    region: 'India',
    impact: '4-State Rollout | 62% Market Accuracy | 3x Adoption Rate',
    category: 'Feasibility • Market Research • GTM Strategy',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200',
    gradient: 'from-emerald-500 to-green-500',
    duration: '8 weeks',
    results: ['4-state rollout', '62% market accuracy', '3x adoption rate']
  },
  {
    id: 3,
    title: 'AI Startup Pitch Deck for UK VC Network',
    description: 'We built a deep-tech deck with technical architecture, AI adoption metrics, TAM/SAM/SOM analysis & revenue projections.',
    industry: 'Technology',
    region: 'UK',
    impact: 'Investor Ready | 27% Faster Approval | 120% Increase in VC Outreach',
    category: 'AI Analytics • Deck Design • Financial Strategy',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200',
    gradient: 'from-purple-500 to-pink-500',
    duration: '4 weeks',
    results: ['27% faster approval', '120% VC outreach', 'Investor ready']
  },
  {
    id: 4,
    title: 'E-commerce Brand Scaling from 10k → 120k Monthly Sales',
    description: 'Optimized pricing, forecasting, logistics automation, retention dashboards & performance analytics.',
    industry: 'E-commerce',
    region: 'UAE',
    impact: '12x Revenue Growth | 22% Cost Reduction | 41% Faster Delivery',
    category: 'Analytics • Optimization • Automation',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200',
    gradient: 'from-orange-500 to-red-500',
    duration: '12 weeks',
    results: ['12x revenue growth', '22% cost reduction', '41% faster delivery']
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Enhanced card variants with more dynamic hover effects
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -15,
    scale: 1.02,
    rotateX: 2,
    rotateY: 2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Enhanced metric card variants
const metricCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -12,
    scale: 1.03,
    rotateZ: 0.5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

export default function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-black text-gray-800 dark:text-gray-100 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Navbar />

      <main className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        <Breadcrumb />

        {/* Enhanced Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-6xl mx-auto relative"
        >
          {/* Enhanced Floating Elements */}
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-20 -left-20 text-indigo-400/20"
          >
            <Sparkles size={160} />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 25, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-10 -right-10 text-cyan-400/20"
          >
            <Zap size={120} />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-8xl font-black tracking-tight leading-tight bg-gradient-to-r from-slate-800 via-indigo-600 to-cyan-600 dark:from-white dark:via-indigo-200 dark:to-cyan-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real Projects.
            <br />
            <span className="relative inline-block">
              Real Impact.
              <motion.div
                className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mt-8 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Explore our proven track record across industries — powered by cutting-edge analytics, 
            strategic research, and full-stack execution.
          </motion.p>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 30px 60px rgba(99, 102, 241, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-12 py-5 rounded-2xl font-bold text-xl overflow-hidden shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                Explore Case Studies
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowUpRight size={24} />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Enhanced Analytics Metrics */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {[
            { 
              icon: <Globe2 className="w-8 h-8" />, 
              title: 'Clients Served', 
              value: '200+',
              description: 'Global client base',
              color: 'from-blue-500 to-cyan-500'
            },
            { 
              icon: <Briefcase className="w-8 h-8" />, 
              title: 'Industries Covered', 
              value: '18+',
              description: 'Diverse sectors',
              color: 'from-purple-500 to-pink-500'
            },
            { 
              icon: <Target className="w-8 h-8" />, 
              title: 'Success Rate', 
              value: '93%',
              description: 'Project success',
              color: 'from-emerald-500 to-green-500'
            },
            { 
              icon: <Users className="w-8 h-8" />, 
              title: 'Countries Served', 
              value: '12+',
              description: 'International reach',
              color: 'from-orange-500 to-red-500'
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={metricCardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              viewport={{ once: true }}
              className="group relative p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl border border-white/20 dark:border-slate-700/50 transition-all duration-500 cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(20px)`
              }}
            >
              {/* Enhanced Gradient Effects */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10`} />
              
              <div className="relative z-10">
                <motion.div 
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-2xl mb-6`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 8,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  {stat.icon}
                </motion.div>
                <h3 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-3">
                  {stat.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {stat.description}
                </p>
              </div>

              {/* Floating particles */}
              <AnimatePresence>
                {hoveredCard === i && (
                  <>
                    {[...Array(4)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className={`absolute w-3 h-3 bg-gradient-to-r ${stat.color} rounded-full`}
                        initial={{ 
                          opacity: 0, 
                          scale: 0,
                          x: '50%',
                          y: '50%'
                        }}
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: `calc(50% + ${(Math.random() - 0.5) * 120}px)`,
                          y: `calc(50% + ${(Math.random() - 0.5) * 120}px)`
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ 
                          duration: 1.8,
                          delay: particleIndex * 0.3
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.section>

        {/* Enhanced Case Studies Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredCard(study.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              viewport={{ once: true }}
              className="group relative"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.4}deg) rotateY(${mousePosition.x * 0.4}deg) translateZ(30px)`
              }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-800 shadow-2xl hover:shadow-4xl border border-gray-100 dark:border-slate-700 transition-all duration-700">
                {/* Enhanced Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                    whileHover={{ 
                      scale: 1.2,
                      transition: { duration: 1.5 }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Enhanced Badges */}
                  <motion.div 
                    className="absolute top-6 left-6"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    <span className="bg-white/95 dark:bg-slate-800/95 text-gray-800 dark:text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm shadow-lg border border-white/20">
                      ⏱️ {study.duration}
                    </span>
                  </motion.div>

                  <motion.div 
                    className="absolute top-6 right-6"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    <span className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg border border-white/20">
                      {study.industry}
                    </span>
                  </motion.div>

                  {/* Enhanced Hover Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div 
                      className="bg-white/40 backdrop-blur-sm rounded-full p-8 border border-white/40 shadow-3xl"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Play size={40} className="text-white ml-1" fill="white" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {study.title}
                    </motion.h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed text-lg">
                      {study.description}
                    </p>
                  </div>

                  {/* Enhanced Results Badges */}
                  <div className="flex flex-wrap gap-3">
                    {study.results.map((result, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ 
                          scale: 1.08, 
                          y: -3,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 text-indigo-700 dark:text-cyan-300 rounded-xl text-sm font-medium border border-indigo-200 dark:border-cyan-500/30 shadow-lg"
                      >
                         {result}
                      </motion.span>
                    ))}
                  </div>

                  {/* Enhanced Meta Information */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                         {study.region}
                      </motion.span>
                      <span>•</span>
                      <motion.span whileHover={{ scale: 1.05 }}>{study.category}</motion.span>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShareButtons
                        url={`${window.location.origin}/portfolio#${study.id}`}
                        title={study.title}
                        description={study.description}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Enhanced Gradient Overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl pointer-events-none`}
                  whileHover={{ opacity: 0.15 }}
                />

                {/* Floating particles */}
                <AnimatePresence>
                  {hoveredCard === study.id && (
                    <>
                      {[...Array(6)].map((_, particleIndex) => (
                        <motion.div
                          key={particleIndex}
                          className={`absolute w-4 h-4 bg-gradient-to-r ${study.gradient} rounded-full opacity-80`}
                          initial={{ 
                            opacity: 0, 
                            scale: 0,
                            x: '50%',
                            y: '50%'
                          }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: `calc(50% + ${(Math.random() - 0.5) * 250}px)`,
                            y: `calc(50% + ${(Math.random() - 0.5) * 250}px)`
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 2.5,
                            delay: particleIndex * 0.4
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ENHANCED ANALYTICS VISUALS SECTION */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Interactive Chart 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative p-8 lg:p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl border border-white/20 dark:border-slate-700/50 transition-all duration-500"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(15px)`
            }}
          >
            <div className="flex items-center gap-4 mb-8">          
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Growth Forecast Impact</h3>
                <p className="text-gray-500 dark:text-gray-400">Real-time performance metrics & analytics</p>
              </div>
            </div>
            
            {/* Enhanced Custom Chart Visualization */}
            <div className="relative h-64 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-600">
              <div className="flex items-end justify-between h-40 gap-4">
                {[65, 80, 45, 90, 75, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    whileHover={{ height: `${height + 10}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-indigo-500 to-cyan-500 rounded-t-2xl relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      {height}% Growth
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'].map((label, i) => (
                  <span key={i}>{label}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Interactive Chart 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative p-8 lg:p-10 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl border border-white/20 dark:border-slate-700/50 transition-all duration-500"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(15px)`
            }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Industry Distribution</h3>
                <p className="text-gray-500 dark:text-gray-400">Client success across various sectors</p>
              </div>
            </div>
            
            {/* Enhanced Custom Pie Chart */}
            <div className="relative h-64 flex items-center justify-center">
              <div className="relative w-52 h-52">
                {[
                  { percentage: 35, color: 'from-indigo-500 to-blue-500', label: 'Technology' },
                  { percentage: 25, color: 'from-emerald-500 to-green-500', label: 'Finance' },
                  { percentage: 20, color: 'from-amber-500 to-orange-500', label: 'E-commerce' },
                  { percentage: 20, color: 'from-purple-500 to-pink-500', label: 'Others' }
                ].map((segment, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1, delay: i * 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-r ${segment.color} rounded-full opacity-85 shadow-lg`}
                    style={{
                      clipPath: `conic-gradient(transparent 0% ${100 - segment.percentage}%, currentColor ${100 - segment.percentage}% 100%)`
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 dark:bg-slate-800/80 rounded-full w-24 h-24 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800 dark:text-white">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ENHANCED CTA SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-30" />
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          {/* Enhanced Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full"
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative text-center text-white p-16 lg:p-20">
            <motion.h2 
              className="text-4xl lg:text-6xl font-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Scale Your Business?
            </motion.h2>
            
            <motion.p 
              className="text-xl lg:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join 200+ successful businesses that have transformed their operations with our 
              data-driven strategies and AI-powered insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.assign('/contact')}
                className="bg-white text-indigo-600 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl flex items-center gap-3"
              >
                Get Started Today 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                
                </motion.span>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.assign('/portfolio')}
                className="border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                View More Projects
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-indigo-200"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Secure & Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>5-Star Rated Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Fast Delivery</span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Use the Simple Footer */}
      <Footer />

    </div>
  );
}