# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TerminalSnap is a terminal screenshot beautifier built with Next.js - a fully client-side web application that creates beautiful terminal screenshots for documentation, blogs, and presentations. Similar to carbon.now.sh but specifically for terminal/CLI screenshots. This project is designed to be open source.

## Development Commands

```bash
# Install dependencies
yarn install

# Run development server (http://localhost:3000)
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: Yarn (not npm)
- **Styling**: Tailwind CSS with custom CSS (pure React components)
- **Design System**: Glassmorphic dark theme with floating labels and cyan/blue accents
- **ANSI Parsing**: ansi-to-react for terminal color codes
- **Export**: html-to-image for PNG generation
- **Deployment**: Vercel (optimized for zero-config deployment)
- **Linting**: ESLint/Prettier with Next.js defaults

## Architecture & Code Organization

### State Management Pattern

The application uses a centralized state management pattern in `src/app/page.tsx`:
- All terminal settings (theme, background, OS chrome, shell type, text content) are managed in a single `TerminalSettings` state object
- Individual handler functions update specific parts of the settings
- State flows down to child components via props
- Components are purely presentational and receive onChange callbacks
- No external state management library (Redux, Zustand, etc.)

### Type System

All types are centralized in `src/types/index.ts`:
- `TerminalTheme`: Defines terminal color schemes (background, foreground, ANSI palette)
- `ANSIColorPalette`: 16-color palette (8 standard + 8 bright variants)
- `BackgroundPreset`: Defines preview backgrounds (gradients, solid colors)
- `TerminalSettings`: Main state object combining all customization options
- `OSChrome`: Window decoration styles ("macos" | "windows" | "linux" | "none")
- `ShellType`: Shell syntax detection ("bash" | "zsh" | "powershell" | "auto")

### Theme System

Themes are defined in `src/lib/themes.ts`:
- 7 predefined terminal themes:
  - **Dark**: Dracula (default), Nord, One Dark, Gruvbox Dark, Tokyo Night
  - **Light**: Solarized Light, GitHub Light
- Each theme includes:
  - Background and foreground colors
  - Complete 16-color ANSI palette (black, red, green, yellow, blue, magenta, cyan, white + bright variants)
- Themes are imported as a static array and selected by name
- Use `getThemeByName()` helper to safely retrieve themes with fallback to Dracula

### Background System

Backgrounds are defined in `src/lib/backgrounds.ts`:
- 10 preset options including gradients and solid colors
- Each preset has: id, name, CSS value (gradient or color), and preview color
- Background CSS is applied directly to the preview container's style prop
- Backgrounds are designed to work well with both light and dark terminal themes
- Use `getBackgroundById()` helper for safe retrieval with fallback

### Component Architecture

All components are functional React components using TypeScript:
- **Functional components only** - No class components
- **Client Components**: Main page and all interactive components use `"use client"` directive (required for hooks and interactivity)
- **Presentation Layer**: Components in `src/components/` handle UI and user input
- **UI Primitives**: Custom glassmorphic components in `src/components/ui/`:
  - `FloatingInput`, `FloatingTextarea`, `FloatingSelect` - Inputs with animated floating labels
  - `ModernCheckbox`, `ModernRadio`, `ModernSlider` - Glassmorphic form controls
  - `ModernButton` - Button with variants (primary, secondary, outline)
  - `GlassCard` - Glassmorphic card container with header/content/footer
- **Utilities**: `src/lib/` contains pure functions for parsing, export, and configuration

### Design System: Glassmorphic Dark Theme

The application uses a custom glassmorphic dark theme design:

**Background:**
- Deep dark blue base (#050816)
- Animated mesh gradient with 4 blurred color blobs (cyan, blue, purple)
- Blobs use radial gradients with 90-120px blur and slow floating animations (20-30s duration)

**Color Palette:**
- Primary accent: Cyan (#06b6d4)
- Secondary accent: Blue (#3b82f6)
- Tertiary accent: Purple (#6366f1)
- Text: Light gray (#e5e7eb)
- Borders: Cyan with transparency (rgba(6, 182, 212, 0.3))

**Glassmorphic Properties:**
- Semi-transparent backgrounds (5-15% opacity)
- Backdrop blur (8-20px)
- Subtle cyan borders
- Soft dark shadows for depth
- Hover states with enhanced glow

**Floating Labels:**
- Labels animate from inside input to above on focus/content
- Position-based animation (top property change)
- Smaller font size when floated (0.75rem)
- Cyan color when active
- Transparent background (no dark overlay)

### ANSI Parsing

ANSI color code handling in `src/lib/ansi-parser.ts`:
- Uses `ansi-to-react` library to convert ANSI escape sequences to React elements
- Supports standard 16-color palette
- Handles bold, italic, underline, reset codes
- Wrapper function applies theme foreground color to parsed content
- Returns React elements that can be directly rendered

### Shell Type Auto-Detection

Shell type detection patterns (currently in ShellTypeSelector, can be implemented):
- `$` or `#` prompts → bash/zsh
- `>` prompt → PowerShell
- Common commands detected: npm, git, cd, ls, etc.
- Manual override available via dropdown selector
- Default: "auto" mode

