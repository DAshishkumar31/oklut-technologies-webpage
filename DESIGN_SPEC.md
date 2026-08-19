# OKLUT Rebuild — Design Specification & Component Plan

> Same business, completely new digital experience.
> Reference: oklut.com (business content only — never its visual design)
> Status: v1.0 · Implementation-ready · Matches `src/styles/globals.css` + `src/data/content.js`

---

## 1. Design Direction

**Concept name: "Precision Studio"** — an editorial, engineering-grade visual language for a B2B technology partner.

Oklut builds the systems behind growing businesses. The site must feel like the product of the team itself: precise, fast, and quietly confident.

| Principle | Description |
|---|---|
| **Typography-led** | Oversized Space Grotesk headlines carry the hierarchy; Inter handles reading text. Type is the primary "image". |
| **Light-first, dark-accented** | Warm paper base for content sections; dramatic ink-black bands (hero, product showcase, CTA, footer) create rhythm, never noise. |
| **Asymmetry over symmetry** | Split layouts (7/5, 5/7 columns), bento grids with 2/3/4-span cards, sticky intro columns. Nothing is a uniform grid of identical cards. |
| **Restraint** | One gradient family (indigo→violet), used for: logo mark, text gradients on key words, hover glows. Never on backgrounds of full sections. |
| **Motion with purpose** | Every animation either reveals hierarchy, gives feedback, or guides attention. Entrance ≈ 0.5–0.6s. Nothing loops except ambient floats (off by default under reduced motion). |
| **Trust signals, front-loaded** | Stats, badges, testimonials, 24/7 support, and the phone number are woven through every scroll depth. |

**Visual vocabulary:**
- Blueprint grid texture (`bg-grid` / `bg-grid-dark`, 44px cells) on dark sections only
- Index numbers (`01`–`08`) as quiet decorative hierarchy
- Soft radial gradient glows in ink sections (indigo/violet at 20–30% opacity)
- Floating glass panels in the hero (dashboard + info chips), shadows not borders
- Gold reserved exclusively for star ratings

---

## 2. Color Palette

| Token | Value | Usage | Contrast (on its use) |
|---|---|---|---|
| `paper` | `#F6F5F2` | Page background (light mode base) | — |
| `paper-soft` | `#FBFAF8` | Cards, section bands, input backgrounds | — |
| `ink` | `#0B0F1A` | Dark sections, primary button bg, headings | 15.6:1 on paper |
| `ink-soft` | `#141A2B` | Dashboard panels, floating cards (dark) | — |
| `ink-muted` | `#232B42` | Secondary dark panel fill | — |
| `muted` | `#5D6575` | Body copy (light mode), 5.4:1 on paper | AA ✓ |
| `line` | `#E6E3DC` | Borders, dividers (light) | — |
| `line-dark` | `#242C45` | Borders, dividers (dark) | — |
| `accent` | `#5B5BEF` | Primary brand color: links, icons, active states, glows | 4.6:1 on paper (AA) |
| `accent-deep` | `#4545D8` | Accent hover | — |
| `accent-soft` | `#EEEDFD` | Icon chip backgrounds, active menu row | — |
| `violet` | `#8B5CF6` | Gradient partner, decorative glows | — |
| `gold` | `#E8A33D` | Star ratings only | — |
| `mint` | `#2DD4BF` | "Live"/positive status chips on dark; checkmarks | 9.1:1 on ink |

**Gradient family** (single source of truth):
```css
text-gradient / logo / hover-glow → linear-gradient(100deg, #5B5BEF, #8B5CF6)
```

**Usage ratios (rough):** paper 55% · ink 25% · neutrals 15% · accent ~4% · gold/mint <1%. Accent is a laser, not a floodlight.

**Semantic states:** success = mint, error = `#EF4444` (Tailwind `red-500`), warning = gold.

---

## 3. Typography System

| Token | Family | Role |
|---|---|---|
| `font-display` | Space Grotesk Variable | H1–H3, big numbers, nav logo, index numbers |
| `font-sans` | Inter Variable | Body, UI, labels, forms, small text |

Both are self-hosted via `@fontsource-variable` (zero external requests; `unicode-range` limits downloads to the latin subset actually used).

### Type scale

