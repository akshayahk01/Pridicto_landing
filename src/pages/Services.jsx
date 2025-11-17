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
  FaCode,
  FaLeaf,
  FaShieldAlt,
  FaTasks,
  FaPlug,
  FaChartBar,
  FaCodeBranch,
  FaWrench,
  FaChalkboardTeacher,
  FaBalanceScale,
} from 'react-icons/fa';

const services = [
  // Business Consulting
  {
    id: 1,
    category: 'Business Consulting',
    icon: <FaFileAlt className="text-indigo-600" />,
    title: 'Business Plan Writing',
    description: 'Professional investor-ready plans with 5-year projections, market overview, and executive summary.',
    pricing: 'Starting at $500',
    features: ['5-year financial projections', 'Market analysis', 'Executive summary', 'Investor presentation'],
  },
  {
    id: 2,
    category: 'Business Consulting',
    icon: <FaChartLine className="text-blue-600" />,
    title: 'Pitch Deck Creation',
    description: '10–15 slide presentations designed to impress investors, with visuals and storytelling.',
    pricing: 'Starting at $800',
    features: ['Custom visuals', 'Storytelling structure', 'Investor-focused content', 'Multiple revisions'],
  },
  {
    id: 3,
    category: 'Business Consulting',
    icon: <FaMoneyBillWave className="text-green-600" />,
    title: 'Financial Modelling',
    description: 'Custom Excel / Google Sheet based financial forecasts, P&L, and cash-flow analysis.',
    pricing: 'Starting at $600',
    features: ['P&L statements', 'Cash flow analysis', 'Scenario modeling', 'Excel/Google Sheets'],
  },
  {
    id: 4,
    category: 'Business Consulting',
    icon: <FaSearch className="text-purple-600" />,
    title: 'Market Research & Feasibility',
    description: 'In-depth desktop and primary research, competitive benchmarking, SWOT analysis.',
    pricing: 'Starting at $700',
    features: ['SWOT analysis', 'Competitive benchmarking', 'Primary research', 'Feasibility reports'],
  },
  {
    id: 5,
    category: 'Business Consulting',
    icon: <FaHandshake className="text-pink-600" />,
    title: 'Startup Consulting',
    description: 'End-to-end business setup support — strategy, process automation, operations.',
    pricing: 'Starting at $1,000',
    features: ['Strategy development', 'Process automation', 'Operations setup', 'Ongoing support'],
  },
  {
    id: 6,
    category: 'Business Consulting',
    icon: <FaUsers className="text-yellow-600" />,
    title: 'Recruitment & HR Support',
    description: 'Talent acquisition and HR process setup for startups.',
    pricing: 'Starting at $900',
    features: ['Talent acquisition', 'HR process setup', 'Interview coordination', 'Onboarding support'],
  },

  // Project Estimation
  {
    id: 7,
    category: 'Project Estimation',
    icon: <FaBuilding className="text-orange-600" />,
    title: 'Construction Cost Estimation',
    description: 'Accurate estimation for residential, commercial, and infrastructure projects using AI and real-time material prices.',
    pricing: 'Starting at $1,200',
    features: ['AI-driven estimates', 'Real-time pricing', 'Material breakdowns', 'Infrastructure focus'],
  },
  {
    id: 8,
    category: 'Project Estimation',
    icon: <FaTools className="text-teal-600" />,
    title: 'Material & Labor Estimation',
    description: 'Auto-generate detailed breakdowns of material, equipment, and workforce requirements based on project scale.',
    pricing: 'Starting at $800',
    features: ['Material breakdowns', 'Labor requirements', 'Equipment estimates', 'Scale-based calculations'],
  },
  {
    id: 9,
    category: 'Project Estimation',
    icon: <FaCalculator className="text-red-600" />,
    title: 'Budget Forecasting & Affordability',
    description: 'Predict cost variations and compare estimated vs. actual budgets with detailed analytics dashboards.',
    pricing: 'Starting at $900',
    features: ['Cost variation predictions', 'Budget comparisons', 'Analytics dashboards', 'Affordability analysis'],
  },
  {
    id: 10,
    category: 'Project Estimation',
    icon: <FaProjectDiagram className="text-indigo-500" />,
    title: 'Feasibility Analysis for Projects',
    description: 'End-to-end project viability assessment — covering technical, economic, and financial feasibility.',
    pricing: 'Starting at $1,100',
    features: ['Technical feasibility', 'Economic analysis', 'Financial viability', 'Comprehensive reports'],
  },
  {
    id: 11,
    category: 'Project Estimation',
    icon: <FaCode className="text-cyan-600" />,
    title: 'Software Development Estimation',
    description: 'Detailed cost/time estimates for web/apps, including tech stack analysis and scalability assessments.',
    pricing: 'Starting at $1,000',
    features: ['Tech stack analysis', 'Scalability assessments', 'Code complexity analysis', 'AI recommendations'],
  },
  {
    id: 12,
    category: 'Project Estimation',
    icon: <FaLeaf className="text-green-600" />,
    title: 'Sustainability & Green Building Analysis',
    description: 'Eco-friendly assessments for construction projects, including carbon footprint and material sustainability.',
    pricing: 'Starting at $900',
    features: ['Carbon footprint analysis', 'Green certification support', 'Sustainable materials', 'Compliance checks'],
  },

  // Advanced Tools
  {
    id: 13,
    category: 'Advanced Tools',
    icon: <FaShieldAlt className="text-gray-600" />,
    title: 'Risk Management & Mitigation',
    description: 'Identify and plan for project risks with AI-driven recommendations and contingency strategies.',
    pricing: 'Starting at $800',
    features: ['Risk scoring', 'Mitigation plans', 'AI recommendations', 'Contingency strategies'],
  },
  {
    id: 14,
    category: 'Advanced Tools',
    icon: <FaTasks className="text-blue-500" />,
    title: 'Project Management Consulting',
    description: 'End-to-end PM support, including Agile/Scrum setup, resource allocation, and milestone tracking.',
    pricing: 'Starting at $1,500',
    features: ['Agile/Scrum setup', 'Resource allocation', 'Milestone tracking', 'Workflow automation'],
  },
  {
    id: 15,
    category: 'Advanced Tools',
    icon: <FaPlug className="text-purple-500" />,
    title: 'Integration with Project Tools',
    description: 'Connect to Jira, Trello, Asana for seamless workflows and data syncing.',
    pricing: 'Starting at $600',
    features: ['Jira/Trello/Asana integration', 'Data syncing', 'Seamless workflows', 'API connections'],
  },
  {
    id: 16,
    category: 'Advanced Tools',
    icon: <FaChartBar className="text-orange-500" />,
    title: 'Custom Dashboards & Reporting',
    description: 'Build personalized analytics dashboards for clients with real-time data visualization.',
    pricing: 'Starting at $700',
    features: ['Custom metrics', 'Real-time visualization', 'Exportable reports', 'Personalized dashboards'],
  },
  {
    id: 17,
    category: 'Advanced Tools',
    icon: <FaCodeBranch className="text-indigo-400" />,
    title: 'API Access & Developer Tools',
    description: 'Provide APIs for third-party integrations and developer SDKs.',
    pricing: 'Starting at $500/month',
    features: ['API documentation', 'Developer SDKs', 'Sandbox environment', 'Third-party integrations'],
  },
  {
    id: 18,
    category: 'Advanced Tools',
    icon: <FaWrench className="text-red-500" />,
    title: 'Ongoing Support & Maintenance',
    description: 'Post-project monitoring, updates, and performance optimization.',
    pricing: 'Starting at $400/month',
    features: ['24/7 support', 'Performance monitoring', 'Issue tracking', 'Optimization updates'],
  },

  // Additional Consulting
  {
    id: 19,
    category: 'Business Consulting',
    icon: <FaChalkboardTeacher className="text-teal-500" />,
    title: 'Training & Workshops',
    description: 'Online/offline sessions on estimation best practices, AI tools, and project management.',
    pricing: 'Starting at $300 per session',
    features: ['Interactive modules', 'Best practices training', 'AI tool workshops', 'Certification options'],
  },
  {
    id: 20,
    category: 'Business Consulting',
    icon: <FaBalanceScale className="text-brown-600" />,
    title: 'Global Compliance & Legal Review',
    description: 'Ensure projects meet international standards, regulations, and legal requirements.',
    pricing: 'Starting at $1,200',
    features: ['Regulatory audits', 'Legal templates', 'International standards', 'Compliance checks'],
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
