# Brand Guidelines

> **CRITICAL**: These brand guidelines are **MANDATORY** for all UI/UX decisions. Follow them strictly.

## 🎨 Color Palette

### Primary Colors

| Color Name      | Hex Code  | RGB              | Usage                                        |
| --------------- | --------- | ---------------- | -------------------------------------------- |
| **Teal Light**  | `#00A991` | rgb(0, 169, 145) | Primary brand color, CTAs, links, highlights |
| **Teal Medium** | `#006658` | rgb(0, 102, 88)  | Hover states, secondary elements, borders    |
| **Teal Dark**   | `#00241F` | rgb(0, 36, 31)   | Dark backgrounds, text on light backgrounds  |

### Neutral Colors (Extended)

| Color Name   | Hex Code  | RGB                | Usage                                  |
| ------------ | --------- | ------------------ | -------------------------------------- |
| **White**    | `#FFFFFF` | rgb(255, 255, 255) | Light backgrounds, cards, text on dark |
| **Gray 50**  | `#F9FAFB` | rgb(249, 250, 251) | Subtle backgrounds, hover states       |
| **Gray 100** | `#F3F4F6` | rgb(243, 244, 246) | Disabled states, dividers              |
| **Gray 200** | `#E5E7EB` | rgb(229, 231, 235) | Borders, separators                    |
| **Gray 300** | `#D1D5DB` | rgb(209, 213, 219) | Placeholder text, inactive elements    |
| **Gray 400** | `#9CA3AF` | rgb(156, 163, 175) | Secondary text, icons                  |
| **Gray 500** | `#6B7280` | rgb(107, 114, 128) | Body text, default text                |
| **Gray 600** | `#4B5563` | rgb(75, 85, 99)    | Headings, emphasis text                |
| **Gray 700** | `#374151` | rgb(55, 65, 81)    | Strong text, dark UI elements          |
| **Gray 800** | `#1F2937` | rgb(31, 41, 55)    | Headers, dark mode text                |
| **Gray 900** | `#111827` | rgb(17, 24, 39)    | Darkest backgrounds, high contrast     |
| **Black**    | `#000000` | rgb(0, 0, 0)       | Pure black for max contrast            |

### Semantic Colors

| Color Name  | Hex Code  | Usage                              |
| ----------- | --------- | ---------------------------------- |
| **Success** | `#10B981` | Success messages, completed states |
| **Warning** | `#F59E0B` | Warnings, cautions                 |
| **Error**   | `#EF4444` | Errors, destructive actions        |
| **Info**    | `#3B82F6` | Informational messages             |

## 🔤 Typography

### Font Family

**Primary Font**: **Space Grotesk**

- **Weights**: Regular (400), Bold (700)
- **Styles**: Normal, Italic
- **Usage**: All text across the website

### Font Styles

| Style       | Weight | Use Case                           |
| ----------- | ------ | ---------------------------------- |
| **Bold**    | 700    | Headings (h1-h3), emphasis, CTAs   |
| **Regular** | 400    | Body text, paragraphs, UI elements |
| **Italic**  | 400    | Quotes, subtle emphasis, captions  |

### Type Scale

| Element        | Size            | Weight        | Line Height |
| -------------- | --------------- | ------------- | ----------- |
| **H1**         | 3rem (48px)     | Bold (700)    | 1.2         |
| **H2**         | 2.25rem (36px)  | Bold (700)    | 1.3         |
| **H3**         | 1.875rem (30px) | Bold (700)    | 1.4         |
| **H4**         | 1.5rem (24px)   | Bold (700)    | 1.4         |
| **H5**         | 1.25rem (20px)  | Bold (700)    | 1.5         |
| **H6**         | 1rem (16px)     | Bold (700)    | 1.5         |
| **Body Large** | 1.125rem (18px) | Regular (400) | 1.6         |
| **Body**       | 1rem (16px)     | Regular (400) | 1.6         |
| **Body Small** | 0.875rem (14px) | Regular (400) | 1.5         |
| **Caption**    | 0.75rem (12px)  | Regular (400) | 1.4         |

### Character Set

```
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
1234567890
```

## 🎭 Logo Usage

### Logo Variants

1. **Primary Logo** (`logo.svg`)
   - **Colors**: Teal gradient (#00A991 → #006658)
   - **Usage**: Main logo for headers, branding
   - **Use by default** in most cases

2. **Expanded Logo** (`logo-expanded.svg`)
   - **Colors**: Teal gradient (#00A991 → #006658)
   - **Usage**: Rarely - only for wide spaces, landing pages
   - **Note**: Use sparingly

3. **Black & White Logo** (`logo-bw.svg`)
   - **Colors**: Monochrome black
   - **Usage**: Print materials, high-contrast situations

### Logo Rules

- ✅ **DO**: Maintain aspect ratio
- ✅ **DO**: Use on contrasting backgrounds
- ✅ **DO**: Ensure minimum size of 32px height for digital
- ❌ **DON'T**: Stretch or distort
- ❌ **DON'T**: Change colors
- ❌ **DON'T**: Add effects (shadows, gradients, outlines)
- ❌ **DON'T**: Place on busy backgrounds

### Clear Space

Maintain minimum clear space around logo equal to the height of the hourglass element.

## 🎨 Design Principles

### 1. Minimalism

- Clean, uncluttered layouts
- Generous white space
- Focus on content

### 2. Accessibility

- WCAG 2.1 AA compliance minimum
- Color contrast ratios: 4.5:1 for text, 3:1 for UI
- Semantic HTML usage

### 3. Consistency

- Use brand colors consistently
- Maintain type hierarchy
- Consistent spacing (8px grid system)

### 4. Modern & Professional

- Subtle animations and transitions
- Sharp, clean edges
- Contemporary design patterns

## 🖼️ UI Components

### Buttons

**Primary Button**:

```css
background: #00A991 (Teal Light)
hover: #006658 (Teal Medium)
text: #FFFFFF (White)
font-weight: 700 (Bold)
border-radius: 8px
padding: 12px 24px
```

**Secondary Button**:

```css
background: transparent
border: 2px solid #00A991
hover: background #00A99110
text: #00A991
font-weight: 700 (Bold)
```

### Cards

```css
background: #FFFFFF
border: 1px solid #E5E7EB (Gray 200)
border-radius: 12px
padding: 24px
shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
hover-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
```

### Links

```css
color: #00A991 (Teal Light)
hover: #006658 (Teal Medium)
underline: on hover
font-weight: 400 (Regular)
```

## 📐 Spacing System

Use 8px base unit for all spacing:

- **4px** (0.25rem): Micro spacing
- **8px** (0.5rem): Tight spacing
- **16px** (1rem): Default spacing
- **24px** (1.5rem): Medium spacing
- **32px** (2rem): Large spacing
- **48px** (3rem): Section spacing
- **64px** (4rem): Major section spacing

## 🌓 Dark Mode (Future)

When implementing dark mode:

- **Background**: Gray 900 (#111827)
- **Surface**: Gray 800 (#1F2937)
- **Primary Text**: White (#FFFFFF)
- **Secondary Text**: Gray 300 (#D1D5DB)
- **Primary Brand**: Keep Teal Light (#00A991)

---

## ⚠️ Implementation Notes

1. **All colors must be defined in Tailwind config**
2. **Space Grotesk must be loaded as web font**
3. **Logo variants stored in `/public/`**
4. **No deviations without explicit approval**
5. **Test accessibility for all color combinations**

---

**Last Updated**: January 26, 2026  
**Brand Owner**: SDX24
