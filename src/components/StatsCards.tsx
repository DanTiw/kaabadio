import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Package2, Recycle, Timer, Award } from 'lucide-react';

interface UserData {
  points: number;
  paperRecycled: number;
  facilityRecycled: number;
  nextReward: number;
}

interface StatsCardsProps {
  userData: UserData;
}

export const StatsCards = ({ userData }: StatsCardsProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-sky-50 border-sky-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-sky-600/20">
          <CardTitle className="text-sm font-medium text-black">Total Points</CardTitle>
          <Award className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{userData.points}</div>
          <Progress 
            value={(userData.points/userData.nextReward) * 100} 
            className="mt-2 bg-sky-600/10"
          />
          <p className="text-xs text-gray-600 mt-2">
            {userData.nextReward - userData.points} points until next reward
          </p>
        </CardContent>
      </Card>

      <Card className="bg-sky-50 border-sky-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-sky-600/20">
          <CardTitle className="text-sm font-medium text-black">Paper Recycled</CardTitle>
          <Package2 className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{userData.paperRecycled}kg</div>
        </CardContent>
      </Card>

      <Card className="bg-sky-50 border-sky-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-sky-600/20">
          <CardTitle className="text-sm font-medium text-black">Facility Waste</CardTitle>
          <Recycle className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">{userData.facilityRecycled}kg</div>
        </CardContent>
      </Card>

      <Card className="bg-sky-50 border-sky-600">
        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-sky-600/20">
          <CardTitle className="text-sm font-medium text-black">Next Pickup</CardTitle>
          <Timer className="size-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-black">-</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;