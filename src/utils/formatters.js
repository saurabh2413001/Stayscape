/** Formats a number as Indian Rupees, e.g. 8531.24 -> "₹8,531". */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Formats a rating to one decimal place, e.g. 4 -> "4.0". */
export function formatRating(value) {
  return Number(value).toFixed(1)
}

/**
 * Pulls a short list of "highlight" tags out of the hotel's generated
 * description, e.g. "with a rooftop pool" -> "Rooftop pool".
 * This keeps the UI data-driven instead of inventing fake amenities.
 */
export function extractHighlights(description = '') {
  const highlights = []

  const offerMatch = description.match(
    /(?:it offers|offering|with|near|in|ideal for|perfect for)\s+([a-z0-9\s-]+?)(?:\s+and provides|\.|,)/i,
  )
  if (offerMatch?.[1]) {
    highlights.push(capitalize(offerMatch[1].trim()))
  }

  const wantMatch = description.match(/who want to\s+([a-z0-9\s-]+?)\./i)
  if (wantMatch?.[1]) {
    highlights.push(capitalize(wantMatch[1].trim()))
  }

  const adjectiveMatch = description.match(/this\s+([a-z]+)\s+hotel/i)
  if (adjectiveMatch?.[1]) {
    highlights.unshift(capitalize(adjectiveMatch[1].trim()))
  }

  // De-duplicate while preserving order
  return [...new Set(highlights)].slice(0, 3)
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
