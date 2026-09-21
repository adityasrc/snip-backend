# Design Language: Dub - The Modern Link Attribution Platform

> Extracted from `https://dub.co` on May 28, 2026
> 5000 elements analyzed

This document describes the complete design language of the website. It is structured for AI/LLM consumption — use it to faithfully recreate the visual design in any framework.

## Color Palette

### Primary Colors

| Role | Hex | RGB | HSL | Usage Count |
|------|-----|-----|-----|-------------|
| Primary | `#3b82f6` | rgb(59, 130, 246) | hsl(217, 91%, 60%) | 47 |
| Secondary | `#f6cf54` | rgb(246, 207, 84) | hsl(46, 90%, 65%) | 1 |
| Accent | `#f4b3d7` | rgb(244, 179, 215) | hsl(327, 75%, 83%) | 1 |

### Neutral Colors

| Hex | HSL | Usage Count |
|-----|-----|-------------|
| `#e5e5e5` | hsl(0, 0%, 90%) | 4628 |
| `#0a0a0a` | hsl(0, 0%, 4%) | 2798 |
| `#262626` | hsl(0, 0%, 15%) | 565 |
| `#ffffff` | hsl(0, 0%, 100%) | 371 |
| `#404040` | hsl(0, 0%, 25%) | 365 |
| `#525252` | hsl(0, 0%, 32%) | 294 |
| `#171717` | hsl(0, 0%, 9%) | 272 |
| `#000000` | hsl(0, 0%, 0%) | 189 |
| `#a3a3a3` | hsl(0, 0%, 64%) | 122 |
| `#737373` | hsl(0, 0%, 45%) | 119 |
| `#d4d4d4` | hsl(0, 0%, 83%) | 20 |
| `#6b7280` | hsl(220, 9%, 46%) | 14 |

### Background Colors

Used on large-area elements: `#fafafa`, `#ffffff`, `#f5f5f5`, `#262626`

### Text Colors

Text color palette: `#000000`, `#0a0a0a`, `#171717`, `#ffffff`, `#525252`, `#737373`, `#404040`, `#e5e5e5`, `#262626`, `#7c2d12`

### Gradients

```css
background-image: conic-gradient(from -81deg, rgb(255, 0, 0), rgb(234, 179, 8) 99deg, rgb(92, 255, 128) 162deg, rgb(0, 255, 249) 216deg, rgb(58, 139, 253) 288deg, rgb(133, 90, 252));
```

```css
background-image: radial-gradient(closest-side, rgb(249, 115, 22), rgb(0, 0, 0));
```

```css
background-image: radial-gradient(closest-side, rgb(74, 222, 128), rgb(0, 0, 0));
```

```css
background-image: radial-gradient(closest-side, rgb(147, 51, 234), rgb(0, 0, 0));
```

```css
background-image: linear-gradient(to top, rgb(245, 245, 245), rgba(245, 245, 245, 0));
```

```css
background-image: conic-gradient(from 279deg, rgb(255, 0, 0), rgb(234, 179, 8) 99deg, rgb(92, 255, 128) 162deg, rgb(0, 255, 249) 216deg, rgb(58, 139, 253) 288deg, rgb(133, 90, 252) 360deg);
```

```css
background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0));
```

```css
background-image: linear-gradient(135deg, rgba(0, 0, 0, 0), rgb(255, 255, 255), rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.533), rgba(0, 0, 0, 0));
```

```css
background-image: conic-gradient(from -80deg, rgb(255, 0, 0), rgb(234, 179, 8) 99deg, rgb(92, 255, 128) 162deg, rgb(0, 255, 249) 216deg, rgb(58, 139, 253) 288deg, rgb(133, 90, 252));
```

```css
background-image: linear-gradient(rgb(245, 245, 245), rgb(255, 255, 255));
```

```css
background-image: linear-gradient(rgb(115, 115, 115), rgb(38, 38, 38));
```

```css
background-image: linear-gradient(rgb(82, 82, 82), rgb(23, 23, 23));
```

```css
background-image: linear-gradient(rgb(229, 229, 229), rgb(212, 212, 212));
```

```css
background-image: linear-gradient(rgb(245, 245, 245), rgb(229, 229, 229));
```

### Full Color Inventory

