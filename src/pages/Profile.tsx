import React, { useState } from 'react';
import { User, Settings, Bookmark, MapPin, Calendar, CreditCard, Bell } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'saved', label: 'Saved Items', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const savedItineraries = [
    { id: '1', title: 'Netarhat Weekend Getaway', duration: '2 days', created: '2024-01-10' },
    { id: '2', title: 'Betla Wildlife Adventure', duration: '3 days', created: '2024-01-08' },
    { id: '3', title: 'Cultural Heritage Tour', duration: '5 days', created: '2024-01-05' }
  ];

  const upcomingBookings = [
    { id: '1', title: 'Hundru Falls Trek', date: '2024-01-20', guide: 'Radha Devi', status: 'confirmed' },
    { id: '2', title: 'Tribal Village Stay', date: '2024-02-15', guide: 'Arjun Mahato', status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#003459] to-[#00A6A6] p-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">Welcome back, Traveler!</h1>
                <p className="text-white/80">Explore the beauty of Jharkhand</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4 border-r border-gray-200">
              <nav className="p-6 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#00A6A6] text-white'
                        : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#003459]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Travel Enthusiast"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="traveler@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+91 9876543210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        defaultValue="Mumbai, Maharashtra"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button className="mt-6 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                    Update Profile
                  </button>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">My Bookings</h2>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="bg-[#F8FAFB] rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-[#003459]">{booking.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#6B7280]">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Date: {booking.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>Guide: {booking.guide}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
                          <button className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                            View Details
                          </button>
                          <button className="border border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                            Contact Guide
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">Saved Itineraries</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedItineraries.map((itinerary) => (
                      <div key={itinerary.id} className="bg-[#F8FAFB] rounded-xl p-6">
                        <h3 className="text-lg font-bold text-[#003459] mb-2">{itinerary.title}</h3>
                        <div className="space-y-2 text-sm text-[#6B7280] mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{itinerary.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>Created: {itinerary.created}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                            Continue Planning
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200">
                            Share
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#003459] mb-6">Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#003459] mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00A6A6] focus:ring-[#00A6A6]" />
                          <span className="text-[#6B7280]">Email notifications for bookings</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00A6A6] focus:ring-[#00A6A6]" />
                          <span className="text-[#6B7280]">SMS notifications for trip updates</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-[#00A6A6] focus:ring-[#00A6A6]" />
                          <span className="text-[#6B7280]">Marketing emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-[#003459] mb-4">Privacy</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#00A6A6] focus:ring-[#00A6A6]" />
                          <span className="text-[#6B7280]">Show profile to other travelers</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="rounded border-gray-300 text-[#00A6A6] focus:ring-[#00A6A6]" />
                          <span className="text-[#6B7280]">Share travel data for analytics</span>
                        </label>
                      </div>
                    </div>

                    <button className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;