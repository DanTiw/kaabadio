"use client";
import React from 'react';
import Sidenav from '@/components/sidebar';
import { StatsCards } from '@/components/StatsCards';
import {RecentActivity} from '@/components/RecentActivity';

const Dashboard = () => {
  // Mock user data
  const userData = {
    points: 1250,
    paperRecycled: 125,
    facilityRecycled: 75,
    nextReward: 2000,
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidenav />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="grid gap-6">
            <StatsCards userData={userData} />
            
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;