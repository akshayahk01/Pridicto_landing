import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
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
  }, [get]);

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
