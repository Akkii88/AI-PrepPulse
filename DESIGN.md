# AI PrepPulse Design System

## 1. Overview
A clean, professional design system featuring soft gradients, gentle animations, and elegant typography. The aesthetic is calm, trustworthy, and modern—perfect for an interview preparation platform.

## 2. Color Palette

### Primary Colors (Soft Lavender/Periwinkle)
- **Lavender Light**: `#F5F3FF` - Backgrounds, subtle highlights
- **Lavender**: `#E8E4F3` - Primary surfaces
- **Periwinkle**: `#D4C5F9` - Primary accents, hover states
- **Lavender Deep**: `#B8A7E8` - Active states, emphasis

### Secondary Colors (Peach/Coral)
- **Peach Light**: `#FFF5F0` - Warm backgrounds
- **Peach**: `#FFE5D9` - Secondary surfaces
- **Coral**: `#FFCAB0` - Secondary accents
- **Coral Deep**: `#FFB088` - Warm emphasis

### Accent Colors (Sage/Mint)
- **Sage Light**: `#F0F7F1` - Success backgrounds
- **Sage**: `#D4E7D7` - Success surfaces
- **Mint**: `#B8DFC8` - Success accents
- **Mint Deep**: `#9DD4B0` - Success emphasis

### Neutral Colors
- **Cream**: `#FAF8F5` - Light backgrounds
- **Warm Gray Light**: `#F0EDE8` - Subtle surfaces
- **Warm Gray**: `#E8E3DC` - Borders, dividers
- **Gray Medium**: `#9B9490` - Secondary text
- **Gray Dark**: `#4A4458` - Primary text
- **Deep Purple**: `#2A2438` - Dark mode background

## 3. Typography

### Font Families
- **Primary**: `'Inter', 'Manrope', sans-serif` - Body text, UI elements
- **Display**: `'Manrope', sans-serif` - Headlines, hero text

### Font Sizes
- **Hero**: `72px` (4.5rem) - Main headlines
- **H1**: `48px` (3rem) - Page titles
- **H2**: `36px` (2.25rem) - Section headers
- **H3**: `24px` (1.5rem) - Card titles
- **Body Large**: `18px` (1.125rem) - Intro text
- **Body**: `16px` (1rem) - Default text
- **Small**: `14px` (0.875rem) - Captions, labels

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700
- **Black**: 900

## 4. Gradients

### Soft Gradient Combinations
```css
/* Primary Gradient */
background: linear-gradient(135deg, #E8E4F3 0%, #D4C5F9 100%);

/* Warm Gradient */
background: linear-gradient(135deg, #FFE5D9 0%, #FFCAB0 100%);

/* Success Gradient */
background: linear-gradient(135deg, #D4E7D7 0%, #B8DFC8 100%);

/* Hero Gradient */
background: linear-gradient(135deg, #FFF5F0 0%, #F5F3FF 50%, #E8E4F3 100%);

/* Subtle Background */
background: linear-gradient(180deg, #FAF8F5 0%, #F5F3FF 100%);
```

## 5. Spacing & Layout

### Spacing Scale
- **xs**: `4px` (0.25rem)
- **sm**: `8px` (0.5rem)
- **md**: `16px` (1rem)
- **lg**: `24px` (1.5rem)
- **xl**: `32px` (2rem)
- **2xl**: `48px` (3rem)
- **3xl**: `64px` (4rem)
- **4xl**: `96px` (6rem)

### Border Radius
- **Small**: `8px` - Buttons, inputs
- **Medium**: `12px` - Cards, small containers
- **Large**: `16px` - Large cards, modals
- **XL**: `24px` - Hero sections, feature cards
- **Full**: `9999px` - Pills, circular elements

### Shadows
```css
/* Subtle */
box-shadow: 0 1px 3px rgba(74, 68, 88, 0.08);

/* Soft */
box-shadow: 0 4px 12px rgba(74, 68, 88, 0.12);

/* Medium */
box-shadow: 0 8px 24px rgba(74, 68, 88, 0.15);

/* Large */
box-shadow: 0 16px 48px rgba(74, 68, 88, 0.18);

/* Glow (for accents) */
box-shadow: 0 8px 32px rgba(212, 197, 249, 0.4);
```

## 6. Design System Notes for Stitch Generation

**Platform**: Web, Desktop-first with responsive mobile design

**Visual Style**: Clean, professional, and calming with soft gradients and generous whitespace. Modern and trustworthy aesthetic suitable for professional development.

**Color Usage**:
- **Backgrounds**: Cream (#FAF8F5) to Lavender Light (#F5F3FF) gradients
- **Primary Actions**: Soft Lavender (#E8E4F3) to Periwinkle (#D4C5F9) gradients
- **Secondary Actions**: Peach (#FFE5D9) to Coral (#FFCAB0) gradients
- **Success/Positive**: Sage (#D4E7D7) to Mint (#B8DFC8) gradients
- **Text Primary**: Gray Dark (#4A4458)
- **Text Secondary**: Gray Medium (#9B9490)

**Typography**:
- Font: Inter or Manrope, clean sans-serif
- Headlines: 48-72px, bold to black weight
- Body: 16-18px, regular weight
- Generous line height (1.6-1.8) for readability

**Component Styling**:
- **Buttons**: Rounded (12px), soft gradient backgrounds, subtle shadow, smooth hover lift
- **Cards**: Rounded (16px), soft shadow, gentle hover elevation, white/cream backgrounds
- **Inputs**: Rounded (8px), subtle borders, soft focus glow
- **Icons**: Rounded containers with gradient backgrounds, 48-64px size

**Animation Principles**:
- Smooth, subtle transitions (300-400ms ease-out)
- Gentle hover effects (slight lift, soft glow)
- Fade-in animations for content
- No jarring or aggressive movements
- Floating/breathing animations for backgrounds

**Layout**:
- Generous whitespace and padding
- Maximum content width: 1280px
- Grid layouts with 24-32px gaps
- Centered content with balanced margins

**Accessibility**:
- High contrast text on backgrounds (WCAG AA minimum)
- Clear focus states with soft glows
- Readable font sizes (minimum 16px)
- Sufficient touch targets (minimum 44px)
