# HaemoEat — Project Structure & Engineering Practices

## Folder Structure

```
haemofoods/
├── public/                     # Static assets served as-is
│   └── favicon.svg
│
├── src/
│   ├── main.jsx                # App entry point — mounts <App /> to DOM
│   ├── App.jsx                 # Root component — layout + router setup
│   ├── index.css               # Tailwind import + global styles
│   │
│   ├── components/             # Reusable UI building blocks
│   │   ├── ui/                 # Generic (not app-specific)
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   └── food/               # Domain-specific components
│   │       ├── FoodCard.jsx
│   │       ├── SafetyBadge.jsx
│   │       ├── NutrientBreakdown.jsx
│   │       └── FoodList.jsx
│   │
│   ├── pages/                  # One file per route
│   │   ├── HomePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── FoodDetailPage.jsx
│   │   └── AboutPage.jsx
│   │
│   ├── layouts/                # Page wrappers (navbar, footer, etc.)
│   │   └── MainLayout.jsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useSearch.js        # Search logic + API call
│   │   └── useDebounce.js      # Debounce input (for search)
│   │
│   ├── services/               # External API calls (no UI logic)
│   │   └── openFoodFacts.js    # All Open Food Facts API functions
│   │
│   ├── utils/                  # Pure helper functions
│   │   ├── scoring.js          # Traffic light scoring logic
│   │   └── formatting.js       # Format numbers, units, etc.
│   │
│   ├── constants/              # App-wide constants
│   │   └── thresholds.js       # Iron thresholds, category fallbacks
│   │
│   └── __tests__/              # All test files (mirrors src structure)
│       ├── utils/
│       │   └── scoring.test.js
│       ├── services/
│       │   └── openFoodFacts.test.js
│       ├── hooks/
│       │   └── useSearch.test.js
│       └── components/
│           └── SafetyBadge.test.jsx
│
├── SPEC.md                     # App specification (your spec doc)
├── README.md                   # Project overview + setup instructions
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Why This Structure?

### Separation of concerns

Every folder has one job:

| Folder       | Contains                        | Rule                                                    |
| ------------ | ------------------------------- | ------------------------------------------------------- |
| `components/ui/`   | Generic buttons, cards, badges  | No business logic. Reusable anywhere.                   |
| `components/food/` | Food-specific UI components     | Knows about food data shape but not where data comes from. |
| `pages/`     | Full page components            | Composes components + hooks. One per route.              |
| `layouts/`   | Navbar, footer, page wrappers   | Structural only. No business logic.                      |
| `hooks/`     | Custom React hooks              | Stateful logic extracted from components.                |
| `services/`  | API calls                       | Pure fetch functions. No React, no state, no UI.         |
| `utils/`     | Pure functions                  | No side effects. Easiest to test.                        |
| `constants/` | Config values                   | Thresholds, category maps, static data.                  |
| `__tests__/` | All tests                       | Mirrors `src/` structure for easy navigation.            |

### The key rule

**Data flows down, events flow up.**

```
Page (gets data via hook)
  → passes data as props to Component
    → Component calls onEvent callback prop
      → Page handles the event
```

This is the React equivalent of Vue's props-down, emits-up pattern you already know.

---

## TDD Workflow

### Setup — install testing tools

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
  },
})
```

Create `src/test-setup.js`:

```js
import '@testing-library/jest-dom'
```

Add a test script to `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:run": "vitest run"
}
```

### The TDD cycle

For every piece of logic you build:

```
1. Write a failing test        (RED)
2. Write minimal code to pass  (GREEN)
3. Clean up the code           (REFACTOR)
4. Repeat
```

### What to test and where

| Layer        | What to test                              | Example                                      |
| ------------ | ----------------------------------------- | -------------------------------------------- |
| `utils/`     | Pure logic — easiest, test first          | `scoring.js` — does iron=5mg return "Avoid"? |
| `services/`  | API calls — mock fetch, test parsing      | Does it handle missing iron data gracefully?  |
| `hooks/`     | Stateful logic — test with renderHook     | Does useSearch debounce and return results?   |
| `components/`| Rendering — does the right thing show up? | Does SafetyBadge show red for "Avoid"?        |

### Example — TDD for the scoring function

**Step 1: Write the test first** (`src/__tests__/utils/scoring.test.js`):

```js
import { describe, it, expect } from 'vitest'
import { getIronRating } from '../../utils/scoring'

describe('getIronRating', () => {
  it('returns "safe" for iron below 1.5mg per 100g', () => {
    expect(getIronRating(0.5)).toBe('safe')
    expect(getIronRating(1.4)).toBe('safe')
  })

  it('returns "moderate" for iron between 1.5 and 3.5mg', () => {
    expect(getIronRating(1.5)).toBe('moderate')
    expect(getIronRating(2.8)).toBe('moderate')
  })

  it('returns "avoid" for iron above 3.5mg', () => {
    expect(getIronRating(3.6)).toBe('avoid')
    expect(getIronRating(12)).toBe('avoid')
  })

  it('returns "unknown" when iron data is null or undefined', () => {
    expect(getIronRating(null)).toBe('unknown')
    expect(getIronRating(undefined)).toBe('unknown')
  })
})
```

**Step 2: Run it — it fails** (RED):

```bash
npm test
```

**Step 3: Write the minimal code** (`src/utils/scoring.js`):

```js
export function getIronRating(ironPer100g) {
  if (ironPer100g == null) return 'unknown'
  if (ironPer100g > 3.5) return 'avoid'
  if (ironPer100g >= 1.5) return 'moderate'
  return 'safe'
}
```

**Step 4: Run it — it passes** (GREEN). Refactor if needed, then move on.

---

## Git Practices

### Branch strategy

```
main              ← always deployable
  └── dev         ← integration branch
       ├── feat/search-bar
       ├── feat/scoring-logic
       ├── feat/about-page
       └── fix/missing-iron-fallback
```

### Commit message format

```
feat: add food search with Open Food Facts API
fix: handle missing iron data in scoring
test: add scoring edge case tests
style: update FoodCard spacing
docs: add setup instructions to README
```

---

## Next Steps

1. Create the folder structure (empty files are fine)
2. Install testing tools and verify a test runs
3. Write + pass the scoring tests (your first TDD cycle)
4. Build the layout and routing
