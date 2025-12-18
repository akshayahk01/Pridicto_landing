import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
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
  const [estimate, setEstimate] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeMetrics, setRealtimeMetrics] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const est = localStorage.getItem('estimate');
    if (est) setEstimate(JSON.parse(est));
    else {
      // Mock data if no estimate
      setEstimate({
        cost: 50000,
        time: 12,
        resources: 5,
        costBreakdown: [
          { name: 'Development', value: 30000 },
          { name: 'Design', value: 10000 },
          { name: 'Testing', value: 5000 },
          { name: 'Deployment', value: 5000 }
        ],
        phaseTime: [
          { name: 'Planning', time: 2 },
          { name: 'Development', time: 6 },
          { name: 'Testing', time: 3 },
          { name: 'Deployment', time: 1 }
        ],
        roiProjection: [
          { month: 'M1', roi: 0 },
          { month: 'M2', roi: 10 },
          { month: 'M3', roi: 25 },
          { month: 'M4', roi: 40 },
          { month: 'M5', roi: 60 },
          { month: 'M6', roi: 80 }
        ]
      });
    }

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

  const exportPDF = () => {
    alert('PDF export functionality would be implemented here.');
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
  const { user } = useSelector((state) => state.auth);
  const dark = resolvedMode === 'dark';

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
      </div>
    </Layout>
  );
}
