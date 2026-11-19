import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Calendar, Clock, Star, Plus, MessageSquare, Heart, CheckCircle, AlertCircle, Home, Search, Settings, User, ArrowRight, X, Menu, TrendingUp, Users, FileText, Activity, Circle, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalSpent: 0,
    favoriteArtisans: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch customer's bookings
        const bookingsResponse = await axios.get(`${API_URL}/api/jobs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const bookings = bookingsResponse.data;
        setRecentBookings(bookings.slice(0, 5));

        // Calculate stats
        const completedBookings = bookings.filter(booking => booking.status === 'completed');
        const totalSpent = completedBookings.reduce((sum, booking) => sum + (booking.artisan_charge || 0), 0);

        setStats({
          totalBookings: bookings.length,
          activeBookings: bookings.filter(booking => booking.status === 'in_progress').length,
          completedBookings: completedBookings.length,
          pendingBookings: bookings.filter(booking => booking.status === 'pending').length,
          totalSpent: totalSpent,
          favoriteArtisans: 0, // TODO: Fetch from favorites API
        });

        // Fetch categories for popular services
        const categoriesResponse = await axios.get(`${API_URL}/api/categories`);
        setCategories(categoriesResponse.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={20} />;
      case 'pending':
        return <AlertCircle className="text-yellow-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
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
                  Find trusted professionals for any service. Connect with skilled artisans across Ghana and get your projects done with confidence.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    Browse Services
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link
                    to="/post-job"
                    className="inline-flex items-center px-6 py-3 bg-blue-500/20 text-white border border-blue-400/30 rounded-xl hover:bg-blue-500/30 transition-all font-semibold backdrop-blur-sm"
                  >
                    <Plus size={18} className="mr-2" />
                    Post a Request
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="hidden lg:block flex-shrink-0">
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 to-transparent rounded-2xl"></div>
                  <img
                    src="/images/HOW IT GOES.jpg"
                    alt="Skilled Artisans"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Total Bookings</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalBookings}</p>
                  <p className="text-xs text-gray-400 mt-2">All time bookings</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Briefcase className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Completed</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.completedBookings}</p>
                  <p className="text-xs text-gray-400 mt-2">Successfully finished</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <CheckCircle className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Pending</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.pendingBookings}</p>
                  <p className="text-xs text-gray-400 mt-2">Awaiting response</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Clock className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">In Progress</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.activeBookings}</p>
                  <p className="text-xs text-gray-400 mt-2">Currently active</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Activity className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Total Spent */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Total Spent</p>
                  <p className="text-4xl font-bold text-gray-900">GHS {stats.totalSpent}</p>
                  <p className="text-xs text-gray-400 mt-2">Lifetime spending</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <TrendingUp className="text-blue-600" size={28} />
                </div>
              </div>
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Favorites</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.favoriteArtisans}</p>
                  <p className="text-xs text-gray-400 mt-2">Saved artisans</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <Heart className="text-blue-600" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/browse"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Search className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Find a Service</h3>
                    <p className="text-sm text-gray-500">Browse artisans</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/post-job"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Plus className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Post a Request</h3>
                    <p className="text-sm text-gray-500">Get quotes</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/my-bookings"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">My Bookings</h3>
                    <p className="text-sm text-gray-500">View jobs</p>
                  </div>
                </div>
              </Link>

              <Link
                to="/messages"
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <MessageSquare className="text-blue-600" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-500">Chat with artisans</p>
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
                  Add profile photo
                </li>
                <li className="flex items-center">
                  <Circle size={16} className="mr-2 text-blue-300" />
                  Complete bio
                </li>
              </ul>
              <Link
                to="/profile"
                className="inline-flex items-center w-full justify-center px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold"
              >
                Complete Profile
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>

            {/* Recent Activity Timeline */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <Link to="/my-bookings" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View All
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              <div className="space-y-4">
                {recentBookings.length > 0 ? (
                  recentBookings.slice(0, 4).map((booking, index) => (
                    <div key={booking._id} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        {booking.status === 'completed' ? (
                          <CheckCircle className="text-blue-600" size={20} />
                        ) : booking.status === 'in_progress' ? (
                          <Activity className="text-blue-600" size={20} />
                        ) : (
                          <Clock className="text-blue-600" size={20} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {booking.status === 'completed' ? 'Booking completed' :
                            booking.status === 'in_progress' ? 'Service in progress' :
                              'Booking submitted'}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{booking.title}</p>
                      </div>
                      <div className="flex-shrink-0 text-xs text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString()}
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

          {/* Recent Bookings */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
              <Link to="/my-bookings" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {recentBookings.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {recentBookings.map((booking) => (
                    <div key={booking._id} className="p-6 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{booking.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{booking.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              {getStatusIcon(booking.status)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          <p className="text-xl font-bold text-gray-900">GHS {booking.budget}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-blue-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-6">Once you book a service, your recent bookings will appear here.</p>
                <Link
                  to="/browse"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Browse Services
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
