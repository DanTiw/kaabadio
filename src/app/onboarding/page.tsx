'use client'

import LoginPage from './login/page'
import SignupPage from './signup/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#e6f7f5] via-[#f0faf9] to-white">
      <Card className="w-full max-w-md shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-[#4FD1C5]/20">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#f0faf9]">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-[#4FD1C5] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 text-[#1a3f4c] hover:text-[#0d2834] data-[state=inactive]:hover:bg-[#e6f7f5]"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-[#4FD1C5] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 text-[#1a3f4c] hover:text-[#0d2834] data-[state=inactive]:hover:bg-[#e6f7f5]"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <div className="px-4 py-6 space-y-4">
            <TabsContent value="login" className="focus-visible:ring-0 focus-visible:ring-offset-0 m-0">
              <LoginPage />
            </TabsContent>
            
            <TabsContent value="signup" className="focus-visible:ring-0 focus-visible:ring-offset-0 m-0">
              <SignupPage />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

