// RecentActivity.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Paper Waste Recycled</p>
                <p className="text-sm text-muted-foreground">15kg - ₹300 received</p>
              </div>
              <span className="text-sm text-muted-foreground">2 days ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Facility Waste Delivered</p>
                <p className="text-sm text-muted-foreground">8kg - 100 points earned</p>
              </div>
              <span className="text-sm text-muted-foreground">5 days ago</span>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;