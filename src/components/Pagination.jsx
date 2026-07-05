export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pageNumbers = getVisiblePages(page, totalPages)

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="btn-secondary h-9 w-9 !p-0 disabled:pointer-events-none"
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pageNumbers.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-ink-300">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              p === page
                ? 'bg-ink-700 text-white dark:bg-marigold-500 dark:text-ink-900'
                : 'text-ink-500 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="btn-secondary h-9 w-9 !p-0 disabled:pointer-events-none"
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}

function getVisiblePages(current, total) {
  const delta = 1
  const range = []
  const rangeWithDots = []
  let last

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (last) {
      if (i - last === 2) {
        rangeWithDots.push(last + 1)
      } else if (i - last > 2) {
        rangeWithDots.push('…')
      }
    }
    rangeWithDots.push(i)
    last = i
  }

  return rangeWithDots
}
