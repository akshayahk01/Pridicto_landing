import React, { useState, useEffect } from 'react';
import { FiMoon, FiSun, FiSearch, FiMenu, FiX, FiHome, FiInfo, FiBriefcase, FiFolder, FiTrendingUp, FiHelpCircle, FiMail, FiUser, FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function VerticalNavbar({ dark: propDark, setDark: propSetDark, isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [localDark, setLocalDark] = useState(propDark ?? false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('predicto_theme');
      if (saved) {
        const isDark = saved === 'dark';
        if (typeof propSetDark === 'function') {
          propSetDark(isDark);
        } else {
          setLocalDark(isDark);
        }
      }
    } catch (e) {
      // ignore localStorage errors in restricted environments
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dark = propDark ?? localDark;
  const setDark = typeof propSetDark === 'function' ? propSetDark : setLocalDark;

  const toggleTheme = () => {
    const newDark = !dark;
    try {
      localStorage.setItem('predicto_theme', newDark ? 'dark' : 'light');
    } catch (e) {
      /* ignore */
    }
    setDark(newDark);
  };

  const navItems = [
    { to: '/', label: 'Home', icon: FiHome },
    { to: '/about', label: 'About', icon: FiInfo },
    { to: '/services', label: 'Services', icon: FiBriefcase },
    { to: '/estimate', label: 'Estimate', icon: FiTrendingUp },
    { to: '/portfolio', label: 'Portfolio', icon: FiFolder },
    { to: '/insights', label: 'Insights', icon: FiTrendingUp },
    { to: '/global-presence', label: 'Global', icon: FiTrendingUp },
    { to: '/faq', label: 'FAQ', icon: FiHelpCircle },
    { to: '/contact', label: 'Contact', icon: FiMail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 h-full z-40 backdrop-blur-md transition-all duration-500 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white/95 dark:bg-slate-900/95 border-r border-gray-200/50 dark:border-slate-700/50 shadow-2xl shadow-indigo-500/10 dark:shadow-slate-900/50`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <Link to="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300 transform group-hover:scale-105">
                    P
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">Predicto</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Smart AI Estimator</p>
                  </div>
                </Link>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-teal-50 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-110 hover:rotate-180"
                aria-label="Toggle sidebar"
              >
                {isCollapsed ? <FiMenu className="w-5 h-5 transition-transform duration-300" /> : <FiX className="w-5 h-5 transition-transform duration-300" />}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 dark:scrollbar-thumb-indigo-600 scrollbar-track-transparent">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive(to)
                    ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/20 border border-indigo-200 dark:border-indigo-700'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 dark:hover:from-slate-700 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
                title={isCollapsed ? label : ''}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive(to) ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:rotate-12'}`} />
                {!isCollapsed && <span className="font-medium transition-all duration-300 group-hover:translate-x-1">{label}</span>}
              </Link>
            ))}
            {user && (
              <Link
                to="/dashboard"
                className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive('/dashboard')
                    ? 'bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/20 border border-indigo-200 dark:border-indigo-700'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 dark:hover:from-slate-700 dark:hover:to-slate-600 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
                title={isCollapsed ? 'Dashboard' : ''}
              >
                <FiUser className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive('/dashboard') ? 'text-indigo-600 dark:text-indigo-400' : 'group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:rotate-12'}`} />
                {!isCollapsed && <span className="font-medium transition-all duration-300 group-hover:translate-x-1">Dashboard</span>}
              </Link>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-slate-700/50 space-y-3">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                isCollapsed ? 'justify-center' : ''
              }`}
              aria-label="Open search"
              title={isCollapsed ? 'Search' : ''}
            >
              <FiSearch className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:rotate-12" />
              {!isCollapsed && <span className="font-medium transition-all duration-300 group-hover:translate-x-1">Search</span>}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                isCollapsed ? 'justify-center' : ''
              }`}
              aria-label="Toggle theme"
              title={isCollapsed ? 'Toggle theme' : ''}
            >
              {dark ? <FiSun className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 group-hover:rotate-12" /> : <FiMoon className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:rotate-12" />}
              {!isCollapsed && <span className="font-medium transition-all duration-300 group-hover:translate-x-1">Theme</span>}
            </button>

            {/* User Actions */}
            {user ? (
              <div className="space-y-3">
                {!isCollapsed && (
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    {user.email}
                  </div>
                )}
                <button
                  onClick={logout}
                  className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 text-red-600 dark:text-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                    isCollapsed ? 'justify-center' : ''
                  }`}
                  title={isCollapsed ? 'Logout' : ''}
                >
                  <FiLogOut className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:rotate-12" />
                  {!isCollapsed && <span className="font-medium transition-all duration-300 group-hover:translate-x-1">Logout</span>}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`group flex items-center gap-3 px-4 py-3 mx-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-indigo-500/25 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
                title={isCollapsed ? 'Login' : ''}
              >
                <FiUser className="w-5 h-5 flex-shrink-0 transition-all duration-300 group-hover:rotate-12" />
                {!isCollapsed && <span className="font-medium transition-all duration-300 group-hover:translate-x-1">Login</span>}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
