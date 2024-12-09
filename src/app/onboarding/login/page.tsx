'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight, Smartphone, KeyRound } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };
  
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp }),
      });
      const data = await response.json();
      if (data.success) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google Login')
    router.push('/dashboard')
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-[#e6f7f5] to-white border-[#4FD1C5]/20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-[#0d2834]">Welcome back</CardTitle>
        <CardDescription className="text-center text-[#1a3f4c]">
          Sign in to continue to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isOtpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#0d2834]">Mobile Number</Label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4FD1C5]" size={18} />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10 border-[#4FD1C5]/30 focus:border-[#4FD1C5] focus:ring-[#4FD1C5] bg-white text-[#0d2834]"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#4FD1C5] hover:bg-[#3BA89F] text-white">
              Send OTP
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-[#0d2834]">Enter OTP</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4FD1C5]" size={18} />
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pl-10 border-[#4FD1C5]/30 focus:border-[#4FD1C5] focus:ring-[#4FD1C5] bg-white text-[#0d2834]"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsOtpSent(false)}
                className="text-[#4FD1C5] hover:text-[#3BA89F] p-0"
              >
                Change number?
              </Button>
              <Button type="submit" className="bg-[#4FD1C5] hover:bg-[#3BA89F] text-white">
                Verify & Sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#4FD1C5]/30" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#1a3f4c]">Or continue with</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full border-[#4FD1C5]/30 text-[#0d2834] hover:bg-[#e6f7f5] hover:text-[#0d2834]"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>

        <p className="mt-6 text-center text-sm text-[#1a3f4c]">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-medium text-[#4FD1C5] hover:text-[#3BA89F] transition-colors duration-300">
            Sign up
          </a>
        </p>
      </CardContent>
    </Card>
  )
}

