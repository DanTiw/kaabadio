'use client'

import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import Sidenav from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Recycle, Lightbulb } from 'lucide-react';

const SandboxPage = () => {
  const [wasteItem, setWasteItem] = useState('');
  const [suggestions, setSuggestions] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous state
    setSuggestions('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/sandbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ material: wasteItem }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data.html);
    } catch (err) {
      setError('Unable to fetch suggestions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="ml-2 bg-[#4FD1C5] hover:bg-[#3BA89F] text-white disabled:opacity-50"
                    >
                      {isLoading ? 'Loading...' : 'Get Ideas'}
                    </Button>
                  </div>
                </div>
              </form>

              {isLoading && (
                <div className="mt-6 text-[#1a3f4c] animate-pulse">
                  Generating creative reuse ideas...
                </div>
              )}

              {error && (
                <p className="mt-4 text-red-500">{error}</p>
              )}

              {suggestions && (
                <div 
                  className="mt-6 prose prose-green items-center"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(suggestions)
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SandboxPage;