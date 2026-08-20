# Premium Dark Mode UI Guidelines (SaaS / Next-Gen Clinical AI)

Based on the deep analysis of the provided Behance/Dribbble inspirations (specifically the Wealth and Solar Gate dashboards), this project strictly adheres to the following premium dark-mode aesthetic.

## 1. Core Vibe & Aesthetic
*   **Style:** Cybernetic, Premium SaaS, Glassmorphism, High-Tech Clinical.
*   **Theme:** Strictly Dark Mode.
*   **Feeling:** Actionable, intelligent, sleek, and reducing cognitive load through visual hierarchy.

## 2. Color Palette
*   **Background (Deep Space):** `#09090b` (zinc-950) or `#020617` (slate-950). The base canvas should be extremely dark.
*   **Primary Accent (Neon Glow):** `#a3e635` (lime-400) or `#bef264` (lime-300). Used for primary buttons, active tab states, and chart lines. Represents "healthy" or "active".
*   **Secondary Accents:** Glowing yellows (`#fde047`) for warnings, and vibrant reds (`#f87171`) for critical alerts.
*   **Surfaces/Cards:** Translucent. `bg-white/5` or `bg-zinc-900/50` with subtle borders `border-white/10`.

## 3. UI Patterns
*   **Glassmorphism:** Use `backdrop-blur-md` heavily on sidebars, headers, and floating cards. Ensure the background behind them has subtle, dark gradient meshes so the blur effect is visible.
*   **Glowing Shadows:** Instead of hard drop shadows, use colored glows for active elements: `shadow-[0_0_15px_rgba(163,230,53,0.3)]`.
*   **Shapes:** Fully rounded (pill-shaped) badges, tabs, and buttons. Cards should have smooth, large border radii (`rounded-2xl` or `rounded-3xl`).
*   **Typography:** Crisp, sans-serif. Primary text is bright white (`text-white`), secondary text is muted silver (`text-zinc-400`).

## 4. Charts & Data
*   **Recharts:** Lines must use the Neon Green accent with a drop shadow to simulate a "glow" effect. Grid lines should be faint (`stroke-white/5`).
*   **Gauges:** Circular donut charts for metrics (e.g., Burn Rate, Power Usage -> translated to Vitals or Risk Scores).

**Mantra for future features:** "Does it look like a high-end command center?"
