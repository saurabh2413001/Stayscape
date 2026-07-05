import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const STORAGE_KEY = 'stayscape:favorites'
const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]))
    } catch {
      // localStorage may be unavailable (private browsing, quota, etc).
      // Favoriting still works for the session; it just won't persist.
    }
  }, [favoriteIds])

  const toggleFavorite = useCallback((hotelId) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(hotelId)) {
        next.delete(hotelId)
      } else {
        next.add(hotelId)
      }
      return next
    })
  }, [])

  const isFavorite = useCallback((hotelId) => favoriteIds.has(hotelId), [favoriteIds])

  const value = useMemo(
    () => ({ favoriteIds, toggleFavorite, isFavorite, count: favoriteIds.size }),
    [favoriteIds, toggleFavorite, isFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return ctx
}