| Hex | Contexts | Count |
|-----|----------|-------|
| `#e5e5e5` | border, text, background | 4628 |
| `#0a0a0a` | text | 2798 |
| `#262626` | text, background, border | 565 |
| `#ffffff` | background, text, border | 371 |
| `#404040` | text, background | 365 |
| `#525252` | text, border | 294 |
| `#171717` | text, background | 272 |
| `#000000` | text, background, border | 189 |
| `#dcfce7` | background, border | 164 |
| `#a3a3a3` | text, background, border | 122 |
| `#737373` | text, background | 119 |
| `#2563eb` | text | 62 |
| `#3b82f6` | text, background, border | 47 |
| `#bbf7d0` | border | 42 |
| `#166534` | text | 42 |
| `#a855f7` | text, background | 26 |
| `#d4d4d4` | border, background | 20 |
| `#14b8a6` | text, background | 20 |
| `#581c87` | text | 18 |
| `#16a34a` | text | 18 |
| `#6b7280` | text | 14 |
| `#7c3aed` | text | 13 |
| `#7c2d12` | text | 9 |
| `#14532d` | text | 9 |
| `#ea580c` | text | 9 |
| `#dc2626` | text | 7 |
| `#111827` | text | 7 |
| `#1d4ed8` | text | 5 |
| `#4ade80` | background, text | 4 |
| `#fb923c` | background | 3 |

## Typography

### Font Families

- **Inter** — used for all (4960 elements)
- **GeistMono** — used for body (26 elements)
- **satoshi** — used for headings (7 elements)
- **Times** — used for body (6 elements)

### Type Scale

| Size (px) | Size (rem) | Weight | Line Height | Letter Spacing | Used On |
|-----------|------------|--------|-------------|----------------|---------|
| 48px | 3rem | 500 | 55.2px | normal | h1, h2 |
| 40px | 2.5rem | 500 | 40px | normal | h2 |
| 36px | 2.25rem | 500 | 40px | normal | h2 |
| 30px | 1.875rem | 400 | 41.25px | normal | div, p, br, a |
| 24px | 1.5rem | 400 | 32px | normal | p |
| 20px | 1.25rem | 400 | 28px | normal | p |
| 18px | 1.125rem | 400 | 28px | normal | div, svg, defs, pattern |
| 16px | 1rem | 400 | 24px | normal | html, head, meta, link |
| 15.8787px | 0.9924rem | 600 | 23.818px | normal | text, tspan |
| 14px | 0.875rem | 500 | 20px | normal | button, svg, path, a |
| 13px | 0.8125rem | 400 | 19.5px | normal | a, div |
| 12px | 0.75rem | 500 | 16px | normal | a, span, div, svg |
| 11px | 0.6875rem | 500 | 11px | normal | span, div, svg, g |
| 10px | 0.625rem | 400 | 28px | normal | div, svg, path, circle |
| 9.47007px | 0.5919rem | 500 | 14.2051px | normal | text, tspan |

### Heading Scale

```css
h1 { font-size: 48px; font-weight: 500; line-height: 55.2px; }
h2 { font-size: 40px; font-weight: 500; line-height: 40px; }
h2 { font-size: 36px; font-weight: 500; line-height: 40px; }
h3 { font-size: 16px; font-weight: 400; line-height: 24px; }
```

### Body Text

```css
body { font-size: 16px; font-weight: 400; line-height: 24px; }
```

### Font Weights in Use

`400` (4107x), `500` (752x), `600` (141x)

## Spacing

| Token | Value | Rem |
|-------|-------|-----|
| spacing-1 | 1px | 0.0625rem |
| spacing-38 | 38px | 2.375rem |
| spacing-48 | 48px | 3rem |
| spacing-54 | 54px | 3.375rem |
| spacing-64 | 64px | 4rem |
| spacing-80 | 80px | 5rem |
| spacing-96 | 96px | 6rem |
| spacing-107 | 107px | 6.6875rem |
| spacing-128 | 128px | 8rem |
| spacing-139 | 139px | 8.6875rem |
| spacing-156 | 156px | 9.75rem |
| spacing-189 | 189px | 11.8125rem |
| spacing-219 | 219px | 13.6875rem |
| spacing-251 | 251px | 15.6875rem |
| spacing-258 | 258px | 16.125rem |
| spacing-361 | 361px | 22.5625rem |

## Border Radii

| Label | Value | Count |
|-------|-------|-------|
| xs | 2px | 15 |
| md | 6px | 49 |
| md | 10px | 3 |
| lg | 15px | 1 |
| xl | 20px | 6 |
| full | 9999px | 331 |

