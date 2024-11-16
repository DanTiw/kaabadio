'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    pincode: '',
    password: '',
    phoneNumber: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    router.push('/onboarding/signup/2facheck')
    // try {
    //   const response = await fetch('/api/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   })

    //   if (response.ok) {
    //     router.push('/login') // Redirect to login after successful signup
    //   } else {
    //     const data = await response.json()
    //     setError(data.message || 'Something went wrong')
    //   }
    // } catch (err) {
    //   setError('Failed to create account')
    // }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today and start your journey
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm p-3 bg-red-50 rounded-lg border border-red-200 animate-shake">
              {error}
            </div>
          )}
          
          <div className="rounded-md space-y-5">
            {/* Input fields wrapper */}
            {[
              { id: 'name', type: 'text', placeholder: 'Full Name', pattern: undefined },
              { id: 'email', type: 'email', placeholder: 'Email address' },
              { id: 'address', type: 'text', placeholder: 'Address' },
              { id: 'pincode', type: 'text', placeholder: 'Pincode', pattern: '[0-9]{6}' },
              { id: 'phoneNumber', type: 'tel', placeholder: 'Phone Number', pattern: '[0-9]{10}' },
              { id: 'password', type: 'password', placeholder: 'Password' }
            ].map((field) => (
              <div key={field.id} className="group">
                <label htmlFor={field.id} className="sr-only">
                  {field.placeholder}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required
                  pattern={field.pattern}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 
                    placeholder-gray-400 text-gray-900 rounded-lg transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    hover:border-indigo-300 group-hover:shadow-md
                    bg-white/50 backdrop-blur-sm"
                  placeholder={field.placeholder}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 
                border border-transparent text-sm font-semibold rounded-lg text-white
                bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-white/70 group-hover:text-white/90 transition-colors duration-300" 
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              Sign up
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/onboarding/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
