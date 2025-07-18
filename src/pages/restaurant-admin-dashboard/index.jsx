import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AdminNavigation from 'components/ui/AdminNavigation';

import SalesOverview from './components/SalesOverview';
import TopSellingItems from './components/TopSellingItems';
import OrderStatusChart from './components/OrderStatusChart';
import LocationPerformance from './components/LocationPerformance';


function FarmAdminDashboard() {
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setDashboardData(mockDashboardData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dateRange]);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  // Mock dashboard data
  const mockDashboardData = {
    summary: {
      totalSales: 28456.75,
      totalOrders: 427,
      averageOrderValue: 66.64,
      customerSatisfaction: 4.7
    },
    salesTrend: [
    { date: '2023-05-01', sales: 3200 },
    { date: '2023-05-02', sales: 3800 },
    { date: '2023-05-03', sales: 4200 },
    { date: '2023-05-04', sales: 3900 },
    { date: '2023-05-05', sales: 4800 },
    { date: '2023-05-06', sales: 5200 },
    { date: '2023-05-07', sales: 4600 }],

topSellingItems: [
  { id: 1, name: 'Alphonso Mangoes', category: 'Fruits', sales: 120, revenue: 14400, growth: 18 },
  { id: 2, name: 'A2 Cow Milk', category: 'Dairy', sales: 95, revenue: 6650, growth: 10 },
  { id: 3, name: 'Organic Tomatoes', category: 'Vegetables', sales: 88, revenue: 2640, growth: 6 },
  { id: 4, name: 'Raw Forest Honey', category: 'Natural Products', sales: 70, revenue: 5600, growth: 22 },
  { id: 5, name: 'Whole Wheat Grains', category: 'Grains', sales: 60, revenue: 2700, growth: -4 }
]
,

    orderStatusDistribution: [
    { status: 'Completed', value: 380 },
    { status: 'In Progress', value: 27 },
    { status: 'Cancelled', value: 20 }],

    locationPerformance: [
    { id: 1, name: 'Jaipur', orders: 187, sales: 12450, satisfaction: 4.8 },
    { id: 2, name: 'Delhi', orders: 142, sales: 9320, satisfaction: 4.6 },
    { id: 3, name: 'Mumbai', orders: 98, sales: 6540, satisfaction: 4.5 },
    { id: 4, name: 'Bangalore', orders: 75, sales: 5120, satisfaction: 4.7 },
    { id: 5, name: 'Chennai', orders: 55, sales: 3420, satisfaction: 4.4 }
  ],

   

  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <div className="lg:pl-64 pt-16">
        <main className="p-4 md:p-6 lg:p-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-heading-bold text-text-primary">
                  Farms Dashboard
                </h1>
                <p className="text-text-secondary font-body mt-1">
                  Overview of your Farm's performance and operations
                </p>
              </div>
              
            
         
            </div>
          </div>

          {isLoading ?
          <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center">
                <Icon name="Loader2" size={48} className="text-primary animate-spin mb-4" />
                <p className="text-text-secondary font-body">Loading dashboard data...</p>
              </div>
            </div> :

          <>
              

              {/* Main Dashboard Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Sales Overview Chart - 2/3 width */}
                <div className="lg:col-span-2 bg-surface rounded-xl shadow-soft p-6">
                  <SalesOverview data={dashboardData.salesTrend} dateRange={dateRange} />
                </div>

                {/* Order Status Distribution - 1/3 width */}
                <div className="bg-surface rounded-xl shadow-soft p-6">
                  <OrderStatusChart data={dashboardData.orderStatusDistribution} />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Top Selling Items - 1/3 width */}
                <div className="bg-surface rounded-xl shadow-soft p-6">
                  <TopSellingItems items={dashboardData.topSellingItems} />
                </div>

                {/* Location Performance - 2/3 width */}
                <div className="lg:col-span-2 bg-surface rounded-xl shadow-soft p-6">
                  <LocationPerformance locations={dashboardData.locationPerformance} />
                </div>
              </div>


            
             
            </>
          }
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-border p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-text-secondary font-body">
                  &copy; {new Date().getFullYear()} Farm Pro. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-4">
                <Link to="/admin-system-settings" className="text-sm text-text-secondary hover:text-primary transition-smooth">
                  System Settings
                </Link>
                <Link to="/admin-restaurant-settings" className="text-sm text-text-secondary hover:text-primary transition-smooth">
                  Farm Profile
                </Link>
                <a href="#" className="text-sm text-text-secondary hover:text-primary transition-smooth">
                  Help Center
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>);

}





export default FarmAdminDashboard;