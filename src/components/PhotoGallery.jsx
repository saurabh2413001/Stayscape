import { useState } from 'react'

export default function PhotoGallery({ photos, thumbnail, alt }) {
  const images = photos && photos.length > 0 ? photos : [thumbnail].filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return <div className="aspect-[16/10] w-full rounded-xl2 bg-ink-100 dark:bg-ink-700" />
  }

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl2 bg-ink-50 dark:bg-ink-800">
        <img
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={`${alt} — photo ${activeIndex + 1} of ${images.length}`}
          className="h-full w-full animate-fadeIn object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-md hover:scale-105 dark:bg-ink-900/80 dark:text-ink-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-700 shadow-md hover:scale-105 dark:bg-ink-900/80 dark:text-ink-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === activeIndex}
              className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${
                i === activeIndex ? 'border-marigold-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
