import Hero from '../components/Hero'
import CityChips from '../components/CityChips'
import FilterBar from '../components/FilterBar'
import HotelGrid from '../components/HotelGrid'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import { useHotels } from '../hooks/useHotels'

export default function Home() {
  const {
    status,
    error,
    cities,
    priceCeiling,
    filters,
    updateFilters,
    resetFilters,
    hotels,
    totalResults,
    page,
    totalPages,
    setPage,
  } = useHotels()

  return (
    <div>
      <Hero
        search={filters.search}
        onSearchChange={(value) => updateFilters({ search: value })}
        resultCount={totalResults}
        isLoading={status === 'loading'}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {status !== 'error' && (
          <div className="mb-6 space-y-4">
            <CityChips cities={cities} activeCity={filters.city} onSelect={(city) => updateFilters({ city })} />
            <FilterBar
              filters={filters}
              priceCeiling={priceCeiling}
              onChange={updateFilters}
              onReset={resetFilters}
              resultCount={totalResults}
            />
          </div>
        )}

        {status === 'loading' && <Loader />}

        {status === 'error' && (
          <EmptyState
            tone="error"
            title="Couldn't load hotels"
            message={error || 'Please check your connection and try again.'}
            actionLabel="Retry"
            onAction={() => window.location.reload()}
          />
        )}

        {status === 'success' && hotels.length === 0 && (
          <EmptyState actionLabel="Clear filters" onAction={resetFilters} />
        )}

        {status === 'success' && hotels.length > 0 && (
          <>
            <HotelGrid hotels={hotels} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>
    </div>
  )
}
