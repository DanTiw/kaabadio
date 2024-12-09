import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Recycle, Truck, Gift } from 'lucide-react';

const steps = [
  {
    title: 'Select Waste Type',
    description: 'Choose between paper waste or facility waste.',
    icon: Recycle,
  },
  {
    title: 'Enter Details',
    description: 'Provide information about the type and quantity of waste.',
    icon: HelpCircle,
  },
  {
    title: 'Schedule Pickup',
    description: 'Enter your state, city, address and schedule pickup.',
    icon: Truck,
  },
  {
    title: 'Earn Rewards',
    description: 'Receive points or cash based on your recycled items.',
    icon: Gift,
  },
];

const RecycleStepsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-[#4FD1C5] hover:bg-[#e6f7f5] hover:text-[#3BA89F]">
          <HelpCircle className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0d2834] flex items-center gap-2">
            <Recycle className="h-6 w-6 text-[#4FD1C5]" />
            How to Recycle
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#e6f7f5] flex items-center justify-center">
                <step.icon className="h-5 w-5 text-[#4FD1C5]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0d2834]">{step.title}</h3>
                <p className="text-[#1a3f4c]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecycleStepsModal;

