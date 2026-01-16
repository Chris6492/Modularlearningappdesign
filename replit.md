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
│   │   ├── figma/        # Figma-exported components
│   │   ├── ui/           # UI primitives (shadcn/ui style)
│   │   ├── CourseCard.tsx
│   │   ├── LessonContent.tsx
│   │   ├── LessonItem.tsx
│   │   └── StatsCard.tsx
│   └── App.tsx           # Main application component
├── styles/
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx              # Application entry point
```

### Key Files
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `index.html` - HTML entry point
- `package.json` - Dependencies and scripts

## Development

### Running Locally
The application runs on port 5000 with the command:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Recent Changes
- Initial import and Replit environment setup
- Configured Vite for Replit proxy compatibility (allowedHosts: true)
- Added TypeScript configuration (tsconfig.json, tsconfig.node.json)
- Installed React and React-DOM as regular dependencies

## User Preferences
- None documented yet
