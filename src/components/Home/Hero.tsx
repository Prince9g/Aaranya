import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Search } from 'lucide-react';

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState({
    destination: '',
    duration: '',
    travelers: '2',
    dates: ''
  });

  const handleQuickSearch = () => {
    // Navigate to plan page with search data
    const searchParams = new URLSearchParams(searchData).toString();
    window.location.href = `/plan?${searchParams}`;
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/mainPhoto.jpeg"
          alt="Example"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#003459]/60 via-[#003459]/40 to-[#003459]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
          Discover the Untamed Beauty & Culture of 
          <span className="text-[#FF6B6B]"> Jharkhand</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          Personalized itineraries • Verified local guides • Authentic homestays & handicrafts
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/plan"
            className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Plan My Trip
          </Link>
          <Link
            to="/explore"
            className="border-2 border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
          >
            Explore Map
          </Link>
        </div>

        {/* Quick Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Try: Netarhat, Betla..."
                  value={searchData.destination}
                  onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent text-gray-900"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={searchData.duration}
                onChange={(e) => setSearchData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent text-gray-900"
              >
                <option value="">Select duration</option>
                <option value="1-2 days">1-2 days</option>
                <option value="3-5 days">3-5 days</option>
                <option value="1 week">1 week</option>
                <option value="2+ weeks">2+ weeks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={searchData.travelers}
                  onChange={(e) => setSearchData(prev => ({ ...prev, travelers: e.target.value }))}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent text-gray-900"
                >
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3-4">3-4 people</option>
                  <option value="5+">5+ people</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleQuickSearch}
              className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-white/70 mt-4">
          Try: Netarhat, Betla, Deoghar, Cultural festivals
        </p>
      </div>
    </div>
  );
};

export default Hero;