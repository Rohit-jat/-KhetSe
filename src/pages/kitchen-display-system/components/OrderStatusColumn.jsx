// src/pages/kitchen-display-system/components/OrderStatusColumn.jsx
import React from 'react';
import Icon from 'components/AppIcon';
import OrderCard from './OrderCard';

function OrderStatusColumn({
  title,
  status,
  orders,
  onOrderStatusUpdate,
  onOrderPriorityUpdate,
  onItemToggle,
  currentTime,
  color = 'primary',
  className = ''
}) {
  const getColorClasses = (colorName) => {
    const colorMap = {
      primary: {
        header: 'bg-primary-50 text-primary border-primary-200',
        icon: 'text-primary',
        count: 'bg-primary text-white'
      },
      secondary: {
        header: 'bg-secondary-50 text-secondary border-secondary-200',
        icon: 'text-secondary',
        count: 'bg-secondary text-white'
      },
      accent: {
        header: 'bg-accent-50 text-accent border-accent-200',
        icon: 'text-accent',
        count: 'bg-accent text-white'
      },
      success: {
        header: 'bg-success-50 text-success border-success-200',
        icon: 'text-success',
        count: 'bg-success text-white'
      },
      warning: {
        header: 'bg-warning-50 text-warning border-warning-200',
        icon: 'text-warning',
        count: 'bg-warning text-white'
      },
      error: {
        header: 'bg-error-50 text-error border-error-200',
        icon: 'text-error',
        count: 'bg-error text-white'
      }
    };
    return colorMap[colorName] || colorMap.primary;
  };

  const getStatusIcon = (statusType) => {
    switch (statusType) {
      case 'new':
        return 'Clock';
      case 'in-progress':
        return 'Timer';
      case 'ready':
        return 'CheckCircle';
      case 'completed':
        return 'Check';
      default:
        return 'Circle';
    }
  };

  const colors = getColorClasses(color);
  const orderCount = orders?.length || 0;
  
 

  return (
  <>
    <div className={`flex flex-col h-full ${className}`}>
      {/* Column Header */}
      <div className={`p-4 rounded-t-xl border-2 ${colors.header}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name={getStatusIcon(status)} size={20} className={colors.icon} />
            <h3 className="font-heading font-heading-medium text-lg">
              {title}
            </h3>
          </div>
          
       
            
            <div className={`text-sm font-data font-data-normal px-3 py-1 rounded-full ${colors.count}`}>
              {orderCount}
            </div>
          </div>
        </div>
        
     

      {/* Orders List */}
      <div className="flex-1 bg-background border-l-2 border-r-2 border-b-2 border-border rounded-b-xl overflow-hidden">
        {orderCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
            <Icon name="FileX" size={48} className="mb-4 opacity-50" />
            <p className="font-body text-center">
              No {status.replace('-', ' ')} orders
            </p>
            <p className="font-body text-sm text-center mt-1 opacity-75">
              Orders will appear here when available
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-3 max-h-screen overflow-y-auto">
            {orders?.map((order) => (
              <OrderCard
                key={order?.id}
                order={order}
                onStatusUpdate={onOrderStatusUpdate}
                onPriorityUpdate={onOrderPriorityUpdate}
                onItemToggle={onItemToggle}
                currentTime={currentTime}
              />
            ))}
          </div>
        )}
      </div>
      </div>
      
  </>
            
      );
    }
    

export default OrderStatusColumn;