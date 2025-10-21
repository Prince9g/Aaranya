import React from 'react';
import { Play, Eye, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ARSpotlight: React.FC = () => {
  const navigate = useNavigate();
  const handleARPreview = () => {
    // In a real app, this would open AR viewer
    alert('Opening AR preview of Betla National Park...');
  };

  const handle360Preview = () => {
    // In a real app, this would open 360° viewer
    navigate("/tour360");
  };

  return (
    <section className="py-20 bg-[#F4E9CD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-6">
              Experience Before You Go
            </h2>
            <p className="text-xl text-[#6B7280] mb-8">
              Immerse yourself in Jharkhand's beauty with our cutting-edge AR and 360° virtual tours. 
              Explore destinations from your home before planning your perfect trip.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#00A6A6]/10 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#00A6A6]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003459]">360° Virtual Tours</h3>
                  <p className="text-[#6B7280]">Panoramic views of waterfalls, forests, and cultural sites</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#FF6B6B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#003459]">AR Preview</h3>
                  <p className="text-[#6B7280]">Point your phone to see destinations come alive</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handle360Preview}
                className="bg-[#00A6A6] hover:bg-[#00A6A6]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>Try 360° Tour</span>
              </button>
              <button
                onClick={handleARPreview}
                className="border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Smartphone className="w-5 h-5" />
                <span>AR Preview</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/betla.webp"
                alt="Betla National Park AR Preview"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button
                  onClick={handle360Preview}
                  className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <Play className="w-8 h-8 text-[#003459] ml-1" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold text-[#003459]">Experience Betla Park in 360°</h3>
                  <p className="text-sm text-[#6B7280]">Virtual safari through India's famous tiger reserve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARSpotlight;