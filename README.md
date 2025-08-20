# AdminFlow - Modern Futuristic Dashboard

A sleek, modern admin dashboard built with Next.js 15, React 19, Tailwind CSS v4, shadcn/ui, RTK Query, i18next, Framer
Motion, and Sonner toasts. Features a futuristic, light-first design system with electric blue gradients and glass
effects.

## Features

- Next.js 15 (App Router) + React 19
- TypeScript-first, Turbopack dev/build
- Tailwind CSS v4 (configless via @tailwindcss/postcss)
- shadcn/ui component library
- Redux Toolkit Query (RTK Query) for API data
- i18n with i18next + react-i18next (en/id)
- Sonner for toasts, themed via next-themes
- Framer Motion micro-animations
- Light theme only (no dark mode)

## Tech Stack

- Framework: Next.js 15, React 19
- Styling: Tailwind v4, CSS variables, DM Sans
- UI: shadcn/ui, lucide-react
- State/Data: RTK Query (@reduxjs/toolkit)
- i18n: i18next + react-i18next
- Feedback: Sonner
- Animations: framer-motion

## Quick Start

1. Install

   ```bash
   npm install
   ```

2. Run Dev (Turbopack)

   ```bash
   npm run dev
   ```

3. Build / Start

   ```bash
   npm run build
   npm start
   ```

4. Open

    - App: http://localhost:3000
    - Login: http://localhost:3000/login
    - Admin: http://localhost:3000/admin

## Demo Login

Use these credentials on the Login page:

- Email: `test@example.com`
- Password: `password123`

On submit, a 3s simulated delay shows button and toast loading states, then redirects to the dashboard.

## Environment

- API base URL (optional): `NEXT_PUBLIC_API_URL` (default: http://localhost:8080)

Configured in `src/lib/api.ts` via `fetchBaseQuery` with `credentials: "include"`.

## Project Structure (high-level)

```
src/
  app/
    layout.tsx         # Root layout + providers + toaster
    globals.css        # Tailwind v4 + theme tokens + utilities
    login/page.tsx     # Light-themed animated login
    admin/page.tsx     # Admin shell (Header + Sidebar + content)
    admin/components/  # Dashboard widgets (KPIs, charts, etc.)
  components/
    layout/            # Header, Sidebar
    ui/                # shadcn/ui components + Sonner toaster
    providers/         # Global loading provider
    providers.tsx      # Redux store + loading provider + i18n init
  features/
    auth/              # RTK Query endpoints, schemas, types
  lib/
    api.ts             # RTK Query baseApi
    i18n.ts            # i18next setup + ensureI18n()
    store.ts           # Redux store
    utils.ts           # Helpers
  locales/
    en/common.json
    id/common.json
```

## i18n

- i18next is initialized on the client via `ensureI18n()` in `src/lib/i18n.ts`.
- Language persists in `localStorage` and syncs `<html lang>`. Supported: `en`, `id`.
- Switch language from the Header globe dropdown.
- To add strings: edit `src/locales/{en,id}/common.json` and access with `useTranslation()`.

## Theming

- Light mode only. CSS variables are defined in `globals.css` under `:root`.
- Gradient tokens:
    - `--gradient-from: #00c6ff`
    - `--gradient-to: #0072ff`
    - Utility: `.bg-gradient-primary { background: var(--gradient-primary) }`
- Custom button gradient utilities are also defined in `globals.css`.

## Toasts (Sonner)

- Sonner is already wired with theme support in `src/components/ui/sonner.tsx`.
- Global Toaster is mounted in `app/layout.tsx`.
- Usage example:

  ```ts
  import { toast } from "sonner";

  toast.success("Saved", { description: "Your changes have been stored." });
  ```

## Auth Model (frontend-only)

- RTK Query endpoints are scaffolded in `features/auth/api.ts` (`/auth/login`, `/auth/me`).
- Demo flow uses client-side delay + redirect; replace with real API as needed.

## Scripts

- `npm run dev` – Start dev server (Turbopack)
- `npm run build` – Build (Turbopack)
- `npm start` – Start production server
- `npm run format` – Prettier format

## Notes

- Sidebar collapse is instant (no animation); submenu dropdowns animate.
- Login page is fully light-themed; no dark variants are applied.
- i18n must be initialized before using `useTranslation()` in client components.

## Next Steps (optional)

- Hook real auth (token storage, interceptors) to `baseApi`.
- Add role-based routes/guards.
- Add tests (Jest + React Testing Library) for critical flows.

---

Built with care for performance, UX, and maintainability.