## Box Shadows

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.09) 0px 20px 20px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgba(59, 130, 246, 0.5) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
```

**sm** — blur: 0px
```css
box-shadow: rgb(255, 255, 255) 0px 0px 0px 3px, rgb(0, 0, 0) 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
```

**sm** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
```

**sm (inset)** — blur: 0px
```css
box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.2) 0px 2px 6px 0px inset;
```

## CSS Custom Properties

### Colors

```css
--foreground: 0 0% 3.9%;
--muted: 0 0% 96.1%;
--muted-foreground: 0 0% 45.1%;
--popover: 0 0% 100%;
--popover-foreground: 0 0% 15.1%;
--card: 0 0% 99.7%;
--card-foreground: 0 0% 3.9%;
--border: 0 0% 89.8%;
--primary: 0 0% 9%;
--primary-foreground: 0 0% 98%;
--secondary: 0 0% 96.1%;
--secondary-foreground: 0 0% 9%;
--accent: 0 0% 94.1%;
--accent-foreground: 0 0% 9%;
--ring: 0 0% 63.9%;
--tw-ring-offset-shadow: 0 0 #0000;
--bg-default: 255 255 255;
--bg-emphasis: 229 229 229;
--tw-ring-shadow: 0 0 #0000;
--border-muted: 245 245 245;
--bg-subtle: 245 245 245;
--bg-error: 254 226 226;
--tw-ring-inset: ;
--border-subtle: 229 229 229;
--tw-border-spacing-x: 0;
--tw-ring-color: rgb(59 130 246/0.5);
--bg-success: 220 252 231;
--tw-ring-offset-color: #fff;
--content-muted: 163 163 163;
--bg-muted: 250 250 250;
--border-default: 212 212 212;
--bg-info: 191 219 254;
--tw-ring-offset-width: 0px;
--bg-attention: 255 237 213;
--tw-shadow-colored: 0 0 #0000;
--tw-border-spacing-y: 0;
--bg-inverted: 23 23 23;
--border-emphasis: 163 163 163;
```

### Spacing

```css
--tw-numeric-spacing: ;
--tw-contain-size: ;
```

### Typography

```css
--font-satoshi: "satoshi","satoshi Fallback";
--font-geist-mono: "GeistMono",ui-monospace,SFMono-Regular,Roboto Mono,Menlo,Monaco,Liberation Mono,DejaVu Sans Mono,Courier New,monospace;
--font-inter: "Inter","Inter Fallback";
```

### Shadows

```css
--tw-drop-shadow: ;
--tw-shadow: 0 0 #0000;
```

### Other

```css
--background: 0 0% 98%;
--content-error: 185 28 28;
--tw-backdrop-sepia: ;
--tw-sepia: ;
--tw-ordinal: ;
--tw-backdrop-saturate: ;
--tw-contain-style: ;
--content-inverted: 255 255 255;
--_number-flow-d: 0;
--tw-backdrop-invert: ;
--_number-flow-dx: 0px;
--content-attention: 194 65 12;
--tw-brightness: ;
--tw-backdrop-grayscale: ;
--tw-hue-rotate: ;
--tw-scale-y: 1;
--tw-pan-y: ;
--tw-backdrop-contrast: ;
--tw-backdrop-brightness: ;
--tw-pan-x: ;
--tw-translate-y: 0;
--tw-rotate: 0;
--tw-contrast: ;
--content-success: 21 128 61;
--tw-skew-x: 0;
--content-info: 29 78 216;
--tw-backdrop-blur: ;
--tw-translate-x: 0;
--_number-flow-d-opacity: 0;
--tw-gradient-via-position: ;
--content-emphasis: 23 23 23;
--tw-saturate: ;
--tw-scroll-snap-strictness: proximity;
--tw-grayscale: ;
--tw-scale-x: 1;
--tw-backdrop-hue-rotate: ;
--content-default: 64 64 64;
--tw-gradient-to-position: ;
--tw-numeric-fraction: ;
--tw-skew-y: 0;
--_number-flow-d-width: 0;
--tw-blur: ;
--tw-slashed-zero: ;
--tw-invert: ;
--tw-backdrop-opacity: ;
--tw-gradient-from-position: ;
--content-subtle: 115 115 115;
--tw-numeric-figure: ;
--tw-pinch-zoom: ;
--tw-contain-paint: ;
--tw-contain-layout: ;
```