### Export Functionality

PNG export logic in `src/lib/export.ts`:
- Uses `html-to-image` library's `toPng` function
- Exports at 2x pixel ratio for high quality (Retina-ready)
- Quality set to 1.0 (maximum)
- White background applied to exported image
- Creates a download link programmatically and triggers it
- Takes a ref to the preview DOM element
- Default filename: "terminal-snap.png"

### OS Chrome Rendering

Window decorations are rendered in `TerminalPreview.tsx`:
- `renderOSChrome()` function returns different button layouts per OS
- **macOS**: Traffic light buttons (red/yellow/green) on left with title centered-left
- **Windows**: Title on left, minimize/maximize/close buttons on right
- **Linux**: Title on left, three circular buttons on right (Ubuntu-style)
- **None**: No title bar (minimal mode)
- All chrome includes customizable window title

## Key Implementation Details

### Path Aliases

TypeScript is configured with `@/*` alias pointing to `./src/*`:
- Always use `@/components/...`, `@/lib/...`, `@/types` for imports
- Never use relative paths like `../../../`
- Configured in tsconfig.json paths

### Styling Approach

- Tailwind CSS for utility classes
- Custom CSS in `globals.css` for glassmorphic components (floating labels, buttons, checkboxes, etc.)
- `cn()` utility from `lib/utils.ts` for className merging (uses clsx + tailwind-merge)
- Inline styles used only for dynamic values (theme colors, terminal backgrounds)
- All form components use CSS classes defined in globals.css (e.g., `.floating-input`, `.modern-checkbox-input`)
- Responsive design: Desktop-first, mobile support is nice-to-have but not critical for v1
- Dark theme enforced via `className="dark"` on HTML element in layout.tsx

### Real-time Preview

The preview updates on every state change:
- `TerminalPreview` component receives `settings` prop
- `useEffect` hook re-parses ANSI content when text or theme changes
- Preview container uses a React ref for export functionality
- No debouncing implemented (instant updates for better UX)

### Default State

Initial application state (defined in `page.tsx`):
- **Theme**: Dracula
- **Background**: Purple gradient
- **OS Chrome**: macOS
- **Shell Type**: Auto-detect
- **Window Title**: "Terminal"
- **Default terminal output**: Multi-line example demonstrating git workflow (npm install, git status, git commit, git push)

### Two-Panel Layout

The UI uses a responsive grid layout:
- **Left Panel (Controls)**: GlassCard containing all customization controls
  - Orientation selector (radio buttons)
  - Padding sliders (horizontal/vertical)
  - Terminal output textarea (floating label)
  - Theme selector dropdown (floating label)
  - Background selector (floating label)
  - Drop shadow toggle (checkbox)
  - OS chrome selector (floating label dropdown)
  - Window title input (floating label, conditional)
  - Shell type selector (floating label dropdown)
  - Export button (gradient with glow effect)
- **Right Panel (Preview)**: Live preview of the styled terminal window
  - Updates in real-time as settings change
  - Shows actual export appearance

## Code Style & Standards

### Component Patterns

- Use functional components with TypeScript
- Props interfaces defined inline or in types file
- No default exports for components (except page.tsx and layout.tsx)
- Event handlers prefixed with `handle` (e.g., `handleTextChange`, `handleThemeChange`)
- Use named exports for components

### File Naming

- Components: PascalCase (e.g., `TerminalPreview.tsx`, `TextInput.tsx`)
- Utilities/libs: kebab-case (e.g., `ansi-parser.ts`, `syntax-highlighter.ts`)
- Types: `index.ts` for centralized type exports

### Import Order

1. React/Next.js imports
2. Third-party libraries
3. Local components (using `@/` alias)
4. Utilities/lib functions
5. Types (using `type` keyword for type-only imports)

### Accessibility

- Use proper semantic HTML
- Include keyboard navigation support
- Add ARIA labels where appropriate
- Ensure color contrast meets standards

## Future Features (Nice-to-Have)

These features are planned for future iterations but not in current MVP:
- Window padding/sizing controls
- Font family selection
- Shadow and border customization
- Copy as HTML/SVG export options
- Save/load preset configurations
- Animated GIF export for command sequences
- URL sharing with encoded settings

## Important Notes

- This is a **fully client-side** application - no server-side logic, API routes, or backend
- All functionality runs in the browser
- Export quality is set to maximum (pixelRatio: 2, quality: 1.0)
- The application is designed to be open source with clean, maintainable code
- Vercel deployment is optimized (Next.js auto-detected, zero configuration)
- No external state management libraries needed - React state is sufficient
- Performance: Preview updates should be fast (no debouncing currently needed)
