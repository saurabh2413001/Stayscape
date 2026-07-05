import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-6xl font-semibold text-marigold-500">404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink-700 dark:text-ink-50">
        This page took a wrong turn
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-400 dark:text-ink-300">
        The page you're looking for doesn't exist. Let's get you back to browsing stays.
      </p>
      <Link to="/" className="btn-primary mt-6">
        Back to Stayscape
      </Link>
    </main>
  )
}
