import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, Trash2, ToggleRight, ToggleLeft, Upload, Image as ImageIcon, Check, AlertCircle, Sparkles, Briefcase, Award, DollarSign, Clock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const EditArtisanProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    bio: '',
    qualifications: [],
    categories: [],
    years_of_experience: 0,
    base_price_range: { min: 0, max: 0 },
    past_works: [],
    is_available: true,
    phone: '',
  });

  const [newQualification, setNewQualification] = useState('');
  const [newPastWork, setNewPastWork] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [backgroundImagePreview, setBackgroundImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get(`${API_URL}/api/categories`);
        setCategories(categoriesResponse.data);

        // Fetch artisan profile
        const profileResponse = await axios.get(`${API_URL}/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const profile = profileResponse.data.artisan_profile;
        setFormData({
          bio: profile?.bio || '',
          qualifications: profile?.qualifications || [],
          categories: (profile?.categories || []).map(cat => cat._id),
          years_of_experience: profile?.years_of_experience || 0,
          base_price_range: profile?.base_price_range || { min: 0, max: 0 },
          past_works: profile?.past_works || [],
          is_available: profile?.is_available !== undefined ? profile.is_available : true,
          phone: profileResponse.data.phone || '',
        });
        setProfileImagePreview(profile?.profile_image || '');
        setBackgroundImagePreview(profile?.background_image || '');
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error response:', error.response?.data);
        setError(error.response?.data?.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchData();
    }
  }, [user]);

  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification.trim()]
      }));
      setNewQualification('');
    }
  };

  const handleRemoveQualification = (index) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index)
    }));
  };

  const handleAddPastWork = () => {
    if (newPastWork.trim()) {
      setFormData(prev => ({
        ...prev,
        past_works: [...prev.past_works, newPastWork.trim()]
      }));
      setNewPastWork('');
    }
  };

  const handleRemovePastWork = (index) => {
    setFormData(prev => ({
      ...prev,
      past_works: prev.past_works.filter((_, i) => i !== index)
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
      setBackgroundImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (imageType) => {
    const formData = new FormData();
    if (imageType === 'profile' && profileImage) {
      formData.append('profile_image', profileImage);
    } else if (imageType === 'background' && backgroundImage) {
      formData.append('background_image', backgroundImage);
    } else {
      return;
    }

    setUploading(true);
    try {
      const endpoint = imageType === 'profile'
        ? `${API_URL}/api/users/${user._id}/upload/profile`
        : `${API_URL}/api/users/${user._id}/upload/background`;

      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (imageType === 'profile') {
        setProfileImagePreview(response.data.profile_image);
        setProfileImage(null);
      } else {
        setBackgroundImagePreview(response.data.background_image);
        setBackgroundImage(null);
      }

      setSuccess(`${imageType === 'profile' ? 'Profile' : 'Background'} image uploaded successfully!`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Update artisan profile
      await axios.put(
        `${API_URL}/api/users/${user._id}/artisan-profile`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Update user phone number
      await axios.put(
        `${API_URL}/api/users/${user._id}`,
        { phone: formData.phone },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate('/artisan-dashboard');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="mb-8">
          <Link
            to="/artisan-dashboard"
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Your Profile</h1>
          <p className="text-gray-600 text-lg">Update your artisan profile information to attract more customers</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 flex items-center gap-3">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 flex items-center gap-3">
            <Check size={20} />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Images */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <ImageIcon size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Profile Images</h2>
                <p className="text-sm text-gray-500">Upload your profile photo and card background</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Profile Photo
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:border-blue-400 transition-colors bg-gray-50">
                  {profileImagePreview ? (
                    <div className="relative">
                      <img
                        src={profileImagePreview.startsWith('http') ? profileImagePreview : `${API_URL}${profileImagePreview}`}
                        alt="Profile preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProfileImage(null);
                          setProfileImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No profile image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    onChange={handleProfileImageChange}
                    className="mt-3 w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  />
                  {profileImage && (
                    <button
                      type="button"
                      onClick={() => handleImageUpload('profile')}
                      disabled={uploading}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Upload size={18} />
                      {uploading ? 'Uploading...' : 'Upload Profile Image'}
                    </button>
                  )}
                </div>
              </div>

              {/* Background Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Card Background Image
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:border-blue-400 transition-colors bg-gray-50">
                  {backgroundImagePreview ? (
                    <div className="relative">
                      <img
                        src={backgroundImagePreview.startsWith('http') ? backgroundImagePreview : `${API_URL}${backgroundImagePreview}`}
                        alt="Background preview"
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setBackgroundImage(null);
                          setBackgroundImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No background image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    onChange={handleBackgroundImageChange}
                    className="mt-3 w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  />
                  {backgroundImage && (
                    <button
                      type="button"
                      onClick={() => handleImageUpload('background')}
                      disabled={uploading}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      <Upload size={18} />
                      {uploading ? 'Uploading...' : 'Upload Background Image'}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-400 flex items-center gap-1">
              <Sparkles size={12} />
              Accepted formats: JPEG, JPG, PNG, WebP, AVIF. Maximum file size: 5MB.
            </p>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Sparkles size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">About You</h2>
                <p className="text-sm text-gray-500">Share your story and expertise</p>
              </div>
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-3">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="Tell customers about your skills, experience, and what makes you unique..."
              />
            </div>

            <div className="mt-6">
              <label htmlFor="years_of_experience" className="block text-sm font-semibold text-gray-700 mb-3">
                Years of Experience
              </label>
              <input
                id="years_of_experience"
                type="number"
                min="0"
                value={formData.years_of_experience}
                onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="0"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="e.g., 0241234567"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Briefcase size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Services You Offer</h2>
                <p className="text-sm text-gray-500">Select the services you provide</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => handleCategoryToggle(category._id)}
                  className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${formData.categories.includes(category._id)
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <span>{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Award size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Qualifications</h2>
                <p className="text-sm text-gray-500">Add your certifications and credentials</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {formData.qualifications.map((qual, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="flex-1 text-sm font-medium text-gray-700">{qual}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveQualification(index)}
                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddQualification())}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="Add a qualification (e.g., Certified Electrician)"
              />
              <button
                type="button"
                onClick={handleAddQualification}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Price Range (GHS)</h2>
                <p className="text-sm text-gray-500">Set your service pricing</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minPrice" className="block text-sm font-semibold text-gray-700 mb-3">
                  Minimum
                </label>
                <input
                  id="minPrice"
                  type="number"
                  min="0"
                  value={formData.base_price_range.min}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_price_range: { ...formData.base_price_range, min: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="0"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-700 mb-3">
                  Maximum
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  min="0"
                  value={formData.base_price_range.max}
                  onChange={(e) => setFormData({
                    ...formData,
                    base_price_range: { ...formData.base_price_range, max: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Past Works */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Sparkles size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Portfolio / Past Works</h2>
                <p className="text-sm text-gray-500">Showcase your previous work</p>
              </div>
            </div>
            <div className="space-y-3 mb-4">
              {formData.past_works.map((work, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="flex-1 text-sm font-medium text-gray-700 truncate">{work}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePastWork(index)}
                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={newPastWork}
                onChange={(e) => setNewPastWork(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPastWork())}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                placeholder="Add image URL (e.g., https://example.com/work.jpg)"
              />
              <button
                type="button"
                onClick={handleAddPastWork}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Clock size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Availability Status</h2>
                <p className="text-sm text-gray-500">Control when you receive new job requests</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_available: !formData.is_available })}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all font-semibold ${formData.is_available
                ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-2 border-green-300 hover:from-green-100 hover:to-green-200'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-2 border-gray-300 hover:from-gray-100 hover:to-gray-200'
                }`}
            >
              {formData.is_available ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
              <span className="text-lg">
                {formData.is_available ? 'Available for new jobs' : 'Not accepting new jobs'}
              </span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              to="/artisan-dashboard"
              className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 flex items-center gap-2 font-semibold transition-all"
            >
              <X size={20} />
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transition-all"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArtisanProfile;
