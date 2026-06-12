# Technical Specification — Full Stack Developer Portfolio

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `three` | ^0.172.0 | Hero background 3D gradient mesh |
| `gsap` | ^3.12.0 | All animations, ScrollTrigger, Flip plugin |
| `@gsap/react` | ^2.1.0 | `useGSAP` hook for React-safe GSAP |
| `lenis` | ^1.2.0 | Smooth scroll |
| `lucide-react` | ^0.468.0 | Icons throughout |
| `clsx` | ^2.1.0 | Conditional class names |
| `tailwind-merge` | ^2.6.0 | Merge Tailwind classes |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^6.0.0 | Build tool |
| `@vitejs/plugin-react` | ^4.3.0 | React support for Vite |
| `tailwindcss` | ^4.0.0 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0.0 | Tailwind Vite plugin |
| `typescript` | ^5.7.0 | Type safety |
| `@types/react` | ^19.0.0 | React type defs |
| `@types/react-dom` | ^19.0.0 | ReactDOM type defs |
| `@types/three` | ^0.172.0 | Three.js type defs |

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| `Navbar` | Custom | Shared | Fixed nav with scroll-aware background, mobile hamburger overlay |
| `Footer` | Custom | Shared | Copyright + back-to-top |
| `SectionTitle` | Custom | Reused × 7 | Heading + animated underline + subtitle |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| `HeroSection` | Custom | Split layout, portrait + text, hosts Three.js canvas |
| `AboutSection` | Custom | Bio + stats + info card |
| `SkillsSection` | Custom | 2-column skill bar grid |
| `ExperienceSection` | Custom | Vertical timeline with alternating entries |
| `ServicesSection` | Custom | 4-column service card grid |
| `PortfolioSection` | Custom | Filterable gallery, uses Flip for reflow |
| `TestimonialsSection` | Custom | 3-column testimonial card grid |
| `ContactSection` | Custom | Info cards + contact form |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| `SkillBar` | Custom | SkillsSection | Animated progress bar (label, track, fill) |
| `ServiceCard` | Custom | ServicesSection | Icon + title + description card with hover |
| `PortfolioCard` | Custom | PortfolioSection | Image + overlay + hover reveal |
| `TestimonialCard` | Custom | TestimonialsSection | Quote + client info card |
| `SocialLinks` | Custom | HeroSection, ContactSection | Row of circular social icon buttons |

### Hooks

| Hook | Purpose |
|------|---------|
| `useScrollEntrance` | Reusable GSAP ScrollTrigger entrance animation (fade + translateY) |
| `useLenis` | Lenis smooth scroll initialization |

### Three.js

| Element | Type | Notes |
|---------|------|-------|
| `HeroMeshBackground` | Custom component | PlaneGeometry(2,2) with custom shader material, OrthographicCamera, alpha renderer |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero 3D gradient mesh | Three.js | Custom ShaderMaterial (vertex + fragment), OrthographicCamera, requestAnimationFrame loop updating u_time uniform | **High** 🔒 |
| Typing cursor effect | GSAP | Custom: type chars sequentially with setInterval, blink cursor with GSAP yoyo tween, restart after 3s pause | **High** 🔒 |
| Timeline draw + entries | GSAP + ScrollTrigger | SVG line stroke-dashoffset animation for line; scale + translateX for dots/cards with stagger | **High** 🔒 |
| Skill bar fill | GSAP + ScrollTrigger | Animate width from 0% → target% with stagger. ScrollTrigger at top 80% | **Medium** |
| Portfolio filter reflow | GSAP Flip | Capture state before filter, Flip.from() on visible cards for animated reflow | **Medium** |
| Stat count-up | GSAP + ScrollTrigger | gsap.to() on proxy object with onUpdate writing to DOM. ScrollTrigger once | **Medium** |
| Navbar scroll background | GSAP ScrollTrigger | Toggle class on scroll past 100px (bg transparent → solid) | **Low** |
| Section entrances (global) | GSAP + ScrollTrigger | Batch pattern: opacity 0→1, y 40→0, triggered at top 85%. Applied via useScrollEntrance hook | **Low** |
| Section title entrance | GSAP + ScrollTrigger | Heading fade+y, underline width 0→50px, subtitle fade. Staggered. Part of useScrollEntrance | **Low** |
| Service card hover | CSS | translateY(-4px), shadow change, border color. Pure CSS transition | **Low** |
| Portfolio card hover | CSS | Image scale(1.05), overlay opacity transition. Pure CSS | **Low** |
| Button/link hovers | CSS | Background/color transitions. Pure CSS | **Low** |
| Hero content entrance | GSAP Timeline | Sequential timeline: portrait → name → typing → social → CTA with absolute delays | **Medium** |
| About info card slide | GSAP + ScrollTrigger | translateX(40→0) + fade, triggered at top 85% | **Low** |
| Contact cards/form slide | GSAP + ScrollTrigger | Cards from left (-30), form from right (+30), stagger on cards | **Low** |
| Footer fade | GSAP + ScrollTrigger | Simple opacity 0→1 | **Low** |

---

## State & Logic Plan

### Portfolio Filter State

Local `useState<string>` in `PortfolioSection` holding active filter category ("All" | "Web" | "App" | "Design"). On change:
1. Update state
2. Filter portfolio items array
3. GSAP Flip.from() animates the reflow of visible cards

### Typing Effect State Machine

Custom hook `useTypingEffect(text, speed, pause, restartDelay)` with internal state:
- `displayedText`: current shown text
- `isTyping`: whether actively typing
- `isDeleting`: whether in delete phase
- `showCursor`: boolean for cursor visibility

Phases: type → pause → delete → pause → restart. Managed with `setTimeout` chain, not `setInterval`, for precise phase control.

### Lenis Scroll Integration

Initialize Lenis in App root via `useLenis` hook. Store instance in ref. Provide scroll-to method for:
- Navbar link clicks (smooth scroll to section anchors)
- Back-to-top button (scroll to 0)

Lenis `scroll` event drives GSAP ScrollTrigger.update() via proxy — connect in hook initialization.

### Three.js Lifecycle

`HeroMeshBackground` manages its own Three.js lifecycle:
- Mount: create renderer, scene, camera, mesh, start RAF loop
- Resize: update renderer size + u_resolution uniform
- Unmount: dispose geometry, material, renderer, cancel RAF
- Renderer has `alpha: true` so CSS background shows through

---

## Other Key Decisions

### Raw Three.js over R3F

The hero mesh is a single fullscreen shader plane — no scene graph, no orbit controls, no 3D interactivity. Raw Three.js is lighter and avoids React Three Fiber's overhead for this minimal use case.

### Vite over Next.js

Single-page portfolio with no routing, no SSR requirements, no API routes. Vite provides faster DX and simpler output.

### No shadcn/ui

Design is fully custom dark theme with no standard form patterns that benefit from shadcn primitives. All components (inputs, buttons, cards) have custom styling that overrides shadcn defaults anyway. Avoid dependency bloat.

### Tailwind v4

Latest version with built-in Vite plugin, faster compilation, no separate config file needed.
