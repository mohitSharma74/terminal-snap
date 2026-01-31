# Code Review Skills

This guide provides comprehensive code review checklists, anti-patterns, and workflows for TerminalSnap. Use these checklists when reviewing code (whether as a human developer or AI assistant).

## Pre-Review Automated Checks

**These checks MUST pass before requesting review:**

```bash
# Run these commands before requesting review:
npm run lint           # ESLint must pass
npm run format:check   # Prettier formatting must pass
npm run test           # All tests must pass
npm run build          # TypeScript compilation must succeed
```

**Additional checks:**
- [ ] Conventional commits format enforced by pre-commit hook
- [ ] No console errors/warnings in build output
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Git diff shows only intended changes (no accidental whitespace, debug code, etc.)

## Component Review Checklist

Use this checklist when reviewing a component:

### Component: [Name]

#### Structure
- [ ] Functional component (not class)
- [ ] TypeScript interface for props
- [ ] Extends HTML attributes if wrapping native element (`React.HTMLAttributes<...>`)
- [ ] `forwardRef` used for UI primitives
- [ ] Display name set (`ComponentName.displayName = "ComponentName"`)
- [ ] `"use client"` directive if using hooks/interactivity

#### Code Quality
- [ ] Event handlers use `handle*` naming (e.g., `handleClick`, `handleChange`)
- [ ] No relative imports (all use `@/*` path aliases)
- [ ] Import order correct (React → libs → components → utils → types)
- [ ] No `any` types (use proper typing or `unknown`)
- [ ] No unused variables (or prefixed with `_` if intentional)
- [ ] No `var` declarations (uses `const` or `let`)
- [ ] Line length ≤ 80 characters
- [ ] No hardcoded values (use constants or props)

#### Design System
- [ ] Uses established color palette (no new colors without discussion)
- [ ] Follows glassmorphic styling pattern (see `.claude/ui-ux-design.md`)
- [ ] Proper animation timing (see animation timing reference)
- [ ] Focus states are accessible (cyan border + glow)
- [ ] Hover states enhance user experience
- [ ] Consistent spacing (uses Tailwind spacing scale)

#### Testing
- [ ] Test file exists (`ComponentName.test.tsx`)
- [ ] User interactions tested (click, change, keyboard events)
- [ ] Edge cases covered (disabled state, error states, empty states)
- [ ] Snapshot test if UI primitive (ModernButton, FloatingInput, etc.)
- [ ] No snapshot test for feature components (test behavior instead)
- [ ] Test coverage meets thresholds (45% statements/lines, 40% branches/functions)

#### State (if applicable)
- [ ] State updates handled correctly
- [ ] Handlers properly typed
- [ ] No prop drilling > 2 levels (consider extracting to context or lifting state)
- [ ] State updates are immutable (no direct mutations)
- [ ] `useCallback` used for callbacks passed to child components (avoid re-renders)

#### Accessibility
- [ ] Semantic HTML used (`<button>` not `<div onClick>`)
- [ ] ARIA labels on custom controls
- [ ] Keyboard navigation works (Enter/Space for buttons, Tab for focus)
- [ ] Focus states visible
- [ ] Color contrast sufficient (≥4.5:1 for text)

## Utility/Library Review Checklist

Use this checklist when reviewing utilities or library functions:

### Utility: [Name]

- [ ] Pure function (no side effects, unless explicitly needed)
- [ ] Proper TypeScript typing (no `any` types)
- [ ] Unit tests with edge cases
- [ ] JSDoc comments for public API (explain parameters, return value, usage)
- [ ] Error handling for invalid inputs (throw or return error)
- [ ] No dependencies unless necessary (prefer native JS/TS)
- [ ] Performance considerations (e.g., memoization if expensive computation)

**Example of good utility:**

```typescript
/**
 * Merges CSS class names, removing duplicates and handling Tailwind conflicts
 * @param inputs - Class names to merge (strings, arrays, or objects)
 * @returns Merged class name string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

## Common Anti-Patterns

Reject code if these anti-patterns are present:

| Anti-Pattern | Why Bad | Fix |
|--------------|---------|-----|
| **Class components** | Project uses functional only | Convert to functional with hooks |
| **Relative imports** (`../../`) | Breaks when moving files | Use `@/*` path aliases |
| **Inline styles for static values** | Not maintainable | Use Tailwind or CSS classes in `globals.css` |
| **`any` types** | Defeats TypeScript purpose | Use proper types or `unknown` |
| **Default exports** | Named exports preferred | Use `export function/const` |
| **`var` declarations** | Use modern JS | Use `const` or `let` |
| **Missing tests** | Quality requirement | Add test file with behavior tests |
| **New colors without justification** | Design consistency | Use existing palette (#06b6d4, #3b82f6, #6366f1) |
| **Hardcoded strings** | Not maintainable | Extract to constants or props |
| **Mutating state directly** | Breaks React | Use immutable updates (`setState({ ...prev, key: value })`) |
| **Missing `key` prop in lists** | React performance | Add unique `key` prop |
| **Not handling loading/error states** | Poor UX | Add loading spinners and error messages |

### Examples of Anti-Patterns

```tsx
// ❌ BAD: Class component
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>
  }
}

// ✅ GOOD: Functional component
export function MyComponent() {
  return <div>Hello</div>
}

// ❌ BAD: Relative import
import { Button } from "../../../components/ui/modern-button"

// ✅ GOOD: Path alias
import { ModernButton } from "@/components/ui/modern-button"

// ❌ BAD: Inline style for static value
<div style={{ backgroundColor: "#06b6d4" }}>Content</div>

// ✅ GOOD: Tailwind class
<div className="bg-cyan-500">Content</div>

// ❌ BAD: any type
function handleData(data: any) {
  return data.value
}

// ✅ GOOD: Proper typing
interface Data {
  value: string
}

function handleData(data: Data) {
  return data.value
}

// ❌ BAD: Mutating state
const [settings, setSettings] = useState({ theme: "dracula" })
settings.theme = "nord" // Direct mutation!
setSettings(settings)

// ✅ GOOD: Immutable update
setSettings({ ...settings, theme: "nord" })
```

## Performance Review

Check for common performance issues:

- [ ] No unnecessary re-renders
  - Check if `useCallback` is needed for callbacks passed to children
  - Check if `useMemo` is needed for expensive computations
  - Avoid inline function definitions in JSX (extract to `useCallback`)

- [ ] Animations use GPU-accelerated properties
  - ✅ Use `transform`, `opacity`
  - ❌ Avoid `top`, `left`, `width`, `height`

- [ ] Large components lazy-loaded if appropriate
  - Use `React.lazy()` and `Suspense` for code splitting
  - Only for components not needed on initial render

- [ ] No premature optimization
  - Don't use `React.memo` unless proven performance issue
  - Don't use `useMemo`/`useCallback` everywhere (measure first)

**Example: Avoiding unnecessary re-renders**

```tsx
// ❌ BAD: Inline function recreated on every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ GOOD: useCallback for stable reference
const handleClickWithId = useCallback(() => {
  handleClick(id)
}, [id])

<button onClick={handleClickWithId}>Click</button>

// ❌ BAD: React.memo without proper props comparison
export const Component = React.memo(({ data }) => {
  return <div>{data.value}</div>
})

// ✅ GOOD: React.memo only when necessary (proven re-render issue)
export const ExpensiveComponent = React.memo(
  ({ data }) => {
    // Expensive rendering logic
    return <div>{data.value}</div>
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.data.id === nextProps.data.id
  }
)
```

## Accessibility Review

Ensure code meets accessibility standards:

- [ ] Semantic HTML used
  - Use `<button>` for buttons, not `<div onClick>`
  - Use `<input>` for inputs, not styled `<div>`
  - Use `<label>` with `htmlFor` for labels

- [ ] Keyboard navigation works
  - Tab order is logical
  - Enter/Space work for buttons
  - Escape closes modals/dropdowns

- [ ] ARIA labels on custom controls
  - `aria-label` for icon-only buttons
  - `aria-describedby` for error messages
  - `role` attribute if not using semantic HTML

- [ ] Focus states visible
  - All interactive elements have visible focus state
  - Focus outline is not removed without replacement

- [ ] Color contrast sufficient
  - Text contrast ≥ 4.5:1 for normal text
  - Text contrast ≥ 3:1 for large text
  - Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Example: Accessible button**

```tsx
// ❌ BAD: Not accessible
<div onClick={handleClick}>
  <Icon name="delete" />
</div>

// ✅ GOOD: Accessible button
<button
  onClick={handleClick}
  aria-label="Delete item"
  className="focus:outline-none focus:ring-2 focus:ring-cyan-500"
>
  <Icon name="delete" />
</button>
```

## Review Workflow for AI Assistants

Follow this workflow when reviewing code:

1. **Run automated checks first**
   - `npm run lint`
   - `npm run format:check`
   - `npm run test`
   - `npm run build`

2. **Use appropriate checklist**
   - Component Review Checklist for React components
   - Utility Review Checklist for utilities/libraries

3. **Check for anti-patterns**
   - Review Common Anti-Patterns table
   - Reject code if critical anti-patterns found

4. **Verify test coverage**
   - Ensure test file exists
   - Check coverage meets thresholds
   - Verify edge cases are tested

5. **Check design system compliance**
   - Colors match palette
   - Animations use correct timing
   - Glassmorphic styling is consistent

6. **If issues found:**
   - Fix issues
   - Re-run automated checks
   - Re-review with appropriate checklist

7. **If all checks pass:**
   - Code is ready for merge
   - Create commit with conventional commits format

## Example Review Comments

**Good review comments:**

```markdown
✅ APPROVED: Looks good! All checks pass.

✅ APPROVED with minor suggestions:
- Consider extracting this utility to a separate file for reusability
- Add JSDoc comments to public API functions

❌ CHANGES REQUESTED:
- Replace relative import `../../../utils` with `@/lib/utils`
- Add test file `ComponentName.test.tsx`
- Fix TypeScript error: `any` type on line 42
- Use `const` instead of `let` on line 15 (value never reassigned)

❌ BLOCKED:
- Tests are failing (see CI output)
- ESLint errors must be fixed before review
```

## References to CLAUDE.md

For detailed patterns and standards, refer to these sections in CLAUDE.md:

- **Component patterns** → "Component Patterns" section
- **State management rules** → "State Management Pattern" section
- **Import order** → "Import Order" section
- **File naming** → "File Naming" section
- **Code style** → "Code Style & Standards" section

For design system compliance, refer to:
- `.claude/frontend-engineering.md` → Component patterns and TypeScript conventions
- `.claude/ui-ux-design.md` → Color usage, animation timing, accessibility
- `.claude/testing.md` → Testing patterns and expectations
