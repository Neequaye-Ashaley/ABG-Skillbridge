import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, Mail, Clock, Shield, Calendar, Award, MessageCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ArtisanProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [artisan, setArtisan] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch artisan data
  useEffect(() => {
    const fetchArtisanData = async () => {
      try {
        const [artisanResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${id}`),
          axios.get(`http://localhost:5000/api/reviews/artisan/${id}`)
        ]);
        setArtisan(artisanResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtisanData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading artisan profile...</p>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Artisan Not Found</h2>
          <Link to="/" className="text-primary-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const artisanCategories = artisan.artisan_profile?.categories || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Profile Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-[28px] shadow-xl p-8 lg:p-10 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left - Profile Image */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
              <div className="relative">
                {artisan.artisan_profile?.profile_image ? (
                  <img
                    src={`http://localhost:5000${artisan.artisan_profile.profile_image}`}
                    alt={artisan.name}
                    className="w-48 h-48 lg:w-56 lg:h-56 rounded-[24px] object-cover shadow-2xl border-4 border-blue-200"
                  />
                ) : (
                  <div className="w-48 h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-blue-100 to-blue-200 rounded-[24px] flex items-center justify-center shadow-2xl border-4 border-blue-200">
                    <span className="text-7xl lg:text-8xl font-bold text-blue-600">
                      {artisan.name.charAt(0)}
                    </span>
                  </div>
                )}
                {artisan.is_active && (
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                    <Shield size={16} />
                    <span className="text-sm font-semibold">VERIFIED</span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex flex-col items-center lg:items-start gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">{artisan.artisan_profile?.rating_avg || 'N/A'}</span>
                  <span className="text-gray-400">•</span>
                  <span>{artisan.artisan_profile?.total_jobs_completed || 0} jobs completed</span>
                </div>
              </div>
            </div>

            {/* Center - Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{artisan.name}</h1>
                    <p className="text-lg text-gray-600">Professional Artisan</p>
                  </div>
                  {isAuthenticated && user?._id !== artisan._id ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      {artisan.artisan_profile?.is_available ? (
                        <button
                          onClick={() => navigate(`/post-job/${artisan._id}`)}
                          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl"
                        >
                          <Calendar size={20} />
                          <span>Hire Artisan</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg">
                          <Clock size={20} />
                          <span>Unavailable</span>
                        </div>
                      )}
                    </div>
                  ) : !isAuthenticated ? (
                    <div className="flex gap-3">
                      {artisan.artisan_profile?.is_available ? (
                        <button
                          onClick={() => navigate('/login')}
                          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl"
                        >
                          <Calendar size={20} />
                          <span>Login to Hire</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg">
                          <Clock size={20} />
                          <span>Unavailable</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{artisan.location_address || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <Clock size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="text-sm font-semibold text-gray-800">{artisan.artisan_profile?.years_of_experience || 0} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <Mail size={20} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{artisan.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                  <p className="text-gray-600 leading-relaxed">{artisan.artisan_profile?.bio || 'No bio available'}</p>
                </div>
              </div>
            </div>

            {/* Right - Trust Elements */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-sm font-semibold text-blue-800 mb-4 uppercase tracking-wide">Trust Score</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Response Rate</span>
                    <span className="text-sm font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg Reply Time</span>
                    <span className="text-sm font-semibold text-gray-800">2 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="text-sm font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reviews</span>
                    <span className="text-sm font-semibold text-gray-800">{reviews.length}</span>
                  </div>
                </div>
                {artisan.artisan_profile?.total_jobs_completed > 10 && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Award size={16} />
                      <span className="text-sm font-semibold">Top Rated Artisan</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Offered */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[24px] shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artisanCategories.length > 0 ? (
                  artisanCategories.map((category) => (
                    category && (
                      <div
                        key={category._id || category.name}
                        className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200 hover:shadow-md transition-all"
                      >
                        <span className="text-2xl">{category.icon || '🔧'}</span>
                        <span className="font-semibold text-gray-800">{category.name || 'Unknown Service'}</span>
                      </div>
                    )
                  ))
                ) : (
                  <div className="col-span-2 p-8 bg-gray-50 rounded-xl text-center">
                    <p className="text-gray-500">No services listed</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[24px] shadow p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Pricing</h2>
              <p className="text-blue-100 mb-6">Transparent pricing for quality service</p>
              {artisan.artisan_profile?.base_price_range ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                      <p className="text-blue-100 text-sm uppercase tracking-wide mb-1">Starting From</p>
                      <p className="text-4xl font-bold">
                        GHS {artisan.artisan_profile.base_price_range.min}
                      </p>
                    </div>
                    <div className="text-3xl text-blue-200">—</div>
                    <div className="text-center sm:text-right">
                      <p className="text-blue-100 text-sm uppercase tracking-wide mb-1">Up To</p>
                      <p className="text-4xl font-bold">
                        GHS {artisan.artisan_profile.base_price_range.max}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-blue-100 text-sm text-center">
                      * Final price may vary based on job complexity and duration
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <p className="text-xl">Contact for pricing</p>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[24px] shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                  {reviews.length}
                </span>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review._id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                size={20}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 bg-gray-50 rounded-2xl text-center">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No reviews yet.</p>
                  <p className="text-gray-400 text-sm mt-2">Be the first to review this artisan!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-[24px] shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                    <p className="font-semibold text-gray-800">{artisan.phone || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="font-semibold text-gray-800 truncate">{artisan.email || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="font-semibold text-gray-800">{artisan.location_address || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Response Time</p>
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-lg font-semibold text-green-600">Within 2 hours</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">Availability</p>
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800">Monday - Saturday</p>
                <p className="text-gray-600">8:00 AM - 6:00 PM</p>
              </div>

              {isAuthenticated && user?._id !== artisan._id && (
                artisan.artisan_profile?.is_available ? (
                  <button
                    onClick={() => navigate(`/post-job/${artisan._id}`)}
                    className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-lg hover:shadow-xl"
                  >
                    <Calendar size={20} />
                    <span>Post Job Now</span>
                  </button>
                ) : (
                  <div className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg">
                    <Clock size={20} />
                    <span>Unavailable</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
