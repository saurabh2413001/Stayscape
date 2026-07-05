import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHotel } from '../hooks/useHotel'
import { useFavorites } from '../context/FavoritesContext'
import PhotoGallery from '../components/PhotoGallery'
import RatingStars from '../components/RatingStars'
import BookingModal from '../components/BookingModal'
import EmptyState from '../components/EmptyState'
import { formatPrice, extractHighlights } from '../utils/formatters'

export default function HotelDetails() {
  const { id } = useParams()
  const { hotel, status } = useHotel(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [showBooking, setShowBooking] = useState(false)

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="skeleton aspect-[16/10] w-full rounded-xl2" />
        <div className="skeleton mt-6 h-8 w-2/3 rounded" />
        <div className="skeleton mt-3 h-4 w-1/3 rounded" />
      </div>
    )
  }

  if (status === 'not-found' || status === 'error') {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          tone={status === 'error' ? 'error' : 'neutral'}
          title={status === 'error' ? "Couldn't load this hotel" : 'Hotel not found'}
          message={
            status === 'error'
              ? 'Please check your connection and try again.'
              : "This hotel may have been removed, or the link isn't quite right."
          }
          actionLabel="Back to all hotels"
          onAction={() => (window.location.href = '/')}
        />
      </div>
    )
  }

  const favorite = isFavorite(hotel.id)
  const highlights = extractHighlights(hotel.description)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-700 dark:text-ink-300 dark:hover:text-ink-50"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to all hotels
      </Link>

      <PhotoGallery photos={hotel.photos} thumbnail={hotel.thumbnail} alt={hotel.name} />

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div>
          <span className="mb-2 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
            {hotel.location}
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-700 dark:text-ink-50 sm:text-3xl">
            {hotel.name}
          </h1>
          <div className="mt-2">
            <RatingStars rating={hotel.rating} size="lg" />
          </div>
        </div>

        <div className="flex items-start gap-3 sm:flex-col sm:items-end">
          <div className="text-right">
            <p className="font-display text-2xl font-semibold text-ink-700 dark:text-ink-50">
              {formatPrice(hotel.price)}
            </p>
            <p className="text-xs text-ink-400 dark:text-ink-400">per night</p>
          </div>
        </div>
      </div>

      {highlights.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {highlights.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600 dark:bg-ink-700 dark:text-ink-200"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <h2 className="font-display text-lg font-semibold text-ink-700 dark:text-ink-50">About this stay</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-300">{hotel.description}</p>
        </div>

        <aside className="rounded-xl2 border border-ink-100 bg-white p-5 shadow-card dark:border-ink-700 dark:bg-ink-800">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-ink-400">
            Ready to book?
          </p>
          <p className="mt-1 font-display text-xl font-semibold text-ink-700 dark:text-ink-50">
            {formatPrice(hotel.price)}
            <span className="text-sm font-normal text-ink-400 dark:text-ink-400"> / night</span>
          </p>
          <button onClick={() => setShowBooking(true)} className="btn-primary mt-4 w-full">
            Reserve now
          </button>
          <button
            onClick={() => toggleFavorite(hotel.id)}
            className="btn-secondary mt-2.5 w-full"
            aria-pressed={favorite}
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-4 w-4 ${favorite ? 'text-red-500' : ''}`}
              fill={favorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.727l-1.318-1.2C5.4 14.86 2 11.766 2 7.965 2 4.87 4.42 2.5 7.5 2.5c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0116.5 2.5C19.58 2.5 22 4.87 22 7.965c0 3.8-3.4 6.895-8.682 11.577L12 20.727z"
              />
            </svg>
            {favorite ? 'Saved to favorites' : 'Save to favorites'}
          </button>
        </aside>
      </div>

      {showBooking && <BookingModal hotel={hotel} onClose={() => setShowBooking(false)} />}
    </div>
  )
}
