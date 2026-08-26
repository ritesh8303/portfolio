# Ritesh Jadhav — Live 3D Portfolio

Interactive portfolio for **Ritesh Rakesh Jadhav**: M.Sc. Data Science in Berlin, AWS pipelines, and data quality.

The scene is a live Three.js constellation. Telemetry pulls **real DataForge metrics** from the production API in `eu-central-1`, plus public GitHub events and Berlin local time.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Stack

- React 19 + Vite
- Three.js via React Three Fiber
- Framer Motion
- Live DataForge Metrics API
- GitHub public events

## Deploy

Push to GitHub and enable GitHub Pages from the `dist` output, or any static host. `base` is `./` so the site works at the domain root or in a subdirectory.
