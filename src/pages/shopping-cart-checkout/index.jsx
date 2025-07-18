import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerNavigation from 'components/ui/CustomerNavigation';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ShoppingCartCheckout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState('delivery'); // 'delivery' or 'pickup'
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const [usePoints, setUsePoints] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  // Mock data
  const mockCartItems = [
  
  {
    id: 1,
    name: "Alphonso Mangoes",
    image: "https://images.unsplash.com/photo-1584270354949-1f5c2bfa3ac1?w=300&h=200&fit=crop",
    price: 120, // per kg
    quantity: 5, // available stock
    customizations: ["1kg", "2kg", "Box of 5kg"],
   
 
  },
  {
    id: 2,
    name: "Organic Tomatoes",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=200&fit=crop",
    price: 30,
    quantity: 10,
    customizations: ["500g", "1kg", "2kg"],
  
   
  },
  {
    id: 3,
    name: "Whole Wheat Grain",
    image: "https://images.unsplash.com/photo-1607330289341-3b0860c38903?w=300&h=200&fit=crop",
    price: 45,
    quantity: 20,
    customizations: ["2kg Bag", "5kg Bag", "10kg Sack"],
 
  }


  ];

  const savedAddresses = [
    {
      id: 1,
      label: "Home",
      address: "123  Street, Apt xyz, city 12345",
      isDefault: true
    },
    {
      id: 2,
      label: "Office",
      address: "123  Street, Apt xyz, city 123456",
      isDefault: false
    }
  ];


  const paymentMethods = [

    { id: 'razorpay', name: 'UPI/Wallet', icon: 'Smartphone' },
    { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote' }
  ];

  useEffect(() => {
    setCartItems(mockCartItems);
    setSelectedAddress(savedAddresses[0].id);
  
    setPaymentMethod(paymentMethods[0].id);
  }, []);



  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (promoMessage.includes('10%')) return calculateSubtotal() * 0.1;
    if (promoMessage.includes('20%')) return calculateSubtotal() * 0.2;
    return 0;
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.08;
  };

  const calculateDeliveryFee = () => {
    return fulfillmentType === 'delivery' ? 3.99 : 0;
  };

  const calculatePointsDiscount = () => {
    return usePoints ? Math.min(loyaltyPoints * 0.01, calculateSubtotal() * 0.2) : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax() + calculateDeliveryFee() - calculatePointsDiscount();
  };





  const minimumOrderValue = 15.00;
  const isMinimumMet = calculateSubtotal() >= minimumOrderValue;

  return (
    <div className="min-h-screen bg-background">
      <CustomerNavigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link 
                to="/menu-browse-search"
                className="p-2 text-text-secondary hover:text-primary transition-smooth"
              >
                <Icon name="ArrowLeft" size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-heading font-heading-medium text-text-primary">
                  Shopping Cart
                </h1>
                <p className="text-text-secondary font-body">
                  Review your order and proceed to checkout
                </p>
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingCart" size={48} className="text-secondary" />
              </div>
              <h2 className="text-2xl font-heading font-heading-medium text-text-primary mb-4">
                Your cart is empty
              </h2>
              <p className="text-text-secondary font-body mb-8">
                Add some items to get started
              </p>
              <Link
                to="/menu-browse-search"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth font-body font-body-medium"
              >
                <Icon name="ChefHat" size={20} />
                <span>Browse Menu</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
          

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-surface border border-border rounded-lg p-6 shadow-soft">
                      <div className="flex items-start space-x-4">
                        {/* Item Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-heading font-heading-medium text-text-primary">
                                {item.name}
                              </h3>
                              <p className="text-primary font-body font-body-medium">
                                ₹{item.price.toFixed(2)} each
                              </p>
                            </div>
                            
                          
                    
                          </div>

                      


                          {/* Item Actions */}
                          <div className="flex items-center justify-between mt-4">
                            <Link
                              to="/item-detail-customization"
                              state={{ item }}
                              className="text-sm text-primary hover:text-primary-700 font-body-medium transition-smooth"
                            >
                              Modify Item
                            </Link>
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-heading font-heading-medium text-text-primary">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                              
                                className="p-1 text-error hover:bg-error-50 rounded transition-smooth"
                              >
                                <Icon name="Trash2" size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Order Summary & Checkout */}
              <div className="space-y-6">
                {/* Fulfillment Type */}
                <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                    Fulfillment
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFulfillmentType('delivery')}
                      className={`p-3 border rounded-lg transition-smooth font-body font-body-medium ${
                        fulfillmentType === 'delivery' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-primary-50'
                      }`}
                    >
                      <Icon name="Truck" size={20} className="mx-auto mb-1" />
                      <div className="text-sm">Delivery</div>
                    </button>
                    <button
                      onClick={() => setFulfillmentType('pickup')}
                      className={`p-3 border rounded-lg transition-smooth font-body font-body-medium ${
                        fulfillmentType === 'pickup' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-primary-50'
                      }`}
                    >
                      <Icon name="Store" size={20} className="mx-auto mb-1" />
                      <div className="text-sm">Pickup</div>
                    </button>
                  </div>
                </div>

                {/* Address Selection (for delivery) */}
                {fulfillmentType === 'delivery' && (
                  <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
                    <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                      Delivery Address
                    </h3>
                    <select
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
                    >
                      {savedAddresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.label} - {address.address}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                )}

              

                {/* Payment Method */}
                <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                    Payment Method
                  </h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        
                        
                        className={`w-full flex items-center space-x-3 p-3 border rounded-lg transition-smooth font-body ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary hover:bg-primary-50'
                        }`}
                      >
                        <Icon name={method.icon} size={20} />
                        <span>{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

          

           

                {/* Order Summary */}
                <div className="bg-surface border border-border rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary font-body">Base Price</span>
                      <span className="font-data font-data-normal">₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    
                    {calculateDiscount() > 0 && (
                      <div className="flex justify-between text-success">
                        <span className="font-body">Discount</span>
                        <span className="font-data font-data-normal">₹{calculateDiscount().toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-text-secondary font-body">Tax</span>
                      <span className="font-data font-data-normal">₹{calculateTax().toFixed(2)}</span>
                    </div>
                    
                    {fulfillmentType === 'delivery' && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary font-body">Delivery Fee</span>
                        <span className="font-data font-data-normal">₹{calculateDeliveryFee().toFixed(2)}</span>
                      </div>
                    )}
                    
                    {usePoints && calculatePointsDiscount() > 0 && (
                      <div className="flex justify-between text-success">
                        <span className="font-body">Points Discount</span>
                        <span className="font-data font-data-normal">-₹{calculatePointsDiscount().toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-heading font-heading-medium text-text-primary">Total</span>
                        <span className="text-lg font-heading font-heading-medium text-primary">
                          ₹{calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                 
                  disabled={!isMinimumMet || isLoading}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-primary text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth font-body font-body-medium text-lg"
                >
                  {isLoading && <Icon name="Loader2" size={20} className="animate-spin" />}
                  <span>
                    {isLoading ? 'Placing Order...' : `Place Order • ₹${calculateTotal().toFixed(2)}`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCartCheckout;