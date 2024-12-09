import { Card, CardContent } from "@/components/ui/card";
import { Recycle, TreeDeciduous, Gift, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  userData: {
    points: number;
    paperRecycled: number;
    facilityRecycled: number;
    nextReward: number;
  }
}

export const StatsCards = ({ userData }: StatsCardsProps) => {
  const stats = [
    {
      title: "Total Points",
      value: userData.points,
      icon: TrendingUp,
      description: "Keep it up!",
    },
    {
      title: "Paper Recycled",
      value: `${userData.paperRecycled} kg`,
      icon: Recycle,
      description: "Great job!",
    },
    {
      title: "Facility Waste",
      value: `${userData.facilityRecycled} kg`,
      icon: TreeDeciduous,
      description: "You're making a difference!",
    },
    {
      title: "Next Reward",
      value: userData.nextReward,
      icon: Gift,
      description: "Almost there!",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-[#4FD1C5]/20"
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-[#1a3f4c]">{stat.title}</h3>
              <stat.icon className="h-5 w-5 text-[#4FD1C5]" />
            </div>
            <div className="text-2xl font-bold text-[#0d2834] mb-1">{stat.value}</div>
            <p className="text-sm text-[#4FD1C5]">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

