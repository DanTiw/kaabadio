import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Banknote, Recycle, Clock, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Updated color scheme for different waste types and rewards
const COLORS = {
  paper: {
    primary: '#2563eb',    // Darker blue
    secondary: '#dbeafe',  // Light blue
    reward: '#1d4ed8'      // Another shade of blue
  },
  facility: {
    primary: '#3b82f6',    // Medium blue
    secondary: '#bfdbfe',  // Lighter blue
    reward: '#60a5fa'      // Another medium blue
  }
};

interface ActivityItemProps {
  type: string;
  amount: number;
  reward: string;
  rewardType: 'money' | 'points';
  timestamp: string;
  icon: React.ElementType;
  wasteType: 'paper' | 'facility';
}

const ActivityItem = ({ type, amount, reward, rewardType, timestamp, icon: Icon, wasteType }: ActivityItemProps) => {
  const color = wasteType === 'paper' ? COLORS.paper : COLORS.facility;
  
  return (
    <div className="relative">
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-full bg-blue-600"
      />
      <div className="ml-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="rounded-full p-2 bg-blue-50"
            >
              <Icon
                className="h-4 w-4 text-blue-600"
              />
            </div>
            <div>
              <p className="font-semibold text-base text-black">{type}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-600">{amount}kg</span>
                <div
                  className="flex items-center text-sm text-blue-600"
                >
                  {rewardType === 'money' ? (
                    <Banknote className="h-3 w-3 mr-1" />
                  ) : (
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  )}
                  {reward}
                </div>
              </div>
            </div>
          </div>
          <span className="text-sm text-gray-600 whitespace-nowrap">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export const RecentActivity = ({ isLoading = false}) => {
  // Rest of the data remains the same
  const paperWasteData = [
    { date: 'Week 1', waste: 45, cash: 900 },
    { date: 'Week 2', waste: 38, cash: 760 },
    { date: 'Week 3', waste: 42, cash: 840 },
    { date: 'Week 4', waste: 35, cash: 700 }
  ];

  const facilityWasteData = [
    { date: 'Week 1', waste: 32, points: 320 },
    { date: 'Week 2', waste: 28, points: 280 },
    { date: 'Week 3', waste: 35, points: 350 },
    { date: 'Week 4', waste: 30, points: 300 }
  ];

  const paperActivities = [
    {
      type: "Paper Waste Recycled",
      amount: 15,
      reward: "₹300 received",
      rewardType: "money" as const,
      timestamp: "2 days ago",
      icon: Recycle,
      wasteType: "paper" as const
    }
  ];

  const facilityActivities = [
    {
      type: "Facility Waste Delivered",
      amount: 8,
      reward: "100 points earned",
      rewardType: "points" as const,
      timestamp: "5 days ago",
      icon: Recycle,
      wasteType: "facility" as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Paper Waste Section */}
      <Card className="w-full bg-white border-blue-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-black">Paper Waste Activity</CardTitle>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-3 w-3" />
            Current Period
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-6">
                    {paperActivities.map((activity, index) => (
                      <ActivityItem key={index} {...activity} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={paperWasteData} 
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      stroke={COLORS.paper.primary}
                      fontSize={12}
                      tickFormatter={(value) => `${value}kg`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke={COLORS.paper.reward}
                      fontSize={12}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        fontSize: '12px',
                        padding: '8px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="waste"
                      name="Waste (kg)"
                      fill={COLORS.paper.primary}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="cash"
                      name="Cash (₹)"
                      fill={COLORS.paper.reward}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Facility Waste Section */}
      <Card className="w-full bg-white border-blue-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold text-black">Facility Waste Activity</CardTitle>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="h-3 w-3" />
            Current Period
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-6">
                    {facilityActivities.map((activity, index) => (
                      <ActivityItem key={index} {...activity} />
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={facilityWasteData} 
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      stroke={COLORS.facility.primary}
                      fontSize={12}
                      tickFormatter={(value) => `${value}kg`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke={COLORS.facility.reward}
                      fontSize={12}
                      tickFormatter={(value) => `${value}pts`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        fontSize: '12px',
                        padding: '8px'
                      }}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="waste"
                      name="Waste (kg)"
                      fill={COLORS.facility.primary}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="points"
                      name="Points"
                      fill={COLORS.facility.reward}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentActivity;