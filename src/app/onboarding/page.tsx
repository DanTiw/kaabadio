'use client'

import LoginPage from './login/page'
import SignupPage from './signup/page'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'

export default function OnboardingPage() {
  return (
    <div className="min-h-[600px] flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-md shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/90">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100/80">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-gray-50 data-[state=inactive]:hover:bg-gray-200/80"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200 hover:bg-gray-50 data-[state=inactive]:hover:bg-gray-200/80"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <div className="px-2 py-1 space-y-2">
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