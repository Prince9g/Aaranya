import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { experiences } from '../../data/mockData';

const FeaturedExperiences: React.FC = () => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'eco': return 'bg-green-100 text-green-800';
      case 'culture': return 'bg-purple-100 text-purple-800';
      case 'adventure': return 'bg-red-100 text-red-800';
      case 'wellness': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-4">
              Featured Experiences
            </h2>
            <p className="text-xl text-[#6B7280]">
              Curated adventures that showcase the best of Jharkhand
            </p>
          </div>
          <Link
            to="/experiences"
            className="hidden md:flex items-center space-x-2 text-[#FF6B6B] hover:text-[#ff5a5a] font-medium transition-colors duration-200"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience) => (
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
                <h3 className="text-xl font-bold text-[#003459] mb-2">{experience.title}</h3>
                <p className="text-[#6B7280] mb-4 line-clamp-2">{experience.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-[#6B7280]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{experience.duration}</span>
                  </div>
                  <div className="text-xl font-bold text-[#003459]">₹{experience.price.toLocaleString()}</div>
                </div>

                <Link
                  to={`/experiences/${experience.id}`}
                  className="w-full bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-center block"
                >
                  Book Experience
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/experiences"
            className="inline-flex items-center space-x-2 text-[#FF6B6B] hover:text-[#ff5a5a] font-medium transition-colors duration-200"
          >
            <span>View All Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;