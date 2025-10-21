import React, { useState } from 'react';
import { Search, Star, Shield, Languages, MapPin, Calendar, Filter } from 'lucide-react';
import { guides } from '../data/mockData';

const Guides: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const languages = ['all', 'Hindi', 'English', 'Santhali', 'Bengali'];
  const specialties = ['all', 'Cultural Tours', 'Adventure', 'Wildlife', 'Photography', 'Tribal Heritage'];

  const filteredGuides = guides.filter(guide => {
    const matchesLanguage = selectedLanguage === 'all' || guide.languages.includes(selectedLanguage);
    const matchesSpecialty = selectedSpecialty === 'all' || guide.specialties.includes(selectedSpecialty);
    const matchesSearch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesLanguage && matchesSpecialty && matchesSearch;
  });

  const handleBookGuide = (guideId: string) => {
    alert(`Booking guide with ID: ${guideId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-4">
            Verified Local Guides
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Connect with authenticated local experts who know Jharkhand's hidden treasures and cultural stories
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
                  placeholder="Search guides by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>
                      {lang === 'all' ? 'All Languages' : lang}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-full h-64 object-cover"
                />
                {guide.verified && (
                  <div className="absolute top-4 left-4 bg-[#00A6A6] text-white px-3 py-1 rounded-full flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{guide.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#003459] mb-2">{guide.name}</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                    <Languages className="w-4 h-4" />
                    <span>{guide.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4" />
                    <span>{guide.specialties.join(' • ')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {guide.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm text-[#6B7280]">From</span>
                    <div className="text-xl font-bold text-[#003459]">₹{guide.price}/day</div>
                  </div>
                  {guide.verified && (
                    <div className="text-sm text-[#00A6A6] flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>Blockchain verified</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookGuide(guide.id)}
                    className="flex-1 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    Book Guide
                  </button>
                  <button className="px-4 py-3 border-2 border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white rounded-lg font-medium transition-all duration-200 flex items-center">
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-[#003459] mb-2">No guides found</h3>
            <p className="text-[#6B7280]">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Guide Verification Info */}
        <div className="mt-16 bg-[#003459] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why Choose Verified Guides?</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-[#00A6A6]" />
                  <span>Blockchain-verified credentials and certifications</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>Rated by previous travelers with authentic reviews</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Languages className="w-5 h-5 text-[#FF6B6B]" />
                  <span>Multilingual support including local tribal languages</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#00A6A6]" />
                  <span>Deep knowledge of hidden gems and cultural insights</span>
                </li>
              </ul>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Become a Guide</h4>
              <p className="text-white/80 mb-6">
                Share your knowledge of Jharkhand and earn while helping travelers discover our beautiful state.
              </p>
              <button className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                Apply to be a Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guides;