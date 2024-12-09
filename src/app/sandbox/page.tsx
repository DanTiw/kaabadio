'use client'

import React, { useState } from 'react';
import Sidenav from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Recycle, Lightbulb } from 'lucide-react';

// Simple database of waste items and their potential reuses
const wasteReuses: Record<string, string[]> = {
  'plastic bottle': [
    'Make a self-watering planter',
    'Create a bird feeder',
    'Use as a storage container for small items',
  ],
  'newspaper': [
    'Make paper mache crafts',
    'Use as gift wrapping paper',
    'Create seed starter pots for gardening',
  ],
  'glass jar': [
    'Use as a vase for flowers',
    'Create a candle holder',
    'Store homemade jams or preserves',
  ],
  'cardboard box': [
    'Make a cat playhouse',
    'Create storage organizers',
    'Use as a canvas for painting',
  ],
  'tin can': [
    'Make a pencil holder',
    'Create a rustic lantern',
    'Use as a planter for small herbs',
  ],
};

const SandboxPage = () => {
  const [wasteItem, setWasteItem] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowercaseItem = wasteItem.toLowerCase();
    const reuses = wasteReuses[lowercaseItem] || [];
    setSuggestions(reuses);
  };

  return (
    <div className="flex h-screen bg-[#e6f7f5]">
      <Sidenav />
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 transition-all duration-300 ease-in-out bg-gradient-to-br from-[#e6f7f5] to-white overflow-auto">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="bg-white shadow-lg border-[#4FD1C5]/20 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#4FD1C5] to-[#3BA89F] text-white p-6">
              <CardTitle className="text-2xl font-bold flex items-center">
                <Recycle className="mr-2 h-6 w-6" />
                Waste Reuse Sandbox
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="wasteItem" className="block text-sm font-medium text-[#0d2834] mb-1">
                    Enter a waste item:
                  </label>
                  <div className="flex">
                    <Input
                      id="wasteItem"
                      type="text"
                      value={wasteItem}
                      onChange={(e) => setWasteItem(e.target.value)}
                      placeholder="e.g., plastic bottle, newspaper"
                      className="flex-grow border-[#4FD1C5] focus:ring-[#4FD1C5] focus:border-[#4FD1C5]"
                    />
                    <Button type="submit" className="ml-2 bg-[#4FD1C5] hover:bg-[#3BA89F] text-white">
                      Get Ideas
                    </Button>
                  </div>
                </div>
              </form>

              {suggestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#0d2834] mb-2 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-[#4FD1C5]" />
                    Reuse Ideas:
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="text-[#1a3f4c]">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {suggestions.length === 0 && wasteItem && (
                <p className="mt-4 text-[#1a3f4c]">
                  No specific suggestions found for this item. Try to think creatively about how you might repurpose it!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SandboxPage;

