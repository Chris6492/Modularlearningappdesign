# LearnHub - Modular Learning App Design

## Overview
A React + TypeScript learning platform UI built with Vite, Tailwind CSS, and shadcn/ui components. This is a frontend-only application showcasing a course management and learning tracking interface.

## Tech Stack
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12 with @tailwindcss/vite plugin
- **UI Components**: shadcn/ui (Radix UI primitives), Material UI
- **Additional Libraries**: react-dnd, recharts, embla-carousel, react-hook-form, date-fns

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   ├── figma/       # Figma-exported components
│   │   ├── CourseCard.tsx
│   │   ├── LessonContent.tsx
│   │   ├── LessonItem.tsx
│   │   └── StatsCard.tsx
│   └── App.tsx          # Main application component
├── styles/
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx             # Application entry point
```

## Development
- **Dev Server**: `npm run dev` - Runs Vite dev server on port 5000
- **Build**: `npm run build` - Builds for production

## Configuration
- Vite configured with React and Tailwind plugins
- Path alias `@` maps to `./src` directory
- Dev server configured to allow all hosts for Replit compatibility

## Deployment
Static site deployment - build output goes to `dist/` directory
