import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check, CheckCheck, Trash2, Briefcase, AlertCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';

const Notifications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/notifications`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotifications(response.data);

        // Mark all as read when opening notifications page
        await axios.put(`${API_URL}/api/notifications/read-all`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        // Update unread count in navbar
        if (window.updateUnreadCount) {
          window.updateUnreadCount();
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(`${API_URL}/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(notifications.map(n =>
        n._id === notificationId ? { ...n, is_read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(`${API_URL}/api/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await axios.delete(`${API_URL}/api/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(notifications.filter(n => n._id !== notificationId));
      const deletedNotification = notifications.find(n => n._id === notificationId);
      if (deletedNotification && !deletedNotification.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      handleMarkAsRead(notification._id);
    }
    if (notification.link) {
      navigate(notification.link);
    } else if (notification.job_id) {
      navigate(`/job/${notification.job_id}`);
    } else {
      // If no link or job_id, navigate to appropriate dashboard
      navigate(user?.role === 'artisan' ? '/my-jobs' : '/my-bookings');
    }
  };

  const getNotificationIcon = (title) => {
    if (title.toLowerCase().includes('accepted')) return <Check className="text-green-600" size={20} />;
    if (title.toLowerCase().includes('declined')) return <AlertCircle className="text-red-600" size={20} />;
    if (title.toLowerCase().includes('completed')) return <Briefcase className="text-blue-600" size={20} />;
    return <Bell className="text-blue-600" size={20} />;
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600 text-lg">Stay updated on your job activities</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                <CheckCheck size={18} />
                Mark All as Read
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-gray-600">Total: {notifications.length}</span>
            </div>
            {unreadCount > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 font-medium">Unread: {unreadCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Bell size={40} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No notifications yet</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              You'll receive notifications here when there are updates on your jobs.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`group relative bg-white rounded-[20px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border p-6 cursor-pointer ${!notification.is_read
                  ? 'border-blue-300 bg-gradient-to-br from-blue-50/50 to-white'
                  : 'border-gray-100 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-100/60 hover:to-blue-200/60'
                  }`}
              >
                {/* Unread indicator */}
                {!notification.is_read && (
                  <div className="absolute top-6 left-6 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}

                <div className="flex items-start gap-4 pl-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${!notification.is_read ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100 transition-colors'
                    }`}>
                    {getNotificationIcon(notification.title)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`font-semibold ${!notification.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                        <Clock size={12} />
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${!notification.is_read ? 'text-gray-700' : 'text-gray-500'}`}>
                      {notification.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!notification.is_read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification._id);
                        }}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check size={16} className="text-blue-600" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification._id);
                      }}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-gray-400 hover:text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Navigate indicator */}
                {notification.job_id && (
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Card */}
        {notifications.length > 0 && (
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-white rounded-[24px] border border-blue-100 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Stay informed</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Notifications help you track your job progress and never miss important updates.
            </p>
            <button
              onClick={() => navigate(user?.role === 'artisan' ? '/artisan-dashboard' : '/customer-dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              Go to Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
