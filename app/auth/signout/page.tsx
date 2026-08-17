'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function SignOutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <div className="min-h-screen bg-radio-darker flex items-center justify-center px-4">
      <div className="text-center">
        {/* Modern Logo */}
        <div className="mb-8">
          <img 
            src="/rtl-radio-icon-1024.png" 
            alt="RTL Radio Logo" 
            className="h-24 w-auto mx-auto"
          />
        </div>
        
        <div className="bg-radio-gray rounded-lg p-8 border border-radio-light">
          <h1 className="text-2xl font-bold text-white mb-4">Signing Out...</h1>
          <p className="text-gray-400 mb-6">You are being redirected to the homepage.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-radio-red mx-auto"></div>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-gray-400 hover:text-radio-red text-sm transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
