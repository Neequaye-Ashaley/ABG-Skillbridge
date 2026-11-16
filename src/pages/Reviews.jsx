import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, AlertCircle, MapPin, Calendar, Wrench, MoreVertical, ChevronRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/artisan/${user._id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchReviews();
    }
  }, [user]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating, size = 20) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-${size} h-${size} ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
        size={size}
      />
    ));
  };

  const getRatingBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      breakdown[review.rating] = (breakdown[review.rating] || 0) + 1;
    });
    return breakdown;
  };

  const getRatingPercentage = (count) => {
    if (reviews.length === 0) return 0;
    return (count / reviews.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Reviews</h1>
          <p className="text-gray-600 text-lg">See feedback you've shared about completed services.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Overall Rating Section */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
          <div className="relative">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Overall Rating</h2>
            <div className="flex items-start gap-12">
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-6xl font-bold text-gray-900">{calculateAverageRating()}</span>
                  <span className="text-2xl text-gray-400">/ 5</span>
                </div>
                <p className="text-gray-600 mb-4">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                <div className="flex gap-1">
                  {renderStars(Math.round(calculateAverageRating()), 24)}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {[5, 4, 3, 2, 1].map(star => {
                  const breakdown = getRatingBreakdown();
                  const count = breakdown[star] || 0;
                  const percentage = getRatingPercentage(count);
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600 w-8">{star} star</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No reviews yet</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              You haven't received any reviews yet. Complete jobs to get reviews from customers!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-[20px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-blue-300 p-6 hover:bg-gradient-to-br hover:from-blue-100/80 hover:to-blue-200/60">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-blue-600">
                        {(review.customer_id?.name || 'A').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.customer_id?.name || 'Anonymous'}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating, 20)}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-gray-800 text-base leading-relaxed mb-4">{review.comment}</p>
                )}
                {/* Service Information Chips */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-medium text-blue-700">
                    <Wrench size={14} className="mr-1.5" />
                    Service
                  </span>
                  <span className="inline-flex items-center px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600">
                    <Calendar size={14} className="mr-1.5" />
                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {reviews.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-white rounded-[24px] border border-blue-100 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Your feedback matters</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Your feedback helps maintain service quality across Skillbridge.
            </p>
            <Link
              to="/browse-services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Browse Services
              <ChevronRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
