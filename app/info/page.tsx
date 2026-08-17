'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function InfoPage() {
  const [broadcasts, setBroadcasts] = useState([
    {
      id: 1,
      title: "Morning Show with DJ Sunrise",
      date: "2026-08-18",
      time: "08:00 AM - 10:00 AM",
      description: "Start your day with the latest hits and community news."
    },
    {
      id: 2,
      title: "Afternoon Vibes",
      date: "2026-08-18",
      time: "02:00 PM - 04:00 PM",
      description: "Chill beats and relaxed conversation for your afternoon."
    },
    {
      id: 3,
      title: "Evening Entertainment",
      date: "2026-08-18",
      time: "06:00 PM - 08:00 PM",
      description: "Prime time entertainment with special guests and music requests."
    },
    {
      id: 4,
      title: "Late Night Sessions",
      date: "2026-08-18",
      time: "10:00 PM - 12:00 AM",
      description: "Deep cuts and underground tracks for the night owls."
    },
    {
      id: 5,
      title: "Weekend Special",
      date: "2026-08-19",
      time: "12:00 PM - 06:00 PM",
      description: "Extended weekend broadcast with guest DJs and special events."
    }
  ])

  // Load broadcasts from localStorage on mount
  useEffect(() => {
    const savedBroadcasts = localStorage.getItem('rtl_broadcasts')
    if (savedBroadcasts) {
      setBroadcasts(JSON.parse(savedBroadcasts))
    }
  }, [])

  // Save broadcasts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rtl_broadcasts', JSON.stringify(broadcasts))
  }, [broadcasts])

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
                <Link href="/info" className="text-white hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
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
        <h1 className="text-4xl font-extrabold text-white mb-8">Broadcast Schedule</h1>
        <p className="text-gray-400 mb-8">
          Check out our upcoming broadcasts. Times are displayed in your local timezone.
        </p>

        <div className="space-y-6">
          {broadcasts.map((broadcast, index) => (
            <div key={broadcast.id} className="bg-radio-gray rounded-lg p-6 border border-radio-light hover:border-radio-red transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{broadcast.title}</h2>
                  <p className="text-gray-400 mb-4">{broadcast.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-radio-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {broadcast.date}
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-radio-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {broadcast.time}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="bg-radio-red hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-radio-dark rounded-lg p-6 border border-radio-gray">
          <h3 className="text-xl font-bold text-white mb-4">About Our Schedule</h3>
          <p className="text-gray-400">
            All broadcast times are automatically adapted to your local timezone. We use your browser's 
            timezone settings to display the most accurate times for your location. Make sure your 
            device's timezone is set correctly for the best experience.
          </p>
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
