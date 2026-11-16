import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">Skill<span className="text-blue-400">bridge</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting Ghanaians with verified local service providers. Quality services you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">Browse Services</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Become an Artisan</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">Plumbing</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Electrical</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Cleaning</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Tutoring</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@skillbridge.gh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+233 20 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Accra, Ghana</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/niiashieashaley?s=21" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/o2baby.s.n.a?igsh=MWY1amxsMGtoNDFnbg%3D%3D&utm_source=qr" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/neequaye-solomon-ashaley-91a0b3391?utm_source=share_via&utm_content=profile&utm_medium=member_ios" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Skillbridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
