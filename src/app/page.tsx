"use client";
import React from 'react';
import { ArrowRight, Newspaper, Building2, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const TextGenerateEffect = ({ words, className = "" }: { words: string, className?: string }) => {
  const [text, setText] = React.useState("");
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;

    const generateText = () => {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= words.length) {
          setText(words.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 20);

      return () => clearInterval(intervalId);
    };

    generateText();
  }, [words, isMounted]);

  if (!isMounted) return null;

  return (
    <div className={`text-pretty text-xl font-bold tracking-tighter sm:text-3xl md:text-4xl ${className}`}>
      {text}
    </div>
  );
};

const LandingPage = () => {
  const features = [
    {
      icon: Newspaper,
      title: "Categorize",
      description: "Sort your waste efficiently with our smart categorization system"
    },
    {
      icon: Building2,
      title: "Track",
      description: "Monitor your recycling impact with detailed analytics"
    },
    {
      icon: Coins,
      title: "Earn",
      description: "Get rewarded for your contribution to sustainability"
    }
  ];

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#0d2834] via-[#1a3f4c] to-[#0d2834] text-white px-4 py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Turning Trash into Treasure,
          <br />
          <span className="text-[#4FD1C5]">One Click at a Time</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-12 text-gray-300">
          Kabaad.io helps you categorize your waste into Paper and Facility waste,
          ensuring you receive rewards for recycling responsibly!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-[#0a1f2b]/50 backdrop-blur-sm border border-[#4FD1C5]/10"
            >
              <div className="flex flex-col items-center space-y-4">
                <feature.icon className="w-12 h-12 text-[#4FD1C5]" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="bg-[#4FD1C5] hover:bg-[#3BA89F] text-white px-8 rounded-full"
        >
          <Link href="/onboarding" className="flex items-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
};

export default LandingPage;