### Semantic

```css
success: [object Object];
warning: [object Object];
error: [object Object];
info: [object Object];
```

## Breakpoints

| Name | Value | Type |
|------|-------|------|
| xs | 280px | max-width |
| xs | 281px | min-width |
| xs | 360px | min-width |
| sm | 420px | min-width |
| sm | 450px | min-width |
| sm | 600px | max-width |
| sm | 640px | min-width |
| md | 768px | min-width |
| lg | 1024px | min-width |
| xl | 1280px | min-width |
| 1400px | 1400px | min-width |

## Transitions & Animations

**Easing functions:** `[object Object]`

**Durations:** `0.15s`, `0.2s`, `0.075s`, `0.1s`, `0.3s`, `0.5s`, `0.05s`, `0.25s`, `0.35s`, `0.4s`, `0.45s`, `1s`, `0s`

### Common Transitions

```css
transition: all;
transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), fill 0.2s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.2s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), fill 0.15s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
transition: color 0.075s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.075s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.075s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.075s cubic-bezier(0.4, 0, 0.2, 1), fill 0.075s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.075s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

**blink**
```css
@keyframes blink {
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
}
```

**infinite-scroll**
```css
@keyframes infinite-scroll {
  0% { transform: translateX(0px); }
  100% { transform: translateX(var(--scroll,-200%)); }
}
```

**infinite-scroll-y**
```css
@keyframes infinite-scroll-y {
  0% { transform: translateY(0px); }
  100% { transform: translateY(var(--scroll,-200%)); }
}
```

**offset-move**
```css
@keyframes offset-move {
  0% { offset-distance: var(--offset-start,0); }
  100% { offset-distance: var(--offset-end,100%); }
}
```

**ping**
```css
@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}
```

**pulse**
```css
@keyframes pulse {
  50% { opacity: 0.5; }
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

**pulse-in**
```css
@keyframes pulse-in {
  0% { opacity: 0; transform: scale(var(--from-scale,.5)); }
  50% { opacity: 1; transform: scale(var(--to-scale,1.05)); }
  100% { transform: scale(1); }
}
```

**scale-in**
```css
@keyframes scale-in {
  0% { transform: scale(var(--from-scale,.95)); }
  100% { transform: scale(var(--to-scale,1)); }
}
```

**scale-in-fade**
```css
@keyframes scale-in-fade {
  0% { transform: scale(var(--from-scale,.95)); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

**slide-down-fade**
```css
@keyframes slide-down-fade {
  0% { opacity: 0; transform: translateY(var(--offset,-2px)); }
  100% { opacity: 1; transform: translateY(0px); }
}
```

## Component Patterns

Detected UI component patterns and their most common styles:

### Buttons (34 instances)

```css
.button {
  background-color: rgb(245, 245, 245);
  color: rgb(10, 10, 10);
  font-size: 16px;
  font-weight: 400;
  padding-top: 0px;
  padding-right: 0px;
  border-radius: 9999px;
}
```

### Cards (8 instances)

```css
.card {
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding-top: 8px;
  padding-right: 16px;
}
```

### Inputs (1 instances)

```css
.input {
  background-color: rgb(255, 255, 255);
  color: rgb(17, 24, 39);
  border-color: rgb(0, 0, 0);
  border-radius: 0px 6px 6px 0px;
  font-size: 14px;
  padding-top: 8px;
  padding-right: 12px;
}
```

### Links (67 instances)

```css
.link {
  color: rgb(10, 10, 10);
  font-size: 16px;
  font-weight: 400;
}
```

### Navigation (2 instances)

```css
.navigatio {
  background-color: rgb(255, 255, 255);
  color: rgb(10, 10, 10);
  padding-top: 64px;
  padding-bottom: 64px;
  padding-left: 20px;
  padding-right: 20px;
  position: fixed;
}
```

### Modals (3 instances)

```css
.modal {
  border-radius: 0px;
  padding-top: 0px;
  padding-right: 0px;
}
```

### Dropdowns (1 instances)

```css
.dropdown {
  border-radius: 0px;
  border-color: rgb(229, 229, 229);
  padding-top: 0px;
}
```

### Avatars (3 instances)

```css
.avatar {
  border-radius: 9999px;
}
```

### Tabs (3 instances)

```css
.tab {
  background-color: rgb(245, 245, 245);
  color: rgb(82, 82, 82);
  font-size: 16px;
  font-weight: 400;
  padding-top: 8px;
  padding-right: 12px;
  border-color: rgb(229, 229, 229);
  border-radius: 8px;
}
```

### ProgressBars (1 instances)

```css
.progressBar {
  background-color: rgb(255, 255, 255);
  color: rgb(10, 10, 10);
  border-radius: 0px;
  font-size: 18px;
}
```

### Switches (1 instances)

```css
.switche {
  background-color: rgb(59, 130, 246);
  border-radius: 9999px;
}
```

## Component Clusters

Reusable component instances grouped by DOM structure and style similarity:

### Button — 10 instances, 2 variants

**Variant 1** (4 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(64, 64, 64);
  padding: 8px 16px 8px 16px;
  border-radius: 8px;
  border: 0px solid rgb(229, 229, 229);
  font-size: 14px;
  font-weight: 500;
```

**Variant 2** (6 instances)

```css
  background: rgb(0, 0, 0);
  color: rgb(10, 10, 10);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px solid rgb(229, 229, 229);
  font-size: 16px;
  font-weight: 400;
```

### Button — 3 instances, 1 variant

**Variant 1** (3 instances)

```css
  background: rgb(255, 255, 255);
  color: rgb(38, 38, 38);
  padding: 8px 12px 8px 12px;
  border-radius: 8px;
  border: 1px solid rgb(229, 229, 229);
  font-size: 16px;
  font-weight: 400;
```

### Button — 1 instance, 1 variant

**Variant 1** (1 instance)

```css
  background: rgb(59, 130, 246);
  color: rgb(10, 10, 10);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 2px solid rgba(0, 0, 0, 0);
  font-size: 16px;
  font-weight: 400;
```

### Button — 7 instances, 1 variant

**Variant 1** (7 instances)

```css
  background: rgb(199, 62, 51);
  color: rgb(10, 10, 10);
  padding: 0px 0px 0px 0px;
  border-radius: 9999px;
  border: 0px solid rgb(229, 229, 229);
  font-size: 16px;
  font-weight: 400;
```

### Button — 2 instances, 1 variant

**Variant 1** (2 instances)

```css
  background: rgba(0, 0, 0, 0);
  color: rgb(10, 10, 10);
  padding: 0px 0px 0px 0px;
  border-radius: 0px;
  border: 0px solid rgb(229, 229, 229);
  font-size: 16px;
  font-weight: 400;
```

## Layout System

**24 grid containers** and **669 flex containers** detected.

### Container Widths

| Max Width | Padding |
|-----------|---------|
| 1080px | 48px |
| 672px | 16px |
| 940px | 16px |
| 530px | 0px |
| 800px | 20px |
| 650px | 0px |
| 100% | 0px |
| 500px | 0px |
| 576px | 0px |
| 384px | 0px |
| 512px | 0px |
| 700px | 0px |
| 1024px | 48px |
| 304px | 0px |

### Grid Column Patterns

| Columns | Usage Count |
|---------|-------------|
| 4-column | 13x |
| 3-column | 4x |
| 2-column | 4x |
| 5-column | 2x |

### Grid Templates

```css
grid-template-columns: 256px 256px 256px 256px 256px;
gap: 16px;
grid-template-columns: 248px 248px;
gap: 16px;
grid-template-columns: 196.391px 196.406px 196.391px 196.406px 196.391px;
gap: 16px;
grid-template-columns: 240px 240px 240px;
gap: 32px 40px;
grid-template-columns: 240px 240px 240px;
gap: 32px 40px;
```

### Flex Patterns

| Direction/Wrap | Count |
|----------------|-------|
| row/nowrap | 488x |
| column/nowrap | 179x |
| row/wrap | 2x |

**Gap values:** `10px`, `12px`, `14px`, `16px`, `1px`, `20px`, `24px`, `2px`, `32px`, `32px 40px`, `3px`, `48px`, `4px`, `6px`, `80px`, `8px`, `8px 24px`, `8px 6px`, `normal 4px`

## Accessibility (WCAG 2.1)

**Overall Score: 100%** — 15 passing, 0 failing color pairs

### Passing Color Pairs

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| `#171717` | `#ffffff` | 17.93:1 | AAA |
| `#ffffff` | `#000000` | 21:1 | AAA |
| `#737373` | `#ffffff` | 4.74:1 | AA |
| `#7c3aed` | `#ffffff` | 5.7:1 | AA |

## Design System Score

**Overall: 72/100 (Grade: C)**

| Category | Score |
|----------|-------|
| Color Discipline | 65/100 |
| Typography Consistency | 50/100 |
| Spacing System | 70/100 |
| Shadow Consistency | 90/100 |
| Border Radius Consistency | 90/100 |
| Accessibility | 100/100 |
| CSS Tokenization | 100/100 |

**Strengths:** Clean elevation system, Consistent border radii, Strong accessibility compliance, Good CSS variable tokenization

**Issues:**
- 4 font families — consider limiting to 2 (heading + body)
- 41 !important rules — prefer specificity over overrides
- 77% of CSS is unused — consider purging
- 2814 duplicate CSS declarations

## Gradients

**14 unique gradients** detected.

| Type | Direction | Stops | Classification |
|------|-----------|-------|----------------|
| conic | from -81deg | 6 | complex |
| radial | — | 3 | bold |
| radial | — | 3 | bold |
| radial | — | 3 | bold |
| linear | to top | 2 | brand |
| conic | from 279deg | 6 | complex |
| linear | — | 2 | brand |
| linear | 135deg | 5 | complex |
| conic | from -80deg | 6 | complex |
| linear | — | 2 | brand |
| linear | — | 2 | brand |
| linear | — | 2 | brand |
| linear | — | 2 | brand |
| linear | — | 2 | brand |

```css
background: conic-gradient(from -81deg, rgb(255, 0, 0), rgb(234, 179, 8) 99deg, rgb(92, 255, 128) 162deg, rgb(0, 255, 249) 216deg, rgb(58, 139, 253) 288deg, rgb(133, 90, 252));
background: radial-gradient(closest-side, rgb(249, 115, 22), rgb(0, 0, 0));
background: radial-gradient(closest-side, rgb(74, 222, 128), rgb(0, 0, 0));
background: radial-gradient(closest-side, rgb(147, 51, 234), rgb(0, 0, 0));
background: linear-gradient(to top, rgb(245, 245, 245), rgba(245, 245, 245, 0));
```

## Z-Index Map

**6 unique z-index values** across 2 layers.

| Layer | Range | Elements |
|-------|-------|----------|
| sticky | 10,40 | div.r.e.l.a.t.i.v.e. .z.-.1.0. .b.g.-.w.h.i.t.e, div.b.o.r.d.e.r.-.t.-.1. .r.e.l.a.t.i.v.e. .z.-.1.0. .h.-.[.c.a.l.c.(.1.0.0.%.+.1.p.x.).]. .m.i.n.-.w.-.0. .g.r.o.w. .b.o.r.d.e.r.-.c.u.r.r.e.n.t. .b.g.-.c.u.r.r.e.n.t, div.r.e.l.a.t.i.v.e. .z.-.1.0. .f.l.e.x. .s.h.r.i.n.k.-.0. .i.t.e.m.s.-.c.e.n.t.e.r. .g.a.p.-.2. .r.o.u.n.d.e.d.-.l.g. .b.g.-.n.e.u.t.r.a.l.-.8.0.0. .p.-.1. .p.r.-.2. .s.h.a.d.o.w.-.m.d |
| base | 0,5 | ul.g.r.o.u.p. .r.e.l.a.t.i.v.e. .z.-.0. .f.l.e.x, div.r.e.l.a.t.i.v.e. .z.-.0. .m.x.-.a.u.t.o. .m.a.x.-.w.-.g.r.i.d.-.w.i.d.t.h. .b.o.r.d.e.r.-.g.r.i.d.-.b.o.r.d.e.r. .p.x.-.4. .p.y.-.2.0. .s.m.:.p.x.-.1.2, div.r.e.l.a.t.i.v.e. .z.-.0. .m.x.-.a.u.t.o. .m.a.x.-.w.-.g.r.i.d.-.w.i.d.t.h. .b.o.r.d.e.r.-.g.r.i.d.-.b.o.r.d.e.r. .b.o.r.d.e.r.-.x |

## SVG Icons

**97 unique SVG icons** detected. Dominant style: **outlined**.

| Size Class | Count |
|------------|-------|
| xs | 38 |
| sm | 43 |
| md | 10 |
| xl | 6 |

**Icon colors:** `currentColor`, `rgb(0, 0, 0)`, `black`, `white`, `#fff`, `#000000`, `url(#_r_1_-mask-gradient)`, `url(#_r_1_-color-gradient)`, `url(#_r_2_-mask-gradient)`, `url(#_r_2_-color-gradient)`

## Font Files

| Family | Source | Weights | Styles |
|--------|--------|---------|--------|
| GeistMono | self-hosted | 100 900 | normal |
| satoshi | self-hosted | 300 900 | normal |
| Inter | self-hosted | 100 900 | normal |

## Image Style Patterns

| Pattern | Count | Key Styles |
|---------|-------|------------|
| thumbnail | 54 | objectFit: contain, borderRadius: 0px, shape: square |
| avatar | 37 | objectFit: fill, borderRadius: 9999px, shape: circular |
| general | 3 | objectFit: fill, borderRadius: 8px, shape: rounded |

**Aspect ratios:** 1:1 (47x), 4:3 (11x), 7.4:1 (6x), 8.18:1 (5x), 5.14:1 (3x), 10.24:1 (2x), 16:9 (2x), 21:9 (2x)

## Motion Language

**Feel:** mixed · **Scroll-linked:** yes

### Duration Tokens

| name | value | ms |
|---|---|---|
| `instant` | `50ms` | 50 |
| `xs` | `100ms` | 100 |
| `sm` | `200ms` | 200 |
| `md` | `300ms` | 300 |
| `lg` | `450ms` | 450 |
| `xl` | `1s` | 1000 |

### Easing Families

- **custom** (237 uses) — `cubic-bezier(0.4, 0, 0.2, 1)`

### Keyframes In Use

| name | kind | properties | uses |
|---|---|---|---|
| `infinite-scroll-y` | slide-y | transform | 4 |
| `pulse` | fade | opacity | 1 |
| `pulse-in` | reveal | opacity, transform | 1 |
| `slide-down-fade` | slide-y | opacity, transform | 1 |
| `slide-left-fade` | slide-x | opacity, transform | 3 |
| `slide-up-fade` | slide-y | opacity, transform | 9 |

## Component Anatomy

### button — 23 instances

**Slots:** label, icon
**Variants:** outline
**Sizes:** sm · lg · xs

| variant | count | sample label |
|---|---|---|
| default | 22 | Product |
| outline | 1 |  |

## Brand Voice

**Tone:** formal · **Pronoun:** third-person · **Headings:** Sentence case (tight)

### Top CTA Verbs

- **play** (2)
- **product** (1)
- **solutions** (1)
- **resources** (1)
- **short** (1)
- **conversion** (1)
- **affiliate** (1)
- **legal** (1)

### Button Copy Patterns

- "play demo" (2×)
- "product" (1×)
- "solutions" (1×)
- "resources" (1×)
- "short links" (1×)
- "conversion analytics" (1×)
- "affiliate programs" (1×)
- "legal" (1×)

### Sample Headings

> Product
> Solutions
> Resources
> Company
> Compare

## Page Intent

**Type:** `landing` (confidence 0.45)
**Description:** Dub is the modern link attribution platform for short links, conversion tracking, and affiliate programs.

## Section Roles

Reading order (top→bottom): nav → nav → footer

| # | Role | Heading | Confidence |
|---|------|---------|------------|
| 0 | nav | — | 0.9 |
| 1 | nav | — | 0.9 |
| 2 | footer | Product | 0.95 |

## Material Language

**Label:** `material-you` (confidence 0.45)

| Metric | Value |
|--------|-------|
| Avg saturation | 0.473 |
| Shadow profile | soft |
| Avg shadow blur | 0px |
| Max radius | 9999px |
| backdrop-filter in use | no |
| Gradients | 14 |

## Imagery Style

**Label:** `flat-illustration` (confidence 0.131)
**Counts:** total 94, svg 65, icon 50, screenshot-like 0, photo-like 0
**Dominant aspect:** square-ish
**Radius profile on images:** rounded

## Component Library

**Detected:** `tailwindcss` (confidence 0.767)

Evidence:
- tailwind-like class density 74%

## Quick Start

To recreate this design in a new project:

1. **Install fonts:** Add `Inter` from Google Fonts or your font provider
2. **Import CSS variables:** Copy `variables.css` into your project
3. **Tailwind users:** Use the generated `tailwind.config.js` to extend your theme
4. **Design tokens:** Import `design-tokens.json` for tooling integration
