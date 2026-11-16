import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Shield, Clock, ArrowRight, Briefcase, TrendingUp, DollarSign, ChevronDown, Zap, Award, CheckCircle, Send, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion, useInView } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const searchRef = useRef(null);
  const categoriesRef = useRef(null);
  const artisansRef = useRef(null);
  const heroRef = useRef(null);
  const categoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" });
  const artisansInView = useInView(artisansRef, { once: true, margin: "-100px" });
  const heroInView = useInView(heroRef, { once: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [artisanStats, setArtisanStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalEarnings: 0,
  });
  const [selectedLocation, setSelectedLocation] = useState('Accra');
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const popularSearches = ['Carpentry', 'Masonry', 'Electrical', 'Painting', 'Babysitting', 'Shop Attendant'];

  const handlePopularSearch = (search) => {
    setSearchTerm(search);
    navigate(`/browse?search=${encodeURIComponent(search)}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (value.trim().length >= 2) {
      const timeout = setTimeout(async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/artisans', {
            params: { search: value }
          });
          setSuggestions(response.data.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }, 300);
      setSearchTimeout(timeout);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (artisan) => {
    navigate(`/artisan/${artisan._id}`);
    setShowSuggestions(false);
    setSearchTerm('');
  };

  // Fetch artisans and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artisansResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/users/artisans'),
          axios.get('http://localhost:5000/api/categories')
        ]);
        setArtisans(artisansResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch artisan stats if logged in as artisan
  useEffect(() => {
    if (isAuthenticated && user?.role === 'artisan') {
      const fetchArtisanStats = async () => {
        try {
          const jobsResponse = await axios.get('http://localhost:5000/api/jobs', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });

          const jobs = jobsResponse.data;
          const completedJobs = jobs.filter(job => job.status === 'completed');
          const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.artisan_charge || 0), 0);

          setArtisanStats({
            totalJobs: jobs.length,
            activeJobs: jobs.filter(job => job.status === 'in_progress' || job.status === 'pending').length,
            completedJobs: completedJobs.length,
            totalEarnings: totalEarnings,
          });
        } catch (error) {
          console.error('Error fetching artisan stats:', error);
        }
      };

      fetchArtisanStats();
    }
  }, [isAuthenticated, user]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch = artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artisan.artisan_profile?.bio || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory ||
      (artisan.artisan_profile?.categories || []).some(cat => cat._id === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Section - Cinematic Immersive Design */}
      <section ref={heroRef} className="relative min-h-[500px] md:min-h-[550px] lg:min-h-[600px] text-white overflow-hidden">
        {/* Background Image Layer - Full Width */}
        <div className="absolute inset-0">
          <motion.video
            src="/images/HERO VIDEO.mp4"
            alt="Local artisan at work"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            initial={{ scale: 1.1 }}
            animate={heroInView ? { scale: 1 } : { scale: 1.1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          {/* Bottom-only gradient overlay - fades from bottom to transparent */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 h-full flex items-center">
          <div className="flex flex-col lg:flex-row items-center gap-12 w-full">
            {/* Left Side - Content */}
            <div className="space-y-8 lg:max-w-2xl w-full lg:w-2/3">
              {isAuthenticated ? (
                <>
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Welcome back,<br />
                    <motion.span
                      className="text-blue-200"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {user?.name}!
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-blue-100 max-w-xl"
                    initial={{ opacity: 0, x: -30 }}
                    animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    {user?.role === 'artisan'
                      ? 'Manage your jobs and grow your business on Skillbridge.'
                      : 'Find the perfect artisan for your needs.'}
                  </motion.p>
                </>
              ) : (
                <>
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 50, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    Welcome to,<br />
                    <motion.span
                      className="text-blue-200"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      SKILLBRIDGE
                    </motion.span>
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-blue-100 max-w-xl"
                    initial={{ opacity: 0, x: -30 }}
                    animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    Find trusted local service providers, book with confidence, and get things done — all in one place.
                  </motion.p>
                </>
              )}

              {/* Search Bar */}
              <motion.div
                className="relative"
                ref={searchRef}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={heroInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
              >
                <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col gap-2 max-w-2xl">
                  <div className="flex flex-col md:flex-row gap-2">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="Search for services or artisans..."
                          value={searchTerm}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
                        />
                      </motion.div>
                    </div>

                    {/* Location Selector */}
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      <button
                        type="button"
                        onClick={() => setIsLocationOpen(!isLocationOpen)}
                        className="flex items-center gap-2 px-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-gray-700"
                      >
                        <MapPin size={18} className="text-gray-500" />
                        <span className="text-sm font-medium">{selectedLocation}</span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </button>

                      {isLocationOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                          {['Accra', 'Kumasi', 'Tamale', 'Takoradi'].map((loc) => (
                            <button
                              key={loc}
                              type="button"
                              onClick={() => {
                                setSelectedLocation(loc);
                                setIsLocationOpen(false);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <MapPin size={14} className="text-gray-500" />
                              {loc}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Search Button */}
                    <motion.button
                      type="submit"
                      className="bg-primary-600 text-white px-8 py-4 rounded-xl hover:bg-primary-700 transition-colors font-semibold flex items-center justify-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 400 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Search size={20} />
                      <span>Search</span>
                    </motion.button>
                  </div>
                </form>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                    {suggestions.map((artisan) => (
                      <Link
                        key={artisan._id}
                        to={`/artisan/${artisan._id}`}
                        onClick={() => {
                          setShowSuggestions(false);
                          setSearchTerm('');
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 flex items-center gap-3 block"
                      >
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary-600">
                            {artisan.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{artisan.name}</p>
                          <p className="text-sm text-gray-500 truncate">
                            {(artisan.artisan_profile?.categories || []).slice(0, 2).map(cat => cat.name).join(', ')}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>

              {!isAuthenticated && (
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="bg-white text-primary-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
                    >
                      Sign Up as Customer
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="bg-primary-700 text-white px-8 py-3 rounded-xl hover:bg-primary-800 transition-colors font-semibold inline-flex items-center justify-center"
                    >
                      Become an Artisan
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </motion.div>
                </motion.div>
              )}

              {/* Service Cards - Smaller boxes under search bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { emoji: '🔨  ', name: 'Carpenter', color: 'blue' },
                  { emoji: '🧱', name: 'Mason', color: 'purple' },
                  { emoji: '⚡', name: 'Electrician', color: 'green' },
                  { emoji: '🧹', name: 'Cleaner', color: 'orange' }
                ].map((service, index) => (
                  <motion.div
                    key={service.name}
                    className={`bg-gradient-to-br from-${service.color}-400/20 to-${service.color}-600/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer`}
                    initial={{ opacity: 0, rotateY: 90, x: -50 }}
                    animate={heroInView ? { opacity: 1, rotateY: 0, x: 0 } : { opacity: 0, rotateY: 90, x: -50 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { type: "spring", stiffness: 400, damping: 20 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ perspective: 1000 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-2"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-xl">{service.emoji}</span>
                    </motion.div>
                    <h3 className="font-semibold text-white text-sm">{service.name}</h3>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side - Empty spacer */}
            <div className="hidden lg:block w-1/3"></div>
          </div>
        </div>
      </section>

      {/* Artisan Stats Summary - Only for logged-in artisans */}
      {isAuthenticated && user?.role === 'artisan' && (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="relative bg-white rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Briefcase className="text-blue-600" size={28} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{artisanStats.totalJobs}</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Jobs</p>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-16 opacity-10">
                  <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
                    <path d="M0 60 L0 40 L20 30 L40 35 L60 25 L80 30 L80 60 Z" fill="currentColor" className="text-blue-600" />
                  </svg>
                </div>
              </div>
              <div className="relative bg-white rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Clock className="text-blue-600" size={28} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{artisanStats.activeJobs}</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Jobs</p>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-16 opacity-10">
                  <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
                    <path d="M0 60 L0 45 L20 40 L40 45 L60 35 L80 40 L80 60 Z" fill="currentColor" className="text-blue-600" />
                  </svg>
                </div>
              </div>
              <div className="relative bg-white rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <TrendingUp className="text-blue-600" size={28} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">{artisanStats.completedJobs}</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Completed</p>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-16 opacity-10">
                  <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
                    <path d="M0 60 L0 50 L20 45 L40 50 L60 40 L80 35 L80 60 Z" fill="currentColor" className="text-blue-600" />
                  </svg>
                </div>
              </div>
              <div className="relative bg-white rounded-[24px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <DollarSign className="text-blue-600" size={28} />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-1">GHS {artisanStats.totalEarnings}</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Earnings</p>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-16 opacity-10">
                  <svg viewBox="0 0 80 60" fill="none" className="w-full h-full">
                    <path d="M0 60 L0 35 L20 40 L40 30 L60 35 L80 25 L80 60 Z" fill="currentColor" className="text-blue-600" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/artisan-dashboard"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl group"
              >
                View Full Dashboard
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Trust Features Section */}
      <section className="py-16 relative overflow-hidden">
        {/* Background gradient and glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Skillbridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it simple to connect with trusted professionals.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-[24px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Artisans</h3>
              <p className="text-gray-600 leading-relaxed">
                Thoroughly vetted professionals for your safety and peace of mind.
              </p>
            </div>
            <div className="bg-white rounded-[24px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <MapPin className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local & Nearby</h3>
              <p className="text-gray-600 leading-relaxed">
                Find providers in your neighborhood for quick and convenient service.
              </p>
            </div>
            <div className="bg-white rounded-[24px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Star className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rated & Reviewed</h3>
              <p className="text-gray-600 leading-relaxed">
                Genuine ratings from real customers to help you make informed decisions.
              </p>
            </div>
            <div className="bg-white rounded-[24px] p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 to-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/18 to-blue-400/8 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick response times you can count on for all your service needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Service Categories Section */}
      <section ref={categoriesRef} className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Service Categories</h2>
              <p className="text-gray-600 max-w-xl">
                Explore a wide range of local services from skilled trades to everyday help.
              </p>
            </div>
            <Link
              to="/browse"
              className="mt-4 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Categories
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category, index) => {
              // Map category name to image file
              const getImageForCategory = (categoryName) => {
                const name = categoryName.toUpperCase();
                if (name.includes('CARPENTER') || name.includes('CARPENTRY') || name.includes('WOOD')) return '/images/CARPENTER.jpg';
                if (name.includes('CLEAN') || name.includes('CLEANING')) return '/images/CLEANING.jpg';
                if (name.includes('GARDEN') || name.includes('LANDSCAP')) return '/images/GARDENER.jpg';
                if (name.includes('HVAC') || name.includes('AIR') || name.includes('ELECTRICAL') || name.includes('ELECTRICIAN')) return '/images/HVAC.jpg';
                if (name.includes('MASON') || name.includes('CONSTRUCTION') || name.includes('BUILD')) return '/images/Masonry.jpg';
                return null;
              };

              const categoryImage = getImageForCategory(category.name);
              const providerCount = artisans.filter(a => (a.artisan_profile?.categories || []).some(cat => cat._id === category._id)).length;

              return (
                <motion.button
                  key={category._id}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category._id ? null : category._id
                  )}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={categoriesInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-2xl p-6 text-left min-h-[220px] cursor-pointer"
                >
                  {/* Background Image */}
                  {categoryImage && (
                    <motion.img
                      src={categoryImage}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                  {/* Bottom-only Gradient Overlay - fades from bottom to transparent */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-end">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    >
                      <h3 className="font-bold text-white text-xl mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-200 mb-4 line-clamp-2">{category.description}</p>
                      {/* Provider Count Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={categoriesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit"
                      >
                        <span className="text-white font-semibold text-sm">{providerCount}</span>
                        <span className="text-white/80 text-sm ml-1">providers</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Blue Glow on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl ring-2 ring-primary-500/0"
                    whileHover={{ ringColor: "rgba(59, 130, 246, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Artisans Section */}
      <section ref={artisansRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={artisansInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Artisans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Top-rated professionals ready to help you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading featured artisans...</p>
              </div>
            ) : filteredArtisans.length > 0 ? (
              filteredArtisans.slice(0, 6).map((artisan, index) => {
                const backgroundImage = artisan.artisan_profile?.background_image;
                const profileImage = artisan.artisan_profile?.profile_image;

                return (
                  <motion.div
                    key={artisan._id}
                    initial={{ opacity: 0, rotateY: -90, x: -50 }}
                    animate={artisansInView ? { opacity: 1, rotateY: 0, x: 0 } : { opacity: 0, rotateY: -90, x: -50 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{
                      rotateX: 5,
                      rotateY: 5,
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    style={{ perspective: 1000 }}
                  >
                    <Link
                      to={`/artisan/${artisan._id}`}
                      className="group relative overflow-hidden rounded-2xl text-left min-h-[280px] block"
                    >
                      {/* Background Image */}
                      {backgroundImage ? (
                        <motion.img
                          src={backgroundImage.startsWith('http') ? backgroundImage : `http://localhost:5000${backgroundImage}`}
                          alt={artisan.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ scale: 1.2 }}
                          animate={artisansInView ? { scale: 1 } : { scale: 1.2 }}
                          whileHover={{ scale: 1.3, rotate: 2 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
                      )}

                      {/* Bottom-only Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full justify-end p-6">
                        {/* Profile Image & Name */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={artisansInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                          className="flex items-center gap-4 mb-4"
                        >
                          {profileImage ? (
                            <motion.img
                              src={profileImage.startsWith('http') ? profileImage : `http://localhost:5000${profileImage}`}
                              alt={artisan.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            />
                          ) : (
                            <motion.div
                              className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <span className="text-2xl font-bold text-white">
                                {artisan.name.charAt(0)}
                              </span>
                            </motion.div>
                          )}
                          <div>
                            <h3 className="font-bold text-white text-xl">{artisan.name}</h3>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" size={16} />
                              <span className="text-white/90 text-sm">
                                {artisan.artisan_profile?.rating_avg || 'N/A'}
                              </span>
                              <span className="text-white/70 text-sm">
                                ({artisan.artisan_profile?.total_jobs_completed || 0} jobs)
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={artisansInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                          className="text-sm text-gray-200 mb-4 line-clamp-2"
                        >
                          {artisan.artisan_profile?.bio || 'No bio available'}
                        </motion.p>

                        {/* Categories */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={artisansInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                          className="flex flex-wrap gap-2 mb-4"
                        >
                          {(artisan.artisan_profile?.categories || []).slice(0, 2).map((category) => (
                            <motion.span
                              key={category._id}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                              whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                            >
                              {category.name}
                            </motion.span>
                          ))}
                          {(artisan.artisan_profile?.categories || []).length > 2 && (
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                              +{artisan.artisan_profile.categories.length - 2}
                            </span>
                          )}
                        </motion.div>

                        {/* Price & Location */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={artisansInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
                          className="flex justify-between items-center text-xs"
                        >
                          <span className="text-white/80">
                            {artisan.artisan_profile?.base_price_range ?
                              `GHS ${artisan.artisan_profile.base_price_range.min} - ${artisan.artisan_profile.base_price_range.max}` :
                              'Contact for pricing'
                            }
                          </span>
                          <div className="flex items-center gap-1 text-white/80">
                            <MapPin size={12} />
                            <span className="truncate max-w-[100px]">
                              {artisan.location_address || 'Location not specified'}
                            </span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Blue Glow on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl ring-2 ring-primary-500/0"
                        whileHover={{ ringColor: "rgba(59, 130, 246, 0.6)", ringWidth: 4 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">No artisans found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50/40 via-white to-blue-100/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Skillbridge Blue Accent - Atmospheric Gradients */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-300/15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary-300/12 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-200/10 rounded-full blur-3xl"></div>
          </div>

          {/* Blue-tinted Lighting Effects */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-100/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-200/15 to-transparent"></div>

          {/* Faded Artisan Imagery with Natural Blend */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-[500px]">
            {/* Image Container with Feather Mask */}
            <div className="relative w-full h-full">
              <img
                src="/images/HOW IT GOES.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Left Edge Fade - Clear visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/30"></div>
              {/* Right Edge Fade - Blue Overlay Only Near First Card */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-900/10 to-blue-900/25"></div>
              {/* Top/Bottom Feather */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50"></div>
            </div>
          </div>

          {/* Glassmorphism Accents */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/25 backdrop-blur-xl rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-24 h-24 bg-blue-100/35 backdrop-blur-xl rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-primary-100/25 backdrop-blur-xl rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Get started in just a few simple steps
            </p>
          </div>

          {/* Steps Container - Shifted Right */}
          <div className="relative md:ml-16">
            {/* Connection Path */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1">
              <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                <path
                  d="M 100 50 Q 300 50, 400 50 Q 500 50, 600 50 Q 700 50, 800 50 Q 900 50, 1100 50"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  fill="none"
                />
                {/* Arrow Indicators */}
                <polygon points="350,50 340,45 340,55" fill="rgba(59, 130, 246, 0.4)" />
                <polygon points="550,50 540,45 540,55" fill="rgba(59, 130, 246, 0.4)" />
                <polygon points="750,50 740,45 740,55" fill="rgba(59, 130, 246, 0.4)" />
              </svg>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="group relative">
                <div className="bg-white/75 backdrop-blur-lg rounded-3xl shadow-lg border border-blue-200/40 p-8 pt-16 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:border-blue-300 hover:bg-white/85 hover:shadow-blue-500/20">
                  {/* Faded Step Number */}
                  <div className="absolute top-4 right-6 text-8xl font-bold text-blue-50 opacity-40">
                    01
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
                    <Search className="w-10 h-10 text-white" size={40} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Search & Browse</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Find the service you need or browse available artisans in your area
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative">
                <div className="bg-white/75 backdrop-blur-lg rounded-3xl shadow-lg border border-blue-200/40 p-8 pt-16 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:border-blue-300 hover:bg-white/85 hover:shadow-blue-500/20">
                  {/* Faded Step Number */}
                  <div className="absolute top-4 right-6 text-8xl font-bold text-blue-50 opacity-40">
                    02
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
                    <Send className="w-10 h-10 text-white" size={40} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Request Service</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Submit your job request with details and location
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative">
                <div className="bg-white/75 backdrop-blur-lg rounded-3xl shadow-lg border border-blue-200/40 p-8 pt-16 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:border-blue-300 hover:bg-white/85 hover:shadow-blue-500/20">
                  {/* Faded Step Number */}
                  <div className="absolute top-4 right-6 text-8xl font-bold text-blue-50 opacity-40">
                    03
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
                    <MessageSquare className="w-10 h-10 text-white" size={40} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Get Quotes</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Receive quotes from interested artisans and choose the best fit
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="group relative">
                <div className="bg-white/75 backdrop-blur-lg rounded-3xl shadow-lg border border-blue-200/40 p-8 pt-16 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl hover:border-blue-300 hover:bg-white/85 hover:shadow-blue-500/20">
                  {/* Faded Step Number */}
                  <div className="absolute top-4 right-6 text-8xl font-bold text-blue-50 opacity-40">
                    04
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
                    <CheckCircle className="w-10 h-10 text-white" size={40} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 mt-4">Complete & Review</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get your job done and rate your experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real reviews from real customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Excellent service! The plumber arrived on time and fixed the issue quickly. Very professional and affordable."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600">K</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Kwame Mensah</p>
                  <p className="text-sm text-gray-500">Accra</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Found a great electrician through Skillbridge. The booking process was smooth and the work quality was outstanding."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600">A</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Abena Osei</p>
                  <p className="text-sm text-gray-500">Kumasi</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-current" size={20} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Highly recommended! The platform made it easy to find verified professionals. Will definitely use again."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600">E</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emmanuel Addo</p>
                  <p className="text-sm text-gray-500">Tamale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* CTA Section */}
      < section className="py-16 bg-primary-600" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {isAuthenticated ? (
            <>
              <h2 className="text-3xl font-bold text-white mb-4">
                {user?.role === 'artisan' ? 'Grow Your Business' : 'Find the Perfect Artisan'}
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                {user?.role === 'artisan'
                  ? 'Update your profile and get more job requests from customers.'
                  : 'Post a job and get quotes from verified artisans in your area.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user?.role === 'artisan' ? (
                  <Link
                    to="/artisan-dashboard"
                    className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/customer-dashboard"
                      className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
                    >
                      View Dashboard
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                    <Link
                      to="/browse"
                      className="bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold inline-flex items-center justify-center"
                    >
                      Browse Services
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Join thousands of Ghanaians who trust Skillbridge for their service needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
                >
                  Sign Up as Customer
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold inline-flex items-center justify-center"
                >
                  Become an Artisan
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section >
    </div >
  );
};

export default Home;
