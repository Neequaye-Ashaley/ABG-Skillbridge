import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Shield, Clock, SlidersHorizontal, ChevronDown, ArrowRight, Briefcase, Users, TrendingUp } from 'lucide-react';
import axios from 'axios';

const BrowseServices = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const locations = ['all', 'Accra', 'Kumasi', 'Tamale'];
  const priceRanges = ['all', '0-50', '50-100', '100-200', '200+'];
  const ratings = ['all', '4.5+', '4.0+', '3.5+'];

  const stats = {
    totalArtisans: artisans.length,
    totalCategories: categories.length,
    avgRating: artisans.length > 0
      ? (artisans.reduce((sum, a) => sum + (a.artisan_profile?.rating_avg || 0), 0) / artisans.length).toFixed(1)
      : 0,
    totalJobs: artisans.reduce((sum, a) => sum + (a.artisan_profile?.total_jobs_completed || 0), 0),
  };

  // Fetch artisans and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artisansResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/users/artisans', {
            params: searchTerm ? { search: searchTerm } : {}
          }),
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
  }, [searchTerm]);

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesCategory = !selectedCategory ||
      (artisan.artisan_profile?.categories || []).some(cat => cat._id === selectedCategory);

    const matchesLocation = selectedLocation === 'all' ||
      (artisan.location_address || '').toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesPrice = priceRange === 'all' ||
      (() => {
        const [min, max] = priceRange.split('-').map(Number);
        const artisanPrice = artisan.artisan_profile?.base_price_range?.min || 0;
        if (priceRange === '200+') return artisanPrice >= 200;
        return artisanPrice >= min && artisanPrice <= max;
      })();

    const matchesRating = ratingFilter === 'all' ||
      (() => {
        const minRating = parseFloat(ratingFilter.replace('+', ''));
        return (artisan.artisan_profile?.rating_avg || 0) >= minRating;
      })();

    return matchesCategory && matchesLocation && matchesPrice && matchesRating;
  });

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
                  src="/images/Artisan%20Page%20Hero.jpg"
                  alt="Browse Services"
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
                Browse Services
              </h1>
              <p className="text-blue-100 text-base lg:text-lg mb-6 leading-relaxed">
                Find the perfect service provider for your needs. Connect with trusted artisans across Ghana.
              </p>
              <div className="flex flex-wrap gap-3 justify-end">
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Back to Home
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
              <Users className="text-blue-600" size={20} />
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Artisans</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalArtisans}</p>
            <p className="text-sm text-gray-600 mt-1">Total Artisans</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="text-purple-600" size={20} />
              <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Categories</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalCategories}</p>
            <p className="text-sm text-gray-600 mt-1">Service Types</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <Star className="text-amber-600" size={20} />
              <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">Rating</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
            <p className="text-sm text-gray-600 mt-1">Avg Rating</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-green-600" size={20} />
              <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Jobs</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
            <p className="text-sm text-gray-600 mt-1">Completed</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search artisans or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg font-semibold whitespace-nowrap"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
              <ChevronDown size={20} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory || 'all'}
                  onChange={(e) => setSelectedCategory(e.target.value === 'all' ? null : e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (GHS)</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range === 'all' ? 'All Prices' : range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                >
                  {ratings.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating === 'all' ? 'All Ratings' : rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(selectedCategory || selectedLocation !== 'all' || priceRange !== 'all' || ratingFilter !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center border border-blue-100">
                  {categories.find(c => c._id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedLocation !== 'all' && (
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center border border-blue-100">
                  {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation('all')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center border border-blue-100">
                  GHS {priceRange}
                  <button
                    onClick={() => setPriceRange('all')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {ratingFilter !== 'all' && (
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center border border-blue-100">
                  {ratingFilter} stars
                  <button
                    onClick={() => setRatingFilter('all')}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedLocation('all');
                  setPriceRange('all');
                  setRatingFilter('all');
                }}
                className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Category Chips */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${!selectedCategory
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                }`}
            >
              All Services
            </button>
            {categories.slice(0, 9).map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category._id ? null : category._id
                )}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${selectedCategory === category._id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100'
                  }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading artisans...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600 font-medium">
                Showing <span className="font-semibold text-gray-900">{filteredArtisans.length}</span> {filteredArtisans.length === 1 ? 'artisan' : 'artisans'}
              </p>
              <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all font-medium">
                <option>Sort by: Recommended</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Price: Low to High</option>
                <option>Sort by: Price: High to Low</option>
                <option>Sort by: Most Jobs</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtisans.map((artisan) => (
                <div
                  key={artisan._id}
                  className="group bg-white rounded-[20px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-100/60 hover:to-blue-200/60"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {artisan.artisan_profile?.profile_image ? (
                      <img
                        src={artisan.artisan_profile.profile_image.startsWith('http')
                          ? artisan.artisan_profile.profile_image
                          : `http://localhost:5000${artisan.artisan_profile.profile_image}`}
                        alt={artisan.name}
                        className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl font-bold text-blue-600">
                          {artisan.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{artisan.name}</h3>
                        <Shield size={16} className="text-green-500 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" size={16} />
                          <span className="text-sm font-medium text-gray-700 ml-1">
                            {artisan.artisan_profile?.rating_avg || 'N/A'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-400">
                          ({artisan.artisan_profile?.total_jobs_completed || 0} jobs)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span className="truncate">{artisan.location_address || 'Location not specified'}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {artisan.artisan_profile?.bio || 'No bio available'}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(artisan.artisan_profile?.categories || []).slice(0, 3).map((category) => (
                      <span
                        key={category._id}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                      >
                        {category.icon} {category.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{artisan.artisan_profile?.years_of_experience || 0} years exp.</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gray-900">
                        {artisan.artisan_profile?.base_price_range ?
                          `GHS ${artisan.artisan_profile.base_price_range.min} - ${artisan.artisan_profile.base_price_range.max}` :
                          'Contact for pricing'
                        }
                      </span>
                    </div>
                    <Link
                      to={`/artisan/${artisan._id}`}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredArtisans.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <Filter className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No artisans found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setSelectedLocation('all');
                    setPriceRange('all');
                    setRatingFilter('all');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default BrowseServices;
