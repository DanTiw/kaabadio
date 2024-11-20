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
    <div className={`text-pretty text-xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-orange-500 ${className}`}>
      <i>{text}</i>
    </div>
  );
};

const LandingPage = () => {
  const features = [
    {
      icon: Newspaper,
      title: "Paper Waste",
      description: "Connect with local paper buyers and get instant payments based on weight"
    },
    {
      icon: Building2,
      title: "Facility Waste",
      description: "Send recyclables to certified facilities and earn reward points"
    },
    {
      icon: Coins,
      title: "Rewards Program",
      description: "Redeem points for exclusive discounts and sustainable products"
    }
  ];

  const slogan = "Turning your trash into treasure, one click at a time";

  return (
    <section className="bg-sky-50 text-black min-h-screen w-full overflow-hidden relative">
      <div className="absolute top-4 right-4 z-10 hidden sm:block">
        <Image 
          src="/logo.png" 
          alt="Kabaad.io Logo" 
          width={130} 
          height={100} 
          className="opacity-0 animate-fade-in"
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="max-w-md w-full">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-black mb-4">
                kabaad.io
              </h1>
              
              <TextGenerateEffect words={slogan} className="mb-4" />

              <p className="text-base md:text-lg text-black/70 opacity-0 animate-fade-in-slow mb-6">
                Join us to transform your paper and recyclable waste into something more rewarding.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-sky-50 transition-transform hover:scale-105"
                >
                  <Link href="/onboarding" className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full border-t border-black/20 pt-6">
                {[
                  {value: "1000+", label: "Active Users"},
                  {value: "50+", label: "Partner Facilities"},
                  {value: "2000kg+", label: "Waste Recycled", colSpan: true}
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className={`text-center lg:text-left opacity-0 animate-slide-in ${stat.colSpan ? 'col-span-2 md:col-span-1' : ''}`}
                  >
                    <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
                    <div className="text-sm text-black/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative max-w-md lg:max-w-xl mx-auto">


            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute w-[38%] aspect-[4/3] rounded-xl border border-sky-600/30 bg-sky-50/90 shadow-lg backdrop-blur-sm transform transition-all hover:scale-105 p-4 flex flex-col justify-center opacity-0 animate-fade-in hidden lg:flex ${
                  index === 0 ? 'left-[8%] top-[10%]' :
                  index === 1 ? 'right-[12%] top-[20%]' :
                  'bottom-[24%] right-[24%]'
                }`}
              >
                <feature.icon className="size-8 mb-2 text-sky-600" />
                <h3 className="font-semibold mb-1 text-black">{feature.title}</h3>
                <p className="text-sm text-black/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in { 
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-slow { 
          animation: fade-in 1.2s ease-out forwards;
        }
        .animate-slide-in { 
          animation: slide-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default LandingPage;