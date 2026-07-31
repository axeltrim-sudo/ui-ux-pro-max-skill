# UI/UX Pro Max — Design System & Guidelines

## Design Philosophy

**UI/UX Pro Max** is a premium design intelligence system providing enterprise-grade design tokens, typography scales, color systems, and UX principles for high-end PME (Professional, Modern, Elegant) interfaces. This system prioritizes **clarity, hierarchy, accessibility, and professional aesthetics** without gimmicks or AI-driven novelty.

---

## 1. Typography System

### Core Principle
Typography establishes information hierarchy and mood. Pair complementary font families strategically—never use more than 3 font families on a single interface.

### Recommended Font Pairings

**For Professional/Corporate:**
- Heading: Inter (600–700), Body: Inter (400), Accent: IBM Plex Mono (400)

**For Luxury/Premium:**
- Heading: Playfair Display (400–700), Body: Inter (300–400)

**For Tech/Startup:**
- Heading: Space Grotesk (500–700), Body: DM Sans (400)

**For Editorial/Magazine:**
- Heading: Cormorant Garamond (500–700), Body: Libre Baskerville (400)

### Font Scale (Modular 1.125 ratio)

```
Display (Hero):      56px | 600–700 weight | line-height 1.1
H1 (Page Title):     48px | 600 weight | line-height 1.2
H2 (Section Title):  32px | 600 weight | line-height 1.2
H3 (Subsection):     24px | 600 weight | line-height 1.3
Body (Primary):      16px | 400 weight | line-height 1.5
Body (Secondary):    14px | 400 weight | line-height 1.5
Label / UI:          12px | 500 weight | line-height 1.4
Caption / Meta:      11px | 400 weight | line-height 1.4
```

### Font Weight Rules

- **Display/H1/H2:** 600–700 weight only (never 400)
- **Body Text:** 400–500 weight (400 for reading, 500 for emphasis)
- **Labels/Buttons:** 500–700 weight (uppercase when <12px)
- **Mono/Code:** 400–500 weight only

### Letter Spacing

- Headlines: -0.5px to -1px (tight)
- Body: normal (0)
- Labels (uppercase): +0.5px to +1.5px
- Mono/Code: normal

### Line Height

- Headlines: 1.1–1.2 (tight)
- Body text: 1.5–1.6 (spacious for readability)
- Dense UI/Labels: 1.4

---

## 2. Color System

### Core Palette (WCAG 3:1 minimum contrast)

**Semantic Colors:**
- **Primary:** #2563EB (Brand blue)
- **Secondary:** #3B82F6 (Lighter blue)
- **Accent:** #EA580C (Action orange, WCAG 3:1 contrast)
- **Success:** #10B981 (Health green)
- **Warning:** #F59E0B (Caution amber)
- **Destructive:** #DC2626 (Error red)
- **Neutral/Text:** #1E293B (Dark slate for text)
- **Muted:** #64748B (Medium slate)
- **Border:** #E2E8F0 (Light slate)

**Background & Surface:**
- **Background:** #F8FAFC (Light off-white)
- **Card/Surface:** #FFFFFF (Pure white)
- **Card Hover:** #F1F5FD (Very light blue)
- **Overlay Dark:** rgba(15, 23, 42, 0.5)

**Dark Mode Variants:**
- **Background:** #0F172A (Deep navy)
- **Card/Surface:** #1E293B (Dark slate)
- **Text Primary:** #F8FAFC (Off-white)
- **Text Secondary:** #94A3B8 (Muted slate)
- **Border:** rgba(148, 163, 184, 0.2)

### Color Usage Rules

1. **Primary (Blue)** – Brand identity, links, active states
2. **Accent (Orange)** – CTAs, highlights, urgent actions
3. **Success (Green)** – Confirmations, available states
4. **Destructive (Red)** – Errors, deletions, warnings
5. **Neutral (Slate)** – Text, borders, disabled states
6. Never use more than 3 primary colors in one interface.
7. Always test light + dark modes.

---

## 3. Spacing & Sizing Tokens

### Spacing Scale (8px base)

```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
4xl: 80px
```

### Padding Rules

- **Cards:** 16px (md) to 24px (lg) internal padding
- **Buttons:** 8px vertical × 16px horizontal (sm) or 12px × 24px (lg)
- **Form Inputs:** 10px vertical × 12px horizontal
- **Sections:** 32px (lg) vertical spacing between sections
- **Hero/Display:** 48–64px top/bottom padding

