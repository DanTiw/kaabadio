import { ArrowRight, Newspaper, Building2, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


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

  return (
    <section className="bg-background min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Hero Content */}
          <div className="flex flex-1 flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
            <div className="space-y-6 max-w-[640px]">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
                🌱 Sustainable Future
              </div>
              <h1 className="text-pretty text-4xl font-bold tracking-tighter sm:text-3xl md:text-6xl">
              Kabaad.io <span className="text-primary"></span>
              </h1>
              <br></br> 
              <h3 className="text-pretty text-xl font-bold tracking-tighter sm:text-5xl md:text-4xl"><i>Turning your trash into treasure,one click at a time</i></h3>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Join us to transform your paper and recyclable waste into something more rewarding.
              </p>
            </div>
            
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button 
                size="lg"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90"
              >
                <Link href="/onboarding" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[640px] mt-8 pt-8 border-t">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Partner Facilities</div>
              </div>
              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="text-2xl font-bold">2000kg+</div>
                <div className="text-sm text-muted-foreground">Waste Recycled</div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative flex-1 aspect-square max-w-[640px] mx-auto lg:max-w-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 800 800"
                className="w-full h-full text-primary/20"
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

            {/* Feature Cards */}
            {features.map((feature, index) => (
              <div
                key={index}
                className={`absolute w-[38%] aspect-[4/3] rounded-xl border border-border/50 bg-card/90 shadow-lg backdrop-blur-sm transform transition-all hover:scale-105 p-4 flex flex-col justify-center ${
                  index === 0 ? 'left-[8%] top-[10%]' :
                  index === 1 ? 'right-[12%] top-[20%]' :
                  'bottom-[24%] right-[24%]'
                }`}
              >
                <feature.icon className="size-8 mb-2 text-primary" />
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;