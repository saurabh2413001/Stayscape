import { useEffect, useMemo, useState } from 'react'
import { fetchHotels } from '../api/hotelsApi'

const PAGE_SIZE = 12

const initialFilters = {
  search: '',
  city: 'All',
  minRating: 0,
  maxPrice: null, // set once data loads, based on real max price
  sortBy: 'featured', // featured | price-asc | price-desc | rating-desc
}

export function useHotels() {
  const [allHotels, setAllHotels] = useState([])
  const [status, setStatus] = useState('loading') // loading | success | error
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const data = await fetchHotels()
        if (cancelled) return
        setAllHotels(data)
        const highestPrice = Math.max(...data.map((h) => h.price), 0)
        setFilters((prev) => ({ ...prev, maxPrice: Math.ceil(highestPrice / 100) * 100 }))
        setStatus('success')
      } catch (err) {
        if (cancelled) return
        setError(err.message || 'Something went wrong while loading hotels.')
        setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const cities = useMemo(() => {
    const unique = [...new Set(allHotels.map((h) => h.location))].sort()
    return ['All', ...unique]
  }, [allHotels])

  const priceCeiling = useMemo(
    () => Math.max(...allHotels.map((h) => h.price), 1000),
    [allHotels],
  )

  const filteredHotels = useMemo(() => {
    let result = allHotels

    if (filters.search.trim()) {
      const q = filters.search.trim().toLowerCase()
      result = result.filter(
        (h) => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q),
      )
    }

    if (filters.city !== 'All') {
      result = result.filter((h) => h.location === filters.city)
    }

    if (filters.minRating > 0) {
      result = result.filter((h) => h.rating >= filters.minRating)
    }

    if (filters.maxPrice != null) {
      result = result.filter((h) => h.price <= filters.maxPrice)
    }

    switch (filters.sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating-desc':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      default:
        // "featured": stable original order
        break
    }

    return result
  }, [allHotels, filters])

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / PAGE_SIZE))

  const pagedHotels = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredHotels.slice(start, start + PAGE_SIZE)
  }, [filteredHotels, page])

  // Reset to page 1 whenever filters change so users don't land on an empty page.
  useEffect(() => {
    setPage(1)
  }, [filters.search, filters.city, filters.minRating, filters.maxPrice, filters.sortBy])

  function updateFilters(partial) {
    setFilters((prev) => ({ ...prev, ...partial }))
  }

  function resetFilters() {
    setFilters((prev) => ({ ...initialFilters, maxPrice: prev.maxPrice }))
  }

  return {
    status,
    error,
    cities,
    priceCeiling,
    filters,
    updateFilters,
    resetFilters,
    hotels: pagedHotels,
    totalResults: filteredHotels.length,
    page,
    totalPages,
    setPage,
    allHotelsById: allHotels,
  }
}
