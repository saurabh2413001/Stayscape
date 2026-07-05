export default function EmptyState({
  title = 'No hotels match your filters',
  message = 'Try widening your price range or clearing a filter.',
  actionLabel,
  onAction,
  tone = 'neutral', // 'neutral' | 'error'
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-ink-100 bg-white/60 px-6 py-16 text-center dark:border-ink-700 dark:bg-ink-800/40">
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
          tone === 'error' ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-teal-500 dark:bg-teal-900/30'
        }`}
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {tone === 'error' ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          )}
        </svg>
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-700 dark:text-ink-50">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-400 dark:text-ink-300">{message}</p>
      {actionLabel && (
        <button onClick={onAction} className="btn-secondary mt-5">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
