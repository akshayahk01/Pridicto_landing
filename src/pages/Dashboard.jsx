import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
<<<<<<< HEAD
import {
  FiDollarSign,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiActivity,
  FiCalendar,
  FiBarChart,
  FiPieChart,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
  FiRefreshCw,
  FiSettings,
  FiEye,
  FiStar,
  FiMessageSquare,
  FiBriefcase,
  FiAward,
  FiZap,
  FiTrendingDown,
  FiCheck,
  FiX,
  FiLoader
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { connectWebSocket, disconnectWebSocket, isWebSocketConnected } from '../services/websocket';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { get } = useApi();
  const navigate = useNavigate();
=======
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaDownload, FaBalanceScale, FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SuggestionBox from '../components/SuggestionBox';
import PersonalizedSuggestions from '../components/PersonalizedSuggestions';
import RealtimeMetricsChart from '../components/RealtimeMetricsChart';
import RealtimeActivityFeed from '../components/RealtimeActivityFeed';
import NotificationCenter from '../components/NotificationCenter';
import { useSelector } from 'react-redux';
import { connectWebSocket, disconnectWebSocket, isWebSocketConnected } from '../services/websocket';

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeMetrics, setRealtimeMetrics] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b

  // State management
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeData, setRealtimeData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [liveUpdates, setLiveUpdates] = useState(true);

  // Dark mode detection
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      const response = await get('/api/dashboard/user-stats');
      setStats(response || getMockStats());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
      setStats(getMockStats());
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  }, [get]);
=======

    // Initialize realtime features
    if (user?.id) {
      connectWebSocket(
        user.id,
        (metrics) => setRealtimeMetrics(prev => [...prev.slice(-9), metrics]),
        (projects) => {
          // Update project data
          console.log('Projects updated:', projects);
        },
        (activity) => setActivityFeed(prev => [activity, ...prev.slice(0, 9)]),
        (team) => {
          // Update team data
          console.log('Team updated:', team);
        },
        (notification) => setNotifications(prev => [notification, ...prev.slice(0, 4)])
      );
    }

    // Check connection status
    const checkConnection = () => {
      setIsConnected(isWebSocketConnected());
    };
    checkConnection();
    const interval = setInterval(checkConnection, 5000);

    return () => {
      disconnectWebSocket();
      clearInterval(interval);
    };
  }, [user?.id]);
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b

  // Mock data for fallback
  const getMockStats = () => ({
    totalProjects: 12,
    activeProjects: 5,
    completedProjects: 7,
    totalRevenue: 245000,
    monthlyRevenue: 32500,
    activeUsers: 156,
    avgProjectCost: 20417,
    projectGrowth: 15.8,
    revenueGrowth: 23.4,
    timelineAccuracy: 89,
    budgetAccuracy: 94,
    recentActivity: [
      { id: 1, type: 'project_completed', message: 'E-commerce Platform project completed successfully', time: '2 hours ago', icon: FiCheckCircle, color: 'text-green-600' },
      { id: 2, type: 'new_estimate', message: 'New project estimate requested for Mobile App Development', time: '4 hours ago', icon: FiPlus, color: 'text-blue-600' },
      { id: 3, type: 'payment_received', message: 'Payment received for Web Development project', time: '1 day ago', icon: FiDollarSign, color: 'text-emerald-600' },
      { id: 4, type: 'milestone_reached', message: 'Design phase completed for SaaS Dashboard', time: '2 days ago', icon: FiTarget, color: 'text-purple-600' }
    ],
    upcomingDeadlines: [
      { id: 1, project: 'Mobile Banking App', deadline: '2024-02-15', daysLeft: 3, priority: 'high', status: 'on-track' },
      { id: 2, project: 'E-commerce Platform', deadline: '2024-02-20', daysLeft: 8, priority: 'medium', status: 'on-track' },
      { id: 3, project: 'CRM System', deadline: '2024-02-25', daysLeft: 13, priority: 'low', status: 'delayed' }
    ],
    performanceMetrics: [
      { name: 'On-time Delivery', value: 89, target: 95, status: 'good', icon: FiClock, color: 'text-blue-600' },
      { name: 'Budget Accuracy', value: 94, target: 90, status: 'excellent', icon: FiDollarSign, color: 'text-green-600' },
      { name: 'Client Satisfaction', value: 4.7, target: 4.5, status: 'excellent', icon: FiStar, color: 'text-yellow-600' },
      { name: 'Resource Utilization', value: 82, target: 85, status: 'warning', icon: FiActivity, color: 'text-orange-600' }
    ]
  });

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setTimeout(() => setRefreshing(false), 1000);
  };

