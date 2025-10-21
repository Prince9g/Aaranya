import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Users, MapPin, Filter, Calendar } from 'lucide-react';
import { experiences } from '../data/mockData';

const Experiences: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const types = [
    { value: 'all', label: 'All Experiences' },
    { value: 'eco', label: 'Eco Tourism' },
    { value: 'culture', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'wellness', label: 'Wellness' }
  ];

  const durations = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Half Day' },
    { value: 'medium', label: 'Full Day' },
    { value: 'long', label: '2+ Days' }
  ];

  const filteredExperiences = experiences.filter(experience => {
    const matchesType = selectedType === 'all' || experience.type === selectedType;
    const matchesSearch = experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'eco': return 'bg-green-100 text-green-800';
      case 'culture': return 'bg-purple-100 text-purple-800';
      case 'adventure': return 'bg-red-100 text-red-800';
      case 'wellness': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookExperience = (experienceId: string) => {
    alert(`Booking experience with ID: ${experienceId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-4">
            Unique Jharkhand Experiences
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Immerse yourself in authentic adventures that showcase the natural beauty, rich culture, 
            and warm hospitality of Jharkhand
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search experiences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                >
                  {durations.map(duration => (
                    <option key={duration.value} value={duration.value}>{duration.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(experience.type)}`}>
                    {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{experience.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#003459] mb-3">{experience.title}</h3>
                <p className="text-[#6B7280] mb-4 line-clamp-3">{experience.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                    <Users className="w-4 h-4" />
                    <span>Small group (2-8 people)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4" />
                    <span>Jharkhand</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-[#6B7280]">From</span>
                    <div className="text-2xl font-bold text-[#003459]">₹{experience.price.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookExperience(experience.id)}
                    className="flex-1 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    Book Now
                  </button>
                  <Link
                    to={`/experiences/${experience.id}`}
                    className="px-4 py-3 border-2 border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white rounded-lg font-medium transition-all duration-200 text-center"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-[#003459] mb-2">No experiences found</h3>
            <p className="text-[#6B7280]">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Custom Experience CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#003459] to-[#00A6A6] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Want a Custom Experience?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Our local experts can create personalized experiences tailored to your interests, 
            schedule, and group size. From private cultural tours to adventure expeditions.
          </p>
          <button className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
            Request Custom Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experiences;