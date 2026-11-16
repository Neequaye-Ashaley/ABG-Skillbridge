import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <MessageCircle className="mx-auto text-green-600 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    <Send size={20} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">info@skillbridge.gh</p>
                      <p className="text-gray-600">support@skillbridge.gh</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">+233 20 345 6821</p>
                      <p className="text-gray-600">+233 26 361 4015</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Office Address</h3>
                      <p className="text-gray-600">
                        123 Independence Avenue<br />
                        Accra, Ghana<br />
                        P.O. Box GP 1234
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h2>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for updates, tips, and news.
                </p>

                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://x.com/niiashieashaley?s=21"
                    className="w-12 h-12 bg-sky-500 text-white rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/o2baby.s.n.a?igsh=MWY1amxsMGtoNDFnbg%3D%3D&utm_source=qr"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/neequaye-solomon-ashaley-91a0b3391?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                    className="w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-primary-50 rounded-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Have a Question?</h2>
                <p className="text-gray-600 mb-4">
                  Check out our FAQ section for quick answers to common questions.
                </p>
                <button className="text-primary-600 font-semibold hover:text-primary-700">
                  View FAQ →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin size={48} className="mx-auto mb-4" />
              <p className="text-lg">Interactive Map</p>
              <p className="text-sm">123 Independence Avenue, Accra, Ghana</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
