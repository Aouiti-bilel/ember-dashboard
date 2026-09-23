# Ember Dashboard — Next.js + shadcn/ui

A healthcare admin dashboard inspired by the Ember Dashboard design.

Built from scratch with:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Recharts
- Responsive design

---

## 🎯 Project Goal

Recreate the dashboard experience step by step while keeping the code:

- Clean
- Reusable
- Responsive
- Type-safe
- Component-based
- Easy to customize

The project should use shadcn/ui components and global semantic theme tokens.

---

# 🚧 Development Roadmap

## Phase 1 — Project Foundation

- [ ] Create fresh Next.js project
- [ ] Configure TypeScript
- [ ] Configure Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Configure global CSS variables
- [ ] Configure fonts
- [ ] Clean default Next.js files

---

## Phase 2 — Application Layout

- [ ] Create Dashboard Shell
- [ ] Create Sidebar
- [ ] Create Navbar
- [ ] Create main content area
- [ ] Add responsive sidebar behavior
- [ ] Add mobile navigation

---

## Phase 3 — Global Theme System

- [ ] Light theme
- [ ] Dark theme
- [ ] System theme
- [ ] Semantic color tokens
- [ ] Primary colors
- [ ] Border colors
- [ ] Background colors
- [ ] Card colors
- [ ] Chart colors

---

## Phase 4 — Dashboard Customizer

- [ ] Create right-side Customizer drawer
- [ ] Theme selector
- [ ] Color selector
- [ ] Density selector
- [ ] Layout selector
- [ ] Container selector
- [ ] Sidebar / Top Navigation
- [ ] Fluid / Boxed container
- [ ] Persist settings

---

## Phase 5 — Dashboard Header

- [ ] Dashboard title
- [ ] Dashboard description
- [ ] Responsive header
- [ ] Header actions

---

## Phase 6 — Statistics

- [ ] Patients Today
- [ ] Appointments
- [ ] Bed Occupancy
- [ ] Revenue
- [ ] Reusable Stat Card
- [ ] Trend indicators

---

## Phase 7 — Charts

- [ ] Patient Vitals Monitor
- [ ] Bed Occupancy
- [ ] Department Workload
- [ ] Responsive charts
- [ ] Chart tooltips
- [ ] Chart legends

---

## Phase 8 — Appointments

- [ ] Upcoming Appointments
- [ ] Patient information
- [ ] Appointment time
- [ ] Department
- [ ] Status indicators

---

## Phase 9 — Schedule

- [ ] Today's Schedule table
- [ ] Patient
- [ ] Doctor
- [ ] Department
- [ ] Type
- [ ] Status
- [ ] Time
- [ ] Responsive table

---

## Phase 10 — Polish

- [ ] Loading states
- [ ] Empty states
- [ ] Hover states
- [ ] Animations
- [ ] Transitions
- [ ] Accessibility
- [ ] Mobile testing
- [ ] Tablet testing
- [ ] Desktop testing

---

# 📁 Target Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   │
│   ├── layout/
│   │   ├── dashboard-shell.tsx
│   │   ├── sidebar.tsx
│   │   └── navbar.tsx
│   │
│   ├── customizer/
│   │   └── customizer.tsx
│   │
│   └── dashboard/
│       ├── dashboard-header.tsx
│       ├── dashboard-stats.tsx
│       ├── vitals-chart.tsx
│       ├── bed-occupancy.tsx
│       ├── department-workload.tsx
│       ├── upcoming-appointments.tsx
│       └── schedule-table.tsx
│
└── lib/
    └── utils.ts
