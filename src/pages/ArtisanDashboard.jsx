import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Star, Users, TrendingUp, Calendar, Clock, DollarSign, MessageSquare, ToggleRight, ToggleLeft, Home, Search, Settings, User, ArrowRight, X, Menu, Plus, CheckCircle, AlertCircle, Activity, Circle, ChevronRight, MapPin, Filter, MoreVertical } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ArtisanDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    rating: 0,
    totalReviews: 0,
    totalEarnings: 0,
    unreadMessages: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [isAvailable, setIsAvailable] = useState(user?.artisan_profile?.is_available || true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch artisan's jobs
        const jobsResponse = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const jobs = jobsResponse.data;
        setRecentJobs(jobs.slice(0, 5));

        // Calculate stats
        const completedJobs = jobs.filter(job => job.status === 'completed');
        const totalEarnings = completedJobs.reduce((sum, job) => sum + (job.artisan_charge || 0), 0);

        setStats({
          totalJobs: jobs.length,
          activeJobs: jobs.filter(job => job.status === 'in_progress' || job.status === 'pending').length,
          completedJobs: completedJobs.length,
          rating: user?.artisan_profile?.rating_avg || 0,
          totalReviews: user?.artisan_profile?.total_jobs_completed || 0,
          totalEarnings: totalEarnings,
          unreadMessages: 0, // TODO: Fetch from messages API
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleAvailabilityToggle = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}/availability`,
        { is_available: !isAvailable },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-blue-600" size={20} />;
      case 'in_progress':
        return <Activity className="text-blue-600" size={20} />;
      case 'pending':
        return <AlertCircle className="text-blue-600" size={20} />;
      default:
        return <Clock className="text-blue-600" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="w-full">
        <div className="p-6 lg:p-8">
          {/* Premium Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 lg:p-10 mb-8 overflow-hidden shadow-xl">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex-1 max-w-xl">
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                  Grow your business on Skillbridge. Connect with customers across Ghana and showcase your skills to the community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    Browse Jobs
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <button
                    onClick={handleAvailabilityToggle}
                    className={`inline-flex items-center px-6 py-3 ${isAvailable
                      ? 'bg-green-500/20 text-white border border-green-400/30'
                      : 'bg-gray-500/20 text-white border border-gray-400/30'
                      } rounded-xl hover:bg-gradient-to-r hover:from-blue-600/60 hover:to-blue-700/70 transition-all font-semibold backdrop-blur-sm`}
                  >
                    {isAvailable ? <ToggleRight size={18} className="mr-2" /> : <ToggleLeft size={18} className="mr-2" />}
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="hidden lg:block flex-shrink-0">
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 to-transparent rounded-2xl"></div>
                  <img
                    src="/images/Artisan Page Hero.jpg"
                    alt="Skilled Artisans"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Jobs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Total Jobs</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalJobs}</p>
                  <p className="text-xs text-gray-400 mt-2">All time jobs</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Briefcase className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Active Jobs</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.activeJobs}</p>
                  <p className="text-xs text-gray-400 mt-2">Currently working</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Clock className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Completed</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.completedJobs}</p>
                  <p className="text-xs text-gray-400 mt-2">Successfully finished</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <CheckCircle className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Rating</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.rating.toFixed(1)}</p>
                  <p className="text-xs text-gray-400 mt-2">{stats.totalReviews} reviews</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Star className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Earnings</p>
                  <p className="text-4xl font-bold text-gray-900">GHS {stats.totalEarnings}</p>
                  <p className="text-xs text-gray-400 mt-2">Total earned</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <TrendingUp className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Messages</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.unreadMessages}</p>
                  <p className="text-xs text-gray-400 mt-2">Unread messages</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <MessageSquare className="text-blue-600" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/artisan-profile"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-300 group-hover:to-blue-400 transition-all">
                    <User className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Edit Profile</h3>
                    <p className="text-sm text-gray-500">Update your info</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/my-jobs"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-300 group-hover:to-blue-400 transition-all">
                    <Briefcase className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">My Jobs</h3>
                    <p className="text-sm text-gray-500">View and manage jobs</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/reviews"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-300 group-hover:to-blue-400 transition-all">
                    <Star className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Reviews</h3>
                    <p className="text-sm text-gray-500">See customer feedback</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/messages"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-gradient-to-br group-hover:from-blue-300 group-hover:to-blue-400 transition-all">
                    <MessageSquare className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-500">Chat with customers</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Two Column Layout: Profile Completion & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Profile Completion Card */}
            <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">Complete Your Profile</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray="352"
                      strokeDashoffset="88"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">75%</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-2 mb-4 text-sm text-blue-100">
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-white" />
                  Email verified
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-white" />
                  Phone verified
                </li>
                <li className="flex items-center">
                  <Circle size={16} className="mr-2 text-blue-300" />
                  Add portfolio
                </li>
                <li className="flex items-center">
                  <Circle size={16} className="mr-2 text-blue-300" />
                  Complete bio
                </li>
              </ul>
              <Link
                to="/artisan-profile"
                className="inline-flex items-center w-full justify-center px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 transition-all font-semibold"
              >
                Complete Profile
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>

            {/* Recent Activity Timeline */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <Link to="/my-jobs" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentJobs.length > 0 ? (
                  recentJobs.slice(0, 4).map((job, index) => (
                    <div key={job._id} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        {job.status === 'completed' ? (
                          <CheckCircle className="text-blue-600" size={20} />
                        ) : job.status === 'in_progress' ? (
                          <Activity className="text-blue-600" size={20} />
                        ) : (
                          <Clock className="text-blue-600" size={20} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {job.status === 'completed' ? 'Job completed' :
                            job.status === 'in_progress' ? 'Job in progress' :
                              'New job request'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{job.title}</p>
                      </div>
                      <div className="flex-shrink-0 text-xs text-gray-400">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Jobs - Premium Marketplace Experience */}
          <div className="mb-8">
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Jobs</h2>
                  <p className="text-gray-500">Track, manage and review all your submitted job requests.</p>
                </div>
                <Link to="/my-jobs" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                  View All Jobs
                  <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="declined">Declined</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="budget_high">Highest Budget</option>
                    <option value="budget_low">Lowest Budget</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Jobs Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="text-blue-600" size={20} />
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Total</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
                <p className="text-sm text-gray-600 mt-1">All Jobs</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Done</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.completedJobs}</p>
                <p className="text-sm text-gray-600 mt-1">Completed</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="text-amber-600" size={20} />
                  <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Active</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="text-gray-600" size={20} />
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Declined</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-1">Declined</p>
              </div>
            </div>

            {/* Job Cards */}
            {recentJobs.length > 0 ? (
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div
                    key={job._id}
                    className="group bg-white rounded-[20px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-100/60 hover:to-blue-200/60"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Left Side - Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title and Status */}
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${job.status === 'completed' ? 'bg-green-100 text-green-700' :
                            job.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                              job.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                job.status === 'declined' ? 'bg-red-100 text-red-700' :
                                  'bg-gray-100 text-gray-700'
                            }`}>
                            {job.status === 'completed' ? (
                              <CheckCircle size={14} className="mr-1.5" />
                            ) : job.status === 'in_progress' ? (
                              <Activity size={14} className="mr-1.5" />
                            ) : job.status === 'pending' ? (
                              <Clock size={14} className="mr-1.5" />
                            ) : job.status === 'declined' ? (
                              <AlertCircle size={14} className="mr-1.5" />
                            ) : (
                              <Circle size={14} className="mr-1.5" />
                            )}
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                          {job.description}
                        </p>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                            <Calendar size={14} className="mr-1.5" />
                            {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                            <Clock size={14} className="mr-1.5" />
                            {Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 60 * 60 * 24))} days ago
                          </span>
                        </div>
                      </div>

                      {/* Right Side - Price and Actions */}
                      <div className="flex lg:flex-col items-start lg:items-end justify-between gap-4 lg:min-w-[180px]">
                        {/* Budget */}
                        <div className="text-right">
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Budget</p>
                          <p className="text-3xl font-extrabold text-blue-600">
                            GHS {job.budget?.toLocaleString() || '0'}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/job/${job._id}`}
                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link"
                          >
                            View Details
                            <ArrowRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical size={18} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[20px] p-16 text-center border border-gray-200">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Briefcase className="text-gray-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No jobs yet</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  When customers book your services, they'll appear here. Start browsing to find your next opportunity.
                </p>
                <Link
                  to="/browse"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Browse Jobs
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtisanDashboard;
