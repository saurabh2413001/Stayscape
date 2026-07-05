import { formatPrice } from '../utils/formatters'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Rating: Highest First' },
]

const RATING_OPTIONS = [0, 3, 3.5, 4, 4.5]

export default function FilterBar({ filters, priceCeiling, onChange, onReset, resultCount }) {
  const hasActiveFilters =
    filters.city !== 'All' ||
    filters.minRating > 0 ||
    (filters.maxPrice != null && filters.maxPrice < priceCeiling) ||
    filters.search.trim() !== ''

  return (
    <div className="sticky top-[61px] z-30 -mx-4 border-b border-ink-100 bg-sand/95 px-4 py-4 backdrop-blur-md dark:border-ink-700 dark:bg-ink-900/95 sm:mx-0 sm:rounded-xl2 sm:border sm:px-5 sm:shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="min-rating" className="text-xs font-semibold text-ink-400 dark:text-ink-300">
            Min rating
          </label>
          <select
            id="min-rating"
            value={filters.minRating}
            onChange={(e) => onChange({ minRating: Number(e.target.value) })}
            className="input-field w-auto py-2 text-xs"
          >
            {RATING_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r === 0 ? 'Any' : `${r}+ ★`}
              </option>
            ))}
          </select>
        </div>

        {filters.maxPrice != null && (
          <div className="flex flex-1 min-w-[180px] items-center gap-3">
            <label htmlFor="max-price" className="whitespace-nowrap text-xs font-semibold text-ink-400 dark:text-ink-300">
              Up to {formatPrice(filters.maxPrice)}
            </label>
            <input
              id="max-price"
              type="range"
              min={500}
              max={priceCeiling}
              step={100}
              value={filters.maxPrice}
              onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
              className="h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-ink-100 accent-marigold-500 dark:bg-ink-700"
            />
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort-by" className="text-xs font-semibold text-ink-400 dark:text-ink-300">
            Sort
          </label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value })}
            className="input-field w-auto py-2 text-xs"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button onClick={onReset} className="text-xs font-semibold text-teal-600 underline-offset-2 hover:underline dark:text-teal-300">
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-ink-400 dark:text-ink-400">
        {resultCount.toLocaleString('en-IN')} {resultCount === 1 ? 'hotel' : 'hotels'} found
      </p>
    </div>
  )
}
