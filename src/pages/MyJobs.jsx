import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Clock, AlertCircle, Check, X, ChevronRight, MoreVertical, Hammer, Zap, Palette, Scissors, Sparkles, Leaf, Wrench, User, Mail, Briefcase } from 'lucide-react';
import axios from 'axios';

const MyJobs = () => {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchJobs();
  }, [location, refreshKey]);

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey(location.state.refresh);
    }
  }, [location.state]);

  const filteredJobs = filter === 'all'
    ? jobs
    : jobs.filter(job => job.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'accepted': return 'bg-blue-100 text-blue-700';
      case 'declined': return 'bg-red-100 text-red-700';
      case 'in_progress': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} className="mr-1.5" />;
      case 'accepted': return <Check size={14} className="mr-1.5" />;
      case 'declined': return <X size={14} className="mr-1.5" />;
      case 'in_progress': return <AlertCircle size={14} className="mr-1.5" />;
      case 'completed': return <Check size={14} className="mr-1.5" />;
      default: return <Clock size={14} className="mr-1.5" />;
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

  const getCategoryIcon = (category) => {
    const categoryLower = category?.toLowerCase() || '';
    if (categoryLower.includes('carpentry') || categoryLower.includes('wood')) return <Hammer size={24} className="text-blue-600" />;
    if (categoryLower.includes('electric') || categoryLower.includes('power')) return <Zap size={24} className="text-blue-600" />;
    if (categoryLower.includes('paint') || categoryLower.includes('art')) return <Palette size={24} className="text-blue-600" />;
    if (categoryLower.includes('beauty') || categoryLower.includes('hair')) return <Scissors size={24} className="text-blue-600" />;
    if (categoryLower.includes('clean')) return <Sparkles size={24} className="text-blue-600" />;
    if (categoryLower.includes('garden') || categoryLower.includes('plant')) return <Leaf size={24} className="text-blue-600" />;
    if (categoryLower.includes('plumb')) return <Wrench size={24} className="text-blue-600" />;
    return <Briefcase size={24} className="text-blue-600" />;
  };

  const toggleCardExpansion = (jobId) => {
    setExpandedCards(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const getJobCounts = () => {
    return {
      all: jobs.length,
      pending: jobs.filter(j => j.status === 'pending').length,
      accepted: jobs.filter(j => j.status === 'accepted').length,
      in_progress: jobs.filter(j => j.status === 'in_progress').length,
      completed: jobs.filter(j => j.status === 'completed').length,
      declined: jobs.filter(j => j.status === 'declined').length,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-6 lg:p-8 mb-8 overflow-hidden shadow-xl">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1 max-w-xl">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                My Jobs
              </h1>
              <p className="text-blue-100 text-base mb-4 leading-relaxed">
                Manage your job requests, track progress, and grow your business. Connect with customers and deliver exceptional service.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/browse"
                  className="inline-flex items-center px-5 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Browse Services
                  <ChevronRight size={16} className="ml-2" />
                </Link>
                <Link
                  to="/artisan-profile"
                  className="inline-flex items-center px-5 py-2.5 bg-blue-500/20 text-white border border-blue-400/30 rounded-xl hover:bg-blue-500/30 transition-all font-semibold backdrop-blur-sm"
                >
                  <User size={16} className="mr-2" />
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block flex-shrink-0">
              <div className="relative w-56 h-56">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 to-transparent rounded-2xl"></div>
                <img
                  src="/images/MY JOB Page Hero.jpg"
                  alt="My Jobs"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Total</p>
            <p className="text-3xl font-bold text-gray-900">{getJobCounts().all}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200">
            <p className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-1">Pending</p>
            <p className="text-3xl font-bold text-gray-900">{getJobCounts().pending}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">Accepted</p>
            <p className="text-3xl font-bold text-gray-900">{getJobCounts().accepted}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200">
            <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">In Progress</p>
            <p className="text-3xl font-bold text-gray-900">{getJobCounts().in_progress}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
            <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Completed</p>
            <p className="text-3xl font-bold text-gray-900">{getJobCounts().completed}</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-5 border border-red-200">
            <p className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">Declined</p>
            <p className="text-3xl font-bold text-gray-900">{getJobCounts().declined}</p>
          </div>
        </div>

        {/* Premium Filter Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-8 inline-flex gap-2 flex-wrap">
          {[
            { value: 'all', label: 'All' },
            { value: 'pending', label: 'Pending' },
            { value: 'accepted', label: 'Accepted' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
            { value: 'declined', label: 'Declined' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${filter === tab.value
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {tab.label} ({getJobCounts()[tab.value]})
            </button>
          ))}
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[20px] p-16 text-center border border-gray-200">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Briefcase className="text-gray-400" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No jobs found</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              {filter === 'all'
                ? "You don't have any job requests yet. Wait for customers to post jobs to you!"
                : `No jobs with status "${filter}"`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-[20px] shadow-sm hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-300 overflow-hidden"
              >
                {/* Card Header - Always Visible */}
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Category Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                      {getCategoryIcon(job.category)}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title and Status */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          {getStatusLabel(job.status)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                          <MapPin size={14} className="mr-1.5" />
                          {job.job_address || 'Not specified'}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                          <Calendar size={14} className="mr-1.5" />
                          {new Date(job.requested_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700">
                          <DollarSign size={14} className="mr-1.5" />
                          GHS {job.artisan_charge || 'Not specified'}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/job/${job._id}`}
                          className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link"
                        >
                          Open Job
                          <ChevronRight size={16} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>
                        <button
                          onClick={() => toggleCardExpansion(job._id)}
                          className="ml-auto text-sm text-gray-500 hover:text-gray-700 font-medium"
                        >
                          {expandedCards[job._id] ? 'Show Less' : 'Show Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Customer Section */}
                {expandedCards[job._id] && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Customer</p>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{job.customer_id?.name || 'Unknown'}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <Mail size={14} />
                            {job.customer_id?.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
