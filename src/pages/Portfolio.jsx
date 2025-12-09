import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ShareButtons from '../components/ShareButtons';
import SuggestionBox from '../components/SuggestionBox';
import PersonalizedSuggestions from '../components/PersonalizedSuggestions';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Globe2, Briefcase, Target, Users, PieChart, LineChart, BarChart3 } from "lucide-react";

// EXTENSIVE, REAL-WORLD, ENTERPRISE-LEVEL CASE STUDIES
const caseStudies = [
  {
    id: 1,
    title: 'FinTech Startup Raised $1.2M Seed Funding',
    description:
      'We created an investor-ready pitch deck, 5-year valuation model, KPI dashboard, and GTM strategy. Result: 3+ international VCs invested.',
    industry: 'Finance',
    region: 'USA',
    impact: 'Raised $1.2M | 38% CAC Reduction | 2.4x User Growth',
    category: 'Pitch Deck • Market Research • Financial Modeling',
    image: 'https://images.unsplash.com/photo-1559523182-a284c3fb7cff?q=80&w=1200'
  },
  {
    id: 2,
    title: 'AgriTech Market Entry Strategy Across 4 Indian States',
    description:
      'Conducted multi-region research, competitor mapping, pricing strategy, regulatory compliance documentation & product adoption roadmap.',
    industry: 'Agriculture',
    region: 'India',
    impact: '4-State Rollout | 62% Market Accuracy | 3x Adoption Rate',
    category: 'Feasibility • Market Research • GTM Strategy',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200'
  },
  {
    id: 3,
    title: 'AI Startup Pitch Deck for UK VC Network',
    description:
      'We built a deep-tech deck with technical architecture, AI adoption metrics, TAM/SAM/SOM analysis & revenue projections.',
    industry: 'Technology',
    region: 'UK',
    impact: 'Investor Ready | 27% Faster Approval | 120% Increase in VC Outreach',
    category: 'AI Analytics • Deck Design • Financial Strategy',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200'
  },
  {
    id: 4,
    title: 'E-commerce Brand Scaling from 10k → 120k Monthly Sales',
    description:
      'Optimized pricing, forecasting, logistics automation, retention dashboards & performance analytics.',
    industry: 'E-commerce',
    region: 'UAE',
    impact: '12x Revenue Growth | 22% Cost Reduction | 41% Faster Delivery',
    category: 'Analytics • Optimization • Automation',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200'
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 dark:from-slate-900 dark:to-black text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="pt-28 max-w-7xl mx-auto px-6 pb-20 space-y-20">
        <Breadcrumb />

        {/* PAGE HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            Real Projects. Real Impact.
            <br />
            <span className="text-indigo-600">A Proven Portfolio of Success.</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-4 text-lg">
            Explore our proven track record across industries — powered by analytics, research, strategy,
            and full-stack execution.
          </p>
        </motion.section>

        {/* ANALYTICS METRICS */}
        <section className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <Globe2 className="w-7 h-7 text-indigo-600" />, title: 'Clients Served', value: '200+' },
            { icon: <Briefcase className="w-7 h-7 text-indigo-600" />, title: 'Industries Covered', value: '18+' },
            { icon: <Target className="w-7 h-7 text-indigo-600" />, title: 'Project Success Rate', value: '93%' },
            { icon: <Users className="w-7 h-7 text-indigo-600" />, title: 'Countries Served', value: '12+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-slate-800 shadow-lg rounded-2xl text-center border border-gray-100 dark:border-slate-700"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </section>

        {/* CASE STUDIES GRID */}
        <section className="grid md:grid-cols-3 gap-10">
          {caseStudies.map(study => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition duration-300"
            >
              <img
                src={study.image}
                alt={study.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-6 space-y-4">
                <h3 className="font-bold text-xl text-indigo-600 leading-snug">{study.title}</h3>

                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  <span>Industry: {study.industry}</span>
                  <span>| Region: {study.region}</span>
                </div>

                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {study.impact}
                </p>

                <p className="text-xs text-gray-500">{study.category}</p>

                {/* SHARE */}
                <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                  <ShareButtons
                    url={`${window.location.origin}/portfolio#${study.id}`}
                    title={study.title}
                    description={study.description}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ANALYTICS VISUALS */}
        <section className="grid md:grid-cols-2 gap-12 mt-10">
          {/* CHART 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-5">
              <LineChart className="w-7 h-7 text-indigo-600" />
              <h3 className="text-xl font-bold">Growth Forecast Impact</h3>
            </div>
            <img
              src="https://cdn.dribbble.com/users/3472602/screenshots/14000000/media/1234567890.png"
              alt="Growth Forecast Chart"
              className="rounded-xl shadow-lg"
            />
          </motion.div>

          {/* CHART 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-5">
              <PieChart className="w-7 h-7 text-indigo-600" />
              <h3 className="text-xl font-bold">Industry Distribution</h3>
            </div>
            <img
              src="https://cdn.dribbble.com/users/3472602/screenshots/14000000/media/0987654321.png"
              alt="Industry Distribution Chart"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </section>

        {/* AI-Powered Suggestions */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <PersonalizedSuggestions 
            userId={useSelector((state) => state.auth.user)?.id} 
            limit={3}
          />
          <SuggestionBox 
            context="portfolio" 
            maxSuggestions={3}
          />
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-3xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join 200+ successful businesses that have transformed their operations with our analytics-driven strategies.
          </p>
          <button
            onClick={() => window.location.assign('/contact')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition"
          >
            Get Started Today
          </button>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
