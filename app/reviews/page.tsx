'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ReviewsPage() {
  const [formData, setFormData] = useState({
    username: '',
    rating: 5,
    review: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Sample reviews data with localStorage persistence
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: 'RadioFan123',
      rating: 5,
      review: 'Best radio station in DemocracyCraft! The DJs are amazing and the music selection is top-notch.',
      date: '2026-08-15'
    },
    {
      id: 2,
      username: 'MusicLover456',
      rating: 4,
      review: 'Great content and community. Sometimes the schedule changes last minute, but overall excellent.',
      date: '2026-08-14'
    },
    {
      id: 3,
      username: 'CommunityBuilder',
      rating: 5,
      review: 'RTL Radio has brought our community together. The events and broadcasts are always entertaining!',
      date: '2026-08-12'
    }
  ])

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('rtl_reviews')
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews))
    }
  }, [])

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rtl_reviews', JSON.stringify(reviews))
  }, [reviews])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add new review to the list
    const newReview = {
      id: reviews.length + 1,
      username: formData.username,
      rating: parseInt(formData.rating),
      review: formData.review,
      date: new Date().toISOString().split('T')[0]
    }
    setReviews([newReview, ...reviews])

    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        username: '',
        rating: 5,
        review: ''
      })
    }, 3000)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 2.504 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h-3.461a1 1 0 00-.951-.69l-1.07-3.292c-.3-.921-.755-1.688-1.71-1.7V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ))
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
                <Link href="/reviews" className="text-white hover:text-radio-red px-3 py-2 rounded-md text-sm font-medium">
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
        <h1 className="text-4xl font-extrabold text-white mb-4">Community Reviews</h1>
        <p className="text-gray-400 mb-8">
          See what our community has to say about RTL Radio. Share your own experience!
        </p>

        {/* Review Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Leave a Review</h2>
          
          {submitSuccess && (
            <div className="bg-green-900 border border-green-700 text-green-100 px-4 py-3 rounded mb-6">
              Review submitted successfully! Thank you for your feedback.
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
              <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-2">
                Rating *
              </label>
              <select
                id="rating"
                name="rating"
                required
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
              >
                <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                <option value="4">⭐⭐⭐⭐ - Good</option>
                <option value="3">⭐⭐⭐ - Average</option>
                <option value="2">⭐⭐ - Below Average</option>
                <option value="1">⭐ - Poor</option>
              </select>
            </div>

            <div>
              <label htmlFor="review" className="block text-sm font-medium text-gray-300 mb-2">
                Your Review *
              </label>
              <textarea
                id="review"
                name="review"
                required
                value={formData.review}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-radio-gray border border-radio-light rounded-md text-white focus:outline-none focus:ring-2 focus:ring-radio-red focus:border-transparent"
                placeholder="Share your experience with RTL Radio"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-radio-red hover:bg-red-700 disabled:bg-radio-gray text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Recent Reviews</h2>
          {reviews.map((review) => (
            <div key={review.id} className="bg-radio-gray rounded-lg p-6 border border-radio-light">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{review.username}</h3>
                  <div className="flex items-center mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-300">{review.review}</p>
            </div>
          ))}
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
