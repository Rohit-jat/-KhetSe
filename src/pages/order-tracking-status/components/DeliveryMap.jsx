import React from 'react';
import Icon from 'components/AppIcon';

function DeliveryMap({ order, driver }) {
  // Mock coordinates for demonstration
  const restaurantLocation = { lat: 26.9855, lng: 75.8513 };
  const customerLocation ={ lat: 26.9855, lng: 75.8513 };
 

  // Calculate estimated arrival time
  const getEstimatedArrival = () => {
    const now = new Date();
    const estimatedMinutes = Math.floor(Math.random() * 15) + 10; // 10-25 minutes
    const arrivalTime = new Date(now.getTime() + estimatedMinutes * 60000);
    return arrivalTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      {/* Map Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-heading-medium text-text-primary">
            Live Tracking
          </h3>
         
        </div>
        
       
      </div>

      {/* Map Container */}
      <div className="relative h-64 sm:h-80 bg-secondary-50">
        {/* Google Maps Embed */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Delivery Tracking Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${customerLocation.lat},${customerLocation.lng}&z=14&output=embed`}
          className="border-0"
        ></iframe>

        {/* Map Overlay Info */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-surface rounded-lg shadow-floating p-4 border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
             
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div>
                  <p className="font-body font-body-medium text-text-primary">Farmer</p>
                  <p className="text-text-secondary font-body">"FAR_NAME"</p>
                </div>
              </div>

            

              {/* Customer */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <div>
                  <p className="font-body font-body-medium text-text-primary">Farmer Location</p>
                  <p className="text-text-secondary font-body">Farmer Address</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>

      {/* Map Actions */}
      <div className="p-4 bg-secondary-50 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-smooth font-body font-body-medium text-sm">
              <Icon name="RotateCcw" size={16} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-smooth font-body font-body-medium text-sm">
              <Icon name="Maximize" size={16} />
              <span>Full Screen</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 text-primary hover:text-primary-700 transition-smooth font-body font-body-medium text-sm">
            <Icon name="Share" size={16} />
            <span>Share Location</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeliveryMap;