# TerminalSnap

A beautiful terminal screenshot beautifier built with Next.js. Create stunning terminal screenshots for your documentation, blogs, and presentations.

## Features

- 🎨 **7 Beautiful Themes**: Dracula, Nord, One Dark, Gruvbox Dark, Tokyo Night, Solarized Light, and GitHub Light
- 🖼️ **Custom Backgrounds**: Choose from 10+ preset backgrounds including gradients and solid colors
- 🪟 **OS Window Styles**: macOS, Windows, Linux, or minimal window decorations
- 🎯 **ANSI Color Support**: Full support for ANSI escape sequences and color codes
- 💻 **Syntax Highlighting**: Auto-detect shell type or manually select bash, zsh, or PowerShell
- 📸 **High-Quality Export**: Export your terminal screenshots as PNG images
- ⚡ **Real-time Preview**: See your changes instantly as you customize
- 🎨 **Fully Client-Side**: No backend required, everything runs in your browser

## Getting Started

### Prerequisites

- Node.js 18+ (or 20+ recommended)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/terminal-snap.git
cd terminal-snap
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Paste Terminal Output**: Paste your terminal output into the text area
2. **Choose Theme**: Select from 7 beautiful terminal themes
3. **Select Background**: Pick a background that complements your theme
4. **Customize Window**: Choose your OS window style and optional title
5. **Export**: Click "Export as PNG" to download your beautiful terminal screenshot

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **ANSI Parsing**: ansi-to-react
- **Syntax Highlighting**: shiki
- **Export**: html-to-image

## Project Structure

```
terminal-snap/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...          # Feature components
│   ├── lib/              # Utilities and configurations
│   │   ├── themes.ts    # Theme definitions
│   │   ├── backgrounds.ts
│   │   ├── ansi-parser.ts
│   │   └── export.ts
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── package.json
```

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

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by [carbon.now.sh](https://carbon.now.sh)
- Built with [shadcn/ui](https://ui.shadcn.com)
- Terminal themes inspired by popular terminal color schemes


