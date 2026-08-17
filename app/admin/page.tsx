'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('broadcasts')
  
  // Broadcasts state
  const [broadcasts, setBroadcasts] = useState([
    { id: 1, title: "Morning Show with DJ Sunrise", date: "2026-08-18", time: "08:00 AM - 10:00 AM", description: "Start your day with the latest hits and community news." },
    { id: 2, title: "Afternoon Vibes", date: "2026-08-18", time: "02:00 PM - 04:00 PM", description: "Chill beats and relaxed conversation for your afternoon." }
  ])
  
  // Ad requests state
  const [adRequests, setAdRequests] = useState([])
  
  // Reviews state
  const [reviews, setReviews] = useState([])
  
  // Job applications state
  const [jobApplications, setJobApplications] = useState([])

  // Form states
  const [broadcastForm, setBroadcastForm] = useState({ title: '', date: '', time: '', description: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedBroadcasts = localStorage.getItem('rtl_broadcasts')
    if (savedBroadcasts) setBroadcasts(JSON.parse(savedBroadcasts))
    
    const savedAdRequests = localStorage.getItem('rtl_adRequests')
    if (savedAdRequests) setAdRequests(JSON.parse(savedAdRequests))
    
    const savedReviews = localStorage.getItem('rtl_reviews')
    if (savedReviews) setReviews(JSON.parse(savedReviews))
    
    const savedJobApplications = localStorage.getItem('rtl_jobApplications')
    if (savedJobApplications) setJobApplications(JSON.parse(savedJobApplications))
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('rtl_broadcasts', JSON.stringify(broadcasts))
  }, [broadcasts])

  useEffect(() => {
    localStorage.setItem('rtl_adRequests', JSON.stringify(adRequests))
  }, [adRequests])

  useEffect(() => {
    localStorage.setItem('rtl_reviews', JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    localStorage.setItem('rtl_jobApplications', JSON.stringify(jobApplications))
  }, [jobApplications])

  // Secure admin check - only 2 specific Discord IDs
  const adminDiscordIds = [
    process.env.ADMIN_DISCORD_ID || '1538889387008458803',
    process.env.SECOND_ADMIN_DISCORD_ID || ''
  ].filter(id => id !== 'ADD_SECOND_ADMIN_DISCORD_ID_HERE')
  const isAdmin = session && adminDiscordIds.includes((session.user as any)?.id)

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-radio-darker flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-radio-red mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-radio-darker flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/rtl-radio-icon-1024.png" 
            alt="RTL Radio Logo" 
            className="h-24 w-auto mx-auto mb-8"
            loading="eager"
          />
          <h1 className="text-3xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-8">Please login with Discord to access the admin dashboard.</p>
          <Link href="/auth/signin" className="bg-radio-red hover:bg-red-700 text-white px-6 py-3 rounded-md text-sm font-medium">
            Login with Discord
          </Link>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-radio-darker flex items-center justify-center">
        <div className="text-center">
          <img 
            src="/rtl-radio-icon-1024.png" 
            alt="RTL Radio Logo" 
            className="h-24 w-auto mx-auto mb-8"
            loading="eager"
          />
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">You don't have permission to access the admin dashboard.</p>
          <Link href="/" className="bg-radio-red hover:bg-red-700 text-white px-6 py-3 rounded-md text-sm font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleAddBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const newBroadcast = {
      id: broadcasts.length + 1,
      title: broadcastForm.title,
      date: broadcastForm.date,
      time: broadcastForm.time,
      description: broadcastForm.description
    }
    
    setBroadcasts([...broadcasts, newBroadcast])
    setBroadcastForm({ title: '', date: '', time: '', description: '' })
    setIsSubmitting(false)
  }

  const handleDeleteBroadcast = (id: number) => {
    setBroadcasts(broadcasts.filter(b => b.id !== id))
  }

  const handleApproveAd = (id: number) => {
    setAdRequests(adRequests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ))
  }

  const handleRejectAd = (id: number) => {
    setAdRequests(adRequests.filter(req => req.id !== id))
  }

  const handleDeleteReview = (id: number) => {
    setReviews(reviews.filter(r => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-radio-darker">
      {/* Navigation */}
      <nav className="bg-radio-dark border-b border-radio-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
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
                <Link href="/jobs" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Jobs
                </Link>
                <Link href="/reviews" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                  Reviews
                </Link>
                <Link href="/admin" className="text-white hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium border border-radio-red">
                  Admin
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">{session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-radio-gray hover:bg-radio-light text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage RTL Radio broadcasts, ads, and reviews</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-radio-gray pb-4">
          <button
            onClick={() => setActiveTab('broadcasts')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'broadcasts' 
                ? 'bg-radio-red text-white' 
                : 'bg-radio-gray text-gray-300 hover:text-white'
            }`}
          >
            Broadcasts
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ads' 
                ? 'bg-radio-red text-white' 
                : 'bg-radio-gray text-gray-300 hover:text-white'
            }`}
          >
            Ad Requests
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'reviews' 
                ? 'bg-radio-red text-white' 
                : 'bg-radio-gray text-gray-300 hover:text-white'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'jobs' 
                ? 'bg-radio-red text-white' 
                : 'bg-radio-gray text-gray-300 hover:text-white'
            }`}
          >
            Job Applications
          </button>
        </div>

        {/* Broadcasts Tab */}
        {activeTab === 'broadcasts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-radio-gray rounded-lg p-6 border border-radio-light">
              <h2 className="text-2xl font-bold text-white mb-6">Add Broadcast</h2>
              <form onSubmit={handleAddBroadcast} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={broadcastForm.title}
                    onChange={(e) => setBroadcastForm({...broadcastForm, title: e.target.value})}
                    className="w-full px-4 py-2 bg-radio-dark border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={broadcastForm.date}
                    onChange={(e) => setBroadcastForm({...broadcastForm, date: e.target.value})}
                    className="w-full px-4 py-2 bg-radio-dark border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 08:00 AM - 10:00 AM"
                    value={broadcastForm.time}
                    onChange={(e) => setBroadcastForm({...broadcastForm, time: e.target.value})}
                    className="w-full px-4 py-2 bg-radio-dark border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={broadcastForm.description}
                    onChange={(e) => setBroadcastForm({...broadcastForm, description: e.target.value})}
                    className="w-full px-4 py-2 bg-radio-dark border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-radio-red hover:bg-red-700 disabled:bg-radio-gray text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  {isSubmitting ? 'Adding...' : 'Add Broadcast'}
                </button>
              </form>
            </div>

            <div className="bg-radio-gray rounded-lg p-6 border border-radio-light">
              <h2 className="text-2xl font-bold text-white mb-6">Scheduled Broadcasts</h2>
              <div className="space-y-4">
                {broadcasts.map((broadcast) => (
                  <div key={broadcast.id} className="bg-radio-dark rounded-lg p-4 border border-radio-light">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white">{broadcast.title}</h3>
                      <button
                        onClick={() => handleDeleteBroadcast(broadcast.id)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-400 mb-2">{broadcast.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{broadcast.date}</span>
                      <span>{broadcast.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ads Tab */}
        {activeTab === 'ads' && (
          <div className="bg-radio-gray rounded-lg p-6 border border-radio-light">
            <h2 className="text-2xl font-bold text-white mb-6">Ad Requests</h2>
            <div className="bg-radio-dark rounded-lg p-4 border border-radio-light mb-6">
              <p className="text-gray-400 mb-2">Ad Space Cost: <span className="text-radio-red font-bold">200 bucks per ad</span></p>
              <p className="text-sm text-gray-500">All ad requests are processed through the DemocracyCraft treasury system.</p>
            </div>
            <div className="space-y-4">
              {adRequests.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No ad requests yet</p>
              ) : (
                adRequests.map((req) => (
                  <div key={req.id} className="bg-radio-dark rounded-lg p-4 border border-radio-light">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{req.username}</h3>
                        <p className="text-sm text-gray-500">{req.companyName}</p>
                      </div>
                      <div className="flex space-x-2">
                        {req.status === 'approved' ? (
                          <span className="bg-green-900 text-green-100 px-3 py-1 rounded text-sm">Approved</span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleApproveAd(req.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectAd(req.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-400">{req.adContent}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="bg-radio-gray rounded-lg p-6 border border-radio-light">
            <h2 className="text-2xl font-bold text-white mb-6">Review Management</h2>
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No reviews yet</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-radio-dark rounded-lg p-4 border border-radio-light">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{review.username}</h3>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-400">{review.review}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Job Applications Tab */}
        {activeTab === 'jobs' && (
          <div className="bg-radio-gray rounded-lg p-6 border border-radio-light">
            <h2 className="text-2xl font-bold text-white mb-6">Job Applications</h2>
            <div className="space-y-4">
              {jobApplications.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No job applications yet</p>
              ) : (
                jobApplications.map((app) => (
                  <div key={app.id} className="bg-radio-dark rounded-lg p-4 border border-radio-light">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{app.username}</h3>
                        <p className="text-sm text-gray-500">
                          {app.type === 'broadcaster' ? '🎙️ Radio Broadcaster' : '📰 Journalist'} • 
                          Age: {app.age} • 
                          Timezone: {app.timezone}
                        </p>
                      </div>
                      <button
                        onClick={() => setJobApplications(jobApplications.filter(a => a.id !== app.id))}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Experience:</p>
                        <p className="text-gray-400">{app.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-300">Availability:</p>
                        <p className="text-gray-400">{app.availability}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-300">Why Join:</p>
                        <p className="text-gray-400">{app.whyJoin}</p>
                      </div>
                      {app.sampleWork && (
                        <div>
                          <p className="text-sm font-medium text-gray-300">Sample Work:</p>
                          <a href={app.sampleWork} target="_blank" rel="noopener noreferrer" className="text-radio-red hover:underline">
                            {app.sampleWork}
                          </a>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">Submitted: {app.date}</p>
                  </div>
                ))
              )}
            </div>
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
