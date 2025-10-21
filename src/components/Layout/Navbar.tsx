import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Globe, User, Mountain } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Explore', href: '/explore' },
    { name: 'Plan', href: '/plan' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Guides', href: '/guides' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Dashboard', href: '/dashboard' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#003459] to-[#00A6A6] rounded-full flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#003459] font-serif">Aaranya</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#FF6B6B] bg-[#FF6B6B]/10'
                    : 'text-[#003459] hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
            <a href="https://www.google.com/maps/search/Jharkhand+with+tourist+spots/@23.7136965,84.0619991,7z/data=!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDkxNS4wIKXMDSoASAFQAw%3D%3D" className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
              <Globe className="w-5 h-5" />
            </a>
            <Link
              to="/profile"
              className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#003459] hover:text-[#FF6B6B] transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] w-5 h-5" />
              <input
                type="text"
                placeholder="Search places, e.g., Netarhat, Betla, Deoghar..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#FF6B6B] bg-[#FF6B6B]/10'
                    : 'text-[#003459] hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/5'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 px-3 py-2">
              <button className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
                <Globe className="w-5 h-5" />
              </button>
              <Link
                to="/profile"
                className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;