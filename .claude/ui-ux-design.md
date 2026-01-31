# UI/UX Design Skills

This guide provides color usage guidelines, animation timing references, and accessibility checklists for the TerminalSnap glassmorphic design system. For complete design system specifications, refer to [CLAUDE.md](../CLAUDE.md).

## Color Usage Guidelines

### When to use Cyan (#06b6d4)

**Primary accent color** - Use for:
- Primary actions (export button gradient)
- Active/focus states (borders, labels)
- Interactive element highlights
- Hover state enhancements
- Selected state indicators

**Examples:**
```css
/* Active floating label */
.floating-label.active {
  color: #06b6d4;
}

/* Focus state border */
.floating-input:focus {
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}
```

### When to use Blue (#3b82f6)

**Secondary accent color** - Use for:
- Secondary actions
- Accent gradients (combined with cyan)
- Hover state enhancements (secondary elements)
- Decorative gradients

**Examples:**
```css
/* Export button gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Dropdown hover gradient */
background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2));
```

### When to use Purple (#6366f1)

**Tertiary accent color** - Use for:
- Tertiary accents (background blobs)
- Decorative gradients
- NOT for interactive elements (reserve for decoration)

**Examples:**
```css
/* Background blob animation */
background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
```

### Text Colors

| Usage | Color | Code |
|-------|-------|------|
| Primary text | Light gray | `#e5e7eb` |
| Muted text | Gray (60% opacity) | `rgba(229, 231, 235, 0.6)` |
| Active labels | Cyan | `#06b6d4` |
| Disabled text | Gray (40% opacity) | `rgba(229, 231, 235, 0.4)` |

### Border Colors

| State | Color | Usage |
|-------|-------|-------|
| Default | `rgba(6, 182, 212, 0.3)` | Resting state borders |
| Focus | `rgba(6, 182, 212, 0.6)` | Active input borders + glow |
| Hover | `rgba(6, 182, 212, 0.4)` | Hover state borders |
| Disabled | `rgba(6, 182, 212, 0.2)` | Disabled element borders |

## Animation Timing Reference

Quick lookup table for animation timing values:

| Animation Type | Duration | Easing | Usage | Example |
|---------------|----------|--------|-------|---------|
| Floating labels | 0.3s | `cubic-bezier(0.4, 0, 0.2, 1)` | Input focus/blur | Label moves to top |
| Dropdown fade | 200ms | `ease-in-out` | Menu appearance | Dropdown opening |
| Hover effects | 150ms | `ease-in-out` | Button/card hover | Opacity/glow change |
| Blob float | 20-30s | `ease-in-out` | Background animation | Floating blobs |
| Gradient rotate | 3s | `linear` | Export button (infinite) | Rotating gradient |
| Transform | 200ms | `ease-out` | Scale/translate | Button press effect |

### Performance Rule

**Always use GPU-accelerated properties:**
```css
/* ✅ GOOD: GPU-accelerated (smooth 60fps) */
transform: translateX(10px);
opacity: 0.5;

/* ❌ BAD: Layout-triggering (causes reflow/repaint) */
top: 10px;
left: 10px;
width: 200px;
height: 100px;
```

### Animation Examples

```css
/* Floating label animation */
.floating-label {
  transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              font-size 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.3s ease;
}

/* Dropdown fade-in */
.custom-dropdown-menu {
  animation: dropdown-fade-in 200ms ease-in-out;
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect */
.modern-button {
  transition: all 150ms ease-in-out;
}

.modern-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(6, 182, 212, 0.3);
}
```

## Accessibility Checklist

Use this checklist for every new component:

### Color Contrast
- [ ] Color contrast ≥ 4.5:1 for normal text (use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/))
- [ ] Color contrast ≥ 3:1 for large text (18pt+ or 14pt+ bold)
- [ ] Don't rely on color alone to convey information (use icons, text, patterns)

### Focus States
- [ ] All interactive elements have visible focus state (cyan border + glow)
- [ ] Focus states are consistent across components
- [ ] Focus states have sufficient contrast (≥3:1 against background)
- [ ] Focus outline is not removed with `outline: none` (use custom focus styles instead)

```css
/* ✅ GOOD: Visible focus state */
.floating-input:focus {
  outline: none; /* Remove default */
  border-color: rgba(6, 182, 212, 0.6);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

/* ❌ BAD: No focus state */
.floating-input:focus {
  outline: none;
}
```

### Form Controls
- [ ] Custom form controls include proper ARIA attributes
  - `role` attribute if not using semantic HTML
  - `aria-label` or `aria-labelledby` for screen readers
  - `aria-checked` for checkboxes/radios (if custom)
  - `aria-disabled` for disabled states
- [ ] Floating labels don't obscure input values when focused
- [ ] Error messages are associated with inputs (`aria-describedby`)

