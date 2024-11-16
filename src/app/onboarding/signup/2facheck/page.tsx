'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle input change for each OTP digit
  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle OTP verification
  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    router.push('/dashboard');
    // try {
    //   // TODO: Replace with your actual API call
    //   const response = await fetch('/api/verify-otp', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ otp: otpString }),
    //   });

    //   if (response.ok) {
    //     router.push('/dashboard'); // Redirect after successful verification
    //   } else {
    //     setError('Invalid OTP. Please try again.');
    //   }
    // } catch (err) {
    //   setError('Something went wrong. Please try again.');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Phone</h2>
          <p className="mt-2 text-gray-600">
            We&apos;ve sent a 6-digit code to your phone number
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm">{error}</p>
          )}

          <button
            onClick={handleVerify}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
