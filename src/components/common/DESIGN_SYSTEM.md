# Skillbridge Design System

## Brand Identity

**Name:** Skillbridge  
**Tagline:** "Local Skills. Real People. Stronger Communities."  
**Purpose:** A Ghana-focused marketplace connecting customers with trusted local service providers.

---

## Color Palette

### Primary Colors
- **Primary Blue:** `#2563EB` (primary-600)
  - Used for: Primary buttons, active navigation, links, important icons, highlights, hero gradients
- **Deep Navy:** `#0F2A5F` (navy)
  - Used for: Footer, dark sections, text emphasis

### Neutral Colors
- **Background:** `#F8FAFC` (background)
- **White:** `#FFFFFF`
- **Primary Text:** `#0F172A` (gray-900)
- **Secondary Text:** `#64748B` (gray-500)

### Status Colors
- **Success:** `#22C55E` (success)
- **Warning:** `#F59E0B` (warning)
- **Danger:** `#EF4444` (danger)
- **Purple:** `#8B5CF6` (purple)

### Color Usage Guidelines
- Blue should NOT be used for everything
- Reserve blue for primary actions and highlights
- Use neutral colors for backgrounds and secondary elements
- Use status colors only for their intended purpose

---

## Typography

### Font Family
- **Primary:** Inter (400, 500, 600, 700, 800)
- **Fallback:** System fonts (San Francisco, Segoe UI, Roboto, etc.)

### Typography Hierarchy

| Class | Usage | Size | Weight |
|-------|-------|------|--------|
| `.text-page-heading` | Page titles | 3xl/4xl | Bold |
| `.text-section-heading` | Section titles | 2xl/3xl | Bold |
| `.text-card-heading` | Card titles | lg/xl | Semibold |
| `.text-body` | Body text | base | Normal |
| `.text-supporting` | Supporting text | sm | Normal |
| `.text-label` | Form labels | sm | Medium |

---

## Buttons

### Button Classes

| Class | Usage | Style |
|-------|-------|-------|
| `.btn-primary` | Primary actions | Blue background, white text |
| `.btn-secondary` | Secondary actions | White background, gray border |
| `.btn-outline` | Tertiary actions | Transparent, blue border |
| `.btn-danger` | Destructive actions | Red background, white text |
| `.btn-icon` | Icon-only buttons | Transparent, hover gray |
| `.btn-sm` | Small buttons | Smaller padding |
| `.btn-lg` | Large buttons | Larger padding |

### Button States
- **Hover:** Darker background color
- **Focus:** Ring outline (2px)
- **Disabled:** Gray background, no pointer events

---

## Cards

### Card Classes

| Class | Usage | Border Radius | Shadow |
|-------|-------|---------------|--------|
| `.card` | Standard cards | 12px | Card shadow |
| `.card-hover` | Interactive cards | 12px | Card + hover shadow |
| `.card-lg` | Large cards | 20px | Card shadow |

### Card Style Guidelines
- White background
- 12-20px border radius
- Very subtle border (gray-200)
- Soft shadow
- Comfortable padding (6-8)
- Consistent hover state (shadow-card-hover)

---

## Inputs

### Input Classes

| Class | Usage |
|-------|-------|
| `.input` | Standard text inputs |
| `.input-search` | Search inputs (with left padding for icon) |
| `.select` | Dropdown selects |
| `.textarea` | Multi-line text areas |

### Input Style Guidelines
- Border: gray-300
- Border radius: 8px (rounded-lg)
- Padding: 12px (px-4 py-3)
- Focus: Primary blue ring (2px)
- Transition: Smooth color transition

---

## Spacing System

### Tailwind Spacing Scale (4px base unit)

| Value | Pixels | Usage |
|-------|--------|-------|
| 1 | 4px | Tight spacing |
| 2 | 8px | Small spacing |
| 3 | 12px | Card padding |
| 4 | 16px | Standard spacing |
| 5 | 20px | Medium spacing |
| 6 | 24px | Section spacing |
| 8 | 32px | Large spacing |
| 10 | 40px | Extra large spacing |
| 12 | 48px | Section gaps |
| 16 | 64px | Page margins |

### Spacing Guidelines
- **Card padding:** p-6 (24px)
- **Section gaps:** gap-6 to gap-8 (24-32px)
- **Page margins:** px-4 sm:px-6 lg:px-8
- **Vertical spacing between sections:** py-8 to py-16 (32-64px)
- **Element spacing:** gap-2 to gap-4 (8-16px)

---

## Responsive Breakpoints

| Breakpoint | Size | Usage |
|------------|------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large desktop |

### Responsive Guidelines
- **Mobile:** Default (no breakpoint)
- **Tablet:** `md:` breakpoint
- **Desktop:** `lg:` breakpoint
- **Large Desktop:** `xl:` breakpoint

---

## Icons

### Icon Library
- **Library:** Lucide React v0.263.1
- **Usage:** Consistent across all pages
- **Size Guidelines:**
  - Small icons: 14-16px
  - Medium icons: 18-20px
  - Large icons: 24-32px

---

## Shadows

### Shadow Classes

| Class | Usage |
|-------|-------|
| `shadow-card` | Standard card shadow |
| `shadow-card-hover` | Card hover state |

### Shadow Values
- **Card:** `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- **Card Hover:** `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`

---

## Border Radius

### Border Radius Classes

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-card` | 12px | Standard cards |
| `rounded-card-lg` | 20px | Large cards |
| `rounded-lg` | 8px | Inputs, buttons |

---

## Usage Examples

### Button Example
```jsx
<button className="btn-primary">Submit</button>
<button className="btn-secondary">Cancel</button>
<button className="btn-outline">Learn More</button>
```

### Card Example
```jsx
<div className="card-hover">
  <h3 className="text-card-heading">Card Title</h3>
  <p className="text-body">Card content goes here.</p>
</div>
```

### Input Example
```jsx
<input type="text" className="input" placeholder="Enter text" />
<div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
  <input type="text" className="input-search" placeholder="Search..." />
</div>
```

### Typography Example
```jsx
<h1 className="text-page-heading">Page Title</h1>
<h2 className="text-section-heading">Section Title</h2>
<h3 className="text-card-heading">Card Title</h3>
<p className="text-body">Body text</p>
<p className="text-supporting">Supporting text</p>
<label className="text-label">Form Label</label>
```

---

## Notes

- All component classes are defined in `src/index.css`
- Tailwind config is in `tailwind.config.js`
- Use these classes consistently across the application
- Do not introduce new colors or styles without updating this document
