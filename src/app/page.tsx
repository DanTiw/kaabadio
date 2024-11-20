"use client";
import React from 'react';
import { ArrowRight, Newspaper, Building2, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const TextGenerateEffect = ({ words, className = "" }: { words: string, className?: string }) => {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
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
  }, [words]);

  return (
    <div className={`text-pretty text-xl font-bold tracking-tighter sm:text-5xl md:text-4xl text-orange-500 ${className}`}>
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
    <section className="bg-sky-50 text-black min-h-screen w-full overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <Image 
          src="/logo.png" 
          alt="Kabaad.io Logo" 
          width={130} 
          height={100} 
          className="animate-fade-in"
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Hero Content */}
          <div className="flex flex-1 flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
            <div className="space-y-6 max-w-[640px]">
              <h1 className="text-pretty text-4xl font-bold tracking-tighter sm:text-3xl md:text-6xl text-black">
                kabaad.io
              </h1>
              
              <TextGenerateEffect words={slogan} />

              <p className="text-base text-black/70 sm:text-lg md:text-xl animate-fade-in-slow">
                Join us to transform your paper and recyclable waste into something more rewarding.
              </p>
            </div>
            
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[640px] mt-8 pt-8 border-t border-black/20">
              {[
                {value: "1000+", label: "Active Users"},
                {value: "50+", label: "Partner Facilities"},
                {value: "2000kg+", label: "Waste Recycled", colSpan: true}
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center lg:text-left ${stat.colSpan ? 'col-span-2 md:col-span-1' : ''} animate-slide-in`}
                >
                  <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
                  <div className="text-sm text-black/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex-1 aspect-square max-w-[640px] mx-auto lg:max-w-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 800"
                className="w-full h-full text-black/10"
              >
                {Array.from(Array(720).keys()).map((dot, index, array) => {
                  const angle = 0.2 * index;
                  const scalar = 40 + index * (360 / array.length);
                  const x = Math.round(Math.cos(angle) * scalar);
                  const y = Math.round(Math.sin(angle) * scalar);
                  
                  return (
                    <circle
                      key={index}
                      r={(3 * index) / array.length}
                      cx={400 + x}
                      cy={400 + y}
                      opacity={1 - Math.sin(angle)}
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>
            </div>

            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute w-[38%] aspect-[4/3] rounded-xl border border-sky-600/30 bg-sky-50/90 shadow-lg backdrop-blur-sm transform transition-all hover:scale-105 p-4 flex flex-col justify-center ${
                  index === 0 ? 'left-[8%] top-[10%]' :
                  index === 1 ? 'right-[12%] top-[20%]' :
                  'bottom-[24%] right-[24%]'
                } animate-fade-in`}
              >
                <feature.icon className="size-8 mb-2 text-sky-600" />
                <h3 className="font-semibold mb-1 text-black">{feature.title}</h3>
                <p className="text-sm text-black/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slogan-reveal {
          from { 
            clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
          }
          to { 
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
        @keyframes underline {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-slow { animation: fade-in 1.2s ease-out; }
        .animate-slide-in { animation: slide-in 0.8s ease-out; }
        .animate-slogan-reveal { 
          animation: slogan-reveal 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          display: inline-block;
        }
        .animate-underline {
          animation: underline 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default LandingPage;