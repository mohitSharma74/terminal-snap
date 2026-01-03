# TerminalSnap

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Status: In Development](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)]()

A beautiful terminal screenshot beautifier built with Next.js. Create stunning terminal screenshots for your documentation, blogs, and presentations.

Featuring a **modern glassmorphic dark theme** with animated mesh gradient backgrounds and floating label form design.

## Features

- 🎨 **7 Beautiful Themes**: Dracula, Nord, One Dark, Gruvbox Dark, Tokyo Night, Solarized Light, and GitHub Light
- 🖼️ **Custom Backgrounds**: Choose from 10+ preset backgrounds including gradients and solid colors
- 🪟 **OS Window Styles**: macOS, Windows, Linux, or minimal window decorations
- 🎯 **ANSI Color Support**: Full support for ANSI escape sequences and color codes
- 💻 **Syntax Highlighting**: Auto-detect shell type or manually select bash, zsh, or PowerShell
- 📸 **High-Quality Export**: Export your terminal screenshots as PNG images
- ⚡ **Real-time Preview**: See your changes instantly as you customize
- 🎨 **Fully Client-Side**: No backend required, everything runs in your browser
- 🌙 **Glassmorphic Dark UI**: Modern dark theme with animated mesh gradient background, floating labels, and cyan/blue accents
- 📐 **Customizable Padding**: Adjust horizontal and vertical padding for landscape/portrait orientations

## Upcoming Features

- 🎨 Window padding/sizing controls
- 🔤 Font family selection
- 🌟 Shadow and border customization
- 📋 Copy as HTML/SVG export options
- 💾 Save/load preset configurations
- 🎬 Animated GIF export for command sequences
- 🔗 URL sharing with encoded settings

## Development

For development setup instructions, see [Quickstart.md](Quickstart.md)

## Usage

1. **Paste Terminal Output**: Paste your terminal output into the text area
2. **Choose Theme**: Select from 7 beautiful terminal themes
3. **Select Background**: Pick a background that complements your theme
4. **Customize Window**: Choose your OS window style and optional title
5. **Export**: Click "Export as PNG" to download your beautiful terminal screenshot

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS (pure React components)
- **Design**: Glassmorphic dark theme with floating labels
- **ANSI Parsing**: ansi-to-react
- **Syntax Highlighting**: shiki
- **Export**: html-to-image

## Project Structure

```
terminal-snap/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── globals.css   # Global styles & glassmorphic theme
│   │   ├── layout.tsx    # Root layout with dark theme
│   │   └── page.tsx      # Main application page
│   ├── components/       # React components
│   │   ├── ui/           # Glassmorphic UI primitives
│   │   │   ├── floating-input.tsx
│   │   │   ├── floating-textarea.tsx
│   │   │   ├── floating-select.tsx
│   │   │   ├── modern-checkbox.tsx
│   │   │   ├── modern-radio.tsx
│   │   │   ├── modern-slider.tsx
│   │   │   ├── modern-button.tsx
│   │   │   └── glass-card.tsx
│   │   └── ...           # Feature components
│   ├── lib/              # Utilities and configurations
│   │   ├── themes.ts     # Terminal theme definitions
│   │   ├── backgrounds.ts
│   │   ├── ansi-parser.tsx
│   │   └── export.ts
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json
```

## Design System

TerminalSnap uses a custom **glassmorphic dark theme** design:

- **Mesh Gradient Background**: Animated blurred color blobs in cyan, blue, and purple
- **Glassmorphic Components**: Semi-transparent backgrounds with backdrop blur
- **Floating Labels**: Animated labels that float above inputs on focus/content
- **Accent Colors**: Cyan (#06b6d4) and blue (#3b82f6) gradients
- **Dark Base**: Deep dark blue (#050816) background

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

The app will be live at `https://your-project.vercel.app`

### Other Platforms

TerminalSnap can be deployed to any platform that supports Next.js:

- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Open Source Roadmap

This project is currently being prepared for open source contribution. Below is our execution plan:

### Phase 1: Essential Documentation & Branding

- Generate hero terminal image showcasing git workflow
- Update README with badges (NextJS, TypeScript, MIT License, In Development)
- Create/verify LICENSE.md file
- Create comprehensive CONTRIBUTING.md

### Phase 2: GitHub Templates & Community

- Create `.github/ISSUE_TEMPLATE/feature_request.md`
- Create `.github/pull_request_template.md`
- Create `Quickstart.md` guide for new contributors
- Add "Upcoming Features" section to README (all items from Future Features list)

### Phase 3: Application Features

- Add top navigation bar with GitHub repo link
- Add "Upcoming Features" page link in navigation
- Deploy to Vercel and verify functionality

### Phase 4: Testing & Automation

- Set up Jest + React Testing Library for comprehensive test coverage
- Create GitHub Actions workflows for CI/CD, linting, and testing
- Implement custom GitHub Action bot for code reviews
- Add unit tests for all critical functionality

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [carbon.now.sh](https://carbon.now.sh)
- Glassmorphic design inspired by modern UI trends
- Floating label pattern inspired by [UIverse.io](https://uiverse.io)
- Terminal themes inspired by popular terminal color schemes
