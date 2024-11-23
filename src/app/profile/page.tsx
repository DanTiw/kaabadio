'use client'
import React from 'react';
import Sidenav from '@/components/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

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
    <div className="flex h-screen bg-sky-100">
      <Sidenav />
      <main className="
      flex-1 mt-16 lg:mt-0 p-4
    ">
      <div className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
            <div className="bg-sky-600 text-white p-6">
              <h1 className="text-3xl font-bold">My Profile</h1>
            </div>
            
            <CardContent className="bg-white p-6 space-y-6">
              {/* Profile Header */}
              <div className="flex items-center space-x-6 border-b pb-6">
                <div className="h-24 w-24 rounded-full bg-sky-100 flex items-center justify-center shadow-md">
                  <span className="text-4xl text-sky-700 font-bold">
                    {userData.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-sky-800">{userData.name}</h2>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Calendar className="size-5 mr-2 text-orange-500" />
                    <p>Member since {userData.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <User className="size-6 text-orange-500" />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd className="text-sky-800 font-semibold">{userData.name}</dd>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="size-6 text-orange-500" />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sky-800 font-semibold">{userData.email}</dd>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Phone className="size-6 text-orange-500" />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                      <dd className="text-sky-800 font-semibold">{userData.phone}</dd>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MapPin className="size-6 text-orange-500" />
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="text-sky-800 font-semibold">{userData.address}</dd>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="pt-6 border-t">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-colors"
                  onClick={() => alert('Edit profile functionality to be implemented')}
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </main>
    </div>
  );
};

export default ProfilePage;