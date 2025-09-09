"use client";
import React, { useState, useEffect } from 'react';
import { Search, Star, MapPin, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Business interface
interface Business {
  id: number;
  title: string;
  description: string;
  category: string;
  country: string;
  location: string;
  rating: number;
  featured?: boolean;
  trending?: boolean;
  image: string;
  price?: string;
  phone?: string;
  whatsapp?: string;
  slug?: string;
  mapEmbed?: string;
  currency?: string;
}

// Sample business data (moved inside component to avoid import issues)
const businessData: Business[] = [
  {
    id: 1,
    title: "Adunni Fashion House",
    description: "Custom Ankara dresses, traditional wear, and modern African fashion.",
    category: "Fashion & Tailoring",
    country: "Nigeria",
    location: "Lagos",
    rating: 4.8,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1594736797933-d0601ba51eae?w=400&q=80",
    price: "₦15,000 - ₦50,000",
    phone: "+234-801-234-5678",
    whatsapp: "+234-801-234-5678",
    slug: "adunni-fashion-house-lagos"
  },
  {
    id: 2,
    title: "Eko Rice Farms",
    description: "Premium local rice production and wholesale distribution.",
    category: "Agriculture & Farming",
    country: "Nigeria",
    location: "Lagos",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    price: "₦25,000/bag",
    phone: "+234-802-345-6789",
    slug: "eko-rice-farms-lagos"
  },
  {
    id: 3,
    title: "Mama Cass Jollof Palace",
    description: "Authentic Nigerian cuisine, jollof rice, pepper soup, and suya.",
    category: "Food & Restaurants",
    country: "Nigeria",
    location: "Abuja",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&q=80",
    price: "₦2,000 - ₦8,000",
    phone: "+234-803-456-7890",
    slug: "mama-cass-jollof-palace-abuja"
  },
  {
    id: 4,
    title: "Kumasi Kente Weavers",
    description: "Authentic handwoven Kente cloth, traditional Ghanaian textiles.",
    category: "Kente & Textiles",
    country: "Ghana",
    location: "Ashanti",
    rating: 4.9,
    featured: true,
    trending: true,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80",
    price: "GH₵150 - GH₵800",
    phone: "+233-24-123-4567",
    slug: "kumasi-kente-weavers"
  },
  {
    id: 5,
    title: "Kilimanjaro Coffee Estate",
    description: "Premium Arabica coffee beans from the highlands of Kenya.",
    category: "Coffee Farming",
    country: "Kenya",
    location: "Nairobi",
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80",
    price: "KSh 1,200/kg",
    phone: "+254-712-345-678",
    slug: "kilimanjaro-coffee-estate"
  },
  {
    id: 6,
    title: "Maasai Bead Craft Center",
    description: "Authentic Maasai jewelry, beadwork, and traditional crafts.",
    category: "Beadwork & Crafts",
    country: "Kenya",
    location: "Nairobi",
    rating: 4.6,
    trending: true,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    price: "KSh 500 - KSh 5,000",
    phone: "+254-723-456-789",
    slug: "maasai-bead-craft-center"
  }
];

interface ExploreData {
  featured: Business[];
  byCategory: Record<string, Business[]>;
  allCategories: string[];
}

// Header component (simplified)


// Footer component (simplified)


// Business Card Component
const BusinessCard = ({ business }: { business: Business }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group">
    <div className="relative overflow-hidden">
      <img
        src={business.image}
        alt={business.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
      
      {business.featured && (
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}
      {business.trending && (
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            🔥 Trending
          </span>
        </div>
      )}
    </div>
    
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
          {business.title}
        </h3>
        <div className="flex items-center ml-2 flex-shrink-0">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
            {business.rating}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {business.description}
      </p>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{business.location}, {business.country}</span>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">Category:</span>
          <span className="text-blue-600 dark:text-blue-400 font-medium ml-1">{business.category}</span>
        </div>
        {business.price && (
          <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
            {business.price}
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {business.phone && (
          <button 
            onClick={() => window.open(`tel:${business.phone}`, '_self')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <Phone className="w-4 h-4 mr-1" />
            Call
          </button>
        )}
        {business.whatsapp && (
          <button 
            onClick={() => window.open(`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
            className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            WhatsApp
          </button>
        )}
      </div>
    </div>
  </div>
);

// Category Section Component
const CategorySection = ({ 
  title, 
  businesses, 
  isExpanded, 
  onToggle 
}: {
  title: string;
  businesses: Business[];
  isExpanded: boolean;
  onToggle: () => void;
}) => (
  <div className="mb-8">
    <div 
      className="flex items-center justify-between mb-4 cursor-pointer bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
      onClick={onToggle}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{businesses.length} businesses</p>
      </div>
      <ChevronRight 
        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
          isExpanded ? 'rotate-90' : ''
        }`} 
      />
    </div>
    
    {isExpanded && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    )}
  </div>
);

// Main Explore Page Component
const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [exploreData, setExploreData] = useState<ExploreData>({
    featured: [],
    byCategory: {},
    allCategories: []
  });
  const [loading, setLoading] = useState(true);

  // Process data based on search query
  useEffect(() => {
    setLoading(true);
    
    // Filter data based on search
    let data = businessData;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    // Get featured businesses
    const featured = data.filter((b) => b.featured);
    
    // Get non-featured businesses
    const nonFeatured = data.filter((b) => !b.featured);
    
    // Group non-featured by category
    const byCategory: Record<string, Business[]> = {};
    nonFeatured.forEach((business) => {
      const category = business.category;
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push(business);
    });

    // Sort businesses within each category by rating (descending)
    Object.keys(byCategory).forEach((category) => {
      byCategory[category].sort((a, b) => b.rating - a.rating);
    });

    // Get all categories sorted alphabetically
    const allCategories = Object.keys(byCategory).sort();

    // Sort featured businesses by rating
    featured.sort((a, b) => b.rating - a.rating);

    setExploreData({
      featured,
      byCategory,
      allCategories
    });

    setLoading(false);
  }, [searchQuery]);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const expandAllCategories = () => {
    setExpandedCategories(new Set(exploreData.allCategories));
  };

  const collapseAllCategories = () => {
    setExpandedCategories(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading businesses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl pt-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Explore African Businesses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Discover amazing businesses across Africa. From featured establishments to local gems organized by category.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses, locations, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Search Results Counter */}
        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found {exploreData.featured.length + Object.values(exploreData.byCategory).flat().length} businesses matching "{searchQuery}"
            </p>
          </div>
        )}

        {/* Featured Businesses */}
        {exploreData.featured.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                <span className="text-2xl mr-3">⭐</span>
                Featured Businesses
              </h2>
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {exploreData.featured.length} featured
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {exploreData.featured.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {exploreData.allCategories.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Browse by Category
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={expandAllCategories}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 hover:shadow-md"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAllCategories}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 hover:shadow-md"
                >
                  Collapse All
                </button>
              </div>
            </div>
            
            {exploreData.allCategories.map((category) => (
              <CategorySection
                key={category}
                title={category}
                businesses={exploreData.byCategory[category]}
                isExpanded={expandedCategories.has(category)}
                onToggle={() => toggleCategory(category)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {exploreData.featured.length === 0 && exploreData.allCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No businesses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or check back later for new listings.
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ExplorePage;