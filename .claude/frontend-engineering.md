# Frontend Engineering Skills

This guide provides quick reference checklists and decision trees for frontend development in TerminalSnap. For detailed explanations, refer to [CLAUDE.md](../CLAUDE.md).

## Quick Start Checklist

When creating a new component, ensure:

- [ ] Component uses functional pattern (see CLAUDE.md "Component Architecture")
- [ ] Props interface defined and extends HTML attributes if applicable
- [ ] `forwardRef` used for UI primitives
- [ ] Display name set (`ComponentName.displayName = "ComponentName"`)
- [ ] `"use client"` directive added if using hooks/interactivity
- [ ] Event handlers use `handle*` naming (e.g., `handleClick`, `handleChange`)
- [ ] Imports use `@/*` aliases (no relative paths)
- [ ] Import order follows standard (see CLAUDE.md "Import Order")

## Component Decision Trees

### When to create a UI Primitive vs Feature Component?

```
Is this component reusable across the app?
├─ Yes → Is it a low-level UI element (button, input, card)?
│  ├─ Yes → Create UI primitive in `src/components/ui/`
│  │        - Use forwardRef
│  │        - Extend native HTML attributes
│  │        - Set display name
│  │        - Add "use client" directive
│  │        - Create comprehensive tests with snapshots
│  │
│  └─ No → Is it a feature-specific component?
│     └─ Yes → Create feature component in `src/components/`
│              - May or may not use forwardRef
│              - Add "use client" if using hooks
│              - Create behavior tests (no snapshots)
│
└─ No → Keep inline or extract if it grows complex
```

### When to use forwardRef?

```
Is this component a UI primitive?
├─ Yes → ALWAYS use forwardRef
│        (ModernButton, FloatingInput, GlassCard, etc.)
│
└─ No → Is it a feature component that wraps a native element?
    ├─ Yes → Use forwardRef if parent needs ref access
    │        (e.g., TerminalPreview needs ref for export)
    │
    └─ No → Don't use forwardRef
             (Most feature components don't need it)
```

### When to extract state vs keep inline?

```
Is the state used by multiple components?
├─ Yes → Extract to nearest common parent
│        (Follow current pattern: centralized in page.tsx)
│
└─ No → Is the component becoming complex (>150 lines)?
    ├─ Yes → Consider extracting to custom hook
    │
    └─ No → Keep state inline with useState
```

### When to create a compound component?

```
Does the component have multiple related parts?
├─ Yes → Are the parts always used together?
│  ├─ Yes (like GlassCard: Header, Title, Content, Footer)
│  │     → Create compound component with multiple exports
│  │        Example: GlassCard, GlassCardHeader, GlassCardContent
│  │
│  └─ No → Create separate independent components
│
└─ No → Create single component
```

## TypeScript Quick Reference

### Interface vs Type Alias

```tsx
// ✅ GOOD: Use interface for component props (extendable)
export interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  fullWidth?: boolean
}

// ✅ GOOD: Use type for union types or complex types
export type OSChrome = "macos" | "windows" | "linux" | "none"
export type ThemeName = "dracula" | "nord" | "tokyo-night" | ...
```

### Type-Only Imports

```tsx
// ✅ GOOD: Use `type` keyword for type-only imports
import type { TerminalSettings, TerminalTheme } from "@/types"
import { ModernButton } from "@/components/ui/modern-button"

// ❌ BAD: Mixing types and values without distinction
import { TerminalSettings, ModernButton } from "..."
```

### Handling Union Types in Props

```tsx
// ✅ GOOD: Variant prop with union type
export interface ModernButtonProps {
  variant?: "primary" | "secondary" | "outline"
}

export const ModernButton = ({ variant = "primary", ...props }: ModernButtonProps) => {
  // Type is narrowed to specific variant
  const variantClass = {
    primary: "modern-button-primary",
    secondary: "modern-button-secondary",
    outline: "modern-button-outline",
  }[variant]

  return <button className={variantClass} {...props} />
}
```

### Generic Component Typing

```tsx
// ✅ GOOD: Generic forwardRef component
export const GenericComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return <div ref={ref} {...props} />
})

GenericComponent.displayName = "GenericComponent"
```

## Common Mistakes & Fixes

### Import Paths

```tsx
// ❌ BAD: Relative import
import { ModernButton } from "../../../components/ui/modern-button"

// ✅ GOOD: Path alias
import { ModernButton } from "@/components/ui/modern-button"
```

### Component Structure

```tsx
// ❌ BAD: Missing forwardRef for UI primitive
export function FloatingInput(props: FloatingInputProps) {
  return <input {...props} />
}

// ✅ GOOD: forwardRef for UI primitive
export const FloatingInput = React.forwardRef<
  HTMLInputElement,
  FloatingInputProps
>((props, ref) => {
  return <input ref={ref} {...props} />
})

FloatingInput.displayName = "FloatingInput"
```

### Event Handlers

```tsx
// ❌ BAD: Handler without proper naming
const changeHandler = (value: string) => {
  console.log(value)
}

// ✅ GOOD: Consistent handler naming
const handleValueChange = (value: string) => {
  console.log(value)
}

// ❌ BAD: Inline arrow function in JSX (recreates on every render)
<button onClick={() => handleClick(id)}>Click</button>

// ✅ GOOD: Use useCallback for parameterized handlers
const handleClick = useCallback((id: string) => {
  // Handle click
}, [])

<button onClick={() => handleClick(id)}>Click</button>
```

### Client Components

```tsx
// ❌ BAD: Missing "use client" directive when using hooks
import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0) // Error in Next.js App Router!
  return <div>{count}</div>
}

// ✅ GOOD: Add "use client" directive
"use client"

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

### Props Interface

```tsx
// ❌ BAD: Not extending native HTML attributes
export interface CustomInputProps {
  value: string
  onChange: (value: string) => void
}

// User can't pass className, id, aria-label, etc.

// ✅ GOOD: Extend native HTML attributes
export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (value: string) => void
}

// Now supports all native input attributes: className, id, aria-label, etc.
```

## Import Order Standard

Follow this order for all imports:

```tsx
// 1. React/Next.js imports
import React from "react"
import { useEffect, useState } from "react"

// 2. Third-party libraries
import clsx from "clsx"
import { toPng } from "html-to-image"

// 3. Local components (using @/ alias)
import { ModernButton } from "@/components/ui/modern-button"
import { ThemeSelector } from "@/components/ThemeSelector"

// 4. Utilities/lib functions
import { cn } from "@/lib/utils"
import { parseAnsi } from "@/lib/ansi-parser"

// 5. Types (using type keyword for type-only imports)
import type { TerminalSettings, TerminalTheme } from "@/types"
```

## References to CLAUDE.md

For detailed explanations, refer to these sections in CLAUDE.md:

- **Component patterns** → See "Component Architecture" section
- **State management** → See "State Management Pattern" section
- **Path aliases** → See "Path Aliases" section
- **File naming** → See "File Naming" section
- **Styling approach** → See "Styling Approach" section
- **Type system** → See "Type System" section
