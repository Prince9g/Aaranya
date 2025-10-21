import React, { useState } from 'react';
import { Search, Star, ShoppingCart, Heart, Shield, Filter } from 'lucide-react';
import { products } from '../data/mockData';

const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'handicrafts', label: 'Handicrafts' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'pottery', label: 'Pottery' },
    { value: 'woodwork', label: 'Woodwork' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: string) => {
    setCart(prev => prev.includes(productId) ? prev : [...prev, productId]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-[#F4E9CD] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#003459] mb-4">
            Local Artisan Marketplace
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Buy directly from local artisans — support communities and take home authentic Jharkhand crafts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products or artisans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A6A6] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-[#00A6A6] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200">
                  <Filter className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button className="p-2 text-[#6B7280] hover:text-[#003459] transition-colors duration-200 relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                    wishlist.includes(product.id)
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-white/80 text-gray-600 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
                
                {product.verified && (
                  <div className="absolute top-4 left-4 bg-[#00A6A6] text-white px-2 py-1 rounded-full flex items-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#00A6A6] font-medium">{product.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#003459] mb-2">{product.name}</h3>
                <p className="text-[#6B7280] text-sm mb-3">by {product.artisan}</p>
                <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-[#003459]">₹{product.price.toLocaleString()}</div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={cart.includes(product.id)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                      cart.includes(product.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white'
                    }`}
                  >
                    {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="px-4 py-3 border-2 border-[#00A6A6] text-[#00A6A6] hover:bg-[#00A6A6] hover:text-white rounded-lg font-medium transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-[#003459] mb-2">No products found</h3>
            <p className="text-[#6B7280]">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Artisan CTA */}
        <div className="mt-16 bg-[#003459] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Are you a local artisan?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join our marketplace and connect directly with travelers from around the world. 
            Showcase your craft and earn fair prices for your beautiful work.
          </p>
          <button className="bg-[#FF6B6B] hover:bg-[#ff5a5a] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105">
            List Your Crafts — Quick Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;