| Level | Size / line-height | Weight | Track | Use |
|---|---|---|---|---|
| Display / H1 | `clamp(2.5rem → 3.75rem)` / 1.08 | 700 | tight | Hero + page heroes |
| H2 | `2.75rem` lg · `3rem` sm / 1.1 | 700 | tight | Section titles |
| H3 | `1.25–1.5rem` / 1.2 | 700 | tight | Card titles |
| Body L | `1.125rem` / 1.7 | 400 | normal | Hero + CTA descriptions |
| Body | `1rem` / 1.7 | 400 | normal | Paragraphs |
| Small | `0.875rem` / 1.5 | 400–500 | normal | Card summaries, meta |
| Caption | `0.75–0.8125rem` | 500–600 | `0.08–0.2em` uppercase | Eyebrows, labels, tags |
| Numeric | `2.25–3rem` | 700 | tight | Counters, stats |

### Rules
- Headlines: `text-balance`; max ~12 words. Never sentence-case everything — bold display statements.
- Body: `max-w` ~ 35–45ch for reading comfort.
- Eyebrows (section labels): 11–12px, uppercase, `tracking-[0.18em]`, accent color, pill-wrapped on light or `paper/70` on dark.
- One gradient word per headline maximum (e.g. "business **forward**").

---

## 4. Spacing System

4px base scale (Tailwind defaults), plus a fixed section rhythm:

| Token | Value | Use |
|---|---|---|
| Section padding (large) | `py-24 sm:py-28` (6–7rem) | Every major section |
| Section padding (band) | `py-16 sm:py-20` | Stats strip |
| Grid gutters | `gap-5` (1.25rem) | Card grids |
| Card padding | `p-7 sm:p-8` | All cards |
| Container | `max-w-80rem`, `px-5 → px-8 → px-12` | `container-x` helper |
| Vertical rhythm | 4px × 4–12 | Heading→copy `mt-5/6`; section→grid `mt-14` |

Layout constant: **every section is `py-24 sm:py-28`** — alternating bands (ink / paper / paper-soft) differentiate sections without spacing variation.

---

## 5. Border-Radius System

| Token | Value | Use |
|---|---|---|
| `rounded-lg` | 0.5rem | Chips, tags, small controls |
| `rounded-xl` | 0.75rem | Icon chips, inputs, buttons inner |
| `rounded-2xl` | 1rem | Standard cards, buttons (default card radius) |
| `rounded-3xl` | 1.5rem | Large panels, showcase panel, hero dashboard |
| `rounded-full` | 999px | Pills, primary CTAs, avatars |

Rule: **only one scale per surface** — cards are `2xl`, their inner icon chips `xl`. The hero dashboard is the only `3xl`+ panel on the landing page.

---

## 6. Shadow System

Soft, layered, ink-tinted — never hard or colorful.

| Token | Value | Use |
|---|---|---|
| `shadow-card` | `0 1px 2px rgb(11 15 26/0.05), 0 10px 28px rgb(11 15 26/0.06)` | Default resting cards |
| `shadow-card-hover` | `0 2px 4px rgb(11 15 26/0.05), 0 24px 48px rgb(11 15 26/0.12)` | Card hover (combined with `-translate-y-1.5`) |
| `shadow-float` | `0 12px 32px rgb(11 15 26/0.16)` | Floating panels in hero, dashboard chips |
| `shadow-glow` | `0 0 0 1px rgb(91 91 239/0.14), 0 16px 48px rgb(91 91 239/0.22)` | Primary CTA hover, active tabs, logo mark |

Rule: glow = "this is the primary action / this is selected". Never more than one glowing element per viewport region.

---

## 7. Button Styles

### Primary
`rounded-full` · `bg-ink text-paper` → hover `bg-accent` + `shadow-glow` · height ~44px (`px-7 py-3.5`)

Micro-interaction: trailing `ArrowRight` translates `+4px` on hover (`group-hover:translate-x-1`).

Variants:

| Variant | Resting | Hover | Use |
|---|---|---|---|
| `primary-ink` | ink bg / paper text | accent bg + glow | Light sections (hero, forms) |
| `primary-paper` | paper bg / ink text | white bg + glow | Dark sections (hero alt) |
| `primary-accent` | accent bg / paper text | accent-deep + glow | CTA band, call buttons |
| `secondary` | transparent, 1px border | border brightens + 5% fill | "Explore", secondary actions |
| `ghost-link` | text + icon | icon translates; underline on text-links | Inline CTAs |

States: `:hover` above · `:focus-visible` 2px accent outline offset 3px · `:disabled` opacity-60, no cursor.

Hero CTAs are 48px tall (`py-3.5`); card CTAs are text-links that appear/activate on card hover.

---

## 8. Card Styles

