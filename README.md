# Consortium Lab — Landing Page

Designing governance systems for the AI and crypto age.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** 
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static export will be generated in the `out/` directory.

## Structure

```
src/
  app/
    layout.tsx      # Root layout + metadata
    page.tsx        # Main landing page
    globals.css     # Tailwind + custom styles
  components/
    Navbar.tsx         # Fixed navigation
    Hero.tsx           # Hero section with logo
    Problem.tsx        # Problem statement + stats
    Solution.tsx       # Consortium concept + DAO OF THE APES
    Vision.tsx         # Vision for governance
    Founder.tsx        # Vlad's bio
    Footer.tsx         # Links + copyright
    ScrollReveal.tsx   # Scroll-triggered animations
    ConsortiumLogo.tsx # SVG constellation logo
    DaoLogo.tsx        # SVG DAO OF THE APES badge
```

## License

All rights reserved © Consortium Lab
