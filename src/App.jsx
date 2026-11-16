import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import ArtisanProfile from './pages/ArtisanProfile';
import ArtisanDashboard from './pages/ArtisanDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import EditArtisanProfile from './pages/EditArtisanProfile';
import PostJob from './pages/PostJob';
import JobDetails from './pages/JobDetails';
import MyBookings from './pages/MyBookings';
import MyJobs from './pages/MyJobs';
import LeaveReview from './pages/LeaveReview';
import Reviews from './pages/Reviews';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import BrowseServices from './pages/BrowseServices';
import Contact from './pages/Contact';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artisan/:id" element={<ArtisanProfile />} />
              <Route
                path="/artisan-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['artisan']}>
                    <ArtisanDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer-dashboard"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-job/:artisanId"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'artisan']}>
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/job/:id"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'artisan']}>
                    <JobDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/review/:jobId"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <LeaveReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-jobs"
                element={
                  <ProtectedRoute allowedRoles={['artisan']}>
                    <MyJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/artisan-profile"
                element={
                  <ProtectedRoute allowedRoles={['artisan']}>
                    <EditArtisanProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute allowedRoles={['artisan']}>
                    <Reviews />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute allowedRoles={['customer', 'artisan']}>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <h1 className="text-2xl font-bold">Messages</h1>
                      <p className="text-gray-600">This page is under construction.</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/about' element={<About />} />
              <Route path='/how-it-works' element={<HowItWorks />} />
              <Route path='/browse' element={<BrowseServices />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
