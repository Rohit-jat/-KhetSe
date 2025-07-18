// src/pages/customer-account-order-history/components/OrderHistorySection.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import { format } from 'date-fns';

function OrderHistorySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock order data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: new Date('2024-01-15T18:30:00'),
      status: 'delivered',
      Farmer: 'FARMER_NAME',
      items: [
        { name: 'potato', quantity: 1, price: 18.99 },
        { name: 'onion', quantity: 1, price: 12.99 },
        { name: 'tomato', quantity: 2, price: 3.99 }
      ],
      subtotal: 39.96,
      tax: 3.20,
      delivery: 2.99,
      total: 46.15,
      paymentMethod: 'Caseh on Delivery',
      deliveryAddress: '123 Main St, Apt 4B',
     
      
      rating: 5,
      hasReview: true
    },
  ];




  const filteredOrders = useMemo(() => {
    let filtered = orders;

    return filtered?.sort((a, b) => new Date(b?.date) - new Date(a?.date));
  }, [searchQuery, statusFilter, locationFilter, dateFilter, orders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-success-600 bg-success-100';
      case 'cancelled': return 'text-error-600 bg-error-100';
      case 'pending': return 'text-warning-600 bg-warning-100';
      default: return 'text-text-secondary bg-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return 'CheckCircle';
      case 'cancelled': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Package';
    }
  };

  const handleReorder = async (order) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/shopping-cart-checkout', { state: { reorderItems: order?.items } });
    } catch (error) {
      console.error('Failed to reorder:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-6">
  

       

      {/* Orders List */}
      {filteredOrders?.length === 0 ? (
        <div className="bg-surface rounded-lg shadow-soft p-12 text-center">
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Package" size={32} className="text-secondary-400" />
          </div>
          <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
            No orders found
          </h3>
          <p className="text-text-secondary font-body mb-6">
            {searchQuery || statusFilter !== 'all' || locationFilter !== 'all' || dateFilter !== 'all' ?'Try adjusting your search or filters to find your orders.' : "You haven't placed any orders yet. Start browsing our menu!"}
          </p>
          <button
            onClick={() => navigate('/menu-browse-search')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth font-body font-body-medium"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders?.map((order) => (
            <div key={order?.id} className="bg-surface rounded-lg shadow-soft overflow-hidden">
              {/* Order Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-secondary-50 transition-smooth"
                onClick={() => toggleOrderExpansion(order?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={getStatusIcon(order?.status)} size={20} className={getStatusColor(order?.status)?.split(' ')[0]} />
                        <span className={`px-3 py-1 rounded-full text-sm font-body font-body-medium ${getStatusColor(order?.status)}`}>
                          {order?.status?.charAt(0)?.toUpperCase() + order?.status?.slice(1)}
                        </span>
                      </div>
                      
                      <span className="text-sm text-text-secondary font-body">
                        {format(new Date(order?.date), 'MMM dd, yyyy • h:mm a')}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-heading-medium text-text-primary mb-1">
                          Order #{order?.id}
                        </h3>
                        <p className="text-sm text-text-secondary font-body">
                          {order?.restaurant} • {order?.items?.length} items • ${order?.total?.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {order?.status === 'delivered' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReorder(order);
                            }}
                            disabled={isLoading}
                            className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary rounded-lg hover:bg-primary-100 transition-smooth font-body font-body-medium"
                          >
                            <Icon name="RotateCcw" size={16} />
                            <span>Reorder</span>
                          </button>
                        )}
                        
                        <Icon 
                          name={expandedOrder === order?.id ? "ChevronUp" : "ChevronDown"} 
                          size={20} 
                          className="text-text-secondary" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order?.id && (
                <div className="border-t border-border p-6 bg-secondary-50">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-body font-body-medium text-text-primary mb-3">
                        Items Ordered
                      </h4>
                      <div className="space-y-2">
                        {order?.items?.map((item, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 bg-primary-100 text-primary text-xs rounded-full flex items-center justify-center font-body font-body-medium">
                                {item?.quantity}
                              </span>
                              <span className="font-body text-text-primary">{item?.name}</span>
                            </div>
                            <span className="font-body text-text-primary">
                              ₹{(item?.price * item?.quantity)?.toFixed(2)}
                            </span>
                          </div>
                        ))}
                        
                        <div className="border-t border-border pt-2 mt-3 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary font-body">Subtotal</span>
                            <span className="text-text-primary font-body">₹{order?.subtotal?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary font-body">Tax</span>
                            <span className="text-text-primary font-body">₹{order?.tax?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary font-body">Delivery</span>
                            <span className="text-text-primary font-body">₹{order?.delivery?.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-body font-body-medium border-t border-border pt-1">
                            <span className="text-text-primary">Total</span>
                            <span className="text-text-primary">₹{order?.total?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h4 className="font-body font-body-medium text-text-primary mb-3">
                        Order Details
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-text-secondary font-body mb-1">
                            Delivery Address
                          </label>
                          <p className="font-body text-text-primary">{order?.deliveryAddress}</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-text-secondary font-body mb-1">
                            Payment Method
                          </label>
                          <p className="font-body text-text-primary">{order?.paymentMethod}</p>
                        </div>
                        
                       
                        
                        {order?.status === 'cancelled' && (
                          <>
                            <div>
                              <label className="block text-sm text-text-secondary font-body mb-1">
                                Cancellation Reason
                              </label>
                              <p className="font-body text-text-primary">{order?.cancelReason}</p>
                            </div>
                            
                            <div>
                              <label className="block text-sm text-text-secondary font-body mb-1">
                                Refund Amount
                              </label>
                              <p className="font-body text-success-600">${order?.refundAmount?.toFixed(2)}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                    <button
                      onClick={() => handleDownloadReceipt(order)}
                      className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-secondary-50 transition-smooth font-body font-body-medium"
                    >
                      <Icon name="Download" size={16} />
                      <span>Download Receipt</span>
                    </button>
                    
                    {order?.status === 'delivered' && !order?.hasReview && (
                      <button
                        onClick={() => handleRateOrder(order)}
                        className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-secondary-50 transition-smooth font-body font-body-medium"
                      >
                        <Icon name="Star" size={16} />
                        <span>Rate Order</span>
                      </button>
                    )}
                    
                    {(order?.status === 'pending' || order?.status === 'preparing') && (
                      <button
                        onClick={() => handleTrackOrder(order)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-smooth font-body font-body-medium"
                      >
                        <Icon name="MapPin" size={16} />
                        <span>Track Order</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistorySection;