
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or# Pokédex-Lite

Welcome to Pokédex-Lite — a web app built for Pokémon fans who want a lightweight way to browse and hunt Pokémon data. This app uses data from the awesome PokeAPI and showcases it in a smooth, interactive interface built with modern front-end tooling. Your journey to becoming a PokéMaster starts here!

🔗 Live Preview: https://pokedex-phi-three-34.vercel.app/

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

* Next.js – React-based framework for building fast, dynamic user interfaces. Ideal for SEO-friendly apps with great developer experience.

* React – To build reusable UI components for displaying Pokémon lists and details.

* PokeAPI – A free RESTful API that provides Pokémon data like types, stats, and sprites.

* CSS/Tailwind – For basic styling and responsive layout.

* Vercel (deployment) – The app is deployed on Vercel for fast CDN-based delivery.

### Why These Technologies?

Using React + Next.js gives a huge advantage in building highly responsive pages, modular UI, and near-instant local reloads during development. PokeAPI provides detailed Pokémon metadata without needing your own database. The lightweight stack keeps the project simple, fast to spin up, and easy for contributors to understand.


## Challenges Faced & How They Were Solved

* Fetching consistent Pokémon data: PokeAPI has many endpoints and pagination limits.
* Fix: Standardized API calls using async functions and structured the app to fetch data only when needed rather than loading the whole Pokédex at once.

* Performance issues when loading many Pokémon at once: Rendering hundreds of cards can slow things down.
* Fix: Used React’s state wisely to only store data needed for display and avoid unnecessary re-renders. Component props were optimized and data fetching was limited via pagination.

* Responsive layout challenges: Ensuring the UI looked good on both desktop and mobile.
* Fix: Created container styles that flexibly adjusted to screen width and used CSS units like rem, vw, and grid layouts rather than pixel-fixed designs.

These small fixes kept the UI snappy and made sure Poké trainers on any device had a smooth experience.

## Author / Contact

Rahul Kumar
Email: mailrahul3201@gmail.com
Github: github.com/Rahulkr3201
Phone: +91 8002471239



bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Pokedex-Lite

This is we application for the Pokemon fans.

> > > > > > > 22c5ef7307f8800c3c0e1a21c5f3abdc70caf33a
