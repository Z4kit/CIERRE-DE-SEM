---
name: Capital Becarios Cierre
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#49454e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#7a757f'
  outline-variant: '#cbc4d0'
  surface-tint: '#66558b'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#211143'
  on-primary-container: '#8c7bb3'
  inverse-primary: '#d0bdfa'
  secondary: '#745181'
  on-secondary: '#ffffff'
  secondary-container: '#f0c6fe'
  on-secondary-container: '#714e7e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001a42'
  on-tertiary-container: '#3980f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d0bdfa'
  on-primary-fixed: '#211143'
  on-primary-fixed-variant: '#4e3e72'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#e2b8ef'
  on-secondary-fixed: '#2c0d3a'
  on-secondary-fixed-variant: '#5b3a68'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  currency-display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  currency-cell:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  audit-code:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-precision, institutional aesthetic engineered for enterprise financial auditing and reconciliation on mobile devices. Designed specifically for operational teams closing weekly fellowship stipends and disbursements ("Cierre de Semana"), the UI projects absolute authority, structural clarity, and administrative rigor. 

The visual language balances **Corporate Modern** with functional **Tactile Data Density**:
- **Atmosphere**: Sovereign, structured, and immaculate. The dual deep-purple anchor conveys institutional trust and governance, avoiding the generic SaaS appearance while remaining strictly functional.
- **Tone**: Focused, audit-ready, low-friction, and zero-ambiguity. Financial figures and reconciliation states demand immediate visual triage without cognitive fatigue.
- **Form Factor Principle**: High-density mobile ergonomics. Every data point is optimized for single-thumb auditing, precise vertical review passes, and horizontally pannable accounting ledgers with pinned reference columns.

## Colors

The palette uses a dominant dual deep-purple identity layered over architectural slate foundations, paired with an uncompromising financial semantic system.

### Palette Architecture
- **Primary Sovereign (`#1E0D40`)**: The anchor tone for high-level app bars, primary action buttons, key metrics banners, and active navigation nodes.
- **Secondary Royal Deep (`#240532`)**: Used for contextual elevation surfaces, dark-tier cards, section dividers, and active audit selection containers.
- **Base Slate Surfaces**:
  - `Canvas Main`: `#F8FAFC` (Slate 50) for overall canvas background.
  - `Card / Row Alt Surface`: `#F1F5F9` (Slate 100) for nested groups, secondary item rows, and segmented controls.
  - `Border / Hairline`: `#CBD5E1` (Slate 300) and `#E2E8F0` (Slate 200).
  - `Pure White (`#FFFFFF`)`: Used exclusively for foreground card tiers and elevated modals.
- **Semantic Status Matrix**:
  - **Matched / Conciliado**: Surface `#ECFDF5`, Border `#A7F3D0`, Solid Icon/Text `#065F46`, Accent `#10B981`.
  - **Discrepancy / Revision**: Surface `#FFFBEB`, Border `#FDE68A`, Solid Icon/Text `#78350F`, Accent `#F59E0B`.
  - **Monthly Dispersion**: Surface `#EFF6FF`, Border `#BFDBFE`, Solid Icon/Text `#1E40AF`, Accent `#3B82F6`.
  - **Missing Invoice / Error**: Surface `#FEF2F2`, Border `#FECACA`, Solid Icon/Text `#991B1B`, Accent `#EF4444`.

### Contrast & Financial Hygiene
All status combinations must meet WCAG 2.1 AA (minimum 4.5:1 contrast for small text, 3:1 for large graphical elements). Critical status badges must always pair text labels with distinct glyph markers to ensure color-blind utility.

## Typography

The typography pairs **Plus Jakarta Sans** for structure and section leadership with **Inter** for audit data and currency manipulation.

### Rules of Engagement
- **Tabular Figures (`tnum`)**: All ledger tables, numeric currency displays, account totals, and audit IDs must enforce OpenType `font-feature-settings: "tnum" 1, "cv05" 1`. Numbers must stack with vertical decimal precision.
- **Currency & Metric Stacking**: Ledger numbers are explicitly right-aligned; currency symbols (`$`) and ISO codes (`MXN`) are anchored in smaller secondary weight (`label-sm`) adjacent to the primary figure.
- **Hierarchy Under Scan Load**: Primary ledger rows highlight the beneficiary name in `title-md`, secondary identifiers in `audit-code` (uppercase, muted slate), and financial sums in high-contrast `currency-cell`.

## Layout & Spacing

A compact, 4-column fluid mobile grid system built specifically for financial auditing on viewport widths from 360px to 428px, scaling safely up to desktop dashboards via nested flex layouts.

### Ergonomics & Grid Rules
- **Margins & Gutters**: Outer viewport gutters are locked at `margin: 1rem` (16px) on mobile to preserve readable line lengths, scaling to `1.5rem` on tablets.
- **Touch Targets**: All interactive targets (checkbox hitboxes, audit disclosure arrows, bulk selector pills, CTA bars) must maintain a strict minimum bounding box of `44px x 44px`.
- **Horizontal Ledger Viewports**: Accounting data tables employ a dual-layer strategy:
  1. Primary identifier column (Beneficiary / Matricula) remains `position: sticky; left: 0;` over a solid `#FFFFFF` backing with an optical drop divider.
  2. Financial transactional columns (Total Asignado, Retención, Dispersión, Estado CFDI) scroll horizontally on a fluid rail with snap points and clear scroll affordance fades.
