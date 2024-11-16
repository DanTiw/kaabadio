import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <section className="bg-background min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Hero Content */}
          <div className="flex flex-1 flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
            <div className="space-y-4 max-w-[640px]">
              <h1 className="text-pretty text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Welcome to Kaabad.io
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Recycle-Reuse-Reduce waste with us and help us to create a better 
                world. Kaabad.io is a platform that helps you to reduce waste and 
                recycle your products.
              </p>
            </div>
            
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Link href="/onboarding" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex-1 aspect-square max-w-[640px] mx-auto lg:max-w-none">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 800"
                className="w-full h-full text-muted-foreground/20"
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
                    />
                  );
                })}
              </svg>
            </div>

            {/* Decorative Elements - Made responsive with relative positioning */}
            <div className="absolute left-[8%] top-[10%] w-[38%] aspect-[5/6] rounded-xl border border-border/50 bg-accent/50 shadow-lg backdrop-blur-sm transform transition-transform hover:scale-105" />
            <div className="absolute right-[12%] top-[20%] w-1/5 aspect-square rounded-xl border border-border/50 bg-accent/50 shadow-lg backdrop-blur-sm transform transition-transform hover:scale-105" />
            <div className="absolute bottom-[24%] right-[24%] w-[38%] aspect-[5/6] rounded-xl border border-border/50 bg-accent/50 shadow-lg backdrop-blur-sm transform transition-transform hover:scale-105" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;