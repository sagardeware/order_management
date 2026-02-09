# FoodieDash | Premium Order Management System

A high-performance, full-stack food ordering application featuring a dynamic menu, advanced cart management, and real-time order tracking simulation.

## ✨ Core Features

### 1. Dynamic Menu Explorer
- **Visual Catalog**: A rich list of food items (pizza, burgers, beverages, etc.) with high-quality visual previews.
- **Detailed Metadata**: Each item features a unique name, description, category badge, and localized pricing (₹).
- **Responsive Grid**: Fully optimized for seamless browsing across mobile and desktop devices.

### 2. Advanced Order Management
- **Interactive Cart**: Persistent shopping cart allowing users to aggregate multiple items effortlessly.
- **Micro-interactions**: Inline quantity controls with smart item removal (Trash icon indicator) and a maximum limit of 10 items per dish.
- **Structured Checkout**: A robust form with multi-field validation:
  - **Name**: Length-constrained validation (2-50 chars).
  - **Mobile**: Strict 10-digit Indian phone number format (+91).
  - **Address**: Granular fields for Street, Landmark, City, and Pincode (6-digit validation).

### 3. Real-Time Tracking & Visualization
- **Live Status Updates**: Visual progress indicators for order stages: “Order Received”, “Preparing”, and “Out for Delivery”.
- **Backend-Driven Simulation**: Real-time status transitions calculated on the server-side based on elapsed time.
- **Animated Delivery Tracking**: An interactive map-style path with an animated truck visualization specifically for the delivery phase.

### 4. Technical Excellence
- **Robust Backend**: REST API architecture handling order persistence, menu synchronization, and status retrieval.
- **Database & ORM**: PostgreSQL integration with Prisma for reliable data modeling and relational storage.
- **Full-Spectrum Testing**: 
  - **Unit & Logic (Jest)**: Validates core utilities, order status simulation.
  - **E2E & UI (Playwright)**: Verifies real-world user journeys, localized currency rendering, and complex cart-to-checkout flows in a headless/headed browser.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **UI/UX**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Logic & Forms**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Testing**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/), and [Playwright](https://playwright.dev/)

## 🧪 Testing

The project implements a multi-layered testing strategy to ensure reliability and maintainability.

### 1. Unit & Integration Tests (Jest)
Focuses on business logic, utility functions, and schema validation.
```bash
# Run all vitest/jest tests
npm test

# Run a specific test file
npx jest __tests__/validation.test.ts
```

### 2. End-to-End & UI Tests (Playwright)
Validates the entire application flow in a real browser environment.
```bash
# Run all UI tests (Headless)
npm run test:ui

# Watch tests run in a visible browser (Headed)
npx playwright test --headed
```

## 📦 Installation & Setup

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database

### 2. Environment Configuration
Create a `.env.local` file in the root:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/order_management?schema=public"
```

### 3. Build & Initialize
```bash
# Install dependencies
npm install

# Install Playwright browsers (first-time only)
npx playwright install chromium

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev

# Seed initial menu data
npm run seed
```

### 4. Run Environment
```bash
# Start development server (Port 3000)
npm run dev

# Run all test suites
npm test; npm run test:ui
```

---
Built with ❤️ by [Sagar Deware](https://github.com/sagardeware)
