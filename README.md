# FoodieDash | Order Management System

A premium food ordering and real-time tracking application built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **Shadcn/UI**.

## 🚀 Key Features

- 🍕 **Curated Menu**: Browse a wide variety of dishes with rich visual previews.
- 🛒 **Advanced Cart UX**: 
  - Real-time quantity adjustments with item counters.
  - Smart item removal (Trash icon indicator).
  - Maximum quantity enforcement (Up to 10 per dish).
- 📝 **Structured Checkout**: 
  - Indian phone number validation (+91).
  - Granular address fields (Street, Landmark, City, Pincode).
  - Pincode validation (6-digit requirement).
- 🚚 **Animated Order Tracking**: 
  - Real-time order status updates.
  - Interactive delivery path visualization with an animated truck icon.
- 📜 **Order History**: 
  - Paginated orders list (initial load 10 + pagination).
  - High-impact order cards with status badges and currency (₹).
- 🌗 **Premium UI/UX**: 
  - Glassmorphism design aesthetics.
  - Dark mode support.
  - Smooth micro-animations and transitions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database instance

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/order_management?schema=public"
```

### 3. Installation
```bash
npm install
```

### 4. Database Initialization
```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

### 5. Development
```bash
npm run dev
```

## 📂 Project Structure

- `/app`: Next.js 15 App Router pages and global styles.
- `/components`: UI library and domain-specific components (Navbar, Cart, Orders, Tracking).
- `/hooks`: Custom hooks for state management (Cart context).
- `/lib`: Shared utility functions and database instance.
- `/prisma`: Database schema and seed data.

## 🎨 Design Philosophy
The application prioritizes **Visual Excellence** and **Functional Simplicity**. Every interaction is designed to feel fast, responsive, and animated, ensuring users are guided through the ordering process with constant visual feedback.

---
Built with ❤️ by [Sagar Deware](https://github.com/sagardeware)
