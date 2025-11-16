import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

export default function Navbar({ dark: propDark, setDark: propSetDark }) {
  const { user, logout } = useAuth();
  const [localDark, setLocalDark] = useState(propDark ?? false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold shadow">
              P
            </div>
            <div>
              <h1 className="font-semibold text-lg">Predicto</h1>
              <p className="text-xs text-gray-500 dark:text-gray-300">Smart AI Estimator</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/home" className="hover:text-indigo-500 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-indigo-500 transition-colors">About</Link>
            <Link to="/services" className="hover:text-indigo-500 transition-colors">Services</Link>
            <Link to="/portfolio" className="hover:text-indigo-500 transition-colors">Portfolio</Link>
            <Link to="/insights" className="hover:text-indigo-500 transition-colors">Insights</Link>
            <Link to="/faq" className="hover:text-indigo-500 transition-colors">FAQ</Link>
            {user && <Link to="/dashboard" className="hover:text-indigo-500 transition-colors">Dashboard</Link>}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Open search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* User actions */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">{user.email}</span>
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 shadow-lg z-50">
            <div className="px-6 py-4 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
              <Link to="/home" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>Home</Link>
              <Link to="/about" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>About</Link>
              <Link to="/services" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>Services</Link>
              <Link to="/portfolio" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>Portfolio</Link>
              <Link to="/insights" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>Insights</Link>
              <Link to="/faq" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>FAQ</Link>
              <Link to="/contact" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>Contact</Link>
              {user && <Link to="/dashboard" className="block py-2 hover:text-indigo-500 transition-colors" onClick={closeMobileMenu}>Dashboard</Link>}

              <div className="pt-3 border-t border-gray-200 dark:border-slate-700">
                {user ? (
                  <div className="space-y-2">
                    <span className="block text-sm text-gray-700 dark:text-gray-300">{user.email}</span>
                    <button
                      onClick={() => { logout(); closeMobileMenu(); }}
                      className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
