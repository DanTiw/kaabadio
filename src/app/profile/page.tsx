import React from 'react';

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-600">
                {userData.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{userData.name}</h2>
              <p className="text-gray-500">Member since {userData.joinDate}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="border-t pt-6">
            <dl className="space-y-6 divide-y divide-gray-200">
              <div className="pt-6 first:pt-0">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData.email}</dd>
              </div>

              <div className="pt-6">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData.phone}</dd>
              </div>

              <div className="pt-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900">{userData.address}</dd>
              </div>
            </dl>
          </div>

          {/* Edit Profile Button */}
          <div className="pt-6">
            <button 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => alert('Edit profile functionality to be implemented')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;