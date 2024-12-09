import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const data = [
  { date: '2024-01-20', points: 20 },
  { date: '2024-01-25', points: 30 },
  { date: '2024-01-28', points: 100 },
  { date: '2024-02-01', points: 50 },
  { date: '2024-02-05', points: 80 },
  { date: '2024-02-10', points: 65 },
  { date: '2024-02-15', points: 110 },
];

export const ActivityChart = () => {
  return (
    <Card className="bg-[#0a1f2b]/50 backdrop-blur-sm border-[#4FD1C5]/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#4FD1C5] flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#4FD1C5]" />
          Recycling Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a5a6a" />
              <XAxis 
                dataKey="date" 
                stroke="#4FD1C5"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#4FD1C5"
                tick={{ fill: '#9CA3AF' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a1f2b',
                  border: '1px solid #4FD1C5',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#4FD1C5' }}
                itemStyle={{ color: '#9CA3AF' }}
              />
              <Line 
                type="monotone" 
                dataKey="points" 
                stroke="#4FD1C5" 
                strokeWidth={2}
                dot={{ fill: '#4FD1C5', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

