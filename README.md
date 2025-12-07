# Pokédex-Lite

Welcome to Pokédex-Lite — a web app built for Pokémon fans who want a lightweight way to browse and hunt Pokémon data. This app uses data from the awesome PokeAPI and showcases it in a smooth, interactive interface built with modern front-end tooling. Your journey to becoming a PokéMaster starts here!

🔗 Live Preview: https://pokedex-phi-three-34.vercel.app/

## Project Structure

Basic structure:

```
pokedex-lite/
├── .git/
├── .next/
├── node_modules/
├── public/
├── src/
│   └── app/
│       ├── animation/
│       ├── api/
│       │   └── auth/
│       │       └── [...nextauth]/
│       ├── components/
│       │   ├── favorites/
│       │   ├── layout/
│       │   ├── pokemon/
│       │   └── ui/
│       ├── context/
│       │   └── FavoritesContext.js
│       ├── favorites/
│       │   └── page.js
│       ├── hooks/
│       │   ├── useDebounce.js
│       │   ├── useFavorites.js
│       │   └── usePokemon.js
│       ├── lib/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.js
│       ├── page.js
│       └── Providers.js
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
└── package.json

```

## Getting Started

These steps will help you run the project on your local system.

Prerequisites

Make sure you have the following installed:

✅ Node.js (v14 or above recommended)

✅ npm (comes bundled with Node.js)

## Installation & Running

1. Clone the repository:

```
git clone https://github.com/Rahulkr3201/Pokedex-.git
cd Pokedex
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

4. Open your browser and visit:

```
http://localhost:3000
```

## Tech Stack

This project uses:

### Frontend & Framework

- Next.js / React – React-based framework for building fast, scalable UI with server-side rendering and routing.

- React – For creating reusable UI components and efficiently rendering Pokémon data.

### Styling & UI

- Tailwind CSS – Utility-first CSS framework for rapid UI development and responsive layouts.

- Framer Motion – For smooth, modern animations and transitions throughout the app.

- React Icons – Icon library used to enhance UI elements.

### APIs & Authentication

- PokeAPI – RESTful API used to fetch Pokémon data (types, stats, sprites, abilities).

- NextAuth.js – Authentication library for secure user login (Google/GitHub providers etc.).

### Tools & Deployment

- GitHub – Version control and project collaboration.

- Vercel – Hosting platform optimized for Next.js, providing fast global CDN delivery.

**Why These Technologies?**

This stack offers the perfect balance of speed, simplicity, and power. Next.js and React provide a fast, modular foundation for building dynamic UI, while Tailwind keeps styling efficient and consistent. Framer Motion adds smooth animations, and NextAuth enables secure authentication with minimal setup. PokeAPI eliminates the need for a custom backend, and GitHub ensures easy version control. Together, these tools create a lightweight, scalable Pokedex that’s both easy to develop and enjoyable to use.

## Challenges Faced & How They Were Solved

- Fetching consistent Pokémon data: PokeAPI has many endpoints and pagination limits.
- Fix: Standardized API calls using async functions and structured the app to fetch data only when needed rather than loading the whole Pokédex at once.

- Performance issues when loading many Pokémon at once: Rendering hundreds of cards can slow things down.
- Fix: Used React’s state wisely to only store data needed for display and avoid unnecessary re-renders. Component props were optimized and data fetching was limited via pagination.

- Responsive layout challenges: Ensuring the UI looked good on both desktop and mobile.
- Fix: Created container styles that flexibly adjusted to screen width and used CSS units like rem, vw, and grid layouts rather than pixel-fixed designs.

These small fixes kept the UI snappy and made sure Poké trainers on any device had a smooth experience.

## Author / Contact

Rahul Kumar
Email: mailrahul3201@gmail.com  
Github: github.com/Rahulkr3201  
Phone: +91 8002471239
