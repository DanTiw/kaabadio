"use client";
import React from 'react';
import Sidenav from '@/components/sidebar';
import { StatsCards } from '@/components/StatsCards';
import { RecentActivity } from '@/components/RecentActivity';
import SideNav from '@/components/sidebar';


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
      <main className={`
        flex-1
        lg:ml-64
        mt-16 lg:mt-0
        transition-all duration-300 ease-in-out
      `}>

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 ">
            <div className="grid gap-6 " >
              <StatsCards userData={userData} />

              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;