"use client";
import React from 'react';
import Sidenav from '@/components/sidebar';
import { StatsCards } from '@/components/StatsCards';
import { RecentActivity } from '@/components/RecentActivity';
import { ActivityChart } from '@/components/ActivityChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const userData = {
    points: 1250,
    paperRecycled: 125,
    facilityRecycled: 75,
    nextReward: 2000,
  };

  return (
    <div className="flex h-screen bg-[#e6f7f5]">
      <Sidenav />

      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 transition-all duration-300 ease-in-out bg-gradient-to-br from-[#e6f7f5] to-white overflow-auto">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#0d2834] mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-[#1a3f4c]">
              Track your recycling progress and earn rewards for your contributions to sustainability.
            </p>
          </div>

          <StatsCards userData={userData} />
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ActivityChart />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

