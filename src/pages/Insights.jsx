import React, { useState, useMemo, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Filter, 
  ArrowRight, 
  Clock,
  User, 
  Bookmark, 
  Share2,
  Eye,
  TrendingUp,
  Sparkles,
  Zap,
  Star,
  BookOpen,
  ChevronDown,
  Play,
  Heart,
  MessageCircle,
  BookText,
  Target,
  Rocket,
  Lightbulb,
  Globe,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';

const articles = [
  { 
    id: 1, 
    title: 'How to Build an Investor-Winning Pitch Deck', 
    category: 'Pitch Deck', 
    date: '2023-10-01',
    readTime: '8 min read',
    author: 'Sarah Chen',
    excerpt: 'Learn the key components that make investors say yes to your startup pitch. Master the art of storytelling with data and vision.',
    featured: true,
    tags: ['Funding', 'Startup', 'Presentation'],
    views: '2.4K',
    likes: 89,
    premium: true,
    icon: Rocket,
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 2, 
    title: 'Market Research 101: Steps Before Launching a Product', 
    category: 'Market Research', 
    date: '2023-09-15',
    readTime: '12 min read',
    author: 'Mike Rodriguez',
    excerpt: 'Comprehensive guide to validating your product idea before market entry. Avoid costly mistakes with proper research.',
    featured: false,
    tags: ['Research', 'Validation', 'Product'],
    views: '1.8K',
    likes: 67,
    premium: false,
    icon: Target,
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    id: 3, 
    title: 'Financial Modelling for Startups — Simplified', 
    category: 'Financial Modelling', 
    date: '2023-08-20',
    readTime: '15 min read',
    author: 'Emily Watson',
    excerpt: 'Build financial models that accurately project your startup growth. From burn rate to revenue projections.',
    featured: true,
    tags: ['Finance', 'Metrics', 'Growth'],
    views: '3.1K',
    likes: 124,
    premium: true,
    icon: Database,
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    id: 4, 
    title: 'The Art of Customer Acquisition in 2024', 
    category: 'Growth', 
    date: '2023-11-05',
    readTime: '10 min read',
    author: 'Alex Thompson',
    excerpt: 'Modern strategies for acquiring customers in a competitive landscape. Leverage AI and automation effectively.',
    featured: false,
    tags: ['Marketing', 'Growth', 'Customers'],
    views: '2.2K',
    likes: 78,
    premium: false,
    icon: Globe,
    gradient: 'from-orange-500 to-red-500'
  },
  { 
    id: 5, 
    title: 'Building Remote-First Company Culture', 
    category: 'Culture', 
    date: '2023-10-28',
    readTime: '6 min read',
    author: 'Priya Patel',
    excerpt: 'Creating strong team bonds and productivity in distributed teams. Tools and practices that actually work.',
    featured: false,
    tags: ['Remote', 'Culture', 'Team'],
    views: '1.5K',
    likes: 56,
    premium: false,
    icon: Cpu,
    gradient: 'from-indigo-500 to-blue-500'
  },
  { 
    id: 6, 
    title: 'From MVP to Scale: Engineering Best Practices', 
    category: 'Engineering', 
    date: '2023-09-10',
    readTime: '14 min read',
    author: 'David Kim',
    excerpt: 'Technical architecture decisions that support rapid scaling. Learn from successful tech startups.',
    featured: true,
    tags: ['Engineering', 'Scale', 'MVP'],
    views: '2.9K',
    likes: 112,
    premium: true,
    icon: Cloud,
    gradient: 'from-cyan-500 to-blue-500'
  },
];

const categories = ['All', 'Pitch Deck', 'Market Research', 'Financial Modelling', 'Growth', 'Culture', 'Engineering'];

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [bookmarked, setBookmarked] = useState(new Set());
  const [liked, setLiked] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => {
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'readTime') return parseInt(a.readTime) - parseInt(b.readTime);
        if (sortBy === 'popular') return parseInt(b.views) - parseInt(a.views);
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const toggleBookmark = (articleId) => {
    const newBookmarked = new Set(bookmarked);
    if (newBookmarked.has(articleId)) {
      newBookmarked.delete(articleId);
    } else {
      newBookmarked.add(articleId);
    }
    setBookmarked(newBookmarked);
  };

  const toggleLike = (articleId) => {
    const newLiked = new Set(liked);
    if (newLiked.has(articleId)) {
      newLiked.delete(articleId);
    } else {
      newLiked.add(articleId);
    }
    setLiked(newLiked);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Advanced floating shapes with different types
  const floatingShapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    size: 4 + Math.random() * 8,
    type: Math.random() > 0.5 ? 'circle' : 'square',
    color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${0.03 + Math.random() * 0.07})`
  }));

  // Mouse follower gradient
  const gradientStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900/50 text-gray-800 dark:text-gray-100 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Mouse follower gradient */}
        <div className="absolute inset-0 transition-opacity duration-300" style={gradientStyle} />
        
        {/* Advanced floating shapes */}
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute opacity-0 ${shape.type === 'circle' ? 'rounded-full' : 'rounded-lg'}`}
            style={{
              top: `${shape.top}%`,
              left: `${shape.left}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: shape.type === 'square' ? [0, 90, 180] : 0,
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <Navbar />
      
      <main className="relative pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Hero Section with Enhanced Parallax */}
        <motion.section 
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="text-center mb-24 relative"
        >
          {/* Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          {/* Animated Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/20 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-2xl mb-8 shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-500 group"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Latest Insights & Trends
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-5 w-5 text-yellow-500" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 relative"
          >
            <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-700 dark:from-gray-100 dark:via-indigo-200 dark:to-purple-300 bg-clip-text text-transparent relative">
              Startup
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 blur-xl"
              />
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent relative">
              Insights
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl"
              />
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light"
          >
            Expert articles on startup growth, fundraising, and business strategy from{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              industry leaders
            </span>{' '}
            and successful founders worldwide.
          </motion.p>

          {/* Enhanced Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-12 text-center"
          >
            {[
              { number: '50+', label: 'Expert Articles', icon: BookText },
              { number: '25K+', label: 'Monthly Readers', icon: Eye },
              { number: '98%', label: 'Success Rate', icon: Target },
              { number: '500+', label: 'Startups Helped', icon: Rocket }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group relative"
              >
                <div className="relative p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-black/5 hover:shadow-indigo-500/10 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/50 rounded-2xl" />
                  <div className="relative">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400 group cursor-pointer"
            >
              <span className="text-sm mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                Discover Insights
              </span>
              <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center group-hover:border-indigo-500 transition-colors duration-300">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 group-hover:bg-indigo-500 transition-colors duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Enhanced Sticky Filter Bar */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`sticky top-24 z-40 mb-16 transition-all duration-500 ${
            isScrolled 
              ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/10 rounded-3xl border border-white/20 dark:border-slate-700/50' 
              : ''
          }`}
        >
          <div className={`p-8 ${isScrolled ? 'py-6' : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-3xl border border-white/20 dark:border-slate-700/50'}`}>
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Enhanced Search Bar */}
              <div className="relative flex-1 w-full lg:max-w-xl">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <motion.input
                  type="text"
                  placeholder="Search articles, tags, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-12 py-5 bg-gradient-to-r from-white to-gray-50/80 dark:from-slate-800 dark:to-slate-700/80 border-2 border-gray-100 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-500 shadow-2xl shadow-black/5 hover:shadow-indigo-500/10 font-medium text-lg"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.div
                  animate={{ scale: searchQuery ? 1 : 0, rotate: searchQuery ? 180 : 0 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                </motion.div>
              </div>

              {/* Enhanced Category Filter */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
                  <Filter className="text-white h-5 w-5" />
                </div>
                <div className="flex gap-3 max-w-md overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-100 dark:scrollbar-track-slate-700 pb-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-500 shadow-lg ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/50'
                          : 'bg-white/80 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-slate-600 shadow-black/5 hover:shadow-indigo-500/20 border border-white/50 dark:border-slate-600/50 backdrop-blur-sm'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Enhanced Sort Dropdown */}
              <div className="relative">
                <motion.select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  whileHover={{ scale: 1.02 }}
                  whileFocus={{ scale: 1.02 }}
                  className="appearance-none px-8 py-5 bg-gradient-to-r from-white to-gray-50/80 dark:from-slate-800 dark:to-slate-700/80 border-2 border-gray-100 dark:border-slate-600 rounded-2xl focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-500 shadow-2xl shadow-black/5 hover:shadow-indigo-500/10 font-medium text-lg pr-14 cursor-pointer"
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">🕰️ Oldest First</option>
                  <option value="readTime">⏱️ Reading Time</option>
                  <option value="popular">🔥 Most Popular</option>
                </motion.select>
                <ChevronDown className="absolute right-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Articles with Premium Design */}
        {filteredArticles.filter(article => article.featured).length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-24"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold mb-16 flex items-center gap-6"
            >
              <div className="relative">
                <div className="w-5 h-16 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-2xl shadow-indigo-500/50"></div>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full shadow-lg"
                />
              </div>
              <span className="bg-gradient-to-r from-gray-800 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent text-5xl">
                Featured Articles
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
              />
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-10">
              {filteredArticles.filter(article => article.featured).map((article, index) => {
                const IconComponent = article.icon;
                return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.8, type: "spring", stiffness: 80 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden border border-gray-100 dark:border-slate-700"
                >
                  {/* Premium Glow Effect */}
                  {article.premium && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/5 rounded-3xl" />
                  )}

                  {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:32px_32px]" />

                  {/* Article Icon */}
                  <div className="absolute top-8 left-8 z-10">
                    <div className={`p-4 bg-gradient-to-r ${article.gradient} rounded-2xl shadow-2xl`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {article.premium && (
                    <div className="absolute top-8 right-8 z-10">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-2xl shadow-yellow-500/25"
                      >
                        <Star className="h-4 w-4 fill-current" />
                        PREMIUM
                      </motion.div>
                    </div>
                  )}

                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/3 to-purple-600/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative p-10">
                    <div className="flex items-center justify-between mb-8">
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className="px-5 py-2.5 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm text-indigo-600 dark:text-indigo-300 text-sm font-bold rounded-2xl shadow-lg border border-white/50 dark:border-slate-600/50"
                      >
                        {article.category}
                      </motion.span>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleBookmark(article.id)}
                        className="p-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-slate-600/50"
                      >
                        <Bookmark 
                          className={`h-6 w-6 transition-all duration-300 ${
                            bookmarked.has(article.id) 
                              ? 'fill-indigo-600 text-indigo-600 scale-110' 
                              : 'text-gray-400 hover:text-indigo-500'
                          }`} 
                        />
                      </motion.button>
                    </div>

                    <h3 className="text-3xl font-bold mb-6 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-500">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                      {article.excerpt}
                    </p>

                    {/* Article Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-8">
                      <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5" />
                          <span className="font-semibold">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5" />
                          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Engagement Metrics */}
                    <div className="flex items-center gap-8 mb-8">
                      <div className="flex items-center gap-3 text-sm">
                        <Eye className="h-5 w-5 text-blue-500" />
                        <span className="font-semibold">{article.views}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(article.id)}
                        className="flex items-center gap-3 text-sm"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-all duration-300 ${
                            liked.has(article.id) 
                              ? 'fill-red-500 text-red-500 scale-110' 
                              : 'text-gray-400 hover:text-red-500'
                          }`} 
                        />
                        <span className="font-semibold">{article.likes}</span>
                      </motion.button>
                      <div className="flex items-center gap-3 text-sm">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                        <span className="font-semibold">{Math.floor(article.likes / 3)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 flex-wrap">
                        {article.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl shadow-md border border-white/50 dark:border-slate-600/50"
                          >
                            #{tag}
                          </motion.span>
                        ))}
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group/btn"
                      >
                        <BookOpen className="h-5 w-5" />
                        Read More
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              )})}
            </div>
          </motion.section>
        )}

        {/* All Articles Grid with Premium Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-16 flex items-center gap-6"
          >
            <div className="w-5 h-16 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-2xl shadow-indigo-500/50"></div>
            <span className="bg-gradient-to-r from-gray-800 to-indigo-600 dark:from-gray-100 dark:to-indigo-400 bg-clip-text text-transparent text-5xl">
              All Articles <span className="text-3xl text-gray-400 dark:text-gray-500">({filteredArticles.length})</span>
            </span>
          </motion.h2>
          
          <AnimatePresence mode="wait">
            {filteredArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-24"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600 rounded-3xl flex items-center justify-center shadow-2xl"
                >
                  <Search className="h-16 w-16 text-gray-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-500 dark:text-gray-400 mb-4">No articles found</h3>
                <p className="text-xl text-gray-400 dark:text-gray-500 max-w-md mx-auto">
                  Try adjusting your search criteria or browse different categories
                </p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
                layout
              >
                {filteredArticles.map((article, index) => {
                  const IconComponent = article.icon;
                  return (
                  <motion.article
                    key={article.id}
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -20, scale: 1.03 }}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden border border-gray-100 dark:border-slate-700"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Article Icon */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className={`p-3 bg-gradient-to-r ${article.gradient} rounded-xl shadow-lg`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Premium Indicator */}
                    {article.premium && (
                      <div className="absolute top-6 right-6 z-10">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg"
                        >
                          <Star className="h-4 w-4 text-white fill-current" />
                        </motion.div>
                      </div>
                    )}

                    <div className="relative p-8">
                      <div className="flex items-center justify-between mb-6">
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm text-indigo-600 dark:text-indigo-300 text-xs font-bold rounded-xl shadow-md border border-white/50 dark:border-slate-600/50"
                        >
                          {article.category}
                        </motion.span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleBookmark(article.id)}
                            className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-all duration-300"
                          >
                            <Bookmark 
                              className={`h-4 w-4 transition-all duration-300 ${
                                bookmarked.has(article.id) 
                                  ? 'fill-indigo-600 text-indigo-600 scale-110' 
                                  : 'text-gray-400 hover:text-indigo-500'
                              }`} 
                            />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl transition-all duration-300"
                          >
                            <Share2 className="h-4 w-4 text-gray-400 hover:text-indigo-500" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-xl mb-4 leading-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-500">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Article Metadata */}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">{article.author}</span>
                          <span>•</span>
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      {/* Enhanced Engagement */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold">{article.views}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleLike(article.id)}
                            className="flex items-center gap-2"
                          >
                            <Heart 
                              className={`h-4 w-4 transition-all duration-300 ${
                                liked.has(article.id) 
                                  ? 'fill-red-500 text-red-500 scale-110' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`} 
                            />
                            <span className="font-semibold">{article.likes}</span>
                          </motion.button>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05, x: 2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group/read"
                        >
                          Read
                          <ArrowRight className="h-4 w-4 group-hover/read:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                )})}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-24 mb-16"
        >
          <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            </div>
            
            <div className="relative p-12 text-center">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-4"
              >
                Stay Updated
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              >
                Get the latest startup insights and growth strategies delivered to your inbox weekly.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}