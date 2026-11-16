import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Award, Heart, ArrowRight, Briefcase, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const founderVariants = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const photoVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 0 },
    hover: {
      rotate: 720,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  const typingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24 lg:py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Skillbridge</motion.h1>
            <motion.p variants={itemVariants} className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Empowering Ghanaians to connect with trusted local service providers since 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="py-16 lg:py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                At Skillbridge, we believe that everyone deserves access to reliable, professional services.
                Our mission is to bridge the gap between customers seeking quality services and skilled artisans
                looking to grow their businesses.
              </p>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                We're committed to creating a platform that fosters trust, transparency, and economic growth
                within communities across Ghana. Every connection made through Skillbridge represents an opportunity
                for meaningful work and exceptional service.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By leveraging technology to simplify the process of finding and hiring service providers, we're
                making it easier than ever for Ghanaians to get things done while supporting local talent.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={scaleVariants}
            >
              <Target className="w-16 h-16 text-blue-600 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become Ghana's most trusted platform for connecting customers with verified service providers,
                creating economic opportunities and improving access to quality services nationwide.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-16 lg:py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">500+</p>
                  <p className="text-sm text-gray-500">Verified Artisans</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
              </div>
            </motion.div>
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">2,000+</p>
                  <p className="text-sm text-gray-500">Jobs Completed</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <CheckCircle className="text-blue-600" size={24} />
                </div>
              </div>
            </motion.div>
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">15,000+</p>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </motion.div>
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">4.8</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Star className="text-blue-600" size={24} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-16 lg:py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Award className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We maintain high standards for all service providers on our platform
              </p>
            </motion.div>
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Building trust and connections within local communities
              </p>
            </motion.div>
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Heart className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Honest pricing and transparent processes for everyone
              </p>
            </motion.div>
            <motion.div variants={scaleVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Target className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Continuously improving our platform to better serve our users
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        className="py-16 lg:py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">Our Story</motion.h2>
            <motion.div variants={scaleVariants} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-10">
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Skillbridge was born from a simple observation: finding reliable service providers in Ghana
                was often difficult, time-consuming, and fraught with uncertainty. Customers struggled to
                find trustworthy artisans, while skilled professionals found it challenging to connect with
                potential clients.
              </p>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                In 2026, our founders set out to solve this problem by creating a platform that would
                revolutionize how Ghanaians access and provide services. We envisioned a marketplace where
                trust was built through verification, transparency in pricing, and genuine reviews from real
                customers.
              </p>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                Starting in Accra, we began by partnering with local artisans in plumbing, electrical work,
                and home maintenance. Our commitment to quality and verification quickly earned us the trust
                of both customers and service providers alike.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, Skillbridge operates across major cities in Ghana, connecting thousands of customers
                with hundreds of verified artisans. But our journey is far from over. We continue to expand
                our services, improve our platform, and work towards our vision of making quality services
                accessible to every Ghanaian.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-16 lg:py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Meet Our founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The passionate Man behind Skillbridge
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              variants={founderVariants}
              className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg border border-blue-200 p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 max-w-md w-full"
            >
              <motion.div
                variants={photoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="w-32 h-32 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-md"
              >
                <img
                  src="/images/FOUNDER.jpeg"
                  alt="NEEQUAYE SOLOMON"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.h3
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-xl font-semibold text-gray-900 mb-1"
              >NEEQUAYE SOLOMON</motion.h3>
              <motion.p
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-blue-600 mb-3 text-sm font-medium"
              >CEO & Founder</motion.p>
              <motion.p
                variants={typingVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-700 text-sm leading-relaxed"
              >
                5+ years in tech and entrepreneurship. Passionate about creating economic opportunities.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Join the Skillbridge Community
          </motion.h2>
          <motion.p variants={itemVariants} className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Whether you're looking for services or want to offer your skills, there's a place for you here.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div variants={scaleVariants}>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 transition-all font-semibold shadow-lg hover:shadow-xl justify-center"
              >
                Get Started as Customer
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
            <motion.div variants={scaleVariants}>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-blue-500/20 text-white border border-blue-400/30 rounded-xl hover:bg-gradient-to-r hover:from-blue-600/60 hover:to-blue-700/70 transition-all font-semibold backdrop-blur-sm justify-center"
              >
                Become an Artisan
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
