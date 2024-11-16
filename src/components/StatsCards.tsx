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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
          <Award className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userData.points}</div>
          <Progress 
            value={(userData.points/userData.nextReward) * 100} 
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {userData.nextReward - userData.points} points until next reward
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Paper Recycled</CardTitle>
          <Package2 className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userData.paperRecycled}kg</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Facility Waste</CardTitle>
          <Recycle className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userData.facilityRecycled}kg</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Next Pickup</CardTitle>
          <Timer className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">-</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;