import React from 'react';
import { Search, FileText, CheckCircle, Star, Clock, Shield, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How Skillbridge Works</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Getting started is easy. Find trusted service providers in just a few simple steps.
            </p>
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">For Customers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find and hire trusted professionals for your home and business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-primary-50 rounded-lg p-6 h-full">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  1
                </div>
                <div className="flex items-center mb-3">
                  <Search className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">Search & Browse</h3>
                </div>
                <p className="text-gray-600">
                  Browse through our categories or search for specific services. Filter by location, rating, and price range to find the perfect match.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300">
                <ArrowRight size={32} />
              </div>
            </div>

            <div className="relative">
              <div className="bg-primary-50 rounded-lg p-6 h-full">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  2
                </div>
                <div className="flex items-center mb-3">
                  <FileText className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">Submit Request</h3>
                </div>
                <p className="text-gray-600">
                  Describe your job with details including location, timeline, and specific requirements. The more detail, the better quotes you'll receive.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300">
                <ArrowRight size={32} />
              </div>
            </div>

            <div className="relative">
              <div className="bg-primary-50 rounded-lg p-6 h-full">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  3
                </div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">Review Quotes</h3>
                </div>
                <p className="text-gray-600">
                  Receive quotes from interested artisans. Review their profiles, ratings, and past work before making your choice.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300">
                <ArrowRight size={32} />
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-6 h-full">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                4
              </div>
              <div className="flex items-center mb-3">
                <Star className="text-primary-600 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Complete & Review</h3>
              </div>
              <p className="text-gray-600">
                Get your job done and rate your experience. Your reviews help others make informed decisions and help artisans improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Artisans Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">For Artisans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Grow your business and connect with customers looking for your services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  1
                </div>
                <div className="flex items-center mb-3">
                  <Shield className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">Create Profile</h3>
                </div>
                <p className="text-gray-600">
                  Sign up and create your professional profile. Add your qualifications, experience, and photos of your past work.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300">
                <ArrowRight size={32} />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  2
                </div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">Get Verified</h3>
                </div>
                <p className="text-gray-600">
                  Submit your credentials for verification. Once approved, you'll appear in search results and can start receiving job requests.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300">
                <ArrowRight size={32} />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  3
                </div>
                <div className="flex items-center mb-3">
                  <MapPin className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-xl font-semibold">Receive Requests</h3>
                </div>
                <p className="text-gray-600">
                  Get notified of job requests in your area. Review the details and decide which jobs you want to take on.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary-300">
                <ArrowRight size={32} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                4
              </div>
              <div className="flex items-center mb-3">
                <Star className="text-primary-600 mr-2" size={24} />
                <h3 className="text-xl font-semibold">Build Reputation</h3>
              </div>
              <p className="text-gray-600">
                Complete jobs, collect reviews, and build your reputation. Higher ratings lead to more opportunities and better rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Skillbridge?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Features designed to make your experience seamless and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All artisans are thoroughly vetted and verified before joining our platform. Your safety and satisfaction are our priority.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based Matching</h3>
              <p className="text-gray-600">
                Find service providers in your neighborhood. Our smart matching system connects you with nearby artisans for faster service.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Reviews</h3>
              <p className="text-gray-600">
                Read genuine reviews from real customers. Make informed decisions based on others' experiences with each artisan.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600">
                Get responses from artisans within hours. Our notification system ensures you never miss an opportunity.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
              <p className="text-gray-600">
                Communicate directly with artisans through our secure messaging system. Discuss details before booking.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Payment is only released after job completion to your satisfaction. No risk, no hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Lifecycle */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Lifecycle</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track your job from request to completion
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <FileText className="text-blue-600" size={32} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Pending</h4>
                <p className="text-sm text-gray-600">Request submitted</p>
              </div>
              <div className="hidden md:block text-primary-300">
                <ArrowRight size={32} />
              </div>
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="text-yellow-600" size={32} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Accepted</h4>
                <p className="text-sm text-gray-600">Artisan responds</p>
              </div>
              <div className="hidden md:block text-primary-300">
                <ArrowRight size={32} />
              </div>
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Clock className="text-orange-600" size={32} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Quoted</h4>
                <p className="text-sm text-gray-600">Price proposed</p>
              </div>
              <div className="hidden md:block text-primary-300">
                <ArrowRight size={32} />
              </div>
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="text-green-600" size={32} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Confirmed</h4>
                <p className="text-sm text-gray-600">Customer approves</p>
              </div>
              <div className="hidden md:block text-primary-300">
                <ArrowRight size={32} />
              </div>
              <div className="flex flex-col items-center text-center p-4 flex-1">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Star className="text-purple-600" size={32} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Completed</h4>
                <p className="text-sm text-gray-600">Job done & rated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Is Skillbridge free to use?</h3>
              <p className="text-gray-600">
                Yes, browsing and posting job requests is completely free for customers. Artisans pay a small service fee only when they successfully complete a job.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">How are artisans verified?</h3>
              <p className="text-gray-600">
                All artisans undergo a thorough verification process including identity verification, credential checks, and reference verification before being approved on our platform.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">What if I'm not satisfied with the work?</h3>
              <p className="text-gray-600">
                If you're not satisfied, you can raise a dispute through our ticket system. Our team will mediate and help resolve the issue fairly for both parties.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-2">How do payments work?</h3>
              <p className="text-gray-600">
                Payment is held securely in escrow until the job is completed to your satisfaction. Once you approve the work, payment is released to the artisan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Ghanaians who trust Skillbridge for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center">
              Find a Service
              <ArrowRight className="ml-2" size={20} />
            </button>
            <button className="bg-primary-700 text-white px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold inline-flex items-center justify-center">
              Join as Artisan
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
