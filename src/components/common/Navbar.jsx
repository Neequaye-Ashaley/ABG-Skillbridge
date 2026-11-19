import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, LogIn, LogOut, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount();
    }
  }, [isAuthenticated, location]);

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notifications/unread`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUnreadCount(response.data.length);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Expose fetchUnreadCount globally for Notifications page to call
  useEffect(() => {
    window.updateUnreadCount = fetchUnreadCount;
    return () => {
      delete window.updateUnreadCount;
    };
  }, [fetchUnreadCount]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const getActiveRoute = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/browse') return 'browse';
    if (path === '/customer-dashboard' || path === '/artisan-dashboard') return 'dashboard';
    if (path === '/my-bookings') return 'bookings';
    if (path === '/messages') return 'messages';
    if (path === '/my-jobs') return 'jobs';
    if (path === '/artisan-profile') return 'profile';
    if (path === '/reviews') return 'reviews';
    return null;
  };

  const activeRoute = getActiveRoute();

  const NavLink = ({ to, children, active }) => (
    <Link
      to={to}
      className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${active
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo - LEFT */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Skill<span className="text-blue-600">bridge</span></span>
            </Link>
          </div>

          {/* Desktop Navigation - CENTER */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={activeRoute === 'home'}>Home</NavLink>

            {isAuthenticated ? (
              <>
                {user?.role === 'customer' ? (
                  <>
                    <NavLink to="/browse" active={activeRoute === 'browse'}>Browse Services</NavLink>
                    <NavLink to="/customer-dashboard" active={activeRoute === 'dashboard'}>Dashboard</NavLink>
                    <NavLink to="/my-bookings" active={activeRoute === 'bookings'}>My Bookings</NavLink>
                    <NavLink to="/about">About</NavLink>

                  </>
                ) : (
                  <>
                    <NavLink to="/artisan-dashboard" active={activeRoute === 'dashboard'}>Dashboard</NavLink>
                    <NavLink to="/my-jobs" active={activeRoute === 'jobs'}>My Jobs</NavLink>
                    <NavLink to="/artisan-profile" active={activeRoute === 'profile'}>Edit Profile</NavLink>
                    <NavLink to="/reviews" active={activeRoute === 'reviews'}>Reviews</NavLink>
                    <NavLink to="/about">About</NavLink>
                  </>
                )}
              </>
            ) : (
              <>
                <NavLink to="/browse" active={activeRoute === 'browse'}>Browse Services</NavLink>
                <NavLink to="/how-it-works">How It Works</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </>
            )}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all">
              <Search size={20} className="text-gray-600" />
            </button>

            {isAuthenticated && (
              <Link to="/notifications" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all relative">
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {user?.role === 'artisan' && user?.artisan_profile?.profile_image ? (
                    <img
                      src={user.artisan_profile.profile_image.startsWith('http') ? user.artisan_profile.profile_image : `${API_URL}${user.artisan_profile.profile_image}`}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-600">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-900 max-w-[150px] truncate">
                    {user?.name || 'User'}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || ''}</p>
                    </div>
                    {user?.role === 'artisan' && (
                      <Link
                        to={`/artisan/${user._id}`}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} />
                        <span>View Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary btn-sm">
                  <LogIn size={16} className="mr-2" />
                  Login
                </Link>
                <Link to="/register" className="btn-primary btn-sm">
                  <User size={16} className="mr-2" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <Link to="/notifications" className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all relative">
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-6 space-y-1">
            <Link
              to="/"
              className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'customer' ? (
                  <>
                    <Link
                      to="/browse"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Browse Services
                    </Link>
                    <Link
                      to="/customer-dashboard"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      to="/messages"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Messages
                    </Link>
                    <Link
                      to="/about"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/artisan-dashboard"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-jobs"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      My Jobs
                    </Link>
                    <Link
                      to="/artisan-profile"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/reviews"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Reviews
                    </Link>
                    <Link
                      to="/about"
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                  </>
                )}
                <hr className="my-4 border-gray-200" />
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                  {user?.role === 'artisan' && user?.artisan_profile?.profile_image ? (
                    <img
                      src={user.artisan_profile.profile_image.startsWith('http') ? user.artisan_profile.profile_image : `${API_URL}${user.artisan_profile.profile_image}`}
                      alt={user?.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-600">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || ''}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-3 text-left text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/browse"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Browse Services
                </Link>
                <Link
                  to="/how-it-works"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <hr className="my-4 border-gray-200" />
                <Link
                  to="/login"
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 text-base font-medium text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
