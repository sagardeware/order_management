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
- **Test-Driven Development (TDD)**: Comprehensive coverage using **Jest** and **React Testing Library**:
  - API endpoint verification for CRUD operations.
  - Form validation logic and input sanitization.
  - Core utility for status simulation logic.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Turbopack)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **UI/UX**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Logic & Forms**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)

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

# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate dev

# Seed initial menu data
npm run seed
```

### 4. Run Environment
```bash
# Start development server
npm run dev

# Run test suite
npm test
```

---
Built with ❤️ by [Sagar Deware](https://github.com/sagardeware)
