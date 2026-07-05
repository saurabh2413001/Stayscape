export default function CityChips({ cities, activeCity, onSelect }) {
  if (cities.length <= 1) return null

  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter by city">
      {cities.map((city) => (
        <button
          key={city}
          role="tab"
          aria-selected={activeCity === city}
          onClick={() => onSelect(city)}
          className={`chip flex-shrink-0 ${activeCity === city ? 'chip-active' : ''}`}
        >
          {city}
        </button>
      ))}
    </div>
  )
}