- **Summary Sticky Dock**: The weekly balance reconciliation footer sticks to the screen bottom (`safe-area-inset-bottom`), presenting instant total matched versus balance pending without occluding audit items.

## Elevation & Depth

Visual depth is achieved through **low-contrast structural hairlines** paired with **tonal layering**, rather than aggressive skeuomorphic drops.

- **Level 0 (Canvas Base)**: `#F8FAFC`. Zero elevation. Houses background filters, week selectors, and overall audit progress indicators.
- **Level 1 (Auditing Cards & Tables)**: Pure white `#FFFFFF` surface bordered by a crisp `1px solid #E2E8F0`. Shadow is absent or subtly cast via `0px 1px 2px rgba(30, 13, 64, 0.04)` to differentiate independent scholar records.
- **Level 2 (Active Record & Swiped Drawer)**: `#FFFFFF` with border `1px solid #CBD5E1` and ambient shadow `0px 4px 12px rgba(30, 13, 64, 0.08)`. Used when expanding an audit item to view sub-items (CFDI receipt breakdown, dispersion split).
- **Level 3 (Reconciliation Dock & Sticky Summary)**: `#1E0D40` (Primary deep purple) or `#FFFFFF` with top border `1px solid #E2E8F0` and inverted shadow `0px -4px 16px rgba(30, 13, 64, 0.12)`.
- **Level 4 (Modal & Audit Override Sheets)**: `#FFFFFF` sheet resting on `#240532` scrim at 60% opacity (`rgba(36, 5, 50, 0.6)`), elevating resolution forms over the main closure ledger.

## Shapes

The design system adopts a **Soft (`1`)** shape language (base border-radius `0.25rem` / `4px`, cards and inputs `0.5rem` / `8px`). This preserves screen real estate and reflects an institutional, ledger-like precision without visual playfulness.

- **Data Cards**: `8px` (`0.5rem`) radius with a clean `1px` perimeter stroke.
- **Financial Badges & Chips**: `4px` (`0.25rem`) radius to anchor tightly next to monospaced and tabular figures.
- **Buttons & Touch Inputs**: `6px` to `8px` radius for clean geometric tactile targets.
- **Ledger Headers & Tab Containers**: `6px` radius on segmented controls, preserving the architecture of industrial software.

## Components

### 1. Buttons & Audit Actions
- **Primary Execution Button**: Solid `#1E0D40` background, `#FFFFFF` text, `48px` height, full width on mobile. Used for "Confirmar Cierre Semanal" or "Validar Dispersión". Active state shifts to `#240532`.
- **Secondary Action**: `#FFFFFF` background, `1px solid #CBD5E1`, text `#1E0D40`.
- **Destructive/Reject**: Surface `#FEF2F2`, border `#FECACA`, text `#991B1B`. Used for rejecting submitted receipts.

### 2. Status Chips & High-Contrast Badges
- **Dimensions**: Compact height (`22px`), uppercase text in `label-sm`, letter spacing `0.04em`.
- **States**:
  - `Conciliado`: Background `#ECFDF5`, border `#A7F3D0`, text `#065F46`, leading glyph: Check circle.
  - `Discrepancia`: Background `#FFFBEB`, border `#FDE68A`, text `#78350F`, leading glyph: Alert triangle.
  - `Dispersión Mensual`: Background `#EFF6FF`, border `#BFDBFE`, text `#1E40AF`, leading glyph: Refresh/calendar arrow.
  - `Sin Factura`: Background `#FEF2F2`, border `#FECACA`, text `#991B1B`, leading glyph: Cross circle.

### 3. Checkboxes & Selection Targets
- **Dimensions**: Visual square `20px x 20px`, enclosed inside a mandatory `44px x 44px` invisible tap target container.
- **Selected State**: Solid `#1E0D40` fill with a sharp white checkmark.
- **Indeterminate State**: `#1E0D40` with a centered white horizontal bar (used for partial batch selection).

### 4. Input Fields & Audit Filters
- **Default State**: Background `#FFFFFF`, border `1px solid #CBD5E1`, text `#1E0D40`, placeholder `#94A3B8`, height `44px`, font `body-md`.
- **Focused State**: Border `1.5px solid #1E0D40`, ring `2px rgba(30, 13, 64, 0.1)`.
- **Error / Discrepancy Field**: Border `1.5px solid #EF4444`, ring `2px rgba(239, 68, 68, 0.1)`.

### 5. Audit Record Card (Mobile-First)
- Stacked white card (`#FFFFFF`) with top header row containing: Beneficiary Name (`title-md`), Matricula (`audit-code`), and the High-Contrast Status Badge.
- Middle segment contains tabular grid: Monto Asignado vs. Monto Comprobado with side-by-side delta indicator.
- Footer action row includes single-tap audit review, attachment clip icon (with receipt count badge), and validation toggle.

### 6. Sticky Reconciliation Ledger Dock
- Stays pinned above safe bottom margin.
- Left zone displays total matched count (e.g., `142/150 Becarios`), center zone highlights remaining discrepancy sum in `#B45309`, and right zone displays the final "Cierre de Semana" lock CTA button.