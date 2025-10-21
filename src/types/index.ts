export interface Destination {
  id: string;
  name: string;
  type: 'waterfall' | 'national-park' | 'cultural-site' | 'homestay' | 'market';
  coordinates: [number, number];
  rating: number;
  image: string;
  description: string;
  badges: string[];
}

export interface Guide {
  id: string;
  name: string;
  rating: number;
  languages: string[];
  verified: boolean;
  image: string;
  specialties: string[];
  price: number;
}

export interface Experience {
  id: string;
  title: string;
  type: 'eco' | 'culture' | 'adventure' | 'wellness';
  duration: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

export interface ItineraryStep {
  id: string;
  day: number;
  time: string;
  activity: string;
  location: string;
  duration: string;
  guide?: Guide;
  transport: string;
}

export interface Product {
  id: string;
  name: string;
  artisan: string;
  price: number;
  image: string;
  category: string;
  verified: boolean;
  description: string;
}