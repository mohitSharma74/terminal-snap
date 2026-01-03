# Contributing to TerminalSnap

Thank you for your interest in contributing to TerminalSnap! We welcome contributions from everyone and appreciate your help in making this project better.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style & Standards](#code-style--standards)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Format](#commit-message-format)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

## Getting Started

Before you start contributing, please:

1. Check if there's already an open issue for what you want to do
2. Comment on the issue to let us know you're working on it
3. Create a fork of the repository
4. Set up your development environment

## Development Setup

### Prerequisites

- Node.js 18+ (20+ recommended)
- Yarn package manager

### Installation

1. Clone your fork:

```bash
git clone https://github.com/mohitSharma74/terminal-snap.git
cd terminal-snap
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building

Build the project for production:

```bash
yarn build
```

## Code Style & Standards

We use ESLint and Prettier to maintain consistent code quality.

### Running Linters

Before committing, run:

```bash
# Check for linting issues
yarn lint

# Automatically fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format

# Check code formatting without fixing
yarn format:check
```

### Code Guidelines

- Use TypeScript for all new files
- Follow the existing component patterns
- Use functional components with TypeScript
- Use the `@/*` path alias for imports (e.g., `@/components/...`)
- Follow the existing glassmorphic design system
- Keep components small and focused
- Use descriptive variable and function names

## Branch Naming Conventions

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/add-font-selection`)
- `bugfix/` - Bug fixes (e.g., `bugfix/fix-export-quality`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/improve-theme-loading`)
- `style/` - Style changes without code logic changes (e.g., `style/update-colors`)

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(theme): add Tokyo Night theme

Implement the Tokyo Night color scheme with proper ANSI colors and syntax highlighting.
```

```
fix(export): resolve blurry PNG exports

Update pixel ratio settings to ensure high-quality exports at 2x scale.
```

```
docs(readme): update installation instructions

Add Node.js version requirements and clarify yarn usage.
```

## Reporting Bugs

If you find a bug, please check if an issue already exists. If not, create a new issue with:

### Bug Report Template

```markdown
**Description**
A clear and concise description of the bug.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- OS: [e.g., Windows 10, macOS 14, Ubuntu 22.04]
- Browser: [e.g., Chrome 120, Firefox 121, Safari 17]
- Node.js version: [e.g., 20.11.0]

**Additional Context**
Add any other context about the problem here.
```

## Suggesting Features

We welcome feature suggestions! Before creating a feature request, please:

1. Check if the feature is already in the [Roadmap](README.md#open-source-roadmap)
2. Search existing issues to avoid duplicates

### Feature Request Template

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Pull Request Process

### 1. Prepare Your PR

1. Ensure your code passes linting: `yarn lint`
2. Format your code: `yarn format`
3. Test your changes thoroughly
4. Update documentation if needed

### 2. Submit Your PR

1. Push your changes to your fork
2. Create a pull request to the main branch
3. Fill out the PR template with:
   - Description of changes
   - Related issues (if any)
   - Screenshots (for UI changes)
   - Testing performed

### 3. PR Review

- Address review feedback promptly
- Keep the PR focused and small
- Respond to comments in a timely manner

### 4. PR Template

```markdown
## Description

Briefly describe the changes made in this PR.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue

Closes #(issue number)

## How Has This Been Tested?

Please describe the tests that you ran to verify your changes.

## Screenshots (if applicable)

If this PR includes UI changes, please include screenshots.

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes locally
```

## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone.

### Our Standards

Examples of behavior that contributes to a positive environment:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior:

- Harassment, bullying, or intimidation
- Inappropriate use of nudity or sexually explicit imagery
- Trolling, insulting/derogatory comments, and personal/political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Responsibilities

Project maintainers are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any instances of unacceptable behavior.

### Scope

This Code of Conduct applies both within project spaces and in public spaces when an individual is representing the project or its community.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4, available at [https://www.contributor-covenant.org/version/1/4/code-of-conduct.html](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html)

[homepage]: https://www.contributor-covenant.org

## Questions?

If you have any questions about contributing, feel free to:

- Open an issue with the "question" label
- Reach out on the project discussions
- Contact the maintainers

Thank you for contributing to TerminalSnap! 🎉
