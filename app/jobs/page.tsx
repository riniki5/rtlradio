'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function JobsPage() {
  const { data: session } = useSession()
  const [activeJob, setActiveJob] = useState<'broadcaster' | 'journalist' | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    timezone: '',
    experience: '',
    availability: '',
    whyJoin: '',
    sampleWork: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const jobApplications = useState(() => {
    const saved = localStorage.getItem('rtl_jobApplications')
    return saved ? JSON.parse(saved) : []
  })[0]

  const [applications, setApplications] = useState(jobApplications)

  useEffect(() => {
    localStorage.setItem('rtl_jobApplications', JSON.stringify(applications))
  }, [applications])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newApplication = {
      id: Date.now(),
      type: activeJob,
      username: formData.username,
      age: formData.age,
      timezone: formData.timezone,
      experience: formData.experience,
      availability: formData.availability,
      whyJoin: formData.whyJoin,
      sampleWork: formData.sampleWork,
      date: new Date().toISOString().split('T')[0]
    }

    setApplications([newApplication, ...applications])

    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        username: '',
        age: '',
        timezone: '',
        experience: '',
        availability: '',
        whyJoin: '',
        sampleWork: ''
      })
      setActiveJob(null)
    }, 3000)
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
                <Link href="/advertise" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Advertise
                </Link>
                <Link href="/jobs" className="text-white hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
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
            <div>
              <Link href="/auth/signin" className="bg-radio-red hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Login with Discord
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white mb-4">Join Our Team</h1>
        <p className="text-gray-400 mb-8">
          We're always looking for talented individuals to join RTL Radio. Check out our available positions below.
        </p>

        {/* Available Positions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div 
            onClick={() => setActiveJob('broadcaster')}
            className="bg-radio-gray rounded-lg p-8 border border-radio-light hover:border-radio-red cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎙️</div>
              <h3 className="text-2xl font-bold text-radio-red mb-2">Radio Broadcaster</h3>
              <p className="text-gray-400">Host live shows, entertain listeners, and create amazing radio content</p>
            </div>
          </div>
          <div 
            onClick={() => setActiveJob('journalist')}
            className="bg-radio-gray rounded-lg p-8 border border-radio-light hover:border-radio-red cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-radio-red mb-2">Journalist</h3>
              <p className="text-gray-400">Report news, conduct interviews, and keep the community informed</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        {activeJob && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeJob === 'broadcaster' ? 'Radio Broadcaster Application' : 'Journalist Application'}
              </h2>
              <button
                onClick={() => setActiveJob(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {submitSuccess && (
              <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-6 animate-fade-in">
                Application submitted successfully! Our team will review it and get back to you soon.
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                    Timezone *
                  </label>
                  <input
                    type="text"
                    id="timezone"
                    name="timezone"
                    required
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                    placeholder="e.g., EST, PST, CET"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                  {activeJob === 'broadcaster' ? 'Broadcasting Experience *' : 'Journalism Experience *'}
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                  placeholder={activeJob === 'broadcaster' 
                    ? 'Describe your experience with radio, streaming, or content creation' 
                    : 'Describe your experience with journalism, writing, or content creation'}
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                  Availability *
                </label>
                <textarea
                  id="availability"
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                  placeholder="When are you available to work? (days, times, timezone)"
                />
              </div>

              <div>
                <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-300 mb-2">
                  Why do you want to join RTL Radio? *
                </label>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  required
                  value={formData.whyJoin}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                  placeholder="Tell us why you're interested in joining our team"
                />
              </div>

              <div>
                <label htmlFor="sampleWork" className="block text-sm font-medium text-gray-300 mb-2">
                  {activeJob === 'broadcaster' ? 'Sample Content Link (Optional)' : 'Writing Sample Link (Optional)'}
                </label>
                <input
                  type="text"
                  id="sampleWork"
                  name="sampleWork"
                  value={formData.sampleWork}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                  placeholder={activeJob === 'broadcaster' 
                    ? 'Link to your streaming/audio samples' 
                    : 'Link to your writing samples or portfolio'}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-radio-red hover:bg-red-700 disabled:bg-radio-gray text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}
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
