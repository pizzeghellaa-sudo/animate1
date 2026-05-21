# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Mioni Royal San** — luxury hotel & thermal spa landing page with integrated booking system. Originally scaffolded from Google AI Studio; includes server-side Gemini API integration.

## Commands

```bash
npm run dev       # Start dev server on port 3000 (HMR enabled, host 0.0.0.0)
npm run build     # Production Vite build → dist/
npm run preview   # Serve production build locally
npm run lint      # TypeScript type-check only (tsc --noEmit) — no emit, no test runner
npm run clean     # Remove dist/ and server.js
```

No test framework is configured.

## Environment

Requires a `.env` file (see `.env.example`):
- `GEMINI_API_KEY` — Google Gemini API key for server-side AI features
- `APP_URL` — injected at runtime on Cloud Run deployments

Set `DISABLE_HMR=true` to disable hot module replacement (useful in CI/CD or Cloud Run).

## Architecture

**Stack:** React 19 + TypeScript 5.8, Vite 6, Tailwind CSS 4 (Vite plugin), Motion (animation), Express.js backend, Google Gemini API (`@google/genai`).

The app is a single-page application. `src/App.tsx` owns global modal state (`bookingModalOpen`, `spaMenuOpen`, `selectedRoom`) and composes all section components in a fixed editorial order.

**Data layer:** All static content (rooms, restaurants, spa treatments) lives in `src/data.ts` as typed arrays. TypeScript interfaces are in `src/types.ts` (`Room`, `Restaurant`, `Treatment`, `BookingState`).

**Key interactive flows:**
- **Booking modal** (`BookingModal.tsx`, 613 lines) — 3-step form: room + dates → add wellness treatments → personal details. State flows down from `App.tsx` via props.
- **Spa menu modal** (`SpaMenuModal.tsx`) — browse/select treatments; feeds into the booking flow.

**Styling:** Tailwind CSS 4 with Material Design 3 color tokens defined as CSS variables in `index.html`. Fonts are Bodoni Moda (serif headings) and Montserrat (sans-serif body). The design palette is dark/luxury; avoid adding light-mode assumptions.

**Backend:** Express.js server entry point (compiled via esbuild to `server.js`). Gemini API calls are server-side only.
