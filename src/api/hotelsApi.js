const BASE_URL = 'https://demohotelsapi.pythonanywhere.com'

// The deployed API always returns the full 500-hotel dataset in one payload
// (its documented query params for filtering/sorting/pagination aren't
// actually honored by the live instance), so we fetch it once, cache it in
// memory for the session, and do all filtering/sorting/pagination client-side.
let cachedHotels = null
let inFlightRequest = null

/**
 * Fetches the full hotel list from the Demo Hotels API, caching the result
 * in memory so repeated calls within a session don't re-hit the network.
 *
 * @returns {Promise<Array<Object>>} array of hotel records
 */
export async function fetchHotels() {
  if (cachedHotels) return cachedHotels

  if (!inFlightRequest) {
    inFlightRequest = fetchAndNormalize().catch((err) => {
      inFlightRequest = null // allow retry on failure
      throw err
    })
  }

  return inFlightRequest
}

async function fetchAndNormalize() {
  const response = await fetch(`${BASE_URL}/hotels/`)

  if (!response.ok) {
    throw new Error(`Failed to fetch hotels (status ${response.status})`)
  }

  const json = await response.json()

  if (!json || !Array.isArray(json.data)) {
    throw new Error('Unexpected response shape from hotels API')
  }

  // Normalize once at the boundary so the rest of the app can trust the shape.
  const normalized = json.data.map((hotel) => ({
    id: hotel.id,
    name: hotel.name ?? 'Untitled Hotel',
    price: Number(hotel.price) || 0,
    rating: Number(hotel.rating) || 0,
    location: hotel.location ?? 'Unknown',
    description: hotel.description ?? '',
    thumbnail: hotel.thumbnail ?? '',
    photos: Array.isArray(hotel.photos) ? hotel.photos : [],
  }))

  cachedHotels = normalized
  return normalized
}
