export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-100 bg-white/60 py-8 dark:border-ink-700 dark:bg-ink-900/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center sm:px-6 lg:px-8">
        <p className="font-display text-sm font-semibold text-ink-600 dark:text-ink-200">Stayscape</p>
        <p className="text-xs text-ink-400 dark:text-ink-400">
          Built as a learning project. Hotel data courtesy of the Demo Hotels API.
        </p>
      </div>
    </footer>
  )
}
