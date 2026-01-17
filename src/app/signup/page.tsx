'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

const passwordRequirements = [
  { text: 'At least 8 characters', met: false },
  { text: 'Contains uppercase letter', met: false },
  { text: 'Contains lowercase letter', met: false },
  { text: 'Contains number', met: false },
  { text: 'Contains special character', met: false },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    industry: '',
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const validatePassword = (password: string) => {
    return [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ]
  }

  const passwordChecks = validatePassword(formData.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (!passwordChecks.every(check => check)) {
      setError('Password does not meet all requirements')
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions')
      setIsLoading(false)
      return
    }

    try {
      // Here you would typically make an API call to create the user
      // For now, we'll simulate a successful signup and redirect to login
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/login?message=Account created successfully')
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleGitHubSignUp = () => {
    signIn('github', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0f172a] to-black" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#47BD79]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto flex items-center justify-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#47BD79] to-cyan-400 bg-clip-text text-transparent">OMGsystems</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-white/60">
            Or{' '}
            <Link
              href="/login"
              className="font-medium text-[#47BD79] hover:text-[#3da86a] transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-white/40 text-white bg-white/5 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:border-[#47BD79] transition-all sm:text-sm"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-white/40 text-white bg-white/5 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:border-[#47BD79] transition-all sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white/80">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-white/40 text-white bg-white/5 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:border-[#47BD79] transition-all sm:text-sm"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-white/80">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                required
                value={formData.industry}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-3 border border-white/10 bg-white/5 backdrop-blur-sm text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:border-[#47BD79] transition-all sm:text-sm [&>option]:bg-[#1a1a2e] [&>option]:text-white"
              >
                <option value="">Select your industry</option>
                <option value="property-management">Property Management</option>
                <option value="real-estate">Real Estate</option>
                <option value="accounting">Accounting</option>
                <option value="contractors">Contractors</option>
                <option value="cleaning">Cleaning Services</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-4 py-3 pr-10 border border-white/10 placeholder-white/40 text-white bg-white/5 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:border-[#47BD79] transition-all sm:text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-white/40 hover:text-white/60 transition-colors" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-white/40 hover:text-white/60 transition-colors" />
                  )}
                </button>
              </div>

              {/* Password requirements */}
              {formData.password && (
                <div className="mt-3 space-y-1 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  {passwordRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-center text-xs">
                      <CheckIcon
                        className={`h-3 w-3 mr-2 ${
                          passwordChecks[index] ? 'text-[#47BD79]' : 'text-white/30'
                        }`}
                      />
                      <span className={passwordChecks[index] ? 'text-[#47BD79]' : 'text-white/50'}>
                        {requirement.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-4 py-3 pr-10 border border-white/10 placeholder-white/40 text-white bg-white/5 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#47BD79]/50 focus:border-[#47BD79] transition-all sm:text-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-white/40 hover:text-white/60 transition-colors" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-white/40 hover:text-white/60 transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="h-4 w-4 text-[#47BD79] focus:ring-[#47BD79] border-white/20 rounded bg-white/5"
            />
            <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-white/70">
              I agree to the{' '}
              <Link href="/terms" className="text-[#47BD79] hover:text-[#3da86a] transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-[#47BD79] hover:text-[#3da86a] transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#47BD79] hover:bg-[#3da86a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#47BD79] disabled:opacity-50 transition-all shadow-lg shadow-[#47BD79]/30 hover:shadow-[0_0_30px_rgba(71,189,121,0.5)]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/50">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGitHubSignUp}
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
