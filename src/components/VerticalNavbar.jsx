import React, { useState } from 'react';
import {
  FiMoon,
  FiSun,
  FiSearch,
  FiMenu,
  FiX,
  FiHome,
  FiInfo,
  FiBriefcase,
  FiFolder,
  FiTrendingUp,
  FiHelpCircle,
  FiMail,
  FiUser,
  FiLogOut,
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

export default function VerticalNavbar({ isCollapsed, setIsCollapsed }) {
  const { user, logout } = useAuth();
  const { resolvedMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dark = resolvedMode === 'dark';

  const navItems = [
    { to: '/home', label: 'Home', icon: FiHome },
    { to: '/about', label: 'About', icon: FiInfo },
    { to: '/services', label: 'Services', icon: FiBriefcase },
    { to: '/estimate', label: 'Estimate', icon: FiTrendingUp },
    { to: '/portfolio', label: 'Portfolio', icon: FiFolder },
    { to: '/insights', label: 'Insights', icon: FiTrendingUp },
    { to: '/global-presence', label: 'Global', icon: FiTrendingUp },
    { to: '/faq', label: 'FAQ', icon: FiHelpCircle },
    { to: '/contact', label: 'Contact', icon: FiMail },
  ];

  // ---------- DROPDOWN MENUS ----------
  const dropdownMenus = {
    "/services": [
      { name: "Web Development", path: "/services/web" },
      { name: "Mobile App Development", path: "/services/mobile" },
      { name: "Cloud & DevOps", path: "/services/cloud" },
      { name: "AI / ML Solutions", path: "/services/ai" },
    ],
    "/portfolio": [
      { name: "Web Projects", path: "/portfolio/web" },
      { name: "Mobile Apps", path: "/portfolio/mobile" },
      { name: "Enterprise Solutions", path: "/portfolio/enterprise" },
    ],
    "/insights": [
      { name: "Case Studies", path: "/insights/case-studies" },
      { name: "Blogs", path: "/insights/blogs" },
      { name: "Industry Reports", path: "/insights/reports" },
    ],
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 left-0 w-40 -z-10">
        <div className="absolute inset-y-10 left-[-80px] w-[220px] rounded-full bg-gradient-to-b from-indigo-400/30 via-purple-400/20 to-teal-300/20 blur-3xl" />
      </div>

      <nav
        className={`fixed top-0 left-0 h-full z-40 transition-[width,background,color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          isCollapsed ? 'w-16' : 'w-68 max-w-[272px]'
        } bg-white/90 dark:bg-slate-950/90 border-r border-gray-200/60 dark:border-slate-800/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.45)]`}
      >
        <div className="relative h-full">
          <div className="pointer-events-none absolute inset-0 rounded-r-3xl border border-white/40 dark:border-white/10 opacity-60" />
          <div className="pointer-events-none absolute inset-y-0 right-[-1px] w-px bg-gradient-to-b from-indigo-400 via-purple-400 to-teal-300 opacity-80" />

          <div className="relative flex flex-col h-full">

            {/* ---------- HEADER ---------- */}
            <div className="px-3 pt-4 pb-3 border-b border-gray-200/60 dark:border-slate-800/70">
              <div className="flex items-center justify-between">
                {!isCollapsed && (
                  <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                      <img
                        src="/assets/logo (2).png"
                        alt="Predicto Logo"
                        className="w-10 h-10 rounded-2xl shadow-xl shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300"
                      />
                      <div className="pointer-events-none absolute inset-[-3px] rounded-3xl bg-[conic-gradient(at_50%_50%,rgba(59,130,246,0.2),transparent,rgba(16,185,129,0.25),transparent)] opacity-0 group-hover:opacity-100 animate-[spin_8s_linear_infinite]" />
                    </div>
                    <div>
                      <h1 className="font-semibold text-lg bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                        Predicto
                      </h1>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        AI estimation studio
                      </p>
                    </div>
                  </Link>
                )}

                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="relative inline-flex items-center justify-center w-9 h-9 rounded-2xl border border-gray-200/70 dark:border-slate-700 bg-white/60 dark:bg-slate-900/80 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all"
                >
                  {isCollapsed ? <FiMenu /> : <FiX />}
                </button>
              </div>
            </div>

            {/* ---------- NAV ITEMS + DROPDOWN ---------- */}
            <div className="flex-1 py-4 space-y-2 overflow-y-auto">
              {navItems.map(({ to, label, icon: Icon }) => {
                const active = isActive(to);
                const hasDropdown = dropdownMenus[to];

                return (
                  <div key={to} className="relative group">
                    <Link
                      to={to}
                      className={`relative mx-2 ${
                        isCollapsed ? 'justify-center' : ''
                      } flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all`}
                      title={isCollapsed ? label : ''}
                    >
                      <div
                        className={`absolute left-2 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-full bg-gradient-to-b from-indigo-400 to-teal-300 ${
                          active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                        }`}
                      />

                      <div
                        className={`absolute inset-0 rounded-2xl ${
                          active
                            ? 'bg-gradient-to-r from-indigo-500/12 via-purple-500/10 to-teal-400/10 border border-indigo-300/60 shadow-[0_0_25px_rgba(79,70,229,0.35)]'
                            : 'border border-transparent hover:border-indigo-100/70 hover:bg-slate-50/80 dark:hover:bg-slate-900/90'
                        }`}
                      />

                      <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-gray-100/80 shadow-sm group-hover:shadow-indigo-500/20">
                        <Icon
                          className={`w-4.5 h-4.5 ${
                            active
                              ? 'text-indigo-600'
                              : 'text-gray-500 group-hover:text-indigo-500 group-hover:-rotate-6'
                          }`}
                        />
                      </div>

                      {!isCollapsed && (
                        <span
                          className={`relative text-sm font-medium ${
                            active ? 'text-slate-900 dark:text-white' : 'text-gray-600'
                          }`}
                        >
                          {label}
                        </span>
                      )}
                    </Link>

                    {/* ---------- DROPDOWN MENU ---------- */}
                    {hasDropdown && (
                      <div
                        className="
                          invisible opacity-0 group-hover:visible group-hover:opacity-100 
                          transition-all duration-300 
                          absolute top-0 left-full ml-3 
                          w-64 p-4 rounded-2xl 
                          bg-white/95 dark:bg-slate-900/95 
                          border border-gray-200/70 dark:border-slate-700/60
                          shadow-2xl backdrop-blur-xl
                        "
                      >
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          {label}
                        </h3>

                        <div className="space-y-2">
                          {dropdownMenus[to].map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="
                                flex items-center justify-between 
                                px-3 py-2 rounded-xl text-sm
                                bg-slate-50/70 dark:bg-slate-800/60
                                hover:bg-indigo-600 hover:text-white
                                transition-all
                              "
                            >
                              {item.name}
                              <span>›</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {user && (
                <Link to="/dashboard" className="mx-2 flex gap-3 items-center">
                  <FiUser />
                  {!isCollapsed && <span>Dashboard</span>}
                </Link>
              )}
            </div>

            {/* ---------- BOTTOM ACTIONS ---------- */}
            <div className="px-3 pb-4 pt-3 border-t">
              <button onClick={() => setIsSearchOpen(true)} className="w-full flex gap-3">
                <FiSearch />
                {!isCollapsed && <span>Search</span>}
              </button>

              <button onClick={toggleTheme} className="w-full flex gap-3 mt-2">
                {dark ? <FiSun /> : <FiMoon />}
                {!isCollapsed && <span>Theme</span>}
              </button>
              {user ? (
                <button onClick={logout} className="w-full flex gap-3 mt-2 text-red-600">
                  <FiLogOut />
                  {!isCollapsed && <span>Logout</span>}
                </button>
              ) : (
                <Link to="/login" className="w-full flex gap-3 mt-2">
                  <FiUser />
                  {!isCollapsed && <span>Login</span>}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
