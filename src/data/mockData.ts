import { Destination, Guide, Experience, Product } from '../types';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Hundru Falls',
    type: 'waterfall',
    coordinates: [23.4241, 85.4419],
    rating: 4.8,
    image: '/hundrufalls.jpg',
    description: 'Spectacular 100-meter waterfall cascading through rocky terrain',
    badges: ['Natural Wonder', 'Photography']
  },
  {
    id: '2',
    name: 'Betla National Park',
    type: 'national-park',
    coordinates: [23.8717, 84.1944],
    rating: 4.6,
    image: '/BetlaNationalPark.jpg',
    description: 'Wildlife sanctuary home to elephants, deers, tigers, and diverse flora',
    badges: ['Wildlife', 'Safari', 'Conservation']
  },
  {
    id: '3',
    name: 'Netarhat Hill Station',
    type: 'cultural-site',
    coordinates: [23.4667, 84.2667],
    rating: 4.7,
    image: '/NetarhatHillstation.jpg',
    description: 'Queen of Chotanagpur with mesmerizing views',
    badges: ['Hill Station', 'Cool Climate']
  }
];

export const guides: Guide[] = [
  {
    id: '1',
    name: 'Preeti Yadav',
    rating: 4.9,
    languages: ['Hindi', 'English', 'Santhali'],
    verified: true,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    specialties: ['Cultural Tours', 'Tribal Heritage'],
    price: 1500
  },
  {
    id: '2',
    name: 'Arjun Singh',
    rating: 4.8,
    languages: ['Hindi', 'English'],
    verified: true,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    specialties: ['Adventure', 'Wildlife'],
    price: 2000
  }
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Netarhat Sunrise Trek',
    type: 'adventure',
    duration: '6 hours',
    price: 2500,
    image: '/NetarhatHillstation.jpg',
    rating: 4.8,
    description: 'Experience the magical sunrise from Queen of Chotanagpur'
  },
  {
    id: '2',
    title: 'Tribal Village Homestay',
    type: 'culture',
    duration: '2-3 days',
    price: 3500,
    image: 'homestay.jpg',
    rating: 4.9,
    description: 'Immerse in authentic tribal culture and traditions'
  },
  {
    id: '3',
    title: 'Betla Wildlife Safari',
    type: 'eco',
    duration: '4 hours',
    price: 1800,
    image: '/BetlaNationalPark.jpg',
    rating: 4.7,
    description: 'Spot tigers, elephants and rare species in their natural habitat'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Santhali Handwoven Saree',
    artisan: 'Sita Murmu',
    price: 4500,
    image: '/saree.jpg',
    category: 'Textiles',
    verified: true,
    description: 'Traditional handwoven saree with authentic tribal patterns'
  },
  {
    id: '2',
    name: 'Dokra Metal Craft',
    artisan: 'Ram Baski',
    price: 2200,
    image: '/art.jpg',
    category: 'Handicrafts',
    verified: true,
    description: 'Ancient lost-wax casting technique brass figurine'
  }
];