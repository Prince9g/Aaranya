import React, { useState } from 'react';
import { MapPin, Star, Filter, Search, Plus } from 'lucide-react';
import { destinations } from '../data/mockData';

const Explore: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const types = [
    { value: 'all', label: 'All' },
    { value: 'waterfall', label: 'Waterfalls' },
    { value: 'national-park', label: 'National Parks' },
    { value: 'cultural-site', label: 'Cultural Sites' },
    { value: 'homestay', label: 'Homestays' },
    { value: 'market', label: 'Markets' }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesType = selectedType === 'all' || dest.type === selectedType;
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-4">
            Explore Jharkhand
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">
            Discover hidden gems, cultural treasures, and natural wonders across the state
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {types.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedType === type.value
                      ? 'bg-[#00A6A6] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map and List View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-96 lg:h-[600px]">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg)',
                    filter: 'sepia(20%) saturate(1.2) opacity(0.7)'
                  }}
                />
                <div className="relative z-10 text-center">
                  <MapPin className="w-12 h-12 text-[#FF6B6B] mx-auto mb-4" />
                  <p className="text-lg font-medium text-[#003459]">Interactive Map</p>
                  <p className="text-[#6B7280]">Click markers to explore destinations</p>
                </div>
                
                {/* Map Markers */}
                {filteredDestinations.map((dest, index) => (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest.id)}
                    className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-110 ${
                      selectedDestination === dest.id ? 'bg-[#FF6B6B]' : 'bg-[#00A6A6]'
                    }`}
                    style={{
                      top: `${20 + index * 15}%`,
                      left: `${30 + index * 10}%`
                    }}
                  >
                    <MapPin className="w-4 h-4 text-white mx-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Destination List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#003459] mb-4">
              Found {filteredDestinations.length} destinations
            </h3>
            
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${
                  selectedDestination === destination.id ? 'ring-2 ring-[#FF6B6B]' : ''
                }`}
                onClick={() => setSelectedDestination(destination.id)}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-[#003459]">{destination.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#6B7280] text-sm mb-3 line-clamp-2">{destination.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {destination.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#00A6A6]/10 text-[#00A6A6] text-xs rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                      Add to Itinerary
                    </button>
                    <button className="px-3 py-2 border border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white rounded-lg text-sm transition-colors duration-200">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;