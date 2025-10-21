import React from 'react';
import { Bot, Shield, ShoppingBag } from 'lucide-react';

const WhyAaranya: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Trip Planner',
      description: 'Personalized itineraries powered by advanced AI, tailored to your preferences and interests.',
      color: 'text-[#FF6B6B]'
    },
    {
      icon: Shield,
      title: 'Verified Guides',
      description: 'Blockchain-verified local guides ensuring authentic and safe travel experiences.',
      color: 'text-[#00A6A6]'
    },
    {
      icon: ShoppingBag,
      title: 'Local Marketplace',
      description: 'Support local artisans and communities through authentic handicrafts and homestays.',
      color: 'text-[#003459]'
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-6">
            Why Choose Aaranya?
          </h2>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Experience Jharkhand like never before with our innovative platform that connects 
            you to authentic local experiences while supporting communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-6">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-[#003459] mb-4">{feature.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAaranya;