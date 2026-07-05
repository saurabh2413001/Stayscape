import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const { count } = useFavorites()
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('stayscape:theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('stayscape:theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/60 bg-sand/90 backdrop-blur-md dark:border-ink-700/60 dark:bg-ink-900/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-700 text-marigold-400 dark:bg-marigold-500 dark:text-ink-900">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 20V9l8-5 8 5v11" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink-700 dark:text-ink-50">
            Stayscape
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hidden rounded-full px-4 py-2 text-sm font-medium transition-colors sm:inline-block ${
                isActive
                  ? 'bg-ink-700 text-white dark:bg-marigold-500 dark:text-ink-900'
                  : 'text-ink-500 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
              }`
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-ink-700 text-white dark:bg-marigold-500 dark:text-ink-900'
                  : 'text-ink-500 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800'
              }`
            }
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill={count > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.727l-1.318-1.2C5.4 14.86 2 11.766 2 7.965 2 4.87 4.42 2.5 7.5 2.5c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0116.5 2.5C19.58 2.5 22 4.87 22 7.965c0 3.8-3.4 6.895-8.682 11.577L12 20.727z"
              />
            </svg>
            <span className="hidden sm:inline">Favorites</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-marigold-500 text-[10px] font-bold text-ink-900">
                {count}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => setIsDark((d) => !d)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4.5" />
                <path strokeLinecap="round" d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
