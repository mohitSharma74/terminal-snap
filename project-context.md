# TerminalSnap - Terminal Screenshot Beautifier

Build a web application similar to [carbon.now.sh](http://carbon.now.sh/) but specifically for terminal/CLI screenshots. This is a fully client-side Next.js application. It’ll be open source so follow all the standards and guidelines so that I can make it open source.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Package Manager**: yarn
- **Styling**: Tailwind CSS + shadcn/ui components
- **Deployment Target**: Vercel

## Project Structure

- Simple single package with `src/` directory structure
- Standard ESLint/Prettier configs (Next.js defaults)
- Functional React components only

## Core Features for MVP

### 1. Text Input

- Large textarea where users can paste terminal output
- Should handle ANSI color codes in the pasted text
- Placeholder text showing example terminal output
- User should be able to preview the final result in real time

### 2. Terminal Themes (7 total)

**Dark Themes:**

- Dracula
- Nord
- One Dark
- Gruvbox Dark
- Tokyo Night

**Light Themes:**

- Solarized Light
- GitHub Light

Each theme should define:

- Background color
- Foreground (text) color
- ANSI color palette (black, red, green, yellow, blue, magenta, cyan, white + bright variants)

### 3. Background Customization

- 5-10 preset background options (solid colors and gradients)
- Users can select from a dropdown/picker
- Backgrounds should work well with both light and dark terminal themes

### 4. OS Window Chrome Toggle

Users can switch between different OS-style window decorations:

- **macOS**: Colored traffic light buttons (red, yellow, green) on left
- **Windows**: Minimize, maximize, close buttons on right
- **Linux**: Typical Ubuntu-style buttons
- Option for minimal/no chrome

Each style should have appropriate title bar with optional custom title text.

### 5. ANSI Color Code Support

- Parse and render ANSI escape sequences correctly
- Support standard 16-color palette
- Handle bold, italic, underline, reset codes
- **Recommended library**: `ansi-to-html` or `ansi-to-react`

### 6. Syntax Highlighting

- Auto-detect shell type based on prompt patterns:
    - `$` or `#` → bash/zsh
    - `>` → PowerShell
    - Common commands (npm, git, cd, ls, etc.)
- Apply appropriate syntax highlighting on top of ANSI colors
- Include manual override dropdown for shell type selection
- **Recommended library**: `shiki` or `prism-react-renderer`

### 7. Preview Canvas

- Real-time preview of the styled terminal window
- Shows all selected customizations (theme, background, OS chrome)
- Should look like an actual terminal window with the user's content rendered inside

### 8. PNG Export

- "Export as PNG" button
- Downloads the preview canvas as a PNG image
- **Recommended library**: `html-to-image` or `dom-to-image`
- Ensure high resolution/quality for the export

## UI/UX Layout

**Two-panel layout:**

- **Left Panel (Controls)**:
    - Text input textarea
    - Theme selector dropdown
    - Background selector
    - OS chrome toggle buttons
    - Shell type selector (with auto-detect default)
    - Export button
- **Right Panel (Preview)**:
    - Live preview of the terminal screenshot
    - Updates in real-time as user changes settings

**Responsive**: Should work on desktop primarily, mobile support is nice-to-have but not critical for v1.

## Additional Requirements

### 1. Default State

- Load with example terminal output showing the tool's capabilities
- Default theme: Dracula
- Default OS: macOS
- Default background: A nice gradient

### 2. Performance

- Everything runs client-side (no backend needed)
- Fast preview updates (debounced if needed)

### 3. Code Quality

- Well-organized component structure
- Reusable theme definitions (separate config file)
- Clean separation of concerns
- TypeScript types for themes, settings, etc.

### 4. Accessibility

- Proper semantic HTML
- Keyboard navigation support
- ARIA labels where appropriate

## File Structure Suggestion

```
terminalsnap/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── TextInput.tsx
│   │   ├── ThemeSelector.tsx
│   │   ├── BackgroundSelector.tsx
│   │   ├── OSChromeToggle.tsx
│   │   ├── TerminalPreview.tsx
│   │   └── ExportButton.tsx
│   ├── lib/
│   │   ├── themes.ts (theme definitions)
│   │   ├── ansi-parser.ts
│   │   ├── syntax-highlighter.ts
│   │   └── export.ts
│   └── types/
│       └── index.ts
├── public/
├── package.json
└── README.md

```

## Getting Started Steps

1. Initialize Next.js project with TypeScript and Tailwind
2. Install shadcn/ui and add necessary components
3. Install required libraries (ansi parsing, syntax highlighting, image export)
4. Create theme configuration system
5. Build individual components (input, selectors, preview)
6. Implement ANSI parsing and syntax highlighting
7. Implement PNG export functionality
8. Polish UI/UX and add example content
9. Test across different terminal outputs and edge cases
10. Prepare for Vercel deployment

## Nice-to-Have (Future Iterations)

- Window padding/sizing controls
- Font family selection
- Shadow and border customization
- Copy as HTML/SVG
- Save/load presets
- Animated GIF export for command sequences
- URL sharing with encoded settings

## Success Criteria

- Users can paste terminal output and see it beautifully styled
- Export produces high-quality PNG images suitable for blogs/documentation
- All 7 themes render correctly
- ANSI colors are preserved and displayed accurately
- Interface is intuitive and responsive

---

## Deployment Information

### Vercel (Recommended)

**Why Vercel:**

- ✅ **Free tier is generous** - 100GB bandwidth/month, unlimited sites
- ✅ **Zero config** - Built by Next.js creators, deploys in seconds
- ✅ **Auto HTTPS** - Free SSL certificates
- ✅ **GitHub integration** - Auto-deploys on push
- ✅ **Edge network** - Fast globally
- ✅ **Custom domains** - Free on hobby tier

**Cost:** $0 unless you exceed 100GB bandwidth (which is A LOT for a static tool)

**Alternative Options:**

- **Netlify** - Similar free tier, also great
- **Cloudflare Pages** - Unlimited bandwidth on free tier (but slightly more setup)
- **GitHub Pages** - Free but requires manual build setup with Next.js

---

**Start by scaffolding the Next.js project with the tech stack specified, then build features incrementally. Focus on getting the core preview and export working first, then polish the UI.**