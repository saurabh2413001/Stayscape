import { useEffect, useState } from 'react'
import { fetchHotels } from '../api/hotelsApi'

/**
 * Finds a single hotel by id. Relies on fetchHotels()'s internal cache,
 * so this is cheap even if Home already loaded the full list.
 */
export function useHotel(id) {
  const [hotel, setHotel] = useState(null)
  const [status, setStatus] = useState('loading') // loading | success | not-found | error

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setHotel(null)

    fetchHotels()
      .then((hotels) => {
        if (cancelled) return
        const found = hotels.find((h) => String(h.id) === String(id))
        if (found) {
          setHotel(found)
          setStatus('success')
        } else {
          setStatus('not-found')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { hotel, status }
}