### Gap/Margin Rules

- **Elements in Row:** 8–16px gap
- **Sections Vertically:** 24–32px margin
- **Card Collections:** 16px gap between cards
- Never nest margins; use gap in flex/grid containers

---

## 4. Border & Radius

### Border Radius

- **Small Elements** (buttons, chips): 6–8px
- **Cards/Modals:** 8–12px
- **Large Components:** 12–16px
- **Fully Rounded** (circles, pills): 9999px

### Border Styles

- **Default:** 1px solid #E2E8F0 (light mode) / rgba(148, 163, 184, 0.2) (dark)
- **Emphasized:** 2px solid #2563EB (active state)
- **Subtle:** 1px solid rgba(226, 232, 240, 0.5)

### Shadows (Elevation)

```
Elevation 0: none
Elevation 1: 0 1px 2px rgba(0, 0, 0, 0.05)
Elevation 2: 0 4px 6px rgba(0, 0, 0, 0.1)
Elevation 3: 0 10px 15px rgba(0, 0, 0, 0.15)
Elevation 4: 0 20px 25px rgba(0, 0, 0, 0.2)
```

---

## 5. Component Styles (HTML/Tailwind)

### Buttons

**Primary Button:**
```html
<button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
  hover:bg-blue-700 transition-colors duration-200">
  Primary Action
</button>
```

**Secondary Button:**
```html
<button class="px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg 
  border border-gray-300 hover:bg-gray-200 transition-colors">
  Secondary Action
</button>
```

**Outline Button:**
```html
<button class="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold 
  rounded-lg hover:bg-blue-50 transition-colors">
  Outline Action
</button>
```

### Form Inputs

```html
<div class="flex flex-col gap-2">
  <label class="text-sm font-semibold text-gray-900">Email Address</label>
  <input type="email" class="px-4 py-2.5 border border-gray-300 rounded-lg 
    focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
    placeholder="you@example.com" />
  <span class="text-xs text-gray-500">We never share your email</span>
</div>
```

### Card Component

```html
<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm 
  hover:shadow-md transition-shadow">
  <h3 class="text-lg font-semibold text-gray-900 mb-2">Card Title</h3>
  <p class="text-gray-600 text-sm leading-relaxed">
    Card content with clear hierarchy and good spacing.
  </p>
  <button class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium 
    rounded-lg hover:bg-blue-700">
    Learn More
  </button>
</div>
```

---

## 6. UX Principles (No AI Gimmicks)

### Hierarchy & Clarity
1. **One primary action per screen** – Bold button, high contrast
2. **Progressive disclosure** – Hide advanced options; show common tasks first
3. **Scannable layouts** – Use short headers, bullets, whitespace
4. **Visual weight** – Larger text, bold colors for important info

### Consistency
1. **Use design tokens everywhere** – Never hardcode colors or spacing
2. **Uniform button styles** – Primary, secondary, outline (not 10 variants)
3. **Predictable patterns** – Modals always have close button
4. **Icon consistency** – Use single icon library

### Accessibility (WCAG 2.1 AA minimum)
1. **Text contrast:** 4.5:1 for body, 3:1 for large text
2. **Interactive targets:** 44px minimum on mobile, 24px on desktop
3. **Focus states:** Always visible
4. **Alternative text:** All icons/images need labels
5. **Keyboard navigation:** All interactions work without mouse

### Performance & Mobile First
1. **No decorative animations** – Only micro-interactions (<300ms)
2. **Touch targets:** 44×44px minimum
3. **Readable on small screens** – No <12px text
4. **Lazy-load images** – Use native `loading="lazy"`

---

## 7. Best Practices Checklist

- [ ] **Color:** Test light + dark modes, minimum 4.5:1 contrast
- [ ] **Typography:** Only 2–3 font families, proper line heights
- [ ] **Spacing:** Use consistent 8px-based scale
- [ ] **Buttons:** One primary, clear hover/focus states
- [ ] **Forms:** Labels above inputs, inline validation
- [ ] **Mobile:** 44px touch targets, no <12px text
- [ ] **Accessibility:** Focus visible, alt text, keyboard nav
- [ ] **Performance:** <3s page load, animations <300ms
- [ ] **Consistency:** Use tokens everywhere

---

**Last Updated:** 2026-07-31
