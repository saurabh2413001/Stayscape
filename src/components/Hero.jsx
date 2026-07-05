export default function Hero({ search, onSearchChange, resultCount, isLoading }) {
  return (
    <section className="relative overflow-hidden bg-ink-700 dark:bg-ink-800">
      {/* Decorative arch pattern nodding to Indian architecture, kept subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #F5A623 0, transparent 45%), radial-gradient(circle at 80% 70%, #0F6B63 0, transparent 45%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-marigold-400">
          {isLoading ? 'Loading stays…' : `${resultCount.toLocaleString('en-IN')} stays across India`}
        </p>
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Find a room that fits the trip, not the other way around.
        </h1>
        <p className="mt-4 max-w-xl text-base text-ink-100">
          Browse real stays in Mumbai, Jaipur, Goa, and beyond — search by name or city, then
          filter by price and rating until it feels right.
        </p>

        <div className="mt-8 max-w-xl">
          <label htmlFor="hero-search" className="sr-only">
            Search hotels by name or city
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              id="hero-search"
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search “Hotel Regal Crescent” or “Jaipur”"
              className="w-full rounded-full border-0 bg-white py-3.5 pl-12 pr-4 text-sm text-ink-700 shadow-lg placeholder:text-ink-300 focus:ring-2 focus:ring-marigold-400"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
