# Stayscape — Hotel Explorer

A clean, interactive React app for browsing hotels across India, built on top of the
[Demo Hotels API](https://demohotelsapi.pythonanywhere.com/hotels/).

## Features

- **Search** hotels by name or city
- **Filter** by city (chips generated live from the API data), minimum rating, and max price
- **Sort** by price (low→high / high→low) or rating
- **Pagination** across the full 500-hotel dataset (12 per page)
- **Hotel details page** with a photo gallery/carousel, description, and highlight tags
  extracted from the hotel's description
- **Favorites** — save hotels with a heart icon; persisted in `localStorage`
- **Mock booking flow** — pick dates and guest count, see a live price total, and confirm
  (no real payment/booking, since the API doesn't expose one — this is a learning project)
- **Dark mode** toggle
- Loading skeletons, empty states, and error states throughout
- Fully responsive, from mobile to desktop
- Accessible: visible keyboard focus, ARIA labels, `prefers-reduced-motion` respected

## Tech stack

- **React 18** (function components + hooks)
- **React Router 6** for client-side routing
- **Tailwind CSS** for styling, with a custom design system (colors, type scale) in
  `tailwind.config.js`
- **Vite** as the build tool
- Plain `fetch` for API calls — no extra HTTP library needed

## Project structure

```
hotel-explorer/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Routes
    ├── index.css             # Tailwind + base styles
    ├── api/
    │   └── hotelsApi.js      # Fetches + normalizes + caches hotel data
    ├── context/
    │   └── FavoritesContext.jsx
    ├── hooks/
    │   ├── useHotels.js      # List page: filter/sort/paginate logic
    │   └── useHotel.js       # Details page: find one hotel by id
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── CityChips.jsx
    │   ├── FilterBar.jsx
    │   ├── HotelCard.jsx
    │   ├── HotelGrid.jsx
    │   ├── Pagination.jsx
    │   ├── PhotoGallery.jsx
    │   ├── BookingModal.jsx
    │   ├── RatingStars.jsx
    │   ├── Loader.jsx
    │   ├── EmptyState.jsx
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── HotelDetails.jsx
    │   ├── Favorites.jsx
    │   └── NotFound.jsx
    └── utils/
        └── formatters.js     # Price/rating formatting + description parsing
```

## Getting started

Requires [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed local URL (usually http://localhost:5173)
```

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

## A note on the API

The API's documentation describes query params for filtering, sorting, and pagination
(`?location=`, `?min_price=`, `?order_by=`, etc.), but the deployed instance ignores them
and always returns the full 500-hotel dataset. To keep the app reliable regardless of that,
all searching, filtering, sorting, and pagination happen **client-side** in
`src/hooks/useHotels.js`, after a single fetch that's cached for the session
(`src/api/hotelsApi.js`).

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Stayscape hotel explorer"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

(`node_modules/` and `dist/` are already excluded via `.gitignore`.)
