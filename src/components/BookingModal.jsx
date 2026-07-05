import { useEffect, useState } from 'react'
import { formatPrice } from '../utils/formatters'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function addDaysISO(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export default function BookingModal({ hotel, onClose }) {
  const [checkIn, setCheckIn] = useState(todayISO())
  const [checkOut, setCheckOut] = useState(addDaysISO(1))
  const [guests, setGuests] = useState(2)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const nights = Math.max(
    1,
    Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)),
  )
  const total = nights * hotel.price

  function handleSubmit(e) {
    e.preventDefault()
    setConfirmed(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${hotel.name}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md animate-fadeIn rounded-xl2 bg-white p-6 shadow-2xl dark:bg-ink-800">
        {!confirmed ? (
          <>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink-700 dark:text-ink-50">Reserve your stay</h2>
                <p className="text-sm text-ink-400 dark:text-ink-300">{hotel.name}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-700"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="check-in" className="mb-1 block text-xs font-semibold text-ink-500 dark:text-ink-300">
                    Check-in
                  </label>
                  <input
                    id="check-in"
                    type="date"
                    required
                    min={todayISO()}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="check-out" className="mb-1 block text-xs font-semibold text-ink-500 dark:text-ink-300">
                    Check-out
                  </label>
                  <input
                    id="check-out"
                    type="date"
                    required
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="mb-1 block text-xs font-semibold text-ink-500 dark:text-ink-300">
                  Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl bg-ink-50 p-4 text-sm dark:bg-ink-700/50">
                <div className="flex justify-between text-ink-500 dark:text-ink-300">
                  <span>
                    {formatPrice(hotel.price)} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-ink-100 pt-2 font-semibold text-ink-700 dark:border-ink-600 dark:text-ink-50">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full">
                Confirm reservation
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-900/30">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="font-display text-lg font-semibold text-ink-700 dark:text-ink-50">Reservation confirmed</h2>
            <p className="mt-1.5 text-sm text-ink-400 dark:text-ink-300">
              {hotel.name} · {checkIn} → {checkOut} · {guests} {guests === 1 ? 'guest' : 'guests'}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-600 dark:text-ink-100">{formatPrice(total)} total</p>
            <p className="mt-4 text-xs text-ink-300 dark:text-ink-500">
              This is a demo booking — no payment was processed and no reservation was actually made.
            </p>
            <button onClick={onClose} className="btn-secondary mt-5">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
