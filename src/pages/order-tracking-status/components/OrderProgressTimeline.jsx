import React from 'react';
import Icon from 'components/AppIcon';

function OrderProgressTimeline({ timeline, currentStatus }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
    
      case 'ready':
        return 'Package';
      case 'out_for_delivery':
        return 'Truck';
      case 'delivered':
        return 'MapPin';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status, isActive, isCompleted) => {
    if (isCompleted) return 'text-success bg-success-50 border-success';
    if (isActive) return 'text-primary bg-primary-50 border-primary';
    return 'text-text-secondary bg-secondary-50 border-border';
  };



 

  const getCurrentStepIndex = () => {
    return timeline.findIndex(step => step.status === currentStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <h2 className="text-xl font-heading font-heading-medium text-text-primary mb-6">
        Order Progress
      </h2>
      
      <div className="space-y-6">
        {timeline.map((step, index) => {
          const isCompleted = index < currentStepIndex || (index === currentStepIndex && step.timestamp);
          const isActive = index === currentStepIndex && !step.timestamp;
          const isFuture = index > currentStepIndex;

          return (
            <div key={step.status} className="relative">
              {/* Timeline Line */}
              {index < timeline.length - 1 && (
                <div className={`absolute left-6 top-12 w-0.5 h-16 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`}></div>
              )}

              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-smooth ${
                  getStatusColor(step.status, isActive, isCompleted)
                }`}>
                  <Icon 
                    name={getStatusIcon(step.status)} 
                    size={20}
                    className={isCompleted ? 'text-success' : isActive ? 'text-primary' : 'text-text-secondary'}
                  />
                </div>

                {/* Status Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-heading font-heading-medium ${
                      isCompleted || isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {step.title}
                    </h3>
                    
                    
                  </div>
                  
                  <p className={`text-sm font-body ${
                    isCompleted || isActive ? 'text-text-secondary' : 'text-text-secondary opacity-60'
                  }`}>
                    {step.description}
                  </p>

                  {/* Active Status Indicator */}
                  {isActive && (
                    <div className="mt-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm text-primary font-body font-body-medium">
                        In Progress
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
      
    </div>
  );
}

export default OrderProgressTimeline;