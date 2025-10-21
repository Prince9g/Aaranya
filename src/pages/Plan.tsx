import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Activity, Bot, Download, Share, Bookmark } from 'lucide-react';
import { generateItineraryAPI } from '../components/Layout/API';

const Plan: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    duration: '',
    dates: '',
    travelers: '2',
    interests: [] as string[],
    budget: '',
    pace: ''
  });

  const interests = [
    'Nature & Wildlife',
    'Cultural Heritage',
    'Adventure Sports',
    'Photography',
    'Wellness & Spirituality',
    'Local Cuisine',
    'Tribal Art & Crafts',
    'Waterfalls & Trekking'
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
    setError(null); // Clear error when user makes changes
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null); // Clear error when user makes changes
  };

  const validateForm = () => {
    if (!formData.duration) {
      setError('Please select a trip duration');
      return false;
    }
    if (!formData.budget) {
      setError('Please select a budget range');
      return false;
    }
    if (!formData.pace) {
      setError('Please select a travel pace');
      return false;
    }
    if (formData.interests.length === 0) {
      setError('Please select at least one interest');
      return false;
    }
    return true;
  };

  const generateItinerary = async () => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Generating itinerary with data:', formData);
      const itinerary = await generateItineraryAPI(formData);
      console.log('Received itinerary:', itinerary);
      console.log('Itinerary type:', typeof itinerary);
      console.log('Itinerary length:', itinerary?.length);
      
      if (itinerary && Array.isArray(itinerary) && itinerary.length > 0) {
        setGeneratedItinerary(itinerary);
        setItineraryGenerated(true);
        console.log('Itinerary set successfully');
      } else {
        console.error('Invalid itinerary received:', itinerary);
        setError('Failed to generate itinerary. The response was empty or invalid. Please try again.');
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError(`Failed to generate itinerary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (itineraryGenerated) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-serif font-bold text-[#003459] mb-2">
                  Your Jharkhand Itinerary
                </h1>
                <p className="text-[#6B7280]">
                  {formData.duration} • {formData.travelers} travelers • {formData.interests.join(", ")}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
                  <Share className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {generatedItinerary.map((day: any) => (
                <div key={day.day} className="border-l-4 border-[#00A6A6] pl-6">
                  <h3 className="text-xl font-bold text-[#003459] mb-4">
                    Day {day.day}: {day.title}
                  </h3>
                  <div className="space-y-4">
                    {day.activities.map((activity: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4 bg-[#F8FAFB] p-4 rounded-lg">
                        <div className="text-sm font-medium text-[#003459] w-16">{activity.time}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#003459] mb-1">{activity.activity}</h4>
                          <p className="text-sm text-[#6B7280] mb-2">{activity.location}</p>
                          <div className="flex items-center space-x-4 text-xs text-[#6B7280]">
                            {activity.transport && <span>🚗 {activity.transport}</span>}
                            {activity.guide && <span>👤 Guide: {activity.guide}</span>}
                          </div>
                        </div>
                        <button className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <div>
                <p className="text-sm text-[#6B7280]">AI-generated itinerary</p>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setItineraryGenerated(false)}
                  className="px-6 py-3 border-2 border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white rounded-lg font-medium transition-all duration-200"
                >
                  Modify Plan
                </button>
                <button className="px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105">
                  Start Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // UI for form steps (same as your original code, unchanged)
  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-4">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Our AI planner creates personalized itineraries based on your preferences and interests
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= num ? 'bg-[#00A6A6] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 4 && <div className={`w-16 h-1 mx-2 ${
                  step > num ? 'bg-[#00A6A6]' : 'bg-gray-200'
                }`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="text-red-400 mr-3">⚠️</div>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {isGenerating ? (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-[#00A6A6] mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-[#003459] mb-2">Creating Your Perfect Itinerary</h3>
              <p className="text-[#6B7280] mb-6">Our AI is analyzing your preferences and crafting a personalized experience...</p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
                <div className="bg-[#00A6A6] h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
              </div>
            </div>
          ) : (
            <>
              {/* steps 1-4 same as your original code */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">Trip Duration & Dates</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trip Duration</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => handleFormChange('duration', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                      >
                        <option value="">Select duration</option>
                        <option value="1-2 days">1-2 days</option>
                        <option value="3-5 days">3-5 days</option>
                        <option value="1 week">1 week</option>
                        <option value="2+ weeks">2+ weeks</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => handleFormChange('travelers', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3-4">3-4 people</option>
                        <option value="5+">5+ people</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">What interests you?</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105 ${
                          formData.interests.includes(interest)
                            ? 'border-[#00A6A6] bg-[#00A6A6]/10 text-[#003459]'
                            : 'border-gray-200 hover:border-[#00A6A6]/50'
                        }`}
                      >
                        <div className="font-medium text-sm">{interest}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">Budget & Accessibility</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (per person)</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['₹5,000-10,000', '₹10,000-25,000', '₹25,000+'].map((budget) => (
                          <button
                            key={budget}
                            onClick={() => handleFormChange('budget', budget)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                              formData.budget === budget
                                ? 'border-[#00A6A6] bg-[#00A6A6]/10 text-[#003459]'
                                : 'border-gray-200 hover:border-[#00A6A6]/50'
                            }`}
                          >
                            {budget}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">Travel Pace</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: 'relaxed', label: 'Relaxed', desc: 'Take it slow, enjoy each moment' },
                      { value: 'active', label: 'Active', desc: 'Balanced mix of activities and rest' },
                      { value: 'intensive', label: 'Intensive', desc: 'Pack in as much as possible' }
                    ].map((pace) => (
                      <button
                        key={pace.value}
                        onClick={() => handleFormChange('pace', pace.value)}
                        className={`p-6 rounded-lg border-2 text-center transition-all duration-200 hover:scale-105 ${
                          formData.pace === pace.value
                            ? 'border-[#00A6A6] bg-[#00A6A6]/10 text-[#003459]'
                            : 'border-gray-200 hover:border-[#00A6A6]/50'
                        }`}
                      >
                        <div className="font-bold mb-2">{pace.label}</div>
                        <div className="text-sm text-[#6B7280]">{pace.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200"
                >
                  Previous
                </button>
                
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={generateItinerary}
                    className="px-6 py-3 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                  >
                    <Bot className="w-5 h-5" />
                    <span>Generate Itinerary</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
