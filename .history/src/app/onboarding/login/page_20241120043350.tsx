'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold bg-black bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        {!isOtpSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
            <div className="rounded-md space-y-5">
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                    placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    hover:border-indigo-300 group-hover:shadow-md
                    bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 
                  border border-transparent text-sm font-semibold rounded-lg text-white
                  bg-black hover:from-indigo-700 
                  hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors duration-300" 
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
            <div className="rounded-md space-y-5">
              <div className="group">
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                    placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    hover:border-indigo-300 group-hover:shadow-md
                    bg-white/50 backdrop-blur-sm"
                  placeholder="Enter 6-digit OTP"
                />
              </div>

              <div className="text-sm text-right">
                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
                >
                  Change number?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 
                  border border-transparent text-sm font-semibold rounded-lg text-white
                  bg-black hover:from-indigo-700 
                  hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg"
              >
                Verify & Sign in
              </button>
            </div>
          </form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 
                border border-gray-300 rounded-lg shadow-sm text-sm font-medium 
                text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300
                hover:shadow-md hover:border-gray-400"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
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
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}