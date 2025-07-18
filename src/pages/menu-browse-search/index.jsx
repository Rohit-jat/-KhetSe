
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerNavigation from 'components/ui/CustomerNavigation';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function MenuBrowseSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    dietary: [],
    priceRange: [0, 50],
    prepTime: 60,
    allergens: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation] = useState('India');

  const categories = [
    { id: 'all', name: 'All Products', icon: 'Grid3X3' },
    { id: 'fruits', name: 'Fruits', icon: 'Apple' },
    { id: 'vegetables', name: 'Vegetables', icon: 'Carrot' },
    { id: 'dairy', name: 'Dairy', icon: 'Milk' },
    { id: 'grains', name: 'Grains & Pulses', icon: 'Wheat' },
    { id: 'spices', name: 'Spices & Herbs', icon: 'Pepper' },
    { id: 'homemade', name: 'Homemade', icon: 'Home' },
    { id: 'dryfruits', name: 'Dry Fruits', icon: 'Nut' },
    { id: 'flowers', name: 'Flowers', icon: 'Flower' },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Fresh Alphonso Mangoes",
      description: "Sweet, juicy Alphonso mangoes handpicked from Ratnagiri farms.",
      price: 299,
      originalPrice: 349,
      image: "https://images.unsplash.com/photo-1615486362345-5399eb186158?w=400&h=300&fit=crop",
      category: "fruits",
      dietary: ["vegan", "vegetarian"],
      spiceLevel: 0,
      prepTime: 0,
      allergens: [],
      isAvailable: true,
      isPopular: true,
      discount: "Seasonal Offer - 15% Off",
      rating: 4.9,
      reviewCount: 237
    },
    {
      id: 2,
      name: "Organic Spinach Leaves",
      description: "Farm-fresh, pesticide-free spinach with high iron content.",
      price: 49,
      image: "https://images.unsplash.com/photo-1584270354949-1f49566f2d5c?w=400&h=300&fit=crop",
      category: "vegetables",
      dietary: ["vegan", "vegetarian", "gluten-free"],
      spiceLevel: 0,
      prepTime: 0,
      allergens: [],
      isAvailable: true,
      isPopular: false,
      rating: 4.6,
      reviewCount: 89
    },
    {
      id: 3,
      name: "Desi Cow Milk (1L)",
      description: "Pure and fresh A2 milk from grass-fed desi cows.",
      price: 65,
      image: "https://images.unsplash.com/photo-1604908177522-f686a164d6be?w=400&h=300&fit=crop",
      category: "dairy",
      dietary: ["vegetarian", "protein-rich"],
      spiceLevel: 0,
      prepTime: 0,
      allergens: ["dairy"],
      isAvailable: true,
      isPopular: true,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: 4,
      name: "Organic Moong Dal (1kg)",
      description: "Unpolished moong dal, rich in protein and fiber.",
      price: 120,
      image: "https://images.unsplash.com/photo-1603036342315-0d2e5e8e9a5e?w=400&h=300&fit=crop",
      category: "grains",
      dietary: ["vegan", "gluten-free", "protein-rich"],
      spiceLevel: 0,
      prepTime: 0,
      allergens: [],
      isAvailable: false,
      isPopular: true,
      rating: 4.9,
      reviewCount: 203
    },
    {
      id: 5,
      name: "Dry Red Chili Powder (100g)",
      description: "Sun-dried and stone-ground red chilies for authentic flavor.",
      price: 45,
      image: "https://images.unsplash.com/photo-1644816496189-66bcfd7a3ae9?w=400&h=300&fit=crop",
      category: "spices",
      dietary: ["vegan", "gluten-free"],
      spiceLevel: 3,
      prepTime: 0,
      allergens: [],
      isAvailable: true,
      isPopular: false,
      rating: 4.4,
      reviewCount: 67
    },
    {
      id: 6,
      name: "Homemade Pickle (Lemon)",
      description: "Traditional lemon pickle made with organic spices and mustard oil.",
      price: 80,
      image: "https://images.unsplash.com/photo-1617093728636-bad13d9b7b08?w=400&h=300&fit=crop",
      category: "homemade",
      dietary: ["vegan", "gluten-free"],
      spiceLevel: 2,
      prepTime: 0,
      allergens: [],
      isAvailable: true,
      isPopular: true,
      rating: 4.5,
      reviewCount: 178
    },
    {
      id: 7,
      name: "Kashmiri Almonds (250g)",
      description: "Premium quality almonds rich in healthy fats and protein.",
      price: 299,
      image: "https://images.unsplash.com/photo-1584278859940-bbc3f92f2e4d?w=400&h=300&fit=crop",
      category: "dryfruits",
      dietary: ["vegan", "gluten-free", "protein-rich"],
      spiceLevel: 0,
      prepTime: 0,
      allergens: ["nuts"],
      isAvailable: true,
      isPopular: false,
      rating: 4.3,
      reviewCount: 45
    },
    {
      id: 8,
      name: "Fresh Marigold Garland",
      description: "Bright and fragrant marigold garlands for puja and decoration.",
      price: 59,
      image: "https://images.unsplash.com/photo-1578312068326-d926e028ab04?w=400&h=300&fit=crop",
      category: "flowers",
      dietary: [],
      spiceLevel: 0,
      prepTime: 0,
      allergens: [],
      isAvailable: true,
      isPopular: true,
      rating: 4.6,
      reviewCount: 134
    }
  ];




  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.allergens.length > 0) {
      filtered = filtered.filter(item =>
        !filters.allergens.some(allergen => item.allergens.includes(allergen))
      );
    }

    return filtered;
  }, [selectedCategory, filters, menuItems]);

  const handleAddToCart = (item) => {
    if (!item.isAvailable) return;
    
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleItemClick = (item) => {
    navigate('/item-detail-customization', { state: { item } });
  };

  const clearFilters = () => {
    setFilters({
      dietary: [],
      priceRange: [0, 50],
      prepTime: 60,
      allergens: []
    });
  };

  const activeFiltersCount = filters.dietary.length + filters.allergens.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 50 ? 1 : 0) +
    (filters.prepTime < 60 ? 1 : 0);


  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Search Header */}
        <div className="sticky top-16 z-dropdown bg-surface shadow-soft border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {/* Location and Search Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={20} className="text-primary" />
                <span className="font-body font-body-medium text-text-primary">
                  {currentLocation}
                </span>
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary-50 transition-smooth lg:hidden"
              >
                <Icon name="Filter" size={20} />
                <span className="font-body font-body-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full px-2 py-1">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>


            {/* Search Bar */}
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search for Fruits or vegetables and farm products..."
            
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
              />
       </div>

            {/* Active Filters */}
           
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
          
          

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Category Tabs */}
              <div className="mb-6">
                <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-smooth font-body font-body-medium ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white' :'bg-surface text-text-secondary hover:text-primary hover:bg-primary-50'
                      }`}
                    >
                      <Icon name={category.icon} size={18} />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-heading font-heading-medium text-text-primary">
                    {searchQuery ? `Search results for "${searchQuery}"` : 
                     selectedCategory === 'all' ? 'All Menu Items' : 
                     categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-sm text-text-secondary font-body mt-1">
                    {filteredItems.length} items found
                  </p>
                </div>
              </div>

              {/* Menu Items Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-surface rounded-lg shadow-soft overflow-hidden animate-pulse">
                      <div className="h-48 bg-secondary-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                        <div className="h-3 bg-secondary-200 rounded w-full"></div>
                        <div className="h-3 bg-secondary-200 rounded w-2/3"></div>
                        <div className="h-8 bg-secondary-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
                    No items found
                  </h3>
                  <p className="text-text-secondary font-body mb-4">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth font-body font-body-medium"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map(item => (
                    <div
                      key={item.id}
                      className={`bg-surface rounded-lg shadow-soft overflow-hidden transition-smooth hover:shadow-floating cursor-pointer group ${
                        !item.isAvailable ? 'opacity-60' : ''
                      }`}
                      onClick={() => handleItemClick(item)}
                    >
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                 
                        {/* Quick Add Button */}
                        {item.isAvailable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                            className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-700"
                          >
                            <Icon name="Plus" size={20} />
                          </button>
                        )}

                        {/* Unavailable Overlay */}
                        {!item.isAvailable && (
                          <div className="absolute inset-0 bg-secondary-900 bg-opacity-50 flex items-center justify-center">
                            <span className="bg-surface text-text-primary px-3 py-1 rounded-full text-sm font-body font-body-medium">
                              Currently Unavailable
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-heading font-heading-medium text-text-primary group-hover:text-primary transition-smooth">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-1 text-sm">
                            <Icon name="Star" size={14} className="text-warning-400 fill-current" />
                            <span className="font-body text-text-secondary">{item.rating}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-text-secondary font-body mb-3 line-clamp-2">
                          {item.description}
                        </p>


                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-heading font-heading-medium text-text-primary">
                              ₹{item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-text-secondary line-through font-body">
                               ₹ {item.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          {item.isAvailable && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(item);
                              }}
                              className="px-3 py-1 bg-primary-50 text-primary rounded-lg hover:bg-primary-100 transition-smooth text-sm font-body font-body-medium"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

     </div>

            );
          }

export default MenuBrowseSearch;