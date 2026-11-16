import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, MapPin, Calendar, DollarSign } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PostJob = () => {
  const { artisanId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [artisan, setArtisan] = useState(null);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    budget: '',
    deadline: '',
    location_address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artisanResponse, categoriesResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${artisanId}`),
          axios.get('http://localhost:5000/api/categories')
        ]);
        setArtisan(artisanResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (artisanId) {
      fetchData();
    }
  }, [artisanId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        budget: parseFloat(formData.budget),
        artisan_id: artisanId,
        job_location: {
          lat: 5.6037, // Ghana center latitude (default)
          lng: -0.1870, // Ghana center longitude (default)
        },
        job_address: formData.location_address,
      };

      await axios.post('http://localhost:5000/api/jobs', jobData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setSuccess('Job posted successfully!');
      setTimeout(() => {
        navigate('/customer-dashboard');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to post job');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={`/artisan/${artisanId}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Artisan Profile
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
          <p className="text-gray-600 mt-2">
            {artisan ? `Post a job request to ${artisan.name}` : 'Loading artisan info...'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Fix leaking kitchen sink"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Describe the job in detail including what needs to be done, any specific requirements, etc."
                />
              </div>

              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Category *
                </label>
                <select
                  id="category_id"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Budget & Schedule */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget & Schedule</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (GHS) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="budget"
                    type="number"
                    min="0"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Deadline
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Location</h2>
            
            <div>
              <label htmlFor="location_address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="location_address"
                  type="text"
                  value={formData.location_address}
                  onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              to={`/artisan/${artisanId}`}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <X size={20} />
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
