'use client'
import React from 'react';
import Sidenav from '@/components/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';

const ProfilePage = () => {
  // Normally you'd fetch this from your auth provider or API
  // This is just mock data - replace with your actual user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, Country",
    joinDate: "January 2024"
  };

  return (
    <div className="flex h-screen bg-[#e6f7f5]">
      <Sidenav />
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 transition-all duration-300 ease-in-out bg-gradient-to-br from-[#e6f7f5] to-white overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="bg-white shadow-lg border-[#4FD1C5]/20 overflow-hidden">
            <div className="bg-gradient-to-r from-[#4FD1C5] to-[#3BA89F] text-white p-8">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="mt-2 text-[#e6f7f5]">Manage your account information</p>
            </div>
            
            <CardContent className="p-8 space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 border-b border-[#4FD1C5]/20 pb-8">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#4FD1C5] to-[#3BA89F] flex items-center justify-center shadow-lg">
                  <span className="text-5xl text-white font-bold">
                    {userData.name.charAt(0)}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-[#0d2834]">{userData.name}</h2>
                  <div className="flex items-center justify-center md:justify-start text-[#1a3f4c] mt-2">
                    <Calendar className="h-5 w-5 mr-2 text-[#4FD1C5]" />
                    <p>Member since {userData.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { icon: User, label: 'Full Name', value: userData.name },
                  { icon: Mail, label: 'Email', value: userData.email },
                  { icon: Phone, label: 'Phone Number', value: userData.phone },
                  { icon: MapPin, label: 'Address', value: userData.address },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-[#e6f7f5] p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-[#4FD1C5]" />
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-[#1a3f4c]">{item.label}</dt>
                      <dd className="text-[#0d2834] font-semibold mt-1">{item.value}</dd>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Profile Button */}
              <div className="pt-6 border-t border-[#4FD1C5]/20">
                <Button 
                  className="w-full bg-[#4FD1C5] hover:bg-[#3BA89F] text-white transition-colors"
                  onClick={() => alert('Edit profile functionality to be implemented')}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

