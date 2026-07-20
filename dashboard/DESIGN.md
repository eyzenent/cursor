# Nexus Dashboard — Design System

> Stitch-inspired dark mode API monitoring dashboard  
> Generated with Cursor Cloud Agent · July 2026

## Overview

Modern, dark-mode SaaS dashboard for monitoring API endpoints. Designed following Google Stitch design principles: clean typography, subtle gradients, glass-morphism cards, and emerald accent colors.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `surface` | `#0a0a0f` | Page background |
| `surface-raised` | `#111118` | Cards, sidebar |
| `surface-overlay` | `#1a1a24` | Hover states |
| `border` | `#27272f` | Borders, dividers |
| `accent` | `#34d399` | Primary actions, charts |
| `accent-muted` | `#10b981` | Gradients |

### Status Colors

| Status | Color | Badge |
|--------|-------|-------|
| Healthy | `#34d399` (emerald-400) | Green badge |
| Degraded | `#fbbf24` (amber-400) | Amber badge |
| Down | `#f87171` (red-400) | Red badge |

## Typography

- **Font Family:** Inter (Google Fonts)
- **Headings:** 600–700 weight, white (`#fafafa`)
- **Body:** 400 weight, zinc-300 (`#d4d4d8`)
- **Captions:** 400 weight, zinc-500 (`#71717a`)

## Layout

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (256px)  │  Header (sticky)                 │
│                  ├──────────────────────────────────┤
│  Logo            │  KPI Cards (4-col grid)            │
│  Navigation      │                                  │
│  User Profile    │  Chart (2/3)  │  Activity (1/3)  │
│                  │                                  │
│                  │  API Endpoints Table             │
└─────────────────────────────────────────────────────┘
```

## Components

### Sidebar
- Fixed left, 256px width
- Glass-morphism background with backdrop blur
- Active nav item: emerald accent with subtle glow
- User profile card at bottom

### KPI Cards
- 4 metric cards: Total APIs, Uptime, Avg Latency, Active Alerts
- Hover effect with expanding gradient orb
- Trend indicators (up/down)

### Latency Chart
- Recharts area chart with emerald gradient fill
- Period selector: 24h, 7d, 30d
- Custom dark tooltip

### API Table
- Status badges with pulse animation on healthy endpoints
- Monospace URL column
- Row hover with action menu

### Activity Feed
- Real-time event stream
- Color-coded by severity (success, warning, error, info)

## Spacing & Radius

- **Border radius:** 12px (cards), 8px (buttons), 16px (large cards)
- **Padding:** 24px (sections), 16px (cards), 12px (compact)
- **Gap:** 24px (sections), 16px (cards), 8px (inline)

## Stitch Integration

To regenerate or iterate with Google Stitch:

1. Visit [stitch.withgoogle.com](https://stitch.withgoogle.com)
2. Use this prompt:

```
Create a modern, dark mode web interface for monitoring API endpoints.
The layout should include a left sidebar with navigation, a top header
with an 'Add Endpoint' button. The main area should have four summary
cards (Total APIs, Uptime, Average Latency, Alerts), a line graph
showing latency, an activity feed, and a data table listing API name,
URL, and status badges (Working Well in green, Not Working in red).
Use Inter font, emerald accent color, and Tailwind CSS style.
```

3. Export HTML/React code and replace `src/` components

### MCP Setup (optional)

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "mcp-stitch"],
      "env": {
        "STITCH_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React

## Running Locally

```bash
cd dashboard
npm install
npm run dev
```

Open http://localhost:5173
