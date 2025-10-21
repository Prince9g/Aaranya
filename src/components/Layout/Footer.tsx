import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#003459] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B6B] to-[#00A6A6] rounded-full flex items-center justify-center">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif">Aaranya</span>
            </div>
            <p className="text-white/80 mb-4 max-w-md">
              Discover the untamed beauty and culture of Jharkhand. AI-powered itineraries, 
              verified guides, and authentic local experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-[#00A6A6] transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00A6A6] transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00A6A6] transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#00A6A6] transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/destinations" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Destinations</Link></li>
              <li><Link to="/experiences" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Experiences</Link></li>
              <li><Link to="/guides" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Local Guides</Link></li>
              <li><Link to="/marketplace" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Marketplace</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Help Center</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-[#00A6A6] transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2025 Aaranya. All rights reserved. Promoting sustainable tourism in Jharkhand.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;