| Card | Surface | Radius | Shadow | Hover |
|---|---|---|---|---|
| **Bento service card** | `paper-soft`, border `line` | 2xl | card → card-hover | `-translate-y-1.5`, glow blob fades in top-right, icon `scale-110 rotate-3`, "Explore service" link fades in |
| **Dark bento card** | `ink`, border `line-dark` | 2xl | card → card-hover | same, glow `accent/20`, mint checkmarks |
| **Badge mini-card** (Why us) | `paper-soft` | 2xl | none → card | `-translate-y-0.5` |
| **Pillar card** (Why us rows) | `paper-soft` | 3xl | none → card-hover | border `accent/40`, number tints accent, corner arrow slides in |
| **Product tab** | `white/5` dark | 2xl | — → glow when active | active = `accent/10` fill + `accent/50` border + glow |
| **Testimonial** | `paper-soft` | 3xl | card → card-hover | `-translate-y-1`; quote mark tints |
| **Value card** (About) | `paper-soft` | 3xl | — → card-hover | `-translate-y-1` |
| **Contact info card** | `paper-soft` | 3xl | — → card-hover | icon `scale-110 rotate-3` |

Card DNA: `border` + `paper-soft` fill + `rounded-2xl/3xl` + p-7/8 + index number or icon chip top-left. Icon chips are `size-12`, `rounded-2xl`, `bg-accent-soft text-accent`.

---

## 9. Section Styles

| Section type | Surface | Signature |
|---|---|---|
| **Hero / PageHero** | `ink` + `bg-grid-dark` + radial glows | Split columns; floating dashboard; scroll cue |
| **Trust strip** | `paper-soft`, `border-y line` | Label + CSS marquee of industries (edge-faded) |
| **Content section** | `paper` | `container-x`, SectionHeading top |
| **Bento band** | `paper` | 6-col md grid, spans 2/3/4 |
| **Showcase band** | `ink` | Tablist + animated detail panel |
| **Stats strip** | `paper-soft`, `border-y` | 2→4 col counters, dividers |
| **Process band** | `paper-soft`, `border-y` | 4 steps + gradient connector line (lg+) |
| **CTA band** | `ink` + grid + glow | Centered stack: badge → H2 → phone+email CTAs |
| **Footer** | `ink` | 12-col: brand / links / services / contact |

**SectionHeading pattern:** eyebrow pill → H2 (max-w-2xl, centered or left) → description. Consistent top margin `mt-14` to grids.

---

## 10. Animation Principles

