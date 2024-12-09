'use client'
import React, { useState } from 'react';
import Sidenav from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, IndianRupee, Leaf, Factory, Truck, Clipboard } from 'lucide-react';
import RatesModal from '@/components/RatesModal';
import RecycleStepsModal from '@/components/RecycleSteps';

// Pricing and Points Configuration
const PAPER_PRICING = {
  newspaper: 15,
  magazine: 12,
  cardboard: 8,
  books: 10,
  whiteOffice: 20,
};

const FACILITY_POINTS = {
  plastic: 30,
  metalContainers: 25,
  glass: 15,
  cartons: 20,
};

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir'
];

const Recycle = () => {
  const [wasteType, setWasteType] = useState<'paper' | 'facility' | ''>('');
  const [hasPaperWaste, setHasPaperWaste] = useState<'yes' | 'no' | ''>('');
  const [paperType, setPaperType] = useState<keyof typeof PAPER_PRICING | ''>('');
  const [facilityWasteType, setFacilityWasteType] = useState<keyof typeof FACILITY_POINTS | ''>('');
  const [weightMetric, setWeightMetric] = useState<'weight' | 'items' | ''>('');
  const [weightValue, setWeightValue] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [pickupScheduled, setPickupScheduled] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState<number>(0);
  const [showRates, setShowRates] = useState(false);

  const calculateEstimate = () => {
    if (wasteType === 'paper' && paperType && weightValue) {
      return PAPER_PRICING[paperType] * Number(weightValue);
    }
    if (wasteType === 'facility' && facilityWasteType && weightValue) {
      return FACILITY_POINTS[facilityWasteType] * Number(weightValue);
    }
    return 0;
  };

  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    const estimated = calculateEstimate();
    setEstimatedValue(estimated);
    setPickupScheduled(true);
  };

  const resetForm = () => {
    setWasteType('');
    setHasPaperWaste('');
    setPaperType('');
    setFacilityWasteType('');
    setWeightMetric('');
    setWeightValue('');
    setState('');
    setCity('');
    setAddress('');
    setPickupScheduled(false);
    setEstimatedValue(0);
  };

  return (
    <div className="flex h-screen bg-[#e6f7f5]">
      <Sidenav />
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 transition-all duration-300 ease-in-out bg-gradient-to-br from-[#e6f7f5] to-white overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="bg-gradient-to-br from-white to-[#e6f7f5] shadow-lg border-[#4FD1C5]/20">
            <CardHeader className="bg-[#4FD1C5] text-white rounded-t-lg relative">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clipboard className="h-6 w-6" />
                Schedule Pickup
              </CardTitle>
              <RecycleStepsModal />
            </CardHeader>
            <CardContent className="p-6">
              {!pickupScheduled ? (
                <form onSubmit={handleSchedulePickup} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#0d2834]">Waste Type</label>
                      <Select 
                        value={wasteType} 
                        onValueChange={(value: 'paper' | 'facility') => {
                          setWasteType(value);
                          setHasPaperWaste('');
                          setPaperType('');
                          setFacilityWasteType('');
                        }}
                      >
                        <SelectTrigger className="border-[#4FD1C5]">
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
                        <label className="text-sm font-medium text-[#0d2834]">Have Paper Waste?</label>
                        <Select 
                          value={hasPaperWaste} 
                          onValueChange={(value: 'yes' | 'no') => {
                            setHasPaperWaste(value);
                            setPaperType('');
                          }}
                        >
                          <SelectTrigger className="border-[#4FD1C5]">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>

                        {hasPaperWaste === 'yes' && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0d2834]">Paper Type</label>
                            <Select 
                              value={paperType} 
                              onValueChange={(value: keyof typeof PAPER_PRICING) => setPaperType(value)}
                            >
                              <SelectTrigger className="border-[#4FD1C5]">
                                <SelectValue placeholder="Select paper type" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(PAPER_PRICING).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    )}

                    {wasteType === 'facility' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#0d2834]">Facility Waste Type</label>
                        <Select 
                          value={facilityWasteType} 
                          onValueChange={(value: keyof typeof FACILITY_POINTS) => setFacilityWasteType(value)}
                        >
                          <SelectTrigger className="border-[#4FD1C5]">
                            <SelectValue placeholder="Select waste type" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(FACILITY_POINTS).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {(wasteType === 'paper' || wasteType === 'facility') && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#0d2834]">Measurement Metric</label>
                        <Select 
                          value={weightMetric} 
                          onValueChange={(value: 'weight' | 'items') => {
                            setWeightMetric(value);
                            setWeightValue('');
                          }}
                        >
                          <SelectTrigger className="border-[#4FD1C5]">
                            <SelectValue placeholder="Select metric" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weight">Weight (kg)</SelectItem>
                            <SelectItem value="items">Number of Items</SelectItem>
                          </SelectContent>
                        </Select>

                        {weightMetric && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0d2834]">
                              {weightMetric === 'weight' ? 'Weight (kg)' : 'Number of Items'}
                            </label>
                            <Input 
                              type="number" 
                              placeholder={weightMetric === 'weight' ? 'Enter weight' : 'Enter number of items'}
                              className="border-[#4FD1C5]"
                              value={weightValue}
                              onChange={(e) => setWeightValue(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#0d2834]">State</label>
                        <Select 
                          value={state} 
                          onValueChange={setState}
                        >
                          <SelectTrigger className="border-[#4FD1C5]">
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDIAN_STATES.map((stateName) => (
                              <SelectItem key={stateName} value={stateName}>
                                {stateName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#0d2834]">City</label>
                        <Input 
                          placeholder="Enter your city" 
                          className="border-[#4FD1C5]"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#0d2834]">Full Address</label>
                        <Input 
                          placeholder="Enter full address" 
                          className="border-[#4FD1C5]"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#4FD1C5] hover:bg-[#3BA89F] text-white"
                    disabled={!wasteType || !weightMetric || !weightValue || !state || !city || !address}
                  >
                    Schedule Pickup
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#4FD1C5] rounded-full p-4">
                      <Truck className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-[#0d2834]">Pickup Scheduled!</h2>
                  
                  <div className="bg-white p-6 rounded-lg shadow-inner border border-[#4FD1C5]/20">
                    <p className="text-[#1a3f4c] mb-4">An agent is on the way to collect your waste.</p>
                    
                    {wasteType === 'paper' ? (
                      <div className="flex justify-center items-center text-2xl font-bold text-[#4FD1C5]">
                        <IndianRupee className="mr-2" />
                        Estimated Cash: ₹{estimatedValue}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center text-2xl font-bold text-[#4FD1C5]">
                        <Leaf className="mr-2" />
                        Estimated Points: {estimatedValue}
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-[#1a3f4c] bg-[#e6f7f5] p-4 rounded-lg">
                    <p className="font-semibold mb-2">Pickup Details:</p>
                    <p>Location: {city}, {state}</p>
                    <p>Address: {address}</p>
                  </div>

                  <Button 
                    onClick={resetForm}
                    className="w-full bg-[#4FD1C5] hover:bg-[#3BA89F] text-white"
                  >
                    Schedule Another Pickup
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <RatesModal 
        isOpen={showRates}
        onClose={() => setShowRates(false)}
        paperPricing={PAPER_PRICING}
        facilityPoints={FACILITY_POINTS}
      />
      <button
        onClick={() => setShowRates(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-[#4FD1C5] text-white rounded-full shadow-lg hover:bg-[#3BA89F] transition-colors"
      >
        <Leaf className="h-4 w-4" />
        <span>View Rates</span>
      </button>
    </div>
  );
};

export default Recycle;

