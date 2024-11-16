'use client'
import React, { useState } from 'react';
import Sidenav from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, IndianRupee } from 'lucide-react';

// Pricing rates per kg
const PRICING = {
  newspaper: 15,
  magazine: 12,
  cardboard: 8,
  books: 10,
  whiteOffice: 20,
};

type WasteType = 'paper' | 'facility';
type PaperType = keyof typeof PRICING;

const Recycle = () => {
  const [wasteType, setWasteType] = useState<WasteType | ''>('');
  const [paperType, setPaperType] = useState<PaperType | ''>('');
  const [weight, setWeight] = useState<string>('');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduledPickup, setScheduledPickup] = useState(false);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  const calculateEstimate = () => {
    if (!paperType || !weight) return 0;
    return PRICING[paperType] * Number(weight);
  };

  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = calculateEstimate();
    setFinalAmount(amount);
    setScheduledPickup(true);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidenav />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="grid gap-6">
            {/* Recycling Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recycling Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Paper Waste (per kg)</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span>Newspaper</span>
                        <span className="flex items-center">
                          <IndianRupee className="size-3 mr-1" />
                          {PRICING.newspaper}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Magazines</span>
                        <span className="flex items-center">
                          <IndianRupee className="size-3 mr-1" />
                          {PRICING.magazine}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Cardboard</span>
                        <span className="flex items-center">
                          <IndianRupee className="size-3 mr-1" />
                          {PRICING.cardboard}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>Books</span>
                        <span className="flex items-center">
                          <IndianRupee className="size-3 mr-1" />
                          {PRICING.books}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span>White Office Paper</span>
                        <span className="flex items-center">
                          <IndianRupee className="size-3 mr-1" />
                          {PRICING.whiteOffice}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Facility Waste</h3>
                    <p className="text-sm text-muted-foreground">
                      Facility waste recycling earns reward points. Points can be redeemed for exclusive rewards and discounts.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Pickup Form */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                {!showScheduleForm && !scheduledPickup && (
                  <Button 
                    onClick={() => setShowScheduleForm(true)}
                    className="w-full sm:w-auto"
                  >
                    Schedule Now
                  </Button>
                )}

                {showScheduleForm && !scheduledPickup && (
                  <form onSubmit={handleSchedulePickup} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Waste Type</label>
                        <Select 
                          value={wasteType} 
                          onValueChange={(value: WasteType) => setWasteType(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select waste type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paper">Paper Waste</SelectItem>
                            <SelectItem value="facility">Facility Waste</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {wasteType === 'paper' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Paper Type</label>
                          <Select 
                            value={paperType} 
                            onValueChange={(value: PaperType) => setPaperType(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select paper type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="newspaper">Newspaper</SelectItem>
                              <SelectItem value="magazine">Magazine</SelectItem>
                              <SelectItem value="cardboard">Cardboard</SelectItem>
                              <SelectItem value="books">Books</SelectItem>
                              <SelectItem value="whiteOffice">White Office Paper</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Amount (kg)</label>
                        <Input 
                          type="number" 
                          placeholder="Enter weight" 
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>

                      {wasteType === 'paper' && paperType && weight && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Estimated Price</label>
                          <div className="text-xl font-bold flex items-center">
                            <IndianRupee className="size-4 mr-1" />
                            {calculateEstimate()}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium">Pickup Location</label>
                        <div className="flex space-x-2">
                          <Input placeholder="Enter your pickup address" />
                          <Button type="button" variant="outline" size="icon">
                            <MapPin className="size-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full sm:w-auto">
                      Schedule Pickup
                    </Button>
                  </form>
                )}

                {scheduledPickup && (
                  <div className="space-y-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      Pickup Scheduled!
                    </div>
                    <p>Estimated pickup time: 30 minutes</p>
                    {wasteType === 'paper' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                        <div className="flex items-center justify-center text-2xl font-bold text-green-700">
                          <IndianRupee className="size-5 mr-1" />
                          {finalAmount}
                        </div>
                        <p className="text-sm text-green-600 mt-2">
                          You will receive ₹{finalAmount} on pickup
                        </p>
                      </div>
                    )}
                    {wasteType === 'facility' && (
                      <p className="text-sm text-muted-foreground">
                        Points will be credited after verification.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recycle;