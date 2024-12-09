import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from 'lucide-react';

export const RecentActivity = () => {
  const activities = [
    { date: "2024-02-15", action: "Recycled 7kg of paper", points: 70 },
    { date: "2024-02-10", action: "Disposed of electronic waste", points: 65 },
    { date: "2024-02-05", action: "Recycled 8kg of plastic", points: 80 },
    { date: "2024-02-01", action: "Composted food waste", points: 50 },
  ];

  return (
    <Card className="bg-[#0a1f2b]/50 backdrop-blur-sm border-[#4FD1C5]/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#4FD1C5] flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#4FD1C5]" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center border-b border-[#4FD1C5]/10 pb-2 last:border-b-0">
              <div>
                <p className="text-sm font-medium text-gray-300">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </div>
              <span className="text-sm font-semibold text-[#4FD1C5]">+{activity.points} pts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

