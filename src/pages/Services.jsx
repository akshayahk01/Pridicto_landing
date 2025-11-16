import React from 'react';
import Layout from '../components/Layout';
import Breadcrumb from '../components/Breadcrumb';
import ServiceCard from '../components/ServiceCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaFileAlt,
  FaChartLine,
  FaMoneyBillWave,
  FaSearch,
  FaHandshake,
  FaUsers,
  FaTools,
  FaBuilding,
  FaCalculator,
  FaProjectDiagram,
} from 'react-icons/fa';

const services = [
  // Existing business services
  {
    id: 1,
    icon: <FaFileAlt className="text-indigo-600" />,
    title: 'Business Plan Writing',
    description:
      'Professional investor-ready plans with 5-year projections, market overview, and executive summary.',
  },
  {
    id: 2,
    icon: <FaChartLine className="text-blue-600" />,
    title: 'Pitch Deck Creation',
    description:
      '10–15 slide presentations designed to impress investors, with visuals and storytelling.',
  },
  {
    id: 3,
    icon: <FaMoneyBillWave className="text-green-600" />,
    title: 'Financial Modelling',
    description:
      'Custom Excel / Google Sheet based financial forecasts, P&L, and cash-flow analysis.',
  },
  {
    id: 4,
    icon: <FaSearch className="text-purple-600" />,
    title: 'Market Research & Feasibility',
    description:
      'In-depth desktop and primary research, competitive benchmarking, SWOT analysis.',
  },
  {
    id: 5,
    icon: <FaHandshake className="text-pink-600" />,
    title: 'Startup Consulting',
    description:
      'End-to-end business setup support — strategy, process automation, operations.',
  },
  {
    id: 6,
    icon: <FaUsers className="text-yellow-600" />,
    title: 'Recruitment & HR Support',
    description:
      'Talent acquisition and HR process setup for startups.',
  },

  // 👇 New Project Estimation services
  {
    id: 7,
    icon: <FaBuilding className="text-orange-600" />,
    title: 'Construction Cost Estimation',
    description:
      'Accurate estimation for residential, commercial, and infrastructure projects using AI and real-time material prices.',
  },
  {
    id: 8,
    icon: <FaTools className="text-teal-600" />,
    title: 'Material & Labor Estimation',
    description:
      'Auto-generate detailed breakdowns of material, equipment, and workforce requirements based on project scale.',
  },
  {
    id: 9,
    icon: <FaCalculator className="text-red-600" />,
    title: 'Budget Forecasting & Affordability',
    description:
      'Predict cost variations and compare estimated vs. actual budgets with detailed analytics dashboards.',
  },
  {
    id: 10,
    icon: <FaProjectDiagram className="text-indigo-500" />,
    title: 'Feasibility Analysis for Projects',
    description:
      'End-to-end project viability assessment — covering technical, economic, and financial feasibility.',
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100">
        <main className="pt-28 max-w-7xl mx-auto px-6 pb-16 space-y-12">
        <Breadcrumb />
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold mb-2">
            Our <span className="text-indigo-600">Services</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Comprehensive solutions for project feasibility, estimation, and startup growth.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                pricing={service.pricing}
                features={service.features}
                onLearnMore={() => navigate(`/services/${service.id}`)}
              />
            </motion.div>
          ))}
        </motion.section>
        </main>
      </div>
    </Layout>
  );
}
