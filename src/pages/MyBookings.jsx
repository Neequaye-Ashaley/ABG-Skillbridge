import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plus, Calendar, MapPin, DollarSign, Clock, AlertCircle, Briefcase, CheckCircle, Star, ArrowRight, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const MyBookings = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [reviewedJobs, setReviewedJobs] = useState(new Set());

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBookings(response.data);

      // Check which completed jobs have reviews
      const completedJobs = response.data.filter(b => b.status === 'completed');
      const reviewChecks = completedJobs.map(job =>
        axios.get(`${API_URL}/api/reviews/job/${job._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => ({ jobId: job._id, hasReview: !!res.data }))
          .catch(() => ({ jobId: job._id, hasReview: false }))
      );

      const reviewResults = await Promise.all(reviewChecks);
      const reviewedIds = new Set(reviewResults.filter(r => r.hasReview).map(r => r.jobId));
      setReviewedJobs(reviewedIds);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBookings();
  }, [location, refreshKey]);

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey(location.state.refresh);
    }
  }, [location.state]);

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === filter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    inProgress: bookings.filter(b => b.status === 'in_progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Accepted';
      case 'declined': return 'Declined';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-blue-600" size={20} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={20} />;
      case 'accepted':
        return <Briefcase className="text-blue-600" size={20} />;
      case 'pending':
        return <AlertCircle className="text-blue-600" size={20} />;
      case 'declined':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-blue-600" size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-5 lg:p-6 mb-8 overflow-hidden shadow-xl">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Side - Image */}
            <div className="hidden lg:block flex-shrink-0">
              <div className="relative w-64 h-48">
                <img
                  src="/images/MY-BOOKINGS.jpg"
                  alt="My Bookings"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                {/* Blue gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(37, 99, 235, 0.2) 0%, rgba(29, 78, 216, 0.4) 50%, rgba(30, 64, 175, 0.6) 100%)'
                  }}
                ></div>
              </div>
            </div>

            {/* Right Side - Text */}
            <div className="flex-1 max-w-lg text-right">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                My Bookings
              </h1>
              <p className="text-blue-100 text-base lg:text-lg mb-6 leading-relaxed">
                Manage your job requests and track their progress. Find trusted artisans for all your needs.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link
                  to="/browse"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Find Artisans
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="text-blue-600" size={20} />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Total</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">All Bookings</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="text-amber-600" size={20} />
              <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Pending</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-sm text-gray-600 mt-1">Awaiting</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="text-purple-600" size={20} />
              <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Active</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
            <p className="text-sm text-gray-600 mt-1">In Progress</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Done</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-sm text-gray-600 mt-1">Completed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${filter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${filter === 'pending'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('accepted')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${filter === 'accepted'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'}`}
            >
              Accepted
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${filter === 'in_progress'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${filter === 'completed'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'}`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('declined')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${filter === 'declined'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'}`}
            >
              Declined
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter === 'all'
                ? "You haven't posted any jobs yet. Start by finding an artisan!"
                : `No bookings with status "${filter}"`}
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
            >
              <Plus size={20} />
              Find Artisans
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="group bg-white rounded-[20px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-100/60 hover:to-blue-200/60"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left Side - Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Status */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {booking.title}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1.5">{getStatusLabel(booking.status)}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {booking.description}
                    </p>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                        <DollarSign size={14} className="mr-1.5" />
                        GHS {booking.artisan_charge || 'Not specified'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                        <MapPin size={14} className="mr-1.5" />
                        {booking.job_address || 'Not specified'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                        <Calendar size={14} className="mr-1.5" />
                        {new Date(booking.requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    {booking.artisan_id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Assigned to:</p>
                        <p className="font-semibold text-gray-800">{booking.artisan_id.name}</p>
                      </div>
                    )}

                    {booking.status === 'completed' && !reviewedJobs.has(booking._id) && (
                      <div className="mt-4">
                        <Link
                          to={`/review/${booking._id}`}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all font-semibold shadow-md hover:shadow-lg"
                        >
                          <Star size={18} className="mr-2" />
                          Leave Review
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Actions */}
                  <div className="flex lg:flex-col items-start lg:items-end justify-between gap-4 lg:min-w-[140px]">
                    <Link
                      to={`/job/${booking._id}`}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link"
                    >
                      View Details
                      <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
