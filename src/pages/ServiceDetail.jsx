import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Breadcrumb from "../components/Breadcrumb";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCalculator, FaClock, FaStar, FaUsers, FaRocket, FaShieldAlt, FaCheckCircle, FaDownload, FaPlay, FaFileAlt, FaChartLine, FaLightbulb, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const serviceDetails = {
  1: {
    title: "Business Plan Writing",
    description:
      "We craft detailed, investor-ready business plans including executive summaries, financial projections, and market analysis to help startups attract funding.",
    image: "https://img.freepik.com/free-vector/business-plan-concept-illustration_114360-5450.jpg",
    features: [
      "Executive Summary with compelling value proposition",
      "5-year financial projections with multiple scenarios",
      "Market analysis and competitive landscape",
      "Go-to-market strategy and implementation roadmap",
      "Risk assessment and mitigation strategies",
      "Investor presentation materials"
    ],
    pricing: { basic: 999, pro: 1999, enterprise: 3999 },
    timeline: "7-14 days",
    aiFeatures: [
      "AI-powered market size calculations",
      "Automated competitor analysis",
      "Financial projection optimization",
      "Risk assessment algorithms"
    ],
    testimonials: [
      { name: "Sarah Chen", company: "TechFlow Inc.", rating: 5, text: "Got $2M funding with their business plan!" },
      { name: "Mike Johnson", company: "GreenEnergy Co.", rating: 5, text: "Professional quality that impressed investors." }
    ]
  },
  2: {
    title: "Pitch Deck Creation",
    description:
      "Get a stunning 10-15 slide investor pitch deck with compelling visuals, storytelling, and impactful design to win over investors.",
    image: "https://img.freepik.com/free-vector/startup-pitch-presentation-concept-illustration_114360-9131.jpg",
    features: [
      "10-15 slide professional pitch deck",
      "Custom visuals and data visualization",
      "Storytelling framework for maximum impact",
      "Investor psychology optimization",
      "Multiple format exports (PDF, PPT, Keynote)",
      "Rehearsal and presentation coaching"
    ],
    pricing: { basic: 799, pro: 1499, enterprise: 2499 },
    timeline: "5-10 days",
    aiFeatures: [
      "AI-generated compelling narratives",
      "Visual design optimization",
      "Data storytelling algorithms",
      "Investor preference analysis"
    ],
    testimonials: [
      { name: "Alex Rodriguez", company: "FinTech Solutions", rating: 5, text: "Raised $5M with their pitch deck design!" },
      { name: "Emma Davis", company: "HealthTech App", rating: 5, text: "The storytelling was incredible." }
    ]
  },
  3: {
    title: "Financial Modelling",
    description:
      "We create robust financial models in Excel or Google Sheets with P&L, cash flow, and balance sheet forecasts for 3–5 years.",
    image: "https://img.freepik.com/free-vector/financial-data-analysis-concept_23-2149150783.jpg",
    features: [
      "3-5 year financial projections",
      "Profit & Loss, Cash Flow, Balance Sheet",
      "Scenario analysis and sensitivity testing",
      "Key financial ratios and KPIs",
      "Automated dashboard with charts",
      "Monthly/quarterly breakdown options"
    ],
    pricing: { basic: 599, pro: 1199, enterprise: 2199 },
    timeline: "3-7 days",
    aiFeatures: [
      "AI-powered revenue forecasting",
      "Automated scenario generation",
      "Risk-adjusted financial modeling",
      "Industry benchmark comparisons"
    ],
    testimonials: [
      { name: "David Kim", company: "Manufacturing Corp", rating: 5, text: "Accurate projections helped secure bank loan." },
      { name: "Lisa Wang", company: "Retail Chain", rating: 5, text: "The sensitivity analysis was game-changing." }
    ]
  },
  4: {
    title: "Market Research & Feasibility",
    description:
      "Comprehensive market research, feasibility studies, SWOT analysis, and competitive benchmarking tailored for your industry.",
    image: "https://img.freepik.com/free-vector/data-analysis-illustration_114360-903.jpg",
    features: [
      "Primary and secondary market research",
      "SWOT and competitor analysis",
      "Target market segmentation",
      "Feasibility assessment report",
      "Industry trend analysis",
      "Customer persona development"
    ],
    pricing: { basic: 1299, pro: 2299, enterprise: 3999 },
    timeline: "10-21 days",
    aiFeatures: [
      "AI-driven market size estimation",
      "Automated competitor intelligence",
      "Trend prediction algorithms",
      "Customer behavior analysis"
    ],
    testimonials: [
      { name: "James Wilson", company: "FoodTech Startup", rating: 5, text: "Market insights were incredibly accurate." },
      { name: "Maria Garcia", company: "EduTech Platform", rating: 5, text: "Helped us pivot before wasting resources." }
    ]
  },
  5: {
    title: "Startup Consulting",
    description:
      "We help founders with go-to-market strategy, operations, automation, and business growth roadmaps.",
    image: "https://img.freepik.com/free-vector/startup-development-concept-illustration_114360-2397.jpg",
    features: [
      "Go-to-market strategy development",
      "Operations and process optimization",
      "Business automation recommendations",
      "Growth roadmap and milestones",
      "Team structure and hiring plan",
      "Monthly strategic advisory sessions"
    ],
    pricing: { basic: 1999, pro: 3999, enterprise: 7999 },
    timeline: "Ongoing (3-12 months)",
    aiFeatures: [
      "AI-powered growth strategy optimization",
      "Automated process mapping",
      "Performance prediction models",
      "Market opportunity identification"
    ],
    testimonials: [
      { name: "Tom Anderson", company: "SaaS Platform", rating: 5, text: "Grew from 0 to 100 customers in 6 months." },
      { name: "Rachel Green", company: "E-commerce Store", rating: 5, text: "Their automation recommendations saved us hours daily." }
    ]
  },
  6: {
    title: "Recruitment & HR Support",
    description:
      "From talent acquisition to HR process setup — we help build strong startup teams.",
    image: "https://img.freepik.com/free-vector/human-resources-concept-illustration_114360-2204.jpg",
    features: [
      "Job description and posting creation",
      "Candidate sourcing and screening",
      "Interview process management",
      "HR policy and handbook development",
      "Performance management systems",
      "Employee onboarding programs"
    ],
    pricing: { basic: 1499, pro: 2999, enterprise: 5999 },
    timeline: "2-8 weeks",
    aiFeatures: [
      "AI-powered candidate matching",
      "Skills gap analysis",
      "Performance prediction algorithms",
      "Cultural fit assessment"
    ],
    testimonials: [
      { name: "Kevin Brown", company: "Logistics Startup", rating: 5, text: "Found our perfect CTO through their process." },
      { name: "Nina Patel", company: "Design Agency", rating: 5, text: "HR policies were exactly what we needed." }
    ]
  },
  7: {
    title: "Construction Cost Estimation",
    description:
      "Accurate estimation for residential, commercial, and infrastructure projects using AI and real-time material prices.",
    image: "https://img.freepik.com/free-vector/construction-cost-estimation-concept_23-2149150783.jpg",
    features: [
      "Detailed material cost breakdowns",
      "Labor cost calculations by trade",
      "Equipment and machinery costs",
      "Permit and regulatory fees",
      "Contingency and risk factors",
      "Real-time price updates"
    ],
    pricing: { basic: 499, pro: 999, enterprise: 1999 },
    timeline: "1-3 days",
    aiFeatures: [
      "Real-time material price tracking",
      "AI-powered cost optimization",
      "Regional price variation analysis",
      "Historical cost trend analysis"
    ],
    testimonials: [
      { name: "Robert Taylor", company: "Construction Co.", rating: 5, text: "Estimates were within 2% of actual costs!" },
      { name: "Jennifer Liu", company: "Real Estate Dev.", rating: 5, text: "Real-time pricing saved us thousands." }
    ]
  },
  8: {
    title: "Material & Labor Estimation",
    description:
      "Auto-generate detailed breakdowns of material, equipment, and workforce requirements based on project scale.",
    image: "https://img.freepik.com/free-vector/material-estimation-concept_23-2149150783.jpg",
    features: [
      "Material quantity calculations",
      "Labor hours by skill level",
      "Equipment rental estimates",
      "Waste factor calculations",
      "Supplier cost comparisons",
      "Sustainability impact analysis"
    ],
    pricing: { basic: 399, pro: 799, enterprise: 1499 },
    timeline: "1-2 days",
    aiFeatures: [
      "Automated material optimization",
      "Labor productivity algorithms",
      "Waste reduction recommendations",
      "Supplier performance analysis"
    ],
    testimonials: [
      { name: "Mark Stevens", company: "Industrial Projects", rating: 5, text: "Reduced material waste by 15%." },
      { name: "Anna Kowalski", company: "Renovation Firm", rating: 5, text: "Labor estimates were spot-on." }
    ]
  },
  9: {
    title: "Budget Forecasting & Affordability",
    description:
      "Predict cost variations and compare estimated vs. actual budgets with detailed analytics dashboards.",
    image: "https://img.freepik.com/free-vector/budget-forecasting-concept_23-2149150783.jpg",
    features: [
      "Multi-scenario budget forecasting",
      "Cost variance analysis",
      "Cash flow projections",
      "ROI and payback calculations",
      "Risk-adjusted budgeting",
      "Real-time budget tracking"
    ],
    pricing: { basic: 699, pro: 1399, enterprise: 2499 },
    timeline: "2-5 days",
    aiFeatures: [
      "Predictive cost variance analysis",
      "Automated budget optimization",
      "Risk probability calculations",
      "Market condition impact analysis"
    ],
    testimonials: [
      { name: "Carlos Mendoza", company: "Property Management", rating: 5, text: "Predicted cost overruns before they happened." },
      { name: "Sophie Laurent", company: "Infrastructure Ltd.", rating: 5, text: "ROI analysis helped secure funding." }
    ]
  },
  10: {
    title: "Feasibility Analysis for Projects",
    description:
      "End-to-end project viability assessment — covering technical, economic, and financial feasibility.",
    image: "https://img.freepik.com/free-vector/feasibility-analysis-concept_23-2149150783.jpg",
    features: [
      "Technical feasibility assessment",
      "Economic viability analysis",
      "Financial feasibility modeling",
      "Risk assessment and mitigation",
      "Environmental impact evaluation",
      "Stakeholder impact analysis"
    ],
    pricing: { basic: 899, pro: 1799, enterprise: 3299 },
    timeline: "5-14 days",
    aiFeatures: [
      "AI-powered risk assessment",
      "Automated feasibility scoring",
      "Market demand prediction",
      "Sustainability impact analysis"
    ],
    testimonials: [
      { name: "Ahmed Hassan", company: "Energy Projects", rating: 5, text: "Identified critical risks we missed." },
      { name: "Lucy Thompson", company: "Urban Planning", rating: 5, text: "Comprehensive analysis saved millions." }
    ]
  },
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceDetails[id];
  const [selectedPackage, setSelectedPackage] = useState('pro');
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [timelinePreference, setTimelinePreference] = useState('');
  const [budgetRange, setBudgetRange] = useState([500, 5000]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        <p>Service not found.</p>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    let basePrice = service.pricing[selectedPackage];

    // Add addon prices
    const addonPrices = {
      priority: 299,
      consultation: 199,
      revisions: 149,
      templates: 99
    };
    const addonTotal = selectedAddons.reduce((sum, addon) => sum + addonPrices[addon], 0);

    // Apply timeline multiplier
    const timelineMultipliers = {
      rush: 1.5,
      standard: 1,
      flexible: 0.8
    };
    const timelineMultiplier = timelineMultipliers[timelinePreference] || 1;

    return Math.round((basePrice + addonTotal) * timelineMultiplier);
  };

  const handleGetQuote = async () => {
    setIsCalculating(true);
    // Simulate AI calculation
    setTimeout(() => {
      setIsCalculating(false);
      navigate('/contact', {
        state: {
          service: service.title,
          package: selectedPackage,
          basePrice: service.pricing[selectedPackage],
          addons: selectedAddons,
          timelinePreference,
          budgetRange,
          totalPrice: calculateTotalPrice()
        }
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-100">
        <main className="pt-28 max-w-6xl mx-auto px-6 pb-16">
          <Breadcrumb />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-indigo-600 hover:underline"
            >
              <FaArrowLeft /> Back to Services
            </button>

            {/* Hero Section */}
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8 space-y-4">
                <h1 className="text-4xl font-bold text-indigo-600">{service.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{service.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-indigo-500" />
                    <span>{service.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-500" />
                    <span>100% Satisfaction Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRocket className="text-purple-500" />
                    <span>AI-Powered Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  What's Included
                </h2>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaLightbulb className="text-yellow-500" />
                  AI-Powered Features
                </h2>
                <ul className="space-y-3">
                  {service.aiFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Customization Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Customize Your Service</h2>

              {/* Service Add-ons */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaRocket className="text-purple-500" />
                  Service Add-ons
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'priority', name: 'Priority Support', price: 299 },
                    { id: 'consultation', name: '1-on-1 Consultation Call', price: 199 },
                    { id: 'revisions', name: 'Unlimited Revisions', price: 149 },
                    { id: 'templates', name: 'Custom Templates', price: 99 }
                  ].map(addon => (
                    <label key={addon.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAddons([...selectedAddons, addon.id]);
                            } else {
                              setSelectedAddons(selectedAddons.filter(a => a !== addon.id));
                            }
                          }}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span className="font-medium">{addon.name}</span>
                      </div>
                      <span className="text-indigo-600 font-semibold">+${addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Timeline Preferences */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Timeline Preferences
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'rush', label: 'Rush (3-5 days)', multiplier: 1.5 },
                    { value: 'standard', label: 'Standard Timeline', multiplier: 1 },
                    { value: 'flexible', label: 'Flexible (Extended)', multiplier: 0.8 }
                  ].map(option => (
                    <label key={option.value} className="flex items-center p-4 border border-gray-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
                      <input
                        type="radio"
                        name="timeline"
                        value={option.value}
                        checked={timelinePreference === option.value}
                        onChange={(e) => setTimelinePreference(e.target.value)}
                        className="w-4 h-4 text-indigo-600"
                      />
                      <span className="ml-3 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range Slider */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaDollarSign className="text-green-500" />
                  Budget Range
                </h3>
                <div className="px-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>${budgetRange[0]}</span>
                    <span>${budgetRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={budgetRange[0]}
                    onChange={(e) => setBudgetRange([parseInt(e.target.value), budgetRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={budgetRange[1]}
                    onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2"
                  />
                </div>
              </div>

              {/* Package Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Choose Your Package</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(service.pricing).map(([tier, price]) => (
                    <div
                      key={tier}
                      onClick={() => setSelectedPackage(tier)}
                      className={`cursor-pointer rounded-xl p-6 border-2 transition-all duration-300 ${
                        selectedPackage === tier
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-lg'
                          : 'border-gray-200 dark:border-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      <div className="text-center">
                        <h4 className="text-xl font-bold capitalize mb-2">{tier}</h4>
                        <div className="text-3xl font-bold text-indigo-600 mb-4">
                          ${price.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          {tier === 'basic' && 'Perfect for startups'}
                          {tier === 'pro' && 'Most popular choice'}
                          {tier === 'enterprise' && 'For large organizations'}
                        </div>
                        {selectedPackage === tier && (
                          <div className="text-green-500 font-semibold">Selected</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleGetQuote}
                  disabled={isCalculating}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <div className="flex items-center gap-3">
                      <LoadingSpinner />
                      AI Calculating Quote...
                    </div>
                  ) : (
                    `Get Customized ${service.title} Quote`
                  )}
                </button>
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <FaStar className="text-yellow-500" />
                Client Success Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.testimonials.map((testimonial, index) => (
                  <div key={index} className="border border-gray-200 dark:border-slate-600 rounded-xl p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of successful businesses who trust our AI-powered solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGetQuote}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300"
                >
                  Start Your Project
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-indigo-600 transition-all duration-300"
                >
                  Schedule Consultation
                </button>
              </div>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
