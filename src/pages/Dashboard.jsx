import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { FaDownload, FaBalanceScale, FaWifi, FaExclamationTriangle, FaUsers, FaChartLine, FaProjectDiagram, FaBell, FaCog, FaExpand, FaCompress } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SuggestionBox from '../components/SuggestionBox';
import PersonalizedSuggestions from '../components/PersonalizedSuggestions';
import RealtimeMetricsChart from '../components/RealtimeMetricsChart';
import RealtimeActivityFeed from '../components/RealtimeActivityFeed';
import NotificationCenter from '../components/NotificationCenter';
import { useSelector } from 'react-redux';
import { connectWebSocket, disconnectWebSocket, isWebSocketConnected } from '../services/websocket';
import useApi from '../hooks/useApi';

export default function Dashboard() {

  // 🔥 user MUST be declared first
  const { user } = useSelector((state) => state.auth);

  // 🌙 Safe dark mode fallback
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const { get, post } = useApi();
  const [estimate, setEstimate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeMetrics, setRealtimeMetrics] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [liveUpdates, setLiveUpdates] = useState(true);

  // Enhanced data fetching
  const fetchDashboardData = useCallback(async () => {
    try {
      const [analytics, dashboard] = await Promise.all([
        get('/api/analytics/dashboard'),
        get('/api/dashboard/metrics')
      ]);
      
      setAnalyticsData(analytics);
      setAdminData(dashboard);
      
      // Enhanced estimate data with real backend data
      const enhancedEstimate = {
        cost: dashboard?.totalRevenue || 50000,
        time: dashboard?.averageProjectTime || 12,
        resources: dashboard?.activeProjects || 5,
        costBreakdown: dashboard?.revenueBreakdown || [
          { name: 'Development', value: 30000 },
          { name: 'Design', value: 10000 },
          { name: 'Testing', value: 5000 },
          { name: 'Deployment', value: 5000 }
        ],
        phaseTime: dashboard?.projectPhases || [
          { name: 'Planning', time: 2 },
          { name: 'Development', time: 6 },
          { name: 'Testing', time: 3 },
          { name: 'Deployment', time: 1 }
        ],
        roiProjection: dashboard?.roiData || [
          { month: 'M1', roi: 0 },
          { month: 'M2', roi: 10 },
          { month: 'M3', roi: 25 },
          { month: 'M4', roi: 40 },
          { month: 'M5', roi: 60 },
          { month: 'M6', roi: 80 }
        ]
      };
      
      setEstimate(enhancedEstimate);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Fallback to localStorage
      const est = localStorage.getItem('estimate');
      if (est) setEstimate(JSON.parse(est));
    }
  }, [get]);

  const refreshData = useCallback(async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setTimeout(() => setRefreshing(false), 1000);
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();

    // Realtime features only when user exists
    if (user?.id) {
      connectWebSocket(
        user.id,
        (metrics) => {
          if (liveUpdates) {
            setRealtimeMetrics(prev => [...prev.slice(-9), metrics]);
          }
        },
        () => {},
        (activity) => {
          if (liveUpdates) {
            setActivityFeed(prev => [activity, ...prev.slice(0, 9)]);
          }
        },
        () => {},
        (notification) => {
          if (liveUpdates) {
            setNotifications(prev => [notification, ...prev.slice(0, 4)]);
          }
        }
      );
    }

    const checkConnection = () => setIsConnected(isWebSocketConnected());
    checkConnection();
    const interval = setInterval(checkConnection, 5000);

    return () => {
      disconnectWebSocket();
      clearInterval(interval);
    };
  }, [user?.id, fetchDashboardData, liveUpdates]);

  const exportPDF = () => {
    alert('PDF export functionality would be implemented here.');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleLiveUpdates = () => {
    setLiveUpdates(!liveUpdates);
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <Layout>
      <motion.div
        className={`min-h-screen transition-all duration-500 ${
          dark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 space-y-12">

          {/* Enhanced Header with Controls */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.h1
                className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Admin Dashboard
              </motion.h1>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.button
                  onClick={refreshData}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    dark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-50'
                  } shadow-lg border border-gray-200 border-gray-600`}
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  animate={refreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                >
                  <FaCog className="w-5 h-5 text-indigo-600" />
                </motion.button>
                
                <motion.button
                  onClick={toggleFullscreen}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    dark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-50'
                  } shadow-lg border border-gray-200 border-gray-600`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFullscreen ? <FaCompress className="w-5 h-5 text-purple-600" /> : <FaExpand className="w-5 h-5 text-purple-600" />}
                </motion.button>
                
                <motion.button
                  onClick={toggleLiveUpdates}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    liveUpdates ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  } shadow-lg border border-gray-200 border-gray-600`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-current rounded-full"
                    animate={liveUpdates ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.button>
              </motion.div>
            </div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Real-time insights and analytics for your projects
            </motion.p>
          </motion.div>

          {/* Enhanced Connection Status with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.div
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-medium shadow-lg border ${
                isConnected
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:text-green-200 dark:border-green-800'
                  : 'bg-gradient-to-r from-red-50 to-pink-50 text-red-800 border-red-200 dark:from-red-900/20 dark:to-pink-900/20 dark:text-red-200 dark:border-red-800'
              }`}
              whileHover={{ scale: 1.02 }}
              animate={isConnected ? { boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 20px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(34, 197, 94, 0)'] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isConnected ? (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <FaWifi className="text-green-600" />
                  <span>Realtime Connected</span>
                  <motion.div
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    LIVE
                  </motion.div>
                </motion.div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-600" />
                  <span>Connection Lost</span>
                  <motion.button
                    onClick={() => window.location.reload()}
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded-full hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Retry
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>

          {estimate && (
            <>
          {/* Time Range Selector */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-2 p-1 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              {['24h', '7d', '30d', '90d'].map((range) => (
                <motion.button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedTimeRange === range
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {range}
                </motion.button>
              ))}
            </div>
          </motion.div>
          {/* Enhanced KPI Cards with Advanced Animations */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: 'Total Revenue',
                value: `${estimate?.cost?.toLocaleString() || '50,000'}`,
                icon: FaChartLine,
                color: 'from-blue-500 to-indigo-600',
                bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
                textColor: 'text-blue-600 dark:text-blue-400',
                change: '+12.5%'
              },
              {
                title: 'Active Projects',
                value: estimate?.resources || '5',
                icon: FaProjectDiagram,
                color: 'from-green-500 to-emerald-600',
                bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
                textColor: 'text-green-600 dark:text-green-400',
                change: '+2 new'
              },
              {
                title: 'Team Members',
                value: adminData?.teamSize || '24',
                icon: FaUsers,
                color: 'from-purple-500 to-violet-600',
                bgColor: 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
                textColor: 'text-purple-600 dark:text-purple-400',
                change: '+3 this week'
              },
              {
                title: 'Completion Rate',
                value: '94%',
                icon: FaBell,
                color: 'from-orange-500 to-red-600',
                bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
                textColor: 'text-orange-600 dark:text-orange-400',
                change: '+5.2%'
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                className={`p-6 rounded-2xl bg-gradient-to-br ${card.bgColor} shadow-xl border border-white/20 dark:border-gray-700/50 backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + 0.1 * index }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className={`text-xs font-bold px-3 py-1 rounded-full ${card.textColor} bg-white/50 dark:bg-gray-800/50`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + 0.1 * index, type: "spring" }}
                  >
                    {card.change}
                  </motion.div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + 0.1 * index }}
                >
                  <motion.h3 
                    className={`text-3xl font-bold ${card.textColor} mb-1`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + 0.1 * index, type: "spring", stiffness: 200 }}
                  >
                    {card.value}
                  </motion.h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {card.title}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

              {/* Enhanced Charts with Animations */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Enhanced Pie Chart */}
                <motion.div 
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cost Breakdown</h3>
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={estimate.costBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {estimate.costBreakdown.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444'][index % 4]}
                            style={{
                              filter: 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.1))'
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: dark ? '#1e293b' : '#ffffff',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Enhanced Bar Chart */}
                <motion.div 
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Phase Timeline</h3>
                    <motion.div 
                      className="w-3 h-3 bg-blue-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={estimate.phaseTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: dark ? '#94a3b8' : '#64748b' }}
                        axisLine={{ stroke: dark ? '#475569' : '#cbd5e1' }}
                      />
                      <YAxis 
                        tick={{ fill: dark ? '#94a3b8' : '#64748b' }}
                        axisLine={{ stroke: dark ? '#475569' : '#cbd5e1' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: dark ? '#1e293b' : '#ffffff',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="time" 
                        fill="#6366f1"
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Enhanced Area Chart */}
                <motion.div 
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Performance Trends</h3>
                    <motion.div 
                      className="w-3 h-3 bg-purple-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={estimate.roiProjection}>
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: dark ? '#94a3b8' : '#64748b' }}
                        axisLine={{ stroke: dark ? '#475569' : '#cbd5e1' }}
                      />
                      <YAxis 
                        tick={{ fill: dark ? '#94a3b8' : '#64748b' }}
                        axisLine={{ stroke: dark ? '#475569' : '#cbd5e1' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: dark ? '#1e293b' : '#ffffff',
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="roi"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorGradient)"
                        strokeWidth={3}
                        animationDuration={1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>

              {/* ROI */}
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

              {/* Realtime */}
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

              {/* AI Suggestions */}
              <div className="grid md:grid-cols-2 gap-6">
                <PersonalizedSuggestions userId={user?.id} limit={3} />
                <SuggestionBox context="dashboard" maxSuggestions={3} />
              </div>

              {/* Enhanced Action Buttons */}
              <motion.div 
                className="flex gap-6 justify-center flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.button
                  onClick={exportPDF}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <FaDownload className="w-5 h-5" />
                  </motion.div>
                  Export Report
                </motion.button>

                <Link to="/comparison">
                  <motion.div
                    className="flex items-center gap-3 px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 rounded-2xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaBalanceScale className="w-5 h-5" />
                    Compare Analytics
                  </motion.div>
                </Link>

                <motion.div
                  onClick={() => window.open('/admin/settings', '_blank')}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCog className="w-5 h-5" />
                  Admin Settings
                </motion.div>
              </motion.div>
            </>
          )}
        </main>
      </motion.div>
    </Layout>
  );
}
