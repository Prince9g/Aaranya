import React, { useState } from 'react';
import { BarChart3, Users, MapPin, ShoppingBag, TrendingUp, Calendar, Eye, Download } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('month');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const districts = [
    { value: 'all', label: 'All Districts' },
    { value: 'ranchi', label: 'Ranchi' },
    { value: 'jamshedpur', label: 'Jamshedpur' },
    { value: 'dhanbad', label: 'Dhanbad' },
    { value: 'bokaro', label: 'Bokaro' },
    { value: 'deoghar', label: 'Deoghar' }
  ];

  const stats = [
    { title: 'Total Visitors', value: '24,517', change: '+12%', icon: Users, color: 'text-[#00A6A6]' },
    { title: 'Bookings', value: '1,847', change: '+8%', icon: Calendar, color: 'text-[#FF6B6B]' },
    { title: 'Revenue', value: '₹4.2L', change: '+15%', icon: TrendingUp, color: 'text-green-600' },
    { title: 'Guide Verifications', value: '127', change: '+3%', icon: ShieldCheck, color: 'text-[#003459]' }
  ];

  const popularDestinations = [
    { name: 'Netarhat Hill Station', visitors: 3420, growth: 18 },
    { name: 'Hundru Falls', visitors: 2890, growth: 23 },
    { name: 'Betla National Park', visitors: 2156, growth: 15 },
    { name: 'Deoghar Temple', visitors: 1876, growth: 12 },
    { name: 'Jamshedpur Parks', visitors: 1234, growth: 8 }
  ];

  const recentBookings = [
    { id: '1', customer: 'Rahul Sharma', destination: 'Netarhat Trek', amount: 4500, status: 'confirmed', date: '2024-01-15' },
    { id: '2', customer: 'Priya Singh', destination: 'Betla Safari', amount: 3200, status: 'pending', date: '2024-01-14' },
    { id: '3', customer: 'Amit Kumar', destination: 'Cultural Tour', amount: 5600, status: 'confirmed', date: '2024-01-14' },
    { id: '4', customer: 'Sneha Patel', destination: 'Hundru Falls', amount: 2800, status: 'confirmed', date: '2024-01-13' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#003459] mb-2">
              Tourism Analytics Dashboard
            </h1>
            <p className="text-[#6B7280]">Monitor tourism metrics and track performance across Jharkhand</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>{period.label}</option>
              ))}
            </select>
            
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
            >
              {districts.map(district => (
                <option key={district.value} value={district.value}>{district.label}</option>
              ))}
            </select>
            
            <button className="flex items-center space-x-2 bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#003459] mb-1">{stat.value}</h3>
              <p className="text-[#6B7280] text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Destinations */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#003459]">Popular Destinations</h3>
              <button className="text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
                <Eye className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFB] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#00A6A6]/10 rounded-full text-[#00A6A6] font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#003459]">{destination.name}</h4>
                      <p className="text-sm text-[#6B7280]">{destination.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-600">+{destination.growth}%</span>
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-[#003459] mb-6">Recent Bookings</h3>
            
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#003459] text-sm">{booking.customer}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-1">{booking.destination}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#003459]">₹{booking.amount.toLocaleString()}</span>
                    <span className="text-xs text-[#6B7280]">{booking.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-[#003459] mb-6">Tourist Sentiment Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">87%</span>
              </div>
              <h4 className="font-medium text-[#003459] mb-2">Positive</h4>
              <p className="text-sm text-[#6B7280]">Excellent experience, friendly guides</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">10%</span>
              </div>
              <h4 className="font-medium text-[#003459] mb-2">Neutral</h4>
              <p className="text-sm text-[#6B7280]">Average experience, room for improvement</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-red-600">3%</span>
              </div>
              <h4 className="font-medium text-[#003459] mb-2">Negative</h4>
              <p className="text-sm text-[#6B7280]">Issues with transport, accommodation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fix missing import
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default Dashboard;