### System
| Parameter | Value |
|---|---|
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` (expressive-out) — single `EASE` token |
| Entrance duration | 0.5–0.6s (reveal), 0.35s (tab switch) |
| Stagger | 0.06–0.12s between siblings |
| Hover | 0.3s, transform + shadow only (GPU-friendly) |
| Viewport trigger | `once: true`, root margin `-80px` |

### Canonical moves
1. **fadeUp** — 24px rise, default reveal for text/cards
2. **scaleIn** — 0.96 → 1, for stat cells, chips, testimonial cards
3. **stagger container** — parents orchestrate children (bento, lists, tabs)
4. **Hero entrance** — immediate (`initial/animate`, not scroll-triggered), 0.55s per item, no interaction blocking
5. **Counters** — `animate()` 0→value on first viewport entry, `easeOut`, `toLocaleString("en-IN")`
6. **Navbar** — height 72→56px + blur/shadow at scrollY > 32; active link underline `layoutId` morph
7. **Ambient floats** — hero chips oscillate ±9px over 6s, `useReducedMotion` gated, infinite loops only here
8. **Marquee** — 34s linear CSS, `motion-reduce` fallback = static wrap

### Rules
- Respect `prefers-reduced-motion` (global CSS kill-switch + `useReducedMotion` in JS).
- Never animate layout properties (`width`, `height`, `top`); use `transform` + `opacity`.
- No scroll-linked parallax, no scroll-jacking, no elements animating outside the viewport.
- Entrance animations must not block interaction: 0.55s max, CSS transforms only.

---

## 11. Responsive Breakpoints

Mobile-first (Tailwind defaults):

| Breakpoint | Value | Behavior |
|---|---|---|
| Base | < 640px | 1-col grids; nav → hamburger; hero visual stacked under copy (max-w-md); marquee scrolls |
| `sm` | 640px | 2-col stats, testimonials; buttons widen; floating card offsets grow |
| `md` | 768px | Bento grid engages (`grid-cols-6`, spans 2/3/4); contact cards 3-col; footer services |
| `lg` | 1024px | Desktop nav + phone number; hero 12-col split (7/5); WhyUs sticky column; process 4-col + connector line; dashboard panel right; login split screen |
| `xl` | 1280px | Full `container-x` width; type scale max |
| `2xl` | 1536px | Nothing extra — content caps at 80rem |

Non-negotiables: no horizontal scroll at any width; touch targets ≥ 44px; floating cards must not overlap copy on small screens (gap-16 protects).

---

## 12. Component Plan

### 12.1 Component inventory

| Component | File | Responsibility | Key props |
|---|---|---|---|
| `Navbar` | `components/Navbar.jsx` | Fixed header; transparent-over-hero state; scroll transform; active-link `layoutId`; owns menu state | — (reads router) |
| `MobileMenu` | `components/MobileMenu.jsx` | Animated slide-down menu; links + quote + call | `open`, `onClose` |
| `Logo` | `components/Logo.jsx` | Wordmark + gradient mark; dark-mode variant | `dark`, `className` |
| `Hero` | `components/Hero.jsx` | Split hero; headline, dual CTA, mini-stats, `DashboardPanel` (internal) | — |
| `DashboardPanel` | inside `Hero.jsx` | Floating dashboard + 4 ambient chips; animated bars | — |
| `IndustryStrip` | `components/IndustryStrip.jsx` | Marquee of 8 industries | — |
| `SectionHeading` | `components/SectionHeading.jsx` | Eyebrow + H2 + description; align + dark modes | `eyebrow`, `title`, `description`, `align`, `dark` |
| `FeatureCard` | `components/FeatureCard.jsx` | Bento card: icon chip, index, summary, checklist, hover reveal | `feature`, `dark`, `index` |
| `BentoGrid` | `components/BentoGrid.jsx` | 6-col bento assembly of 8 service cards | — |
| `ProductShowcase` | `components/ProductShowcase.jsx` | Accessible tablist (5 products) + `AnimatePresence` panel | — |
| `WhyUs` | `components/WhyUs.jsx` | Sticky intro + 4 pillar rows + 2×2 badge grid | — |
| `Stats` | `components/Stats.jsx` | 4 animated counters, dividers | — |
| `Counter` | `components/Counter.jsx` | Viewport-triggered number animation | `to`, `suffix` |
| `Process` | `components/Process.jsx` | 4 steps + connector line | — |
| `Testimonials` | `components/Testimonials.jsx` | 4 quote cards, stars, gradient avatars | — |
| `CTA` | `components/CTA.jsx` | Dark conversion band: phone + email + quote | — |
| `Footer` | `components/Footer.jsx` | 4-col ink footer, full contact data | — |
| `PageHero` | `components/PageHero.jsx` | Subpage hero (reuses hero texture + entrance) | `eyebrow`, `title`, `description`, `children` |
| `Reveal` | `components/Reveal.jsx` | Scroll-reveal wrapper for arbitrary content | `delay`, `y`, `className` |
| `ContactForm` | inside `pages/Contact.jsx` | Validated form → `services/api.js` → Supabase (mock fallback) | — |

### 12.2 Pages & routes

| Route | Page | Sections (top→bottom) |
|---|---|---|
| `/` | Home | Hero → IndustryStrip → BentoGrid → ProductShowcase → WhyUs → Stats → Process → Testimonials → CTA |
| `/services` | Services | PageHero → BentoGrid (reuse) → Engagement models → quote callout → CTA |
| `/about` | About | PageHero → Story (founder, 120+ team) → Values 2×2 → Badges → Stats → CTA |
| `/contact` | Contact | PageHero → Contact info cards → Form (name/email/phone/service/message) → CTA |
| `/login` | Login | Standalone split screen: brand panel + auth form (mock/Supabase) |
| `*` | NotFound | 404, gradient number, home link |

### 12.3 Data layer
`src/data/content.js` = single source of truth: `COMPANY`, `NAV_LINKS`, `SERVICES` (8, with sizes 2/3/4 for bento), `PRODUCTS` (5), `STATS`, `BADGES`, `PROCESS`, `TESTIMONIALS`, `INDUSTRIES`, `WHY_US`, `FORM_FIELDS`. No content hardcoded in components.

### 12.4 Motion & services
- `animations/variants.js` — `EASE`, `VIEWPORT`, `fadeUp`, `fadeIn`, `scaleIn`, `stagger`, `heroContainer`
- `lib/supabase.js` — env-gated client (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`), `null` fallback
- `services/api.js` — `submitContactMessage`, `signInClient` (mock success when Supabase absent)

### 12.5 Build order (when implementing)
1. Tokens (`globals.css`) → 2. Data layer → 3. Primitives (`Reveal`, `Counter`, `Logo`, `SectionHeading`, `PageHero`) → 4. Shell (`MainLayout`, `Navbar`, `MobileMenu`, `Footer`) → 5. Hero → 6. Bento + showcase → 7. Remaining bands → 8. Pages → 9. Code splitting + build verification.