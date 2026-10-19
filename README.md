# HT Automotive – conceptwebsite

Salesconcept (Forever in Business) voor HT Automotive in Naaldwijk. Eén pagina, gebouwd met Next.js (App Router), TypeScript en Tailwind CSS. Geen backend, geen database, geen tracking.

## Lokaal draaien

```bash
npm install
npm run dev
```

Open daarna http://localhost:3000.

## Productiebuild

```bash
npm run build
npm start
```

## Nog in te vullen

- Openingstijden: `OPENING_HOURS` in `app/page.tsx` (TODO).
- Foto's van de werkplaats: zie het commentaar bovenaan `app/page.tsx`.

## Deploy

Koppel de GitHub-repo eenmalig in Vercel; daarna deployt elke push automatisch.