```tsx
// ✅ GOOD: Accessible custom checkbox
<div className="modern-checkbox-wrapper">
  <input
    type="checkbox"
    id={id}
    className="modern-checkbox-input"
    checked={checked}
    onChange={onChange}
    aria-label={ariaLabel}
  />
  <label htmlFor={id} className="modern-checkbox-label">
    {label}
  </label>
</div>
```

### Keyboard Navigation
- [ ] Keyboard navigation works for all interactive elements
- [ ] Tab order is logical (follows visual flow)
- [ ] Enter/Space keys work for buttons and checkboxes
- [ ] Escape key closes modals/dropdowns
- [ ] Arrow keys navigate within dropdown menus (if applicable)

### Disabled States
- [ ] Disabled states are visually distinct (opacity + cursor-not-allowed)
- [ ] Disabled elements are not focusable
- [ ] Disabled elements include `disabled` attribute (not just CSS)

```tsx
// ✅ GOOD: Properly disabled button
<ModernButton disabled={true} className="opacity-50 cursor-not-allowed">
  Click Me
</ModernButton>

// ❌ BAD: Only visual disabled state
<ModernButton className="opacity-50 cursor-not-allowed">
  Click Me
</ModernButton>
```

### Touch Targets (Mobile)
- [ ] Touch targets ≥ 44x44px for mobile (when implemented)
- [ ] Spacing between touch targets ≥ 8px
- [ ] Hover states work on touch devices (use `@media (hover: hover)`)

## Styling Decision Tree

Use this decision tree when styling a new component:

```
Need to style a new component?
├─ Is it a form input?
│  ├─ Yes → Use FloatingInput/FloatingTextarea/FloatingSelect pattern
│  │        - Import from @/components/ui/
│  │        - Apply floating-label-group wrapper
│  │        - Use CSS classes: .floating-input, .floating-label
│  │        - Follow color guidelines (cyan for active/focus)
│  │
│  └─ No → Continue
│
├─ Is it a button/action?
│  ├─ Yes → Use ModernButton with appropriate variant
│  │        - variant="primary" for main actions (gradient background)
│  │        - variant="secondary" for secondary actions
│  │        - variant="outline" for tertiary actions
│  │
│  └─ No → Continue
│
├─ Is it a container/card?
│  ├─ Yes → Use GlassCard compound component
│  │        - GlassCard as wrapper
│  │        - GlassCardHeader + GlassCardTitle for header
│  │        - GlassCardContent for body
│  │        - GlassCardFooter for footer (optional)
│  │
│  └─ No → Apply glassmorphic properties manually
│           - Semi-transparent background: rgba(255, 255, 255, 0.05-0.1)
│           - Backdrop blur: blur(12px) with -webkit- prefix
│           - Border: 1.5px solid rgba(6, 182, 212, 0.3)
│           - Border radius: rounded-lg (8px)
│           - See CLAUDE.md "Glassmorphic Properties" for full spec
```

## Glassmorphic Properties Quick Reference

```css
/* Standard glassmorphic card */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1.5px solid rgba(6, 182, 212, 0.3);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Glassmorphic card hover state */
.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-color: rgba(6, 182, 212, 0.4);
  box-shadow: 0 8px 16px rgba(6, 182, 212, 0.2);
}
```

## Component-Specific Guidelines

### Floating Labels

**Positioning:**
- Resting position: `top: 0.875rem` (14px)
- Floated position: `top: -1.5rem` (-24px)
- Font size resting: `0.875rem` (14px)
- Font size floated: `0.75rem` (12px)

**Colors:**
- Resting: `rgba(229, 231, 235, 0.6)` (muted gray)
- Active/Focus: `#06b6d4` (cyan)
- Error: `#ef4444` (red)

### Dropdowns

**Animation:**
```css
.custom-dropdown-menu {
  animation: dropdown-fade-in 200ms ease-in-out;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

**Scrollbar styling:**
```css
.custom-dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.custom-dropdown-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.custom-dropdown-menu::-webkit-scrollbar-thumb {
  background: rgba(6, 182, 212, 0.5);
  border-radius: 4px;
}
```

### Buttons

**Variants:**
- **Primary:** Gradient background (`linear-gradient(135deg, #667eea, #764ba2)`)
- **Secondary:** Solid cyan background with hover glow
- **Outline:** Transparent background with cyan border

**Sizing:**
- Height: `2.5rem` (40px) for standard buttons
- Padding: `0.5rem 1.5rem` (8px 24px)
- Font size: `0.875rem` (14px)

## References to CLAUDE.md

For complete design system specifications, refer to these sections in CLAUDE.md:

- **Complete design system spec** → See "Design System: Glassmorphic Dark Theme"
- **Color palette values** → See "Color Palette" subsection
- **Glassmorphic properties** → See "Glassmorphic Properties" subsection
- **Floating label mechanics** → See "Floating Labels" subsection
- **Component examples** → See "UI Primitives" in "Component Architecture"
- **Background system** → See "Background System" section
- **Theme system** → See "Theme System" section
