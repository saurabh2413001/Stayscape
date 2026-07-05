export default function Loader({ count = 12 }) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading hotels"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl2 bg-white shadow-card dark:bg-ink-800">
          <div className="skeleton h-48 w-full" />
          <div className="space-y-3 p-4">
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
            <div className="skeleton h-3 w-full rounded" />
            <div className="flex justify-between pt-2">
              <div className="skeleton h-6 w-16 rounded" />
              <div className="skeleton h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
