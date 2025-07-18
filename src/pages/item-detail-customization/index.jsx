import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomerNavigation from 'components/ui/CustomerNavigation';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ItemDetailCustomization() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [spiceLevel, setSpiceLevel] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showNutrition, setShowNutrition] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
 

  // Mock item data - would come from props/state in real app
  const mockItem = {
    id: 'item-001',
    name: 'Mango',
    description: `Mango – The King of Fruits!
Juicy, sweet, and full of flavor — our farm-fresh mangoes are handpicked at peak ripeness. Whether you enjoy them sliced, juiced, or in desserts, each bite bursts with tropical goodness. Grown naturally without harmful chemicals, delivered straight from our farms to your doorstep.`,
    basePrice: 18.99,

    rating: 4.7,
    reviewCount: 342,
    images: [
      'https://images.unsplash.com/photo-1582655299221-2b6bff351df0?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   'https://unsplash.com/photos/a-wooden-cutting-board-topped-with-sliced-mangoes-and-a-pineapple-edXugyB8F3w'
    ],
    sizes: [
      { id: 'small', name: '1kg', price: 30,  },
      { id: 'medium', name: '2kg', price:60 ,  },
      { id: 'large', name: '5kg', price: 150, },
      { id: 'xlarge', name: '10kg', price: 300,  }
    ],

   
    availability: true,
    category: ''
  };




   useEffect(() => {
    setSelectedItem(mockItem);
    // Initialize selected ingredients state

  }, []);

  const calculateTotalPrice = () => {
    if (!selectedItem) return 0;
    
    let total = selectedItem.basePrice;
    
    
    const selectedSizeData = selectedItem.sizes.find(size => size.id === selectedSize);
    if (selectedSizeData) {
      total += selectedSizeData.price;
    }
    
    
    
    return total * quantity;
  };





  const handleImageNavigation = (direction) => {
    if (!selectedItem) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedItem.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === selectedItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleRelatedItemClick = (itemId) => {
    // In real app, this would fetch new item data
    console.log('Navigate to item:', itemId);
  };

  const handleClose = () => {
    navigate('/menu-browse-search');
  };

  if (!selectedItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-text-secondary font-body">Loading item details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      {/* Mobile: Full Screen Layout */}
      <div className="lg:hidden pt-16">
        {/* Header */}
        <div className="sticky top-16 z-10 bg-surface shadow-soft px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleClose}
            className="p-2 text-text-secondary hover:text-primary transition-smooth"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          <h1 className="font-heading font-heading-medium text-text-primary truncate mx-4">
            {selectedItem.name}
          </h1>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 text-text-secondary hover:text-primary transition-smooth"
          >
            <Icon name={isFavorite ? "Heart" : "Heart"} size={24} className={isFavorite ? "text-error fill-current" : ""} />
          </button>
        </div>

        {/* Image Carousel */}
        <div className="relative h-64 bg-secondary-100">
          <Image
            src={selectedItem.images[currentImageIndex]}
            alt={selectedItem.name}
            className="w-full h-full object-cover"
          />
          
          {selectedItem.images.length > 1 && (
            <>
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface bg-opacity-80 rounded-full flex items-center justify-center text-text-primary hover:bg-opacity-100 transition-smooth"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-surface bg-opacity-80 rounded-full flex items-center justify-center text-text-primary hover:bg-opacity-100 transition-smooth"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedItem.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-smooth ${
                      index === currentImageIndex ? 'bg-surface' : 'bg-surface bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pb-24">
          {/* Item Info */}
          <div className="py-6 border-b border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-heading-medium text-text-primary mb-2">
                  {selectedItem.name}
                </h2>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span className="text-sm font-body font-body-medium text-text-primary">
                      {selectedItem.rating}
                    </span>
                    <span className="text-sm text-text-secondary font-body">
                      ({selectedItem.reviewCount} reviews)
                    </span>
                  </div>
                 
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-heading font-heading-medium text-primary">
                  ₹{calculateTotalPrice().toFixed(2)}
                </div>
                <div className="text-sm text-text-secondary font-body">
                  Base: ₹{selectedItem.basePrice.toFixed(2)}
                </div>
              </div>
            </div>
            
            <p className="text-text-secondary font-body leading-relaxed">
              {selectedItem.description}
            </p>
            
       
          </div>

          {/* Size Selection */}
          <div className="py-6 border-b border-border">
            <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
              Choose Size
            </h3>
            <div className="space-y-3">
              {selectedItem.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-smooth text-left ${
                    selectedSize === size.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-body font-body-medium text-text-primary">
                        {size.name}
                      </div>
                  
                    </div>
                    <div className="text-right">
                      <div className="font-body font-body-medium text-text-primary">
                        {size.price > 0 ? `₹${size.price.toFixed(2)}` : 'Base'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

         
       

          {/* Special Instructions */}
          <div className="py-6 border-b border-border">
            <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
              Special Instructions
            </h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any special requests or requirements..."
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth font-body resize-none"
              rows={3}
              maxLength={200}
            />
            <div className="text-right text-sm text-text-secondary font-body mt-1">
              {specialInstructions.length}/200
            </div>
          </div>

         

          {/* Reviews */}
          {/* <div className="py-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-heading-medium text-text-primary">
                Customer Reviews
              </h3>
              <button className="text-primary hover:text-primary-700 font-body font-body-medium transition-smooth">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {mockReviews.slice(0, 2).map((review) => (
                <div key={review.id} className="p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-body font-body-medium text-text-primary">
                        {review.customerName}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < review.rating ? "text-warning fill-current" : "text-secondary-300"}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-text-secondary font-body">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-text-secondary font-body text-sm">
                    {review.comment}
                  </p>
                  {review.images.length > 0 && (
                    <div className="flex space-x-2 mt-3">
                      {review.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt="Review"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div> */}

          {/* Related Items */}
       
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-10">
          <div className="flex items-center space-x-4">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-3 bg-secondary-50 rounded-lg p-2">
              <button
                
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="font-data font-data-normal text-text-primary min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
              
                disabled={quantity >= 10}
                className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              
              disabled={!selectedItem.availability}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth font-body font-body-medium"
            >
              <Icon name="ShoppingCart" size={20} />
              <span>Add to Cart • ${calculateTotalPrice().toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Modal Layout */}
      <div className="hidden lg:block">
        <div className="fixed inset-0 z-modal flex items-center justify-center p-8 pt-24">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-secondary-900 bg-opacity-50 transition-modal"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="relative bg-surface rounded-2xl shadow-floating max-w-6xl w-full max-h-[90vh] overflow-hidden transition-modal">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-heading font-heading-medium text-text-primary">
                {selectedItem.name}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 text-text-secondary hover:text-primary transition-smooth"
                >
                  <Icon name={isFavorite ? "Heart" : "Heart"} size={24} className={isFavorite ? "text-error fill-current" : ""} />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 text-text-secondary hover:text-primary transition-smooth"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-8rem)] overflow-hidden">
              {/* Left: Image Gallery */}
              <div className="w-1/2 relative bg-secondary-100">
                <Image
                  src={selectedItem.images[currentImageIndex]}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                
                {selectedItem.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNavigation('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface bg-opacity-80 rounded-full flex items-center justify-center text-text-primary hover:bg-opacity-100 transition-smooth"
                    >
                      <Icon name="ChevronLeft" size={24} />
                    </button>
                    <button
                      onClick={() => handleImageNavigation('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface bg-opacity-80 rounded-full flex items-center justify-center text-text-primary hover:bg-opacity-100 transition-smooth"
                    >
                      <Icon name="ChevronRight" size={24} />
                    </button>
                    
                    {/* Thumbnail Navigation */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedItem.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-smooth ${
                            index === currentImageIndex ? 'border-primary' : 'border-surface border-opacity-50'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedItem.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right: Details */}
              <div className="w-1/2 flex flex-col">
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Item Info */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={18} className="text-warning fill-current" />
                            <span className="font-body font-body-medium text-text-primary">
                              {selectedItem.rating}
                            </span>
                            <span className="text-text-secondary font-body">
                              ({selectedItem.reviewCount} reviews)
                            </span>
                          </div>
                        
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-heading font-heading-medium text-primary">
                          ₹{calculateTotalPrice().toFixed(2)}
                        </div>
                        <div className="text-text-secondary font-body">
                          Base: ₹{selectedItem.basePrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary font-body leading-relaxed mb-4">
                      {selectedItem.description}
                    </p>
                    
                
                  </div>

                  {/* Customization Options */}
                  <div className="space-y-6">
                    {/* Size Selection */}
                    <div>
                      <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-3">
                        Choose Quantity
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedItem.sizes.map((size) => (
                          <button
                            key={size.id}
                            onClick={() => setSelectedSize(size.id)}
                            className={`p-3 rounded-lg border-2 transition-smooth text-left ${
                              selectedSize === size.id
                                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200'
                            }`}
                          >
                            <div className="font-body font-body-medium text-text-primary">
                              {size.name}
                            </div>
                            <div className="text-sm text-text-secondary font-body">
                              {size.price > 0 ? `₹${size.price.toFixed(2)}` : 'Base'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                


                    {/* Special Instructions */}
                    <div>
                      <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-3">
                        Any Instructions
                      </h3>
                      <textarea
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        placeholder="Any special requests or requirements..."
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth font-body resize-none"
                        rows={3}
                        maxLength={200}
                      />
                      <div className="text-right text-sm text-text-secondary font-body mt-1">
                        {specialInstructions.length}/200
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="border-t border-border p-6">
                  <div className="flex items-center space-x-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-3 bg-secondary-50 rounded-lg p-2">
                      <button
                      
                        disabled={quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                      >
                        <Icon name="Minus" size={18} />
                      </button>
                      <span className="font-data font-data-normal text-lg text-text-primary min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                       
                        disabled={quantity >= 10}
                        className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
                      >
                        <Icon name="Plus" size={18} />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                     
                     
                      className="flex-1 flex items-center justify-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth font-body font-body-medium text-lg"
                    >
                      <Icon name="ShoppingCart" size={24} />
                      <span>Add to Cart • ₹{calculateTotalPrice().toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailCustomization;