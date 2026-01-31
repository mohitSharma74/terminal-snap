# Testing Skills

This guide provides testing conventions, patterns, and templates for TerminalSnap. Use these patterns when writing tests for components, utilities, and libraries.

## Testing Philosophy

Follow these principles when writing tests:

- ✅ **Every component needs tests** (no exceptions)
- ✅ **Test behavior, not implementation details**
  - Test what the user sees and does, not internal state
  - Avoid testing private methods or implementation details
- ✅ **Snapshots for UI primitives only** (ModernButton, FloatingInput, GlassCard, etc.)
  - UI primitives are stable and change infrequently
  - Snapshots catch unintended visual regressions
- ❌ **Don't snapshot feature components** (ThemeSelector, BackgroundSelector, etc.)
  - Feature components change frequently
  - Snapshots become brittle and require constant updates
  - Test behavior instead
- ✅ **Mock external dependencies** (html-to-image, third-party libraries)
  - Control external behavior in tests
  - Make tests deterministic and fast
- ❌ **Don't mock internal utilities** (test them directly)
  - Internal utilities should be tested with real implementations
  - Mocking defeats the purpose of integration testing

## Quick Start: Writing Your First Test

### Step 1: Create test file

Create a test file next to your component or in a `__tests__/` directory:

```
src/components/
├── MyComponent.tsx
└── MyComponent.test.tsx

OR

src/components/
├── MyComponent.tsx
└── __tests__/
    └── MyComponent.test.tsx
```

### Step 2: Use this template

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MyComponent } from "../MyComponent"

