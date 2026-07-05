import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchHotels } from '../api/hotelsApi'
import { useFavorites } from '../context/FavoritesContext'
import HotelGrid from '../components/HotelGrid'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'

export default function Favorites() {
  const { favoriteIds } = useFavorites()
  const [allHotels, setAllHotels] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetchHotels()
      .then((data) => {
        if (!cancelled) {
          setAllHotels(data)
          setStatus('success')
        }
      })
      .catch(() => !cancelled && setStatus('error'))
    return () => {
      cancelled = true
    }
  }, [])

  const favoriteHotels = allHotels.filter((h) => favoriteIds.has(h.id))

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-semibold text-ink-700 dark:text-ink-50 sm:text-3xl">
        Your favorites
      </h1>
      <p className="mt-1 text-sm text-ink-400 dark:text-ink-300">
        {favoriteIds.size > 0
          ? `${favoriteIds.size} saved ${favoriteIds.size === 1 ? 'hotel' : 'hotels'}`
          : 'Hotels you save will show up here.'}
      </p>

      <div className="mt-6">
        {status === 'loading' && <Loader count={favoriteIds.size || 4} />}

        {status === 'error' && (
          <EmptyState tone="error" title="Couldn't load your favorites" message="Please try again shortly." />
        )}

        {status === 'success' && favoriteHotels.length === 0 && (
          <>
            <EmptyState
              title="No favorites yet"
              message="Tap the heart icon on any hotel to save it here for later."
            />
            <div className="mt-4 text-center">
              <Link to="/" className="btn-primary">
                Browse hotels
              </Link>
            </div>
          </>
        )}

        {status === 'success' && favoriteHotels.length > 0 && <HotelGrid hotels={favoriteHotels} />}
      </div>
    </main>
  )
}
