# FoodieDash | Premium Order Management System

A high-performance, full-stack food ordering application featuring a dynamic menu, advanced cart management, and real-time order tracking simulation.

**🔗 Live Demo**: [https://order-management-q1nb.onrender.com/](https://order-management-q1nb.onrender.com/)

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
  - **E2E & UI (Playwright)**: Verifies real-world user journeys, localized currency rendering, and complex cart-to-checkout flows.

---

## 🏗️ Architecture & Approach

### 1. Strategic Development Process
The application was built using a **Database-First** and **API-First** methodology:
- **Schema Finalization**: First, the core data models (Orders, MenuItems) were defined using Prisma to ensure a solid foundation.
- **Backend Core**: RESTful API endpoints were developed with strict Zod validation to handle business logic securely.
- **Frontend Integration**: Finally, the UI was crafted using Next.js 15, consuming the reliable backend services.

### 2. Scalability & Maintainability
- **Modular Component Design**: Built with Shadcn/UI and Tailwind CSS, the UI is highly modular, making it easy to extend or restyle without side effects.
- **Stateless API Logic**: The backend calculates order status dynamically based on timestamps, reducing database overhead and making the system horizontally scalable.
- **Type Safety**: End-to-end TypeScript implementation ensures that data structures are consistent from the database to the browser.
- **Clean Code Architecture**: Adheres to SOLID principles, with clear separation of concerns between UI components, data hooks, and utility functions.

### 3. API Security & Structure
- **Payload Validation**: Every request is intercepted by Zod schemas to prevent malformed data or injection attacks.
- **Structured Responses**: Consistent JSON response formatting for easy debugging and frontend consumption.

### 4. Thorough Testing Philosophy
Tested at three distinct levels:
- **Unit**: Core algorithms and data transformations.
- **Integration**: API endpoint responses and database interactions.
- **E2E**: Critical user paths (Selection -> Checkout -> Tracking) using Playwright.

### 5. AI-Assisted Engineering
This project was developed in collaboration with **Antigravity**, utilizing AI for high-velocity code generation, complex testing implementation, and rapid UI prototyping while maintaining high architectural standards.

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

---

## 🚀 Deployment

The application is optimized for deployment on **Render** (Frontend/API) and **Neon** (Serverless PostgreSQL).

### 1. Database Setup (Neon)
1. Create a project at [Neon.tech](https://neon.tech/).
2. Copy the connection string.
3. Locally, sync the schema and seed data:
   ```powershell
   $env:DATABASE_URL="YOUR_NEON_URL"; npx prisma db push
   $env:DATABASE_URL="YOUR_NEON_URL"; npx prisma db seed
   ```

### 2. Web Service Setup (Render)
1. Connect your GitHub repo to a new **Web Service**.
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`
4. **Environment Variables**:
   - `DATABASE_URL`: Your Neon connection string.
   - `NODE_ENV`: `production`

---

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

## 🚀 Future Roadmap

While the core functionality is robust, the following enhancements are planned for future releases:

1.  **User Personalization**:
    *   **Authentication**: Implementing Clerk or NextAuth for secure user accounts.
    *   **Saved Addresses**: Allow users to save locations for faster checkout.
2.  **Location & Logistics**:
    *   **GPS Integration**: Automatic location detection using the Geolocation API.
    *   **Live Maps**: Real-time delivery partner tracking via Google Maps.
3.  **Growth & Rewards**:
    *   **Coupon System**: Support for promo codes and seasonal discounts.
    *   **Dynamic Pricing**: Strike-through pricing for sales events.
4.  **Operational Tools**:
    *   **Admin Dashboard**: Manage inventory and view sales analytics.
    *   **Notifications**: Real-time status updates via browser push.

---

Built with ❤️ by [Sagar Deware](https://github.com/sagardeware)