describe("MyComponent", () => {
  it("renders with correct role", () => {
    render(<MyComponent />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("calls handler on user interaction", async () => {
    const user = userEvent.setup()
    const mockHandler = jest.fn()

    render(<MyComponent onClick={mockHandler} />)
    await user.click(screen.getByRole("button"))

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
```

## Test Patterns by Component Type

### UI Primitives (ModernButton, FloatingInput, etc.)

UI primitives require comprehensive tests with snapshots:

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { ModernButton } from "../modern-button"

describe("ModernButton", () => {
  // 1. Snapshot test for each variant
  it("matches snapshot for primary variant", () => {
    const { container } = render(
      <ModernButton variant="primary">Click Me</ModernButton>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("matches snapshot for secondary variant", () => {
    const { container } = render(
      <ModernButton variant="secondary">Click Me</ModernButton>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it("matches snapshot for outline variant", () => {
    const { container } = render(
      <ModernButton variant="outline">Click Me</ModernButton>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  // 2. Test user interactions
  it("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<ModernButton onClick={handleClick}>Click Me</ModernButton>)
    await user.click(screen.getByRole("button"))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // 3. Test ref forwarding
  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<ModernButton ref={ref}>Click Me</ModernButton>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  // 4. Test disabled state
  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(
      <ModernButton onClick={handleClick} disabled>
        Click Me
      </ModernButton>
    )
    await user.click(screen.getByRole("button"))

    expect(handleClick).not.toHaveBeenCalled()
  })

  // 5. Test className merging
  it("merges custom className correctly", () => {
    render(<ModernButton className="custom-class">Click Me</ModernButton>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("custom-class")
  })
})
```

### Feature Components (ThemeSelector, BackgroundSelector, etc.)

Feature components should test behavior, not appearance:

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeSelector } from "../ThemeSelector"

describe("ThemeSelector", () => {
  // No snapshots - test behavior instead

  // 1. Test rendering with props
  it("displays current theme name", () => {
    render(<ThemeSelector value="dracula" onChange={jest.fn()} />)
    expect(screen.getByDisplayValue("dracula")).toBeInTheDocument()
  })

  // 2. Test user interactions
  it("calls onChange when theme selected", async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()

    render(<ThemeSelector value="dracula" onChange={handleChange} />)

    const select = screen.getByRole("combobox")
    await user.selectOptions(select, "nord")

    expect(handleChange).toHaveBeenCalledWith("nord")
  })

  // 3. Test edge cases
  it("handles invalid theme gracefully", () => {
    render(<ThemeSelector value="invalid-theme" onChange={jest.fn()} />)
    // Should fall back to default or show error
    expect(screen.getByRole("combobox")).toBeInTheDocument()
  })

  // 4. Test conditional rendering
  it("disables selector when disabled prop is true", () => {
    render(<ThemeSelector value="dracula" onChange={jest.fn()} disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })
})
```

### Utilities (export.ts, ansi-parser.ts, etc.)

Utilities require unit tests with edge cases and mocking:

```tsx
import { toPng } from "html-to-image"
import { exportToPng } from "../export"

// Mock external library
jest.mock("html-to-image", () => ({
  toPng: jest.fn().mockResolvedValue("data:image/png;base64,mockData"),
}))

describe("exportToPng", () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test success case
  it("exports with correct options", async () => {
    const mockElement = document.createElement("div")
    await exportToPng(mockElement, "test.png")

    expect(toPng).toHaveBeenCalledWith(mockElement, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    })
  })

  // Test error handling
  it("throws error when export fails", async () => {
    const mockElement = document.createElement("div")
    const mockedToPng = toPng as jest.MockedFunction<typeof toPng>

    mockedToPng.mockRejectedValueOnce(new Error("Export failed"))

    await expect(exportToPng(mockElement, "test.png")).rejects.toThrow(
      "Export failed"
    )
  })

  // Test with custom filename
  it("uses custom filename", async () => {
    const mockElement = document.createElement("div")
    await exportToPng(mockElement, "custom-name.png")

    // Verify download link was created with custom filename
    // (Implementation-specific - adjust based on actual code)
  })

  // Test edge case: null element
  it("handles null element gracefully", async () => {
    await expect(exportToPng(null as any, "test.png")).rejects.toThrow()
  })
})
```

## Mocking Patterns

### Mock External Libraries

```tsx
// At top of test file (before imports)
jest.mock("html-to-image", () => ({
  toPng: jest.fn().mockResolvedValue("data:image/png;base64,mockData"),
}))

// Access mock in tests
import { toPng } from "html-to-image"

const mockedToPng = toPng as jest.MockedFunction<typeof toPng>

// Reset mock behavior
mockedToPng.mockClear() // Clear call history
mockedToPng.mockReset() // Clear call history + mock implementation
mockedToPng.mockResolvedValue("new value") // Change return value
mockedToPng.mockRejectedValue(new Error("error")) // Simulate error
```

### Mock DOM APIs (Already in jest.setup.js)

These are already mocked globally - no need to mock in individual tests:

```tsx
// ✅ Already mocked in jest.setup.js:
// - window.matchMedia
// - window.IntersectionObserver

// You can use them directly in tests:
it("uses matchMedia", () => {
  const result = window.matchMedia("(min-width: 768px)")
  expect(result.matches).toBe(false)
})
```

### Mock React Hooks (If Needed)

```tsx
// Mock useEffect to run immediately
jest.spyOn(React, "useEffect").mockImplementation((f) => f())

// Mock useState
const mockSetState = jest.fn()
jest.spyOn(React, "useState").mockImplementation((initial) => [initial, mockSetState])

// Restore original implementation after test
afterEach(() => {
  jest.restoreAllMocks()
})
```

### Mock Fetch/API Calls

```tsx
// Mock global fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ data: "mock data" }),
})

// In test
it("fetches data successfully", async () => {
  const result = await fetchData()
  expect(global.fetch).toHaveBeenCalledWith("/api/data")
  expect(result).toEqual({ data: "mock data" })
})

// Clean up
afterEach(() => {
  jest.restoreAllMocks()
})
```

## Coverage Expectations

| Metric | Threshold | Priority |
|--------|-----------|----------|
| Statements | 45% | User interactions → edge cases → happy path |
| Lines | 45% | Same as statements |
| Branches | 40% | Cover if/else, ternaries, switches |
| Functions | 40% | Focus on exported functions |

**Note:** 100% coverage is not required. Don't test trivial code (getters, simple utilities).

### Coverage Priority Guide

1. **User interactions** (highest priority)
   - Click events
   - Input changes
   - Form submissions
   - Keyboard navigation

2. **Edge cases** (medium priority)
   - Disabled states
   - Error states
   - Empty states
   - Invalid input
   - Boundary conditions

3. **Happy path** (lowest priority)
   - Normal usage
   - Default states
   - Expected input

## Common Testing Mistakes to Avoid

| Mistake | Why Bad | Fix |
|---------|---------|-----|
| **Using `getByTestId`** | Not accessibility-first | Use `getByRole`, `getByLabelText`, `getByText` |
| **Using `fireEvent`** | Doesn't simulate real user interactions | Use `userEvent` (more realistic) |
| **Not awaiting `userEvent`** | Misses async updates | Always `await user.click(...)` |
| **Snapshot testing features** | Too brittle, changes often | Test behavior instead |
| **Mocking internal utils** | Defeats purpose of tests | Only mock external dependencies |
| **Not cleaning up mocks** | Test pollution, flaky tests | Use `beforeEach(() => jest.clearAllMocks())` |
| **Testing implementation details** | Brittle tests, refactoring breaks tests | Test public API and behavior |
| **Not testing error states** | Incomplete coverage | Add tests for error handling |

### Examples of Common Mistakes

```tsx
// ❌ BAD: Using getByTestId
<button data-testid="submit-button">Submit</button>
const button = screen.getByTestId("submit-button")

// ✅ GOOD: Using getByRole (accessibility-first)
<button>Submit</button>
const button = screen.getByRole("button", { name: "Submit" })

// ❌ BAD: Using fireEvent
fireEvent.click(button)

// ✅ GOOD: Using userEvent
const user = userEvent.setup()
await user.click(button)

// ❌ BAD: Testing implementation details
expect(component.state.count).toBe(1)

// ✅ GOOD: Testing behavior
expect(screen.getByText("Count: 1")).toBeInTheDocument()

// ❌ BAD: Not cleaning up mocks
jest.mock("module")
// Tests run, mocks persist to next test...

// ✅ GOOD: Clean up mocks
beforeEach(() => {
  jest.clearAllMocks()
})
```

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (for development) - tests re-run on file changes
npm run test:watch

# Generate coverage report (saved to coverage/)
npm run test:coverage

# CI mode (optimized for CI environments, maxWorkers=2)
npm run test:ci

# Run specific test file
npm test -- MyComponent.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders correctly"

# Update snapshots (after intentional UI change)
npm test -- -u

# Update snapshots for specific file
npm test -- MyComponent.test.tsx -u
```

### Reading Coverage Reports

After running `npm run test:coverage`, open `coverage/lcov-report/index.html` in a browser:

- **Green**: Well-covered (>80%)
- **Yellow**: Moderately covered (50-80%)
- **Red**: Poorly covered (<50%)

Focus on covering **red sections** first, especially user interactions and edge cases.

## Test-Driven Development (TDD) Workflow

Follow this workflow for test-driven development:

1. **Write failing test first** (describes expected behavior)
   ```tsx
   it("increments counter when button clicked", async () => {
     const user = userEvent.setup()
     render(<Counter />)

     await user.click(screen.getByRole("button", { name: "Increment" }))

     expect(screen.getByText("Count: 1")).toBeInTheDocument()
   })
   ```

2. **Run test to confirm it fails**
   ```bash
   npm run test:watch
   ```
   Expected: Test fails (component doesn't exist yet)

3. **Implement minimum code to make test pass**
   ```tsx
   export function Counter() {
     const [count, setCount] = useState(0)
     return (
       <div>
         <p>Count: {count}</p>
         <button onClick={() => setCount(count + 1)}>Increment</button>
       </div>
     )
   }
   ```

4. **Run test to confirm it passes**
   Expected: Test passes (green ✓)

5. **Refactor if needed** (test should still pass)
   - Extract logic to custom hook
   - Improve styling
   - Optimize performance
   - Tests continue to pass

6. **Repeat for next behavior**
   - Write test for decrement button
   - Implement decrement
   - Refactor

## Query Priority Guide

When selecting elements in tests, use this priority (from React Testing Library):

1. **Queries Accessible to Everyone** (highest priority)
   - `getByRole`: Best for buttons, inputs, headings
   - `getByLabelText`: Best for form fields
   - `getByPlaceholderText`: For inputs with placeholder
   - `getByText`: For non-interactive elements

2. **Semantic Queries**
   - `getByAltText`: For images
   - `getByTitle`: For elements with title attribute

3. **Test IDs** (lowest priority - avoid if possible)
   - `getByTestId`: Only when no other option works

### Examples

```tsx
// ✅ BEST: getByRole
const button = screen.getByRole("button", { name: "Submit" })
const input = screen.getByRole("textbox", { name: "Username" })
const heading = screen.getByRole("heading", { name: "Welcome" })

// ✅ GOOD: getByLabelText (for form fields)
const input = screen.getByLabelText("Username")

// ✅ GOOD: getByText (for non-interactive elements)
const paragraph = screen.getByText("Welcome to TerminalSnap")

// ❌ AVOID: getByTestId (last resort)
const element = screen.getByTestId("custom-element")
```

## References to Project Setup

- **Jest config**: `jest.config.js`
  - Test environment: jsdom (for React components)
  - Coverage thresholds: 45% statements/lines, 40% branches/functions
  - Path alias support: `@/*` mapped to `src/*`

- **Jest setup**: `jest.setup.js`
  - Mocks `window.matchMedia`
  - Mocks `window.IntersectionObserver`
  - Imports `@testing-library/jest-dom` for custom matchers

- **Existing test examples**:
  - `src/components/ui/__tests__/modern-button.test.tsx` (UI primitive with snapshots)
  - `src/components/__tests__/ThemeSelector.test.tsx` (feature component)
  - `src/lib/__tests__/export.test.ts` (utility with mocking)

- **Testing library documentation**:
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - [Jest](https://jestjs.io/docs/getting-started)
  - [user-event](https://testing-library.com/docs/user-event/intro/)

## Additional Resources

- **CLAUDE.md** → "Component Architecture" for component patterns
- `.claude/frontend-engineering.md` → Component patterns and TypeScript conventions
- `.claude/code-review.md` → Review checklist includes testing requirements
