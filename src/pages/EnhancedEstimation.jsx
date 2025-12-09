import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { 
  FiDollarSign, 
  FiClock, 
  FiUsers, 
  FiBarChart, 
  FiDownload,
  FiSave,
  FiShare2,
  FiSettings,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';

export default function EnhancedEstimation() {
  const [dark, setDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [estimation, setEstimation] = useState(null);
  const [formData, setFormData] = useState({
    projectType: '',
    complexity: '',
    duration: '',
    teamSize: '',
    features: [],
    requirements: '',
    budget: '',
    timeline: ''
  });

  const projectTypes = [
    { value: 'web-app', label: 'Web Application', icon: '🌐' },
    { value: 'mobile-app', label: 'Mobile Application', icon: '📱' },
    { value: 'software', label: 'Desktop Software', icon: '💻' },
    { value: 'construction', label: 'Construction Project', icon: '🏗️' },
    { value: 'consulting', label: 'Consulting Project', icon: '📊' }
  ];

  const complexityLevels = [
    { value: 'simple', label: 'Simple', description: 'Basic features, standard requirements' },
    { value: 'moderate', label: 'Moderate', description: 'Some custom features, medium complexity' },
    { value: 'complex', label: 'Complex', description: 'Advanced features, high complexity' },
    { value: 'enterprise', label: 'Enterprise', description: 'Large-scale, mission-critical system' }
  ];

  const generateEstimation = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockEstimation = {
      cost: {
        total: 75000,
        breakdown: [
          { category: 'Development', amount: 45000, percentage: 60 },
          { category: 'Design', amount: 15000, percentage: 20 },
          { category: 'Testing', amount: 9000, percentage: 12 },
          { category: 'Project Management', amount: 6000, percentage: 8 }
        ]
      },
      timeline: {
        totalWeeks: 16,
        phases: [
          { phase: 'Planning & Analysis', weeks: 2 },
          { phase: 'Design', weeks: 3 },
          { phase: 'Development', weeks: 8 },
          { phase: 'Testing', weeks: 2 },
          { phase: 'Deployment', weeks: 1 }
        ]
      },
      team: {
        totalMembers: 5,
        roles: [
          { role: 'Project Manager', count: 1 },
          { role: 'Lead Developer', count: 1 },
          { role: 'Frontend Developer', count: 1 },
          { role: 'Backend Developer', count: 1 },
          { role: 'QA Engineer', count: 1 }
        ]
      },
      risk: {
        score: 3.2,
        level: 'Low',
        factors: [
          { risk: 'Scope Creep', probability: 'Medium', impact: 'High' },
          { risk: 'Technical Challenges', probability: 'Low', impact: 'Medium' },
          { risk: 'Resource Availability', probability: 'Low', impact: 'Medium' }
        ]
      },
      confidence: 85
    };
    
    setEstimation(mockEstimation);
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const exportPDF = () => {
    // Simulate PDF export
    alert('PDF export functionality would be implemented here');
  };

  const saveEstimation = () => {
    // Simulate saving
    localStorage.setItem('latest_estimation', JSON.stringify(estimation));
    alert('Estimation saved successfully!');
  };

  return (
    <Layout dark={false} setDark={() => {}}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 from-slate-900 via-slate-800 to-slate-900">
        <div className="pt-28 pb-16 max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-white mb-4">
              Advanced Project <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Estimation</span>
            </h1>
            <p className="text-xl text-gray-600 text-gray-300 max-w-3xl mx-auto">
              Get comprehensive project estimates with AI-powered analysis, risk assessment, and detailed breakdown
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-lg border border-gray-200/50 border-slate-700/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-white mb-6 flex items-center gap-3">
                <FiSettings className="w-6 h-6 text-indigo-600" />
                Project Details
              </h2>

              <div className="space-y-6">
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-3">
                    Project Type
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {projectTypes.map(type => (
                      <button
                        key={type.value}
                        onClick={() => handleInputChange('projectType', type.value)}
                        className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                          formData.projectType === type.value
                            ? 'border-indigo-500 bg-indigo-50 bg-indigo-900/20 text-indigo-700 text-indigo-300'
                            : 'border-gray-300 border-gray-600 hover:border-gray-400 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{type.icon}</span>
                          <span className="font-medium">{type.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Complexity Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-3">
                    Complexity Level
                  </label>
                  <div className="space-y-2">
                    {complexityLevels.map(level => (
                      <button
                        key={level.value}
                        onClick={() => handleInputChange('complexity', level.value)}
                        className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${
                          formData.complexity === level.value
                            ? 'border-indigo-500 bg-indigo-50 bg-indigo-900/20'
                            : 'border-gray-300 border-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium text-gray-900 text-white">{level.label}</div>
                        <div className="text-sm text-gray-600 text-gray-400">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-3">
                    Budget Range
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full p-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-slate-700 text-gray-900 text-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="10k-25k">$10K - $25K</option>
                    <option value="25k-50k">$25K - $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-250k">$100K - $250K</option>
                    <option value="250k+">$250K+</option>
                  </select>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generateEstimation}
                  disabled={isLoading || !formData.projectType || !formData.complexity}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Generating Estimation...' : 'Generate Estimation'}
                </button>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 bg-slate-800/80 backdrop-blur rounded-2xl p-8 shadow-lg border border-gray-200/50 border-slate-700/50"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-white mb-6 flex items-center gap-3">
                <FiBarChart className="w-6 h-6 text-indigo-600" />
                Estimation Results
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
              ) : estimation ? (
                <div className="space-y-6">
                  {/* Cost Summary */}
                  <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <FiDollarSign className="w-6 h-6" />
                      <span className="text-lg font-semibold">Total Estimated Cost</span>
                    </div>
                    <div className="text-3xl font-bold">${estimation.cost.total.toLocaleString()}</div>
                    <div className="text-indigo-100 mt-2">Confidence: {estimation.confidence}%</div>
                  </div>

                  {/* Timeline */}
                  <div className="p-4 border border-gray-200 border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <FiClock className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-gray-900 text-white">Timeline: {estimation.timeline.totalWeeks} weeks</span>
                    </div>
                    <div className="space-y-2">
                      {estimation.timeline.phases.map((phase, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 text-gray-400">{phase.phase}</span>
                          <span className="text-gray-900 text-white">{phase.weeks}w</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Size */}
                  <div className="p-4 border border-gray-200 border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <FiUsers className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold text-gray-900 text-white">Team Requirements</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 text-white mb-2">{estimation.team.totalMembers} members</div>
                    <div className="space-y-1">
                      {estimation.team.roles.map((role, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600 text-gray-400">{role.role}</span>
                          <span className="text-gray-900 text-white">{role.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="p-4 border border-gray-200 border-gray-600 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <FiAlertCircle className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold text-gray-900 text-white">Risk Level: {estimation.risk.level}</span>
                    </div>
                    <div className="text-sm text-gray-600 text-gray-400">
                      Risk Score: {estimation.risk.score}/5
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={exportPDF}
                      className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 border-gray-600 text-gray-700 text-gray-300 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors"
                    >
                      <FiDownload className="w-4 h-4" />
                      Export PDF
                    </button>
                    <button
                      onClick={saveEstimation}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <FiSave className="w-4 h-4" />
                      Save
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 border-gray-600 text-gray-700 text-gray-300 rounded-lg hover:bg-gray-50 hover:bg-slate-700 transition-colors">
                      <FiShare2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500 text-gray-400">
                  <div className="text-center">
                    <FiBarChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Fill out the form to generate your project estimation</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}