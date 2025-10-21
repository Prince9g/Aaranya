import React from 'react';
import Hero from '../components/Home/Hero';
import WhyAaranya from '../components/Home/WhyAaranya';
import FeaturedExperiences from '../components/Home/FeaturedExperiences';
import ARSpotlight from '../components/Home/ARSpotlight';
import WaveDivider from '../components/UI/WaveDivider';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WaveDivider />
      <WhyAaranya />
      <WaveDivider color="#FFFFFF" />
      <FeaturedExperiences />
      <WaveDivider color="#F4E9CD" />
      <ARSpotlight />
    </div>
  );
};

export default Home;