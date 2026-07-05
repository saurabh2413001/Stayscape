import { Link } from 'react-router-dom'
import { useState } from 'react'
import RatingStars from './RatingStars'
import { formatPrice, extractHighlights } from '../utils/formatters'
import { useFavorites } from '../context/FavoritesContext'

export default function HotelCard({ hotel }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imgLoaded, setImgLoaded] = useState(false)
  const favorite = isFavorite(hotel.id)
  const highlights = extractHighlights(hotel.description)

  return (
    <article className="group animate-fadeIn overflow-hidden rounded-xl2 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover dark:bg-ink-800">
      <div className="relative h-48 w-full overflow-hidden bg-ink-50 dark:bg-ink-700">
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <button
          onClick={() => toggleFavorite(hotel.id)}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-600 shadow-md backdrop-blur transition-transform hover:scale-110 dark:bg-ink-900/80 dark:text-ink-100"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${favorite ? 'text-red-500' : ''}`}
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
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-teal-500/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
          {hotel.location}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-semibold leading-snug text-ink-700 dark:text-ink-50">
            {hotel.name}
          </h3>
        </div>

        <div className="mt-1.5">
          <RatingStars rating={hotel.rating} />
        </div>

        {highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {highlights.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-500 dark:bg-ink-700 dark:text-ink-200"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-ink-50 pt-3 dark:border-ink-700">
          <div>
            <span className="font-display text-lg font-semibold text-ink-700 dark:text-ink-50">
              {formatPrice(hotel.price)}
            </span>
            <span className="text-xs text-ink-400 dark:text-ink-400"> / night</span>
          </div>
          <Link to={`/hotels/${hotel.id}`} className="btn-primary py-2 text-xs">
            View details
          </Link>
        </div>
      </div>
    </article>
  )
}
