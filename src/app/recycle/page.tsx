'use client'
import React, { useState } from 'react';
import Sidenav from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, IndianRupee, Leaf, Factory, Truck } from 'lucide-react';
import RatesModal from '@/components/RatesModal';

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
    <div className="flex max-h-screen bg-blue-50">
      <Sidenav />
      <main className=" flex-1
        lg:ml-64
        mt-16 lg:mt-0
        transition-all duration-300 ease-in-out">
        <div className="flex-1 overflow-auto p-6">
          <div className="container mx-auto">
            {/* Schedule Pickup Card */}
            <Card className="bg-white border-blue-700 border-2">
              <CardHeader className="bg-blue-700 text-white">
                <CardTitle>Schedule Pickup</CardTitle>
              </CardHeader>
              <CardContent>
                {!pickupScheduled ? (
                  <form onSubmit={handleSchedulePickup} className="space-y-4">
                    {/* Form fields remain the same, just updating border colors */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-black">Waste Type</label>
                      <Select 
                        value={wasteType} 
                        onValueChange={(value: 'paper' | 'facility') => {
                          setWasteType(value);
                          setHasPaperWaste('');
                          setPaperType('');
                          setFacilityWasteType('');
                        }}
                      >
                        <SelectTrigger className="border-blue-600">
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
                        <label className="text-sm font-medium text-black">Have Paper Waste?</label>
                        <Select 
                          value={hasPaperWaste} 
                          onValueChange={(value: 'yes' | 'no') => {
                            setHasPaperWaste(value);
                            setPaperType('');
                          }}
                        >
                          <SelectTrigger className="border-blue-600">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>

                        {hasPaperWaste === 'yes' && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-black">Paper Type</label>
                            <Select 
                              value={paperType} 
                              onValueChange={(value: keyof typeof PAPER_PRICING) => setPaperType(value)}
                            >
                              <SelectTrigger className="border-blue-600">
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
                        <label className="text-sm font-medium text-black">Facility Waste Type</label>
                        <Select 
                          value={facilityWasteType} 
                          onValueChange={(value: keyof typeof FACILITY_POINTS) => setFacilityWasteType(value)}
                        >
                          <SelectTrigger className="border-blue-600">
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
                        <label className="text-sm font-medium text-black">Measurement Metric</label>
                        <Select 
                          value={weightMetric} 
                          onValueChange={(value: 'weight' | 'items') => {
                            setWeightMetric(value);
                            setWeightValue('');
                          }}
                        >
                          <SelectTrigger className="border-blue-600">
                            <SelectValue placeholder="Select metric" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weight">Weight (kg)</SelectItem>
                            <SelectItem value="items">Number of Items</SelectItem>
                          </SelectContent>
                        </Select>

                        {weightMetric && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-black">
                              {weightMetric === 'weight' ? 'Weight (kg)' : 'Number of Items'}
                            </label>
                            <Input 
                              type="number" 
                              placeholder={weightMetric === 'weight' ? 'Enter weight' : 'Enter number of items'}
                              className="border-blue-600"
                              value={weightValue}
                              onChange={(e) => setWeightValue(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-black">State</label>
                        <Select 
                          value={state} 
                          onValueChange={setState}
                        >
                          <SelectTrigger className="border-blue-600">
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
                        <label className="text-sm font-medium text-black">City</label>
                        <Input 
                          placeholder="Enter your city" 
                          className="border-blue-600"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-black">Full Address</label>
                        <Input 
                          placeholder="Enter full address" 
                          className="border-blue-600"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!wasteType || !weightMetric || !weightValue || !state || !city || !address}
                    >
                      Schedule Pickup
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                      <Truck className="size-16 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-600">Pickup Scheduled!</h2>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-black mb-2">An agent is on the way to collect your waste.</p>
                      
                      {wasteType === 'paper' && (
                        <div className="flex justify-center items-center text-xl font-bold text-blue-600">
                          <IndianRupee className="mr-2" />
                          Estimated Cash: ₹{estimatedValue}
                        </div>
                      )}
                      
                      {wasteType === 'facility' && (
                        <div className="flex justify-center items-center text-xl font-bold text-blue-600">
                          Estimated Points: {estimatedValue}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>Location: {city}, {state}</p>
                      <p>Address: {address}</p>
                    </div>

                    <Button 
                      onClick={resetForm}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Schedule Another Pickup
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Leaf className="size-4" />
        <span>View Rates</span>
      </button>
    </div>
  );
};

export default Recycle;