import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold text-blue-700">
            <Leaf className="mr-2" /> Recycling Rates
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Paper Waste (per kg)</h3>
            <ul className="space-y-2">
              {Object.entries(paperPricing).map(([type, rate]) => (
                <li key={type} className="flex justify-between">
                  <span className="text-black capitalize">
                    {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="flex items-center text-blue-600">
                    <IndianRupee className="size-3 mr-1" />
                    {rate}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-blue-600">Facility Waste (per item/kg)</h3>
            <ul className="space-y-2">
              {Object.entries(facilityPoints).map(([type, points]) => (
                <li key={type} className="flex justify-between">
                  <span className="text-black capitalize">
                    {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                  <span className="text-blue-600">
                    {points} Points
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatesModal;