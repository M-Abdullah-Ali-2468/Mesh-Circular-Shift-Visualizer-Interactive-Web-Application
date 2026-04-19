# Mesh Circular Shift Visualizer

Interactive full-stack style web application for visualizing circular q-shift on a 2D mesh topology.

## Live Deployment URL

Add your public URL after deployment:

`https://your-deployment-url.example.com`

## Features

- Input controls for p and q with validation:
- p in range 4 to 64
- p must be a perfect square
- q in range 1 to p - 1
- Mesh grid visualization for sqrt(p) x sqrt(p)
- Step-by-step animation:
- Stage 1 row shift by q mod sqrt(p)
- Stage 2 column shift by floor(q / sqrt(p))
- Before/After state panels:
- Before shift
- After Stage 1
- Final state after Stage 2
- Real-time complexity panel with formulas and comparison bars:
- Ring steps = min(q, p - q)
- Mesh steps = (q mod sqrt(p)) + floor(q / sqrt(p))

## Tech Stack

- React (Vite)
- Plain CSS for UI and animation

## Repository Structure

```
mesh-shift-visualizer/
├── public/
├── src/
│   ├── components/
│   │   ├── MeshGrid.jsx
│   │   ├── ControlPanel.jsx
│   │   └── ComplexityPanel.jsx
│   ├── utils/
│   │   └── shiftLogic.js
│   ├── App.jsx
│   └── index.js
├── README.md
└── package.json
```

## Local Setup

1. Clone the repository
2. Install dependencies
3. Run development server

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment Guide (Vercel)

1. Push this project to a public GitHub repository.
2. Go to Vercel dashboard and click New Project.
3. Import the GitHub repository.
4. Keep framework preset as Vite.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy and copy generated public URL.
8. Paste the URL in the Live Deployment URL section above.

## Example Validation Scenarios

- p = 16, q = 5
- mesh size = 4
- row shift = 5 mod 4 = 1
- column shift = floor(5 / 4) = 1
- mesh steps = 1 + 1 = 2
- ring steps = min(5, 16 - 5) = 5

## Commit History Guidance

Use meaningful incremental commits instead of one bulk commit. Suggested commit sequence:

1. Project scaffold and dependencies
2. Implement shift algorithm utility
3. Build ControlPanel and validation
4. Build MeshGrid and stage animation
5. Add ComplexityPanel and chart
6. Polish styles and responsive layout
7. Update README and deployment URL