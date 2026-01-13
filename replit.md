# LearnHub - Learning Platform

## Overview
LearnHub is a React-based learning management system built with Vite, TypeScript, and Tailwind CSS. It provides an interface for tracking learning progress, browsing courses, and viewing lessons.

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.x with @tailwindcss/vite plugin
- **UI Components**: Radix UI primitives + shadcn/ui
- **Icons**: Lucide React, MUI Icons
- **Charts**: Recharts

### Directory Structure
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