<<<<<<< HEAD
  // Toggle live updates
  const toggleLiveUpdates = () => {
    setLiveUpdates(!liveUpdates);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value}%`;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'good': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'warning': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'danger': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'blue', formatter = (v) => v }) => (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
      role="region"
      aria-labelledby={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className={`inline-flex p-3 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 mb-4`}>
            <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1" id={`stat-${title.replace(/\s+/g, '-').toLowerCase()}`}>
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatter(value)}
          </p>
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <FiArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <FiArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  // WebSocket connection effect
  useEffect(() => {
    if (liveUpdates) {
      connectWebSocket();
      setIsConnected(isWebSocketConnected());
    } else {
      disconnectWebSocket();
      setIsConnected(false);
    }

    return () => {
      disconnectWebSocket();
    };
  }, [liveUpdates]);

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <FiRefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live Updates</span>
                  <button
                    onClick={toggleLiveUpdates}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      liveUpdates ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        liveUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <div className="flex">
                <FiAlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Error loading dashboard data
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Projects"
                value={stats.totalProjects}
                icon={FiBriefcase}
                trend="up"
                trendValue={`${stats.projectGrowth}%`}
                color="blue"
              />
              <StatCard
                title="Total Revenue"
                value={stats.totalRevenue}
                icon={FiDollarSign}
                trend="up"
                trendValue={`${stats.revenueGrowth}%`}
                color="green"
                formatter={formatCurrency}
              />
              <StatCard
                title="Active Projects"
                value={stats.activeProjects}
                icon={FiActivity}
                color="purple"
              />
              <StatCard
                title="Timeline Accuracy"
                value={stats.timelineAccuracy}
                icon={FiClock}
                color="orange"
                formatter={formatPercentage}
              />
            </div>
          )}

          {/* Recent Activity and Upcoming Deadlines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiActivity className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {stats?.recentActivity?.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${activity.color} bg-opacity-20`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white font-medium">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiCalendar className="w-5 h-5 mr-2 text-red-600" />
                Upcoming Deadlines
              </h2>
              <div className="space-y-4">
                {stats?.upcomingDeadlines?.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {deadline.project}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Due in {deadline.daysLeft} days
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                      {deadline.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          {stats?.performanceMetrics && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FiBarChart className="w-5 h-5 mr-2 text-green-600" />
                Performance Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.performanceMetrics.map((metric) => (
                  <div key={metric.name} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${getStatusColor(metric.status)}`}>
                      <metric.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {metric.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {metric.value}{metric.name.includes('Satisfaction') ? '/5' : '%'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Target: {metric.target}{metric.name.includes('Satisfaction') ? '/5' : '%'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
=======
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-slate-900 text-gray-100':'bg-white text-gray-800'}`}>
        <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold"
          >
            Your Estimation Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-300 mt-2"
          >
            View your project estimates and insights.
          </motion.p>
        </div>

        {/* Connection Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isConnected
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {isConnected ? <FaWifi className="text-green-600" /> : <FaExclamationTriangle className="text-red-600" />}
            {isConnected ? 'Realtime Connected' : 'Connection Lost'}
          </div>
        </motion.div>

        {estimate && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
                <h3 className="text-2xl font-bold text-indigo-600">${estimate.cost.toLocaleString()}</h3>
                <p className="text-gray-500">Estimated Cost</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
                <h3 className="text-2xl font-bold text-indigo-600">{estimate.time} weeks</h3>
                <p className="text-gray-500">Estimated Time</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow text-center">
                <h3 className="text-2xl font-bold text-indigo-600">{estimate.resources}</h3>
                <p className="text-gray-500">Resources Needed</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
                <h3 className="text-xl font-semibold mb-4">Cost Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={estimate.costBreakdown} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                      {estimate.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
                <h3 className="text-xl font-semibold mb-4">Phase Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={estimate.phaseTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="time" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow">
              <h3 className="text-xl font-semibold mb-4">ROI Projection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={estimate.roiProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="roi" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Realtime Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2">
                <RealtimeMetricsChart data={realtimeMetrics} />
              </div>
              <div className="space-y-6">
                <NotificationCenter notifications={notifications} />
                <RealtimeActivityFeed activities={activityFeed} />
              </div>
            </motion.div>

            {/* AI-Powered Personalized Suggestions */}
            <div className="grid md:grid-cols-2 gap-6">
              <PersonalizedSuggestions 
                userId={user?.id} 
                limit={3}
                className="md:col-span-1"
              />
              <SuggestionBox 
                context="dashboard" 
                maxSuggestions={3}
                className="md:col-span-1"
              />
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={exportPDF} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <FaDownload /> Export PDF
              </button>
              <Link to="/comparison" className="flex items-center gap-2 px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900">
                <FaBalanceScale /> Compare Competitors
              </Link>
            </div>
          </>
        )}
        </main>
>>>>>>> 2acc9a14a600b6d24041116ca1f1a14bb81ccf1b
      </div>
    </Layout>
  );
}
