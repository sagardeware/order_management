# Shadcn UI Project

A complete Next.js 15 project with **all shadcn/ui components** pre-installed, featuring a premium login page and a comprehensive dashboard with sidebar navigation.

## 🚀 Features

- ✨ **Next.js 15** with App Router and TypeScript
- 🎨 **48+ Shadcn/UI Components** pre-installed and ready to use
- 🌓 **Dark Mode** support with theme toggle
- 🔐 **Premium Login Page** with glassmorphism design
- 📊 **Dashboard** with collapsible sidebar navigation
- 🎯 **Responsive Design** for mobile and desktop
- ⚡ **Turbopack** for fast development
- 🎭 **Beautiful Animations** and transitions

## 📦 Installed Components

All shadcn/ui components are installed and available in `components/ui/`:

### Layout & Navigation
- **Sidebar** - Collapsible sidebar with navigation
- **Breadcrumb** - Navigation breadcrumbs
- **Navigation Menu** - Horizontal navigation
- **Menubar** - Application menu bar
- **Separator** - Visual dividers

### Forms & Inputs
- **Button** - Interactive buttons
- **Input** - Text input fields
- **Textarea** - Multi-line text input
- **Label** - Form labels
- **Form** - Form handling with validation
- **Checkbox** - Checkbox inputs
- **Radio Group** - Radio button groups
- **Select** - Dropdown select
- **Switch** - Toggle switches
- **Slider** - Range sliders
- **Input OTP** - One-time password input

### Data Display
- **Card** - Content containers
- **Table** - Data tables
- **Badge** - Status badges
- **Avatar** - User avatars
- **Skeleton** - Loading placeholders
- **Progress** - Progress indicators
- **Chart** - Data visualization
- **Carousel** - Image/content carousel

### Overlays & Modals
- **Dialog** - Modal dialogs
- **Sheet** - Slide-out panels
- **Drawer** - Bottom drawer
- **Popover** - Floating content
- **Tooltip** - Hover tooltips
- **Hover Card** - Rich hover content
- **Alert Dialog** - Confirmation dialogs
- **Context Menu** - Right-click menus
- **Dropdown Menu** - Dropdown menus

### Feedback
- **Alert** - Alert messages
- **Toast** - Toast notifications
- **Sonner** - Toast notifications (alternative)

### Interactive
- **Accordion** - Collapsible sections
- **Collapsible** - Collapsible content
- **Tabs** - Tabbed interfaces
- **Toggle** - Toggle buttons
- **Toggle Group** - Toggle button groups
- **Command** - Command palette
- **Combobox** - Autocomplete select

### Utilities
- **Scroll Area** - Custom scrollbars
- **Resizable** - Resizable panels
- **Pagination** - Page navigation

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

The project is already set up with all dependencies. Just run:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## 📁 Project Structure

```
shadcn-ui-project/
├── app/
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── dashboard/
│   │   ├── layout.tsx        # Dashboard layout with sidebar
│   │   └── page.tsx          # Dashboard page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Root page (redirects to login)
│   └── globals.css           # Global styles & theme variables
├── components/
│   ├── ui/                   # All shadcn/ui components
│   ├── app-sidebar.tsx       # Main sidebar component
│   ├── nav-main.tsx          # Main navigation
│   ├── nav-projects.tsx      # Projects navigation
│   ├── nav-user.tsx          # User menu
│   ├── team-switcher.tsx     # Team switcher
│   ├── theme-provider.tsx    # Theme provider
│   └── theme-toggle.tsx      # Dark mode toggle
├── lib/
│   └── utils.ts              # Utility functions
├── public/
│   └── grid.svg              # Background grid pattern
├── components.json           # Shadcn/ui configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Pages

### Login Page (`/login`)
- Beautiful glassmorphism design
- Email and password inputs with validation
- "Remember me" checkbox
- Social login buttons (GitHub, Google)
- Smooth animations and hover effects
- Gradient backgrounds
- Responsive design

### Dashboard (`/dashboard`)
- Collapsible sidebar navigation
- Stats cards showing key metrics
- Recent activity section
- Quick actions panel
- Storage and API usage indicators
- Project status overview
- Theme toggle for dark/light mode
- Fully responsive layout

## 🎯 Usage

### Adding New Components

All shadcn/ui components are already installed. To use them in your pages:

```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function MyPage() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

### Customizing Theme

Edit `app/globals.css` to customize theme colors:

```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  /* ... more variables */
}
```

### Dark Mode

The theme toggle is available in the dashboard header. Users can switch between:
- Light mode
- Dark mode
- System preference

## 🔧 Configuration

### Tailwind CSS
Configuration in `tailwind.config.ts` includes:
- Custom color palette
- Dark mode support
- Custom animations
- Sidebar-specific colors

### Shadcn/UI
Configuration in `components.json`:
- Style: New York
- Base color: Slate
- CSS variables enabled
- TypeScript support

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js 15 and shadcn/ui
