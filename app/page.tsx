'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [broadcasts, setBroadcasts] = useState([
    {
      id: 1,
      title: "RTL Radio is Live!",
      date: "2026-08-17",
      time: "All Day",
      description: "Welcome to RTL Radio - DemocracyCraft's premier radio station. More exciting broadcasts coming soon!"
    },
    {
      id: 2,
      title: "New Website Launch",
      date: "2026-08-17",
      time: "All Day",
      description: "Our brand new website is now live with Discord authentication and admin dashboard!"
    },
    {
      id: 3,
      title: "Join Our Team",
      date: "2026-08-10",
      time: "Ongoing",
      description: "We're looking for talented DJs, content creators, and community managers to join our team."
    }
  ])

  // Load broadcasts from localStorage on mount
  useEffect(() => {
    const savedBroadcasts = localStorage.getItem('rtl_broadcasts')
    if (savedBroadcasts) {
      setBroadcasts(JSON.parse(savedBroadcasts))
    }
  }, [])
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
                <Link href="/" className="text-white hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
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
                {session && (
                  <Link href="/admin" className="text-gray-300 hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
              </div>
            </div>
            <div>
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">{session.user?.name}</span>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-radio-gray hover:bg-radio-light text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin" className="bg-radio-red hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Login with Discord
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-radio-darker sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left animate-fade-in">
                {/* Large Modern Logo */}
                <div className="mb-8 sm:text-center lg:text-left animate-float">
                  <img 
                    src="/rtl-radio-icon-1024.png" 
                    alt="RTL Radio Logo" 
                    className="h-32 w-auto mx-auto lg:mx-0"
                    loading="eager"
                  />
                </div>

                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to</span>{' '}
                  <span className="block text-radio-red xl:inline">DemocracyCraft's Premier Radio</span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  We bring you the best music, entertainment, and community content. 
                  Join our growing community and tune in for exclusive broadcasts.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="https://discord.gg/your-discord-invite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-radio-red hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                    >
                      Join our Discord
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/advertise"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-radio-red bg-radio-gray hover:bg-radio-light md:py-4 md:text-lg md:px-10"
                    >
                      Advertise with us
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="bg-radio-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white mb-8">Latest Broadcasts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {broadcasts.slice(0, 3).map((broadcast, index) => (
              <div key={broadcast.id} className="bg-radio-gray rounded-lg p-6 border border-radio-light hover:border-radio-red transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-xl font-bold text-radio-red mb-2">{broadcast.title}</h3>
                <p className="text-gray-400 mb-4">{broadcast.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{broadcast.date}</span>
                  <span>{broadcast.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/info" className="text-radio-red hover:text-red-400 font-medium transition-colors">
              View Full Schedule →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-radio-darker border-t border-radio-gray">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">&copy; 2026 RTL Radio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
