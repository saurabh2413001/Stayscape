import { formatRating } from '../utils/formatters'

export default function RatingStars({ rating, size = 'sm' }) {
  const rounded = Math.round(rating)
  const starSize = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5'

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${formatRating(rating)} out of 5`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`${starSize} ${i < rounded ? 'text-marigold-500' : 'text-ink-100 dark:text-ink-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L4.6 17.8l1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-semibold text-ink-500 dark:text-ink-200">{formatRating(rating)}</span>
    </div>
  )
}
