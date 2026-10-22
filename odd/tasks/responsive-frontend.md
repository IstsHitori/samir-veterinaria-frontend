# Frontend responsive pass

Objective: Make every routed frontend module usable across mobile, tablet, and desktop viewport sizes.
Branch: `feat/responsive-frontend` | Delivery: `ask-on-risk` | Runner: `npm run build`, `npm run lint`
Forecast: approximately 300 authored changed lines (additions plus deletions; generated files excluded).

## Specs

### S1 — Responsive behavior across frontend modules

User request, verbatim: "haz que el frontend en cada modulo sea 100% responsive de acuerdo a cada tamaño de pantalla"

Scope: all routed frontend modules in `src/router.tsx` (authentication, profile, dashboard, users, patients, owners, and medical reports), including shared app layout, tables, dialogs, and forms where they affect those modules.

Acceptance criteria:
- Layouts adapt at mobile, tablet, and desktop widths without unintended page-level horizontal overflow.
- Headings, action buttons, filters, pagination, forms, and dialogs remain usable at narrow widths.
- Dense tables preserve all columns and remain accessible through contained horizontal scrolling on narrow screens. Assumption: preserve the existing table presentation rather than changing tables into cards or hiding data.
- Existing routes, role-based navigation, data, and actions remain unchanged.

Checks: `npm run build`; `npm run lint`; responsive source readback. The frontend package has no test script or browser viewport test configured.

## Tasks

- T1 — S1 — Inline — Complete — Responsive private app shell, sidebar integration, and main-content sizing; commit pending.
- T2 — S1 — Inline — Open — Responsive user, patient, and owner index screens, filters, tables, and pagination; commit pending.
- T3 — S1 — Inline — Open — Responsive dialogs and form layouts, including user detail and patient create/edit flows; commit pending.
- T4 — S1 — Inline — Open — Responsive dashboard, profile, authentication, and medical-report screens; final cross-module readback and checks; commit pending.

## Log

### L1 — Original request

haz que el frontend en cada modulo sea 100% responsive de acuerdo a cada tamaño de pantalla

### L2 — Baseline mapping

- Current branch at baseline: `main`, commit `ad48c50` (`ui changes`), clean working tree.
- Routes are defined in `src/router.tsx:25-75`. The private sidebar already uses a mobile sheet; feature pages own most layout responsiveness.
- Responsive hotspots: fixed-width user detail dialog (`src/features/user/components/UserDetailsModal.tsx:31-34`); single-row user creation fields (`src/features/user/components/createUserModal.tsx:78-90`); fixed-size page titles and padding in user/patient/owner dashboards; medical-report header and pagination rows; unwrapped table cells and pagination.
- Existing tables support horizontal scrolling; preserve this behavior to avoid hiding clinical/user data.
- Engram mirror: pending. The active session is associated with `samir-veterinaria-backend`; do not write frontend recovery data under the backend project.

### L3 — Routing and verification plan

- Task is large because it spans multiple routed modules and coherent work units. Implementation route: direct inline; no writer trigger is met.
- Work-unit commits will be made on `feat/responsive-frontend` after each task. Push/PR remain user decisions.
- Forecast is below the approximate 400-line feature delivery threshold; retain `ask-on-risk` unless the measured running count exceeds it.
- No frontend test runner or browser viewport harness is configured. Run the required build and lint; report lint failures honestly and perform proportional source readback.

### L4 — T1 verification

- Updated `src/layouts/PrivateLayout.tsx`: the private content column now uses `min-w-0 flex-1`, preventing the sidebar and content from combining into an overflowing fixed-width row; added a compact responsive sticky toolbar for the sidebar trigger.
- `npm run build` — passed. `npx eslint src/layouts/PrivateLayout.tsx` — passed. `git diff --check` — passed.
- No applicable automated UI test or browser viewport harness exists; source readback and build/lint are the proportional checks for this shared-shell task.
