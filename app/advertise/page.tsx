'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function AdvertisePage() {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    username: '',
    companyName: '',
    adContent: '',
    discordLink: '',
    screenshots: [] as File[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ 
        ...prev, 
        screenshots: Array.from(e.target.files || []) 
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call and save to localStorage
    await new Promise(resolve => setTimeout(resolve, 1000))

    const adRequest = {
      id: Date.now(),
      username: formData.username,
      companyName: formData.companyName,
      adContent: formData.adContent,
      discordLink: formData.discordLink,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    }

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('rtl_adRequests') || '[]')
    localStorage.setItem('rtl_adRequests', JSON.stringify([adRequest, ...existingRequests]))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        username: '',
        companyName: '',
        adContent: '',
        discordLink: '',
        screenshots: []
      })
    }, 3000)
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-radio-darker flex items-center justify-center">
        <div className="text-center">
          {/* Modern Logo */}
          <div className="mb-8">
            <img 
              src="/rtl-radio-icon-1024.png" 
              alt="RTL Radio Logo" 
              className="h-24 w-auto mx-auto"
              loading="eager"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-8">Please login with Discord to submit advertisements.</p>
          <Link href="/auth/signin" className="bg-radio-red hover:bg-red-700 text-white px-6 py-3 rounded-md text-sm font-medium">
            Login with Discord
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-radio-darker">
      {/* Navigation */}
      <nav className="bg-radio-dark border-b border-radio-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Modern Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <img 
                  src="/rtl-radio-icon-1024.png" 
                  alt="RTL Radio Logo" 
                  className="h-10 w-auto"
                  loading="eager"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link href="/info" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Info
                </Link>
                <Link href="/advertise" className="text-white hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Advertise
                </Link>
                <Link href="/jobs" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Jobs
                </Link>
                <Link href="/reviews" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Reviews
                </Link>
                <Link href="/admin" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Admin
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">{session.user?.name}</span>
              <Link href="/auth/signout" className="bg-radio-gray hover:bg-radio-light text-white px-4 py-2 rounded-md text-sm font-medium">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-4">Submit Advertisement</h1>
          <p className="text-gray-400 mb-8">
            Fill out the form below to submit your advertisement. Your ad will be reviewed by our team before being aired.
          </p>

          {submitSuccess && (
            <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-6">
              Advertisement submitted successfully! Our team will review it shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                placeholder="Your in-game username"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                placeholder="Your company or organization name"
              />
            </div>

            <div>
              <label htmlFor="adContent" className="block text-sm font-medium text-gray-300 mb-2">
                Advertisement Content *
              </label>
              <textarea
                id="adContent"
                name="adContent"
                required
                value={formData.adContent}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                placeholder="Describe your advertisement - what do you want to promote?"
              />
            </div>

            <div>
              <label htmlFor="discordLink" className="block text-sm font-medium text-gray-300 mb-2">
                Discord Link (Optional)
              </label>
              <input
                type="url"
                id="discordLink"
                name="discordLink"
                value={formData.discordLink}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                placeholder="https://discord.gg/your-server"
              />
            </div>

            <div>
              <label htmlFor="screenshots" className="block text-sm font-medium text-gray-300 mb-2">
                Screenshots (Optional)
              </label>
              <input
                type="file"
                id="screenshots"
                name="screenshots"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500">Upload screenshots to support your advertisement</p>
            </div>

            <div className="bg-radio-dark rounded-lg p-4 border border-radio-gray">
              <h3 className="text-lg font-medium text-white mb-2">Payment Information</h3>
              <p className="text-gray-400 text-sm mb-4">
                Advertisement slots require payment through our DemocracyCraft treasury system. 
                Your ad request will be reviewed by admins who will process the payment.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-radio-red font-bold">Cost:</span>
                <span className="text-white">200 bucks per advertisement</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-radio-red hover:bg-red-700 disabled:bg-radio-gray text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Advertisement'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-radio-darker border-t border-radio-gray mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">&copy; 2026 RTL Radio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
