'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    pincode: '',
    phoneNumber: '',
  })
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically validate all fields and make an API call to send OTP
    console.log('Sending OTP to:', formData.phoneNumber)
    setIsOtpSent(true)
  }

  const handleVerifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically verify the OTP and create the user account
    console.log('Verifying OTP:', otp)
    console.log('Form Data:', formData)
    router.push('/dashboard')
  }

  const handleGoogleSignup = () => {
    console.log('Google Signup')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div>
        <h2 className="mt-2 text-center text-3xl font-extrabold bg-black bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up to get started
        </p>
      </div>

      {!isOtpSent ? (
        <form className="mt-8 space-y-4" onSubmit={handleSendOtp}>
          <div className="rounded-md space-y-4">
            <div className="group">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                  placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-indigo-300 group-hover:shadow-md
                  bg-white/50 backdrop-blur-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                  placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-indigo-300 group-hover:shadow-md
                  bg-white/50 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="group">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                  placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-indigo-300 group-hover:shadow-md
                  bg-white/50 backdrop-blur-sm"
                placeholder="Enter your address"
              />
            </div>

            <div className="group">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                pattern="\d*"
                maxLength={6}
                required
                value={formData.pincode}
                onChange={handleInputChange}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                  placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                  hover:border-indigo-300 group-hover:shadow-md
                  bg-white/50 backdrop-blur-sm"
                placeholder="Enter your pincode"
              />
            </div>

            <div className="group">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
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
              Verify Mobile Number
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
              Create Account
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
            onClick={handleGoogleSignup}
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
            Sign up with Google
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Already have an account ?{' '}
        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
          Sign in
        </a>
      </div>
    </div>
    </div>
  )
}