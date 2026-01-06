# Quickstart Guide

Quick development setup guide for TerminalSnap.

## Prerequisites

- Node.js 18+ (or 20+ recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/terminal-snap.git
cd terminal-snap
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with [commitlint](https://commitlint.js.org/) and [husky](https://typicode.github.io/husky/) to enforce commit message standards.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, missing semicolons, etc.) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Changes to build system or dependencies |
| `ci` | CI/CD changes |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Revert a previous commit |

### Examples

```bash
# Feature
git commit -m "feat(button): add new primary button variant"

# Bug fix
git commit -m "fix(Header): resolve mobile menu not closing"

# Documentation
git commit -m "docs: update API reference"

# Breaking change (include footer)
git commit -m "feat(api): change response format

BREAKING CHANGE: response now returns JSON instead of XML"
```

Commit messages are validated on push via husky pre-push hook.

---

For usage instructions, see [README.md](README.md)
