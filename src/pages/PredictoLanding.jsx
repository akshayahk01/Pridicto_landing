import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Brain, TrendingUp, Clock, BarChart3, CheckCircle, Users, Layers, LineChart, Zap, ArrowRight, Star, ChevronDown, Menu, X, Play, Shield, Globe, Code2, Database, Cloud, Smartphone, Rocket, Target, Sparkles, Award, ShieldCheck, Zap as Lightning, Gem, Crown, SparkleIcon, Infinity, Cpu, GitBranch, Workflow } from "lucide-react";

export default function PredictoLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      if (sectionRef.current) {
        const elementTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(2deg); }
      66% { transform: translateY(-10px) rotate(-1deg); }
    }
    
    @keyframes glow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3),
                   0 0 40px rgba(59, 130, 246, 0.2),
                   0 0 60px rgba(168, 85, 247, 0.1);
      }
      50% { 
        box-shadow: 0 0 40px rgba(34, 197, 94, 0.6),
                   0 0 60px rgba(59, 130, 246, 0.4),
                   0 0 80px rgba(168, 85, 247, 0.2);
      }
    }
    
    @keyframes slideInUp {
      from { 
        opacity: 0;
        transform: translateY(50px) scale(0.95);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
      }
      50% { 
        transform: scale(1.05);
        box-shadow: 0 0 40px rgba(34, 197, 94, 0.8);
      }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    
    @keyframes rainbow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes morph {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    }
    
    @keyframes wave {
      0% { transform: translateX(0); }
      50% { transform: translateX(-10px); }
      100% { transform: translateX(0); }
    }
    
    @keyframes rotate3d {
      0% { transform: rotateY(0deg) rotateX(0deg); }
      50% { transform: rotateY(10deg) rotateX(5deg); }
      100% { transform: rotateY(0deg) rotateX(0deg); }
    }
    
    @keyframes neonPulse {
      0%, 100% { 
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de;
      }
      50% { 
        text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff00de, 0 0 40px #ff00de;
      }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-glow {
      animation: glow 3s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    .animate-slide-in-up {
      animation: slideInUp 0.8s ease-out forwards;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
    
    .animate-gradient {
      animation: gradientShift 8s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-sparkle {
      animation: sparkle 2s ease-in-out infinite;
    }
    
    .animate-rainbow {
      animation: rainbow 4s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-morph {
      animation: morph 8s ease-in-out infinite;
    }
    
    .animate-wave {
      animation: wave 3s ease-in-out infinite;
    }
    
    .animate-rotate3d {
      animation: rotate3d 6s ease-in-out infinite;
    }
    
    .animate-neon-pulse {
      animation: neonPulse 2s ease-in-out infinite;
    }
    
    .bg-grid-slate-200 {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.02)'%3e%3cpath d='m0 0h32v32h-32z'/%3e%3c/svg%3e");
    }
    
    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .text-gradient {
      background: linear-gradient(135deg, 
        #10b981 0%, 
        #22d3ee 20%, 
        #3b82f6 40%, 
        #8b5cf6 60%, 
        #ec4899 80%, 
        #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
      animation: gradientShift 3s ease infinite;
    }
    
    .text-rainbow {
      background: linear-gradient(135deg, 
        #ff6b6b 0%, 
        #ffa726 16.67%, 
        #ffee58 33.33%, 
        #66bb6a 50%, 
        #42a5f5 66.67%, 
        #ab47bc 83.33%, 
        #ff6b6b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 200%;
      animation: rainbow 4s ease infinite;
    }
    
    .text-neon {
      color: #ffffff;
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00de, 0 0 20px #ff00de;
    }
    
    .hover-lift {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .hover-lift:hover {
      transform: translateY(-8px);
    }
    
    .bg-multicolor-gradient {
      background: linear-gradient(135deg, 
        rgba(16, 185, 129, 0.15) 0%, 
        rgba(34, 211, 238, 0.15) 20%, 
        rgba(59, 130, 246, 0.15) 40%, 
        rgba(139, 92, 246, 0.15) 60%, 
        rgba(236, 72, 153, 0.15) 80%, 
        rgba(245, 158, 11, 0.15) 100%);
      background-size: 200% 200%;
      animation: gradientShift 12s ease infinite;
    }
    
    .bg-rainbow-gradient {
      background: linear-gradient(135deg, 
        rgba(255, 107, 107, 0.1) 0%, 
        rgba(255, 167, 38, 0.1) 16.67%, 
        rgba(255, 238, 88, 0.1) 33.33%, 
        rgba(102, 187, 106, 0.1) 50%, 
        rgba(66, 165, 245, 0.1) 66.67%, 
        rgba(171, 71, 188, 0.1) 83.33%, 
        rgba(255, 107, 107, 0.1) 100%);
      background-size: 200% 200%;
      animation: rainbow 8s ease infinite;
    }
    
    .bg-cosmic-gradient {
      background: linear-gradient(135deg, 
        #667eea 0%, 
        #764ba2 25%, 
        #f093fb 50%, 
        #f5576c 75%, 
        #4facfe 100%);
      background-size: 200% 200%;
      animation: gradientShift 6s ease infinite;
    }
    
    .shimmer-effect {
      position: relative;
      overflow: hidden;
    }
    
    .shimmer-effect::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shimmer 2s infinite;
    }
    
    .perspective-1000 {
      perspective: 1000px;
    }
    
    .transform-style-3d {
      transform-style: preserve-3d;
    }
    
    .backface-hidden {
      backface-visibility: hidden;
    }
    
    .gradient-border {
      position: relative;
      background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe);
      padding: 2px;
      border-radius: 20px;
    }
    
    .gradient-border::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 20px;
      padding: 2px;
      background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
    }
  `;

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "AI Cost Analysis",
      desc: "Machine learning algorithms analyze 1,000+ projects for precise cost estimation",
      gradient: "from-emerald-500 to-cyan-500",
      points: ["Real-time cost tracking", "Budget optimization", "Risk assessment"],
      color: "emerald"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Analytics",
      desc: "Live dashboard with predictive insights and trend analysis",
      gradient: "from-blue-500 to-indigo-500",
      points: ["Live metrics", "Trend analysis", "Performance insights"],
      color: "blue"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      desc: "Real-time collaboration tools for distributed teams",
      gradient: "from-purple-500 to-pink-500",
      points: ["Team chat", "File sharing", "Progress tracking"],
      color: "purple"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Modular Planning",
      desc: "Break down complex projects into manageable modules",
      gradient: "from-orange-500 to-red-500",
      points: ["Module breakdown", "Dependency mapping", "Resource allocation"],
      color: "orange"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Advanced Visualization",
      desc: "Interactive charts and 3D project timelines",
      gradient: "from-indigo-500 to-purple-500",
      points: ["3D timelines", "Interactive charts", "Custom dashboards"],
      color: "indigo"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Forecasting",
      desc: "Get accurate project forecasts in under 30 seconds",
      gradient: "from-green-500 to-emerald-500",
      points: ["Quick estimates", "Scenario planning", "What-if analysis"],
      color: "green"
    }
  ];

  const techStack = [
    { icon: <Code2 className="w-6 h-6" />, name: "Web Apps", color: "from-blue-500 to-cyan-500", bg: "blue" },
    { icon: <Smartphone className="w-6 h-6" />, name: "Mobile Apps", color: "from-purple-500 to-pink-500", bg: "purple" },
    { icon: <Database className="w-6 h-6" />, name: "Backend Systems", color: "from-green-500 to-emerald-500", bg: "green" },
    { icon: <Cloud className="w-6 h-6" />, name: "Cloud Services", color: "from-orange-500 to-red-500", bg: "orange" },
    { icon: <Globe className="w-6 h-6" />, name: "APIs", color: "from-indigo-500 to-blue-500", bg: "indigo" },
    { icon: <Shield className="w-6 h-6" />, name: "Security", color: "from-gray-500 to-slate-500", bg: "gray" }
  ];

  const benefits = [
    { icon: <Rocket className="w-6 h-6" />, text: "40% Faster Project Delivery", color: "from-purple-500 to-pink-500" },
    { icon: <Target className="w-6 h-6" />, text: "95% Estimation Accuracy", color: "from-emerald-500 to-cyan-500" },
    { icon: <Sparkles className="w-6 h-6" />, text: "AI-Powered Insights", color: "from-blue-500 to-indigo-500" },
    { icon: <Award className="w-6 h-6" />, text: "Industry Leading Technology", color: "from-orange-500 to-red-500" },
    { icon: <ShieldCheck className="w-6 h-6" />, text: "Enterprise Grade Security", color: "from-green-500 to-emerald-500" },
    { icon: <Lightning className="w-6 h-6" />, text: "Lightning Fast Performance", color: "from-yellow-500 to-amber-500" }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CTO at TechFlow", text: "Predicto reduced our project planning time by 60%!", color: "from-blue-500 to-cyan-500" },
    { name: "Marcus Rodriguez", role: "Product Lead", text: "The AI accuracy is mind-blowing. 97% spot on!", color: "from-purple-500 to-pink-500" },
    { name: "Emily Watson", role: "Startup Founder", text: "Game-changer for our resource allocation.", color: "from-emerald-500 to-green-500" }
  ];

  const advancedStats = [
    { value: "95%", label: "Accuracy Rate", icon: <Target className="w-5 h-5" />, color: "from-emerald-500 to-cyan-500" },
    { value: "10K+", label: "Projects Analyzed", icon: <Database className="w-5 h-5" />, color: "from-blue-500 to-indigo-500" },
    { value: "2K+", label: "Happy Teams", icon: <Users className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { value: "40%", label: "Time Saved", icon: <Clock className="w-5 h-5" />, color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 text-slate-800 overflow-hidden bg-multicolor-gradient">
      <style>{styles}</style>

      {/* Advanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Morphing Background Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl animate-float animate-morph"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-float animate-morph" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-float animate-morph" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-gradient-to-r from-pink-200/30 to-rose-200/30 rounded-full blur-3xl animate-float animate-morph" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full blur-3xl animate-float animate-morph" style={{animationDelay: '3s'}}></div>
        
        {/* Enhanced Sparkle Elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-sparkle shadow-lg"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-cyan-400 rounded-full animate-sparkle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-purple-400 rounded-full animate-sparkle" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-pink-400 rounded-full animate-sparkle" style={{animationDelay: '1.5s'}}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-white rounded-full animate-float opacity-60"></div>
        <div className="absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-float" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-float" style={{animationDelay: '2.5s'}}></div>
      </div>

      {/* Advanced Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/20' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 animate-glow">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform text-center">
                PREDICTO<span className="text-rainbow">.AI</span>
              </h1>
            </div>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex space-x-8 text-sm font-semibold">
              {['Home', 'Features', 'Estimation', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="relative group py-2"
                >
                  <span className="text-slate-700 group-hover:text-gradient transition-all duration-300 font-medium">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-blue-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button - Right Aligned */}
          <div className="flex-1 flex justify-end">
            <div className="hidden lg:block">
              <Link
                to="/estimate"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg animate-pulse-glow relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl animate-slide-in-up">
            <div className="px-6 py-4 space-y-2">
              {['Home', 'Features', 'Estimation', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block py-4 font-semibold text-slate-700 hover:text-gradient transition-all duration-300 border-b border-slate-100 hover:bg-slate-50 rounded-lg px-4 hover:translate-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                to="/estimate"
                className="block py-4 font-semibold text-white bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg text-center mt-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Advanced Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10">
          {/* Centered Main Title */}
          <div className="text-center mb-16 w-full max-w-6xl">
            {/* Enhanced Rating Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-emerald-200/50 shadow-lg hover-lift hover:shadow-xl group mb-8 mx-auto">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform" />
                ))}
              </div>
              <span className="text-emerald-700 font-bold text-sm">Rated 4.9/5 by 2,000+ Teams</span>
              <SparkleIcon className="w-4 h-4 text-cyan-500 animate-sparkle" />
            </div>

            {/* Centered Main Heading */}
            <div className="mb-12">
              <h1 className="text-6xl lg:text-8xl font-black leading-tight mb-6">
                <span className="text-rainbow block mb-4 animate-wave">PREDICTO.AI</span>
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent text-4xl lg:text-6xl">
                  Intelligent Project Estimation
                </span>
              </h1>
              
              {/* Enhanced Subtitle */}
              <p className="text-2xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-8">
                Advanced AI-powered platform that delivers{" "}
                <span className="font-semibold text-gradient">95% accurate</span> project estimates 
                using machine learning trained on{" "}
                <span className="font-semibold text-gradient">10,000+</span> real-world projects.
              </p>
            </div>

            {/* Advanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {advancedStats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 hover-lift group perspective-1000"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(stat.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/estimate"
                className="group relative bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-10 py-5 rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden shadow-lg text-center min-w-[200px]"
              >
                <span className="relative z-10 flex items-center gap-3 justify-center text-lg">
                  <Play className="w-6 h-6" />
                  Start Free Estimation 
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/about"
                className="group border-2 border-gradient-to-r from-emerald-600 to-blue-600 px-10 py-5 rounded-2xl font-bold text-gradient hover:bg-gradient-to-r hover:from-emerald-50 hover:to-blue-50 transition-all duration-300 hover:shadow-lg hover-lift text-center relative overflow-hidden min-w-[200px]"
              >
                <span className="flex items-center gap-2 justify-center relative z-10 text-lg">
                  Watch Demo
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.text}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/50 hover-lift group transform-style-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(benefit.icon, { className: "w-6 h-6 text-white" })}
                </div>
                <span className="text-lg font-semibold text-slate-700">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Hero Image with Floating Elements */}
          <div className="relative w-full max-w-6xl">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 hover-lift group gradient-border">
              <img
                src="https://doofer.io/wp-content/uploads/2025/02/Group-63.png"
                alt="AI Project Estimation Dashboard"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>
              <div className="absolute top-6 right-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse-glow">
                  Live Demo
                </div>
              </div>
            </div>
            
            {/* Enhanced Floating Cards */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-emerald-200/50 animate-float hover-lift group transform-style-3d">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900">40% Faster</p>
                  <p className="text-sm text-slate-500">Project planning</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-blue-200/50 animate-float hover-lift group transform-style-3d" style={{animationDelay: '2s'}}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-slate-900">95% Accurate</p>
                  <p className="text-sm text-slate-500">Estimates</p>
                </div>
              </div>
            </div>

            {/* New Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-purple-200/50 animate-float hover-lift group transform-style-3d" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Gem className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-md text-slate-900">AI Powered</p>
                  <p className="text-xs text-slate-500">ML Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-50/30 to-blue-50/30 border-y border-slate-200/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-gradient mb-4">Loved by Teams Worldwide</h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what industry leaders are saying about their experience with Predicto
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg hover-lift group transform-style-3d perspective-1000"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-600 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-slate-200/50 pt-4">
                  <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                  <p className="text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Tech Stack Section */}
      <section className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-rainbow mb-4">Supported Tech Stacks</h3>
            <p className="text-xl text-slate-600">Accurate estimates for every technology and platform</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techStack.map((tech, index) => (
              <div 
                key={tech.name}
                className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm hover-lift text-center hover:shadow-xl transition-all duration-300 relative overflow-hidden transform-style-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}>
                  <div className="text-white">
                    {tech.icon}
                  </div>
                </div>
                <p className="font-semibold text-slate-800 relative z-10 text-lg">{tech.name}</p>
                <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section ref={sectionRef} className="py-20 relative bg-rainbow-gradient">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white/80"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-5xl font-black mb-6">
              Why <span className="text-rainbow">Predicto</span> Stands Out
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced AI-powered features that transform how you estimate, plan, and deliver projects with unprecedented accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <EnhancedFeature 
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
                gradient={feature.gradient}
                points={feature.points}
                color={feature.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Comparison Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50/50 to-indigo-50/50 relative border-y border-slate-200/30">
        <div className="absolute inset-0 bg-grid-slate-200 bg-[size:60px_60px]"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-5xl font-black mb-6">
              Compare <span className="text-rainbow">Predicto</span> vs Others
            </h3>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how Predicto stands out with comprehensive AI-powered features and advanced analytics
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden hover-lift transition-all duration-500 transform-style-3d">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50">
                  <th className="p-8 text-left font-bold text-slate-900 text-lg">Advanced Features</th>
                  <th className="p-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-2 shadow-lg animate-pulse-glow">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                      <span className="font-bold text-slate-900 text-lg">Predicto</span>
                      <span className="text-sm text-cyan-600 font-medium">Recommended</span>
                    </div>
                  </th>
                  <th className="p-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-2">
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                      </div>
                      <span className="font-bold text-slate-700 text-lg">Devtimate</span>
                    </div>
                  </th>
                  <th className="p-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-2">
                        <Layers className="w-8 h-8 text-purple-600" />
                      </div>
                      <span className="font-bold text-slate-700 text-lg">Doofer</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60">
                {[
                  ["AI-Powered Cost Estimation", true, true, false],
                  ["Machine Learning Algorithms", true, false, false],
                  ["Real-time Analytics Dashboard", true, true, false],
                  ["PDF Export & Reports", true, false, true],
                  ["Custom Tech Stack Input", true, false, true],
                  ["Cloud Analytics Integration", true, true, false],
                  ["Team Collaboration Tools", true, false, false],
                  ["API Access & Webhooks", true, false, true],
                  ["Advanced Risk Analysis", true, false, false],
                  ["Multi-currency Support", true, true, true],
                ].map(([feature, p, d, doofer], index) => (
                  <tr 
                    key={feature} 
                    className="hover:bg-slate-50/80 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="p-6 text-left font-semibold text-slate-700 group-hover:text-slate-900 group-hover:translate-x-2 transition-transform">
                      {feature}
                    </td>
                    <td className="p-6 text-center">
                      {p ? (
                        <div className="flex justify-center">
                          <CheckCircle className="w-7 h-7 text-cyan-500 animate-pulse-glow" />
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {d ? (
                        <div className="flex justify-center">
                          <CheckCircle className="w-7 h-7 text-blue-500" />
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {doofer ? (
                        <div className="flex justify-center">
                          <CheckCircle className="w-7 h-7 text-purple-500" />
                        </div>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

{/* Sky Blue & Black CTA */}
<section className="py-24 relative overflow-hidden bg-gradient-to-br from-black via-slate-900 to-slate-800">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: '30px 30px'
  }}></div>
  
  {/* Gradient Mesh */}
  <div className="absolute inset-0" style={{
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(233, 14, 50, 0.71) 0%, transparent 70%),
      radial-gradient(circle at 80% 70%, rgba(232, 230, 237, 0.58) 0%, transparent 50%)
    `
  }}></div>
  
  {/* Floating Elements */}
  <div className="absolute top-20 left-10 w-24 h-24">
    <div className="absolute inset-0 border border-sky-400/20 rounded-full animate-spin-slow"></div>
  </div>
  <div className="absolute bottom-20 right-10 w-32 h-32">
    <div className="absolute inset-0 bg-sky-400/5 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
  </div>
  
  {/* Floating Orbs */}
  {[1, 2, 3].map((i) => (
    <div key={i} className={`absolute w-${i+2} h-${i+2} bg-sky-400/30 rounded-full blur-sm animate-float`} style={{
      top: `${20 + i*20}%`,
      left: `${i*25}%`,
      animationDelay: `${i}s`
    }}></div>
  ))}
  
  {/* Content */}
  <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
    {/* Title */}
    <h3 className="text-5xl lg:text-7xl font-black mb-6">
      <span className="block mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-sky-400">
        PREDICTO.AI
      </span>
      <span className="text-2xl lg:text-4xl text-slate-300">Intelligent Project Estimation</span>
    </h3>
    
    {/* Subtitle */}
    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
      Join 2,000+ teams achieving 95% accurate estimates with AI-powered precision
    </p>
    
    {/* CTA Button */}
    <div className="relative group mb-16">
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl blur opacity-60 animate-pulse"></div>
      <Link
        to="/estimate"
        className="relative bg-gradient-to-r from-white to-slate-100 text-black px-12 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-4 group-hover:scale-105"
      >
        <Brain className="w-6 h-6 text-sky-600" />
        <span className="text-lg">Start Free Trial</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </Link>
    </div>
    
    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      {[
        { value: "95%", label: "Accuracy", color: "border-sky-400/30 bg-sky-400/10" },
        { value: "10K+", label: "Projects", color: "border-blue-400/30 bg-blue-400/10" },
        { value: "2K+", label: "Teams", color: "border-cyan-400/30 bg-cyan-400/10" },
        { value: "40%", label: "Time Saved", color: "border-teal-400/30 bg-teal-400/10" },
      ].map((stat, i) => (
        <div key={i} className={`p-6 rounded-xl border backdrop-blur-sm text-white ${stat.color} hover:scale-105 transition-all duration-300`}>
          <div className="text-3xl font-bold mb-2">{stat.value}</div>
          <div className="text-sm text-slate-300">{stat.label}</div>
        </div>
      ))}
    </div>
    
    {/* Trust Badge */}
    <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      <span className="text-white font-medium">Rated 4.9/5 by 2,000+ teams</span>
    </div>
  </div>
</section>

<style>{`
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
`}</style>

      {/* Advanced Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Footer Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-sparkle opacity-60"></div>
          <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-sparkle" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
              {/* Company Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-glow">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">
                      PREDICTO<span className="text-cyan-400">.AI</span>
                    </h4>
                    <p className="text-slate-400 text-sm">Intelligent Project Forecasting</p>
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Advanced AI-powered platform for accurate project estimation and planning. 
                  Join thousands of teams transforming their project delivery.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 group">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h5 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <SparkleIcon className="w-5 h-5 text-cyan-400" />
                  Quick Links
                </h5>
                <ul className="space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "Features", href: "/features" },
                    { name: "Pricing", href: "/pricing" },
                    { name: "Case Studies", href: "/case-studies" },
                    { name: "API Documentation", href: "/api-docs" },
                    { name: "Roadmap", href: "/roadmap" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div>
                <h5 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  Solutions
                </h5>
                <ul className="space-y-4">
                  {[
                    { name: "For Startups", desc: "Scale efficiently" },
                    { name: "For Enterprise", desc: "Enterprise-grade" },
                    { name: "For Agencies", desc: "Client projects" },
                    { name: "For Dev Teams", desc: "Agile planning" },
                    { name: "Education", desc: "Academic discount" },
                    { name: "Non-profits", desc: "Special pricing" },
                    { name: "Freelancers", desc: "Solo projects" },
                  ].map((solution) => (
                    <li key={solution.name}>
                      <div className="group">
                        <div className="text-white hover:text-emerald-400 transition-colors duration-300 font-medium">
                          {solution.name}
                        </div>
                        <div className="text-slate-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {solution.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h5 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Stay Updated
                </h5>
                <p className="text-slate-400 mb-6">
                  Get the latest updates, tips, and exclusive offers directly in your inbox.
                </p>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all duration-300"
                    />
                    <button className="absolute right-2 top-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-slate-500 text-xs">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-slate-800 pt-12 mb-12">
              <h6 className="text-white text-center font-semibold mb-8 text-lg">Trusted By Industry Leaders</h6>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-60">
                {[
                  { name: "TechFlow", color: "from-blue-700 to-cyan-700" },
                  { name: "InnovateX", color: "from-purple-500 to-pink-500" },
                  { name: "CloudSync", color: "from-emerald-500 to-green-500" },
                  { name: "DataSphere", color: "from-orange-500 to-red-500" },
                  { name: "SecureNet", color: "from-indigo-500 to-blue-500" },
                ].map((company) => (
                  <div key={company.name} className="text-center group">
                    <div className={`w-16 h-16 bg-gradient-to-r ${company.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale110 transition-transform duration300 opacity80`}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-slate-500 text-sm">
                    © 2025 Predicto.ai — Powered by Retouch IT Services Pvt Ltd. All rights reserved.
                  </p>
                  <div className="flex flex-wrap gap-6 mt-3 justify-center md:justify-start">
                    <Link to="/privacy" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                      Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                      Terms of Service
                    </Link>
                    <Link to="/cookies" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">
                      Cookie Policy
                    </Link>
                    <Link to="/security" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                      Security
                    </Link>
                    <Link to="/compliance" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                      GDPR Compliance
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <select className="bg-transparent text-slate-300 text-sm focus:outline-none">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg">
                    <Database className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Status: <span className="text-emerald-400">● All Systems Operational</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards & Certifications */}
            <div className="mt-8 pt-8 border-t border-slate-800/50">
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300 text-sm">SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-slate-300 text-sm">G2 High Performer 2024</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300 text-sm">AI Innovation Award</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-lg">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300 text-sm">95% Customer Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-glow group"
            >
              <ArrowRight className="w-6 h-6 text-white transform -rotate-90 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
function EnhancedFeature({ icon, title, desc, gradient, points, color, index }) {
  return (
    <div 
      className="group p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-500 hover-lift relative overflow-hidden transform-style-3d perspective-1000"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <h4 className="font-bold text-2xl mb-4 text-slate-900 group-hover:text-slate-800 relative z-10">{title}</h4>
      <p className="text-slate-600 leading-relaxed text-lg mb-4 relative z-10">{desc}</p>
      
      {/* Enhanced Feature Points */}
      <ul className="space-y-2 relative z-10">
        {points.map((point, pointIndex) => (
          <li key={pointIndex} className="flex items-center gap-3 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
            <div className={`w-2 h-2 bg-gradient-to-r ${gradient} rounded-full group-hover:scale-125 transition-transform`}></div>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}></div>
    </div>
  );
}