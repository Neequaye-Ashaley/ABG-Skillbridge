import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, DollarSign, Clock, Check, X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { motion } from 'framer-motion';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log('Job data:', response.data);
        setJob(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleAccept = async () => {
    setActionLoading(true);
    try {
      await axios.put(`${API_URL}/api/jobs/${id}/accept`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJob({ ...job, status: 'accepted', artisan_id: user._id });
      setTimeout(() => {
        navigate(isCustomer ? '/my-bookings' : '/my-jobs', { state: { refresh: Date.now() } });
      }, 500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to accept job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecline = async () => {
    setActionLoading(true);
    try {
      await axios.put(`${API_URL}/api/jobs/${id}/decline`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJob({ ...job, status: 'declined' });
      setTimeout(() => {
        navigate(isCustomer ? '/my-bookings' : '/my-jobs', { state: { refresh: Date.now() } });
      }, 500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to decline job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async () => {
    setActionLoading(true);
    try {
      await axios.put(`${API_URL}/api/jobs/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJob({ ...job, status: 'completed' });
      setTimeout(() => {
        navigate('/my-jobs', { state: { refresh: Date.now() } });
      }, 500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to complete job');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStart = async () => {
    setActionLoading(true);
    try {
      await axios.put(`${API_URL}/api/jobs/${id}/start`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJob({ ...job, status: 'in_progress' });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to start job');
    } finally {
      setActionLoading(false);
    }
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

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="text-primary-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const isCustomer = user?.role === 'customer';
  const isArtisan = user?.role === 'artisan';
  const isJobCustomer = job?.customer_id?._id === user?._id;
  const isJobArtisan = job?.artisan_id?._id === user?._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={isCustomer ? '/my-bookings' : '/my-jobs'}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to {isCustomer ? 'My Bookings' : 'My Jobs'}
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-gray-900">{job?.title}</h1>
            <span className={`px-5 py-2.5 rounded-full text-sm font-semibold ${getStatusColor(job?.status)}`}>
              {getStatusLabel(job?.status)}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Job Details */}
        <div className="bg-white rounded-[20px] shadow-sm p-8 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job?.description}</p>
        </div>

        {/* Job Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Job Information</h2>
            <div className="space-y-5">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <DollarSign className="w-6 h-6 text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Budget</p>
                  <p className="text-xl font-bold text-gray-900">
                    GHS {job?.artisan_charge || 'Not specified'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-gray-900 font-semibold">{job?.job_address || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Requested</p>
                  <p className="text-gray-900 font-semibold">
                    {new Date(job?.requested_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Category</h2>
            <div className="flex items-center">
              <span className="px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl font-semibold text-lg">
                {job?.category_id?.icon} {job?.category_id?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Customer</h2>
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-blue-600">
                  {job?.customer_id?.name?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{job?.customer_id?.name}</p>
                <p className="text-gray-500">{job?.customer_id?.phone || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {job?.artisan_id && (
            <div className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Artisan</h2>
              <div className="flex items-center">
                {job?.artisan_id?.artisan_profile?.profile_image ? (
                  <img
                    src={job.artisan_id.artisan_profile.profile_image.startsWith('http') ? job.artisan_id.artisan_profile.profile_image : `${API_URL}${job.artisan_profile ? job.artisan_profile.profile_image : job.artisan_id.artisan_profile.profile_image}`}
                    alt={job?.artisan_id?.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-blue-200"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {job?.artisan_id?.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900 text-lg">{job?.artisan_id?.name}</p>
                  <p className="text-gray-500">{job?.artisan_id?.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isArtisan && job?.status === 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Actions</h2>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccept}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Check size={22} />
                {actionLoading ? 'Processing...' : 'Accept Job'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecline}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-bold shadow-md hover:shadow-lg transition-all"
              >
                <X size={22} />
                {actionLoading ? 'Processing...' : 'Decline Job'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {isArtisan && job?.status === 'accepted' && isJobArtisan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Actions</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Clock size={22} />
              {actionLoading ? 'Processing...' : 'Start Job'}
            </motion.button>
          </motion.div>
        )}

        {isArtisan && job?.status === 'in_progress' && isJobArtisan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-[20px] shadow-sm p-8 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Actions</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              disabled={actionLoading}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Check size={22} />
              {actionLoading ? 'Processing...' : 'Complete Job'}
            </motion.button>
          </motion.div>
        )}

        {job?.status === 'declined' && (
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-[20px] p-8">
            <div className="flex items-center">
              <X className="w-6 h-6 text-red-600 mr-4" size={24} />
              <p className="text-red-800 font-semibold text-lg">This job has been declined by the artisan.</p>
            </div>
          </div>
        )}

        {job?.status === 'completed' && (
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-[20px] p-8">
            <div className="flex items-center">
              <Check className="w-6 h-6 text-green-600 mr-4" size={24} />
              <p className="text-green-800 font-semibold text-lg">This job has been completed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
