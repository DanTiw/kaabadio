import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Leaf } from 'lucide-react';

interface RatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  paperPricing: Record<string, number>;
  facilityPoints: Record<string, number>;
}

const RatesModal: React.FC<RatesModalProps> = ({
  isOpen,
  onClose,
  paperPricing,
  facilityPoints,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-white to-[#e6f7f5] border-[#4FD1C5]/20 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold text-[#0d2834]">
            <Leaf className="mr-2 text-[#4FD1C5]" /> Recycling Rates
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <Card className="bg-white shadow-md border-[#4FD1C5]/20">
            <CardHeader className="bg-[#4FD1C5] text-white rounded-t-lg pb-2">
              <CardTitle className="text-lg font-semibold">Paper Waste (per kg)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {Object.entries(paperPricing).map(([type, rate]) => (
                  <li key={type} className="flex justify-between items-center py-1 border-b border-[#4FD1C5]/10 last:border-b-0">
                    <span className="text-[#1a3f4c] capitalize">
                      {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="flex items-center text-[#4FD1C5] font-semibold">
                      <IndianRupee className="h-4 w-4 mr-1" />
                      {rate}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md border-[#4FD1C5]/20">
            <CardHeader className="bg-[#4FD1C5] text-white rounded-t-lg pb-2">
              <CardTitle className="text-lg font-semibold">Facility Waste (per item/kg)</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2">
                {Object.entries(facilityPoints).map(([type, points]) => (
                  <li key={type} className="flex justify-between items-center py-1 border-b border-[#4FD1C5]/10 last:border-b-0">
                    <span className="text-[#1a3f4c] capitalize">
                      {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-[#4FD1C5] font-semibold">
                      {points} Points
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatesModal;

