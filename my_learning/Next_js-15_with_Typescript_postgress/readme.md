# Next.js 15 Full-Stack Course 🚀

_Complete Guide to Modern Web Development_

## 🧱 Course Structure

### ✅ Section 1: Getting Started with Next.js 15 (App Router)

#### Core Concepts

- **What is Next.js?** - Understanding the framework
- **Why use the App Router?** - Modern routing approach
- **Folder structure** - Understanding the `app/` directory
- **Essential files:** `layout.tsx`, `page.tsx`

#### Component Architecture

- **Server vs Client Components** - When to use each
- **Component boundaries** and performance implications

#### Routing System

- **Dynamic routing:** `[slug]` - Single parameter routes
- **Nested routes** - Complex route hierarchies
- **Catch-all routes:** `[...slug]` - Multiple parameters
- **Optional catch-all:** `[[...slug]]` - Flexible routing

#### Navigation & UX

- **Navigation with `next/link`** - Client-side navigation
- **Programmatic navigation:** `useRouter`, `useParams`, `useSearchParams`
- **Special files:**
  - `not-found.tsx` - Custom 404 pages
  - `loading.tsx` - Loading UI
  - `error.tsx` - Error boundaries
- **Route groups:** `(group)` - Organize without affecting URLs

#### SEO & Metadata

- **Static metadata** - Basic SEO setup
- **Dynamic metadata** with `generateMetadata()`
- **Metadata inheritance** and overrides

---

### ⚡ Section 2: Data Fetching, Caching & ISR

#### Server-Side Data Fetching

- **Server Components with fetch** - Native data fetching
- **Streaming with React's `use()` hook** - Progressive loading
- **Data fetching patterns** and best practices

#### Client-Side Data Fetching

- **Client fetching with `useEffect`** - Traditional approach
- **Modern solutions:** SWR & React Query
- **Caching strategies** and state management

#### Advanced Caching

- **Fetch configuration:**
  - `cache: 'no-store'` - Always fresh data
  - `revalidate` - Time-based revalidation
- **ISR (Incremental Static Regeneration):**
  - `generateStaticParams()` - Static path generation
  - `revalidate` - Background regeneration

---

## 🚀 Project 1: Full Blog Platform

### 🔐 Authentication System

- **Database Setup:** PostgreSQL + Drizzle ORM
- **Authentication:** Better Auth (JWT) with Drizzle adapter
- **User flows:**
  - User registration
  - Login/logout
  - Token refresh
- **Security:** Route protection with Middleware

### 🧠 Global State Management

- **State management:** Zustand for global state
- **Theme system:** Light/dark toggle using next-themes + TailwindCSS
- **Persistent preferences**

### 📝 Forms & Validation

- **Form handling:** React Hook Form + Zod validation
- **Server Actions:** `useFormState` + `useFormStatus`
- **UX enhancements:**
  - Optimistic UI updates
  - Auto-slug generation
- **Error handling** and user feedback

### 🛠️ Content Management (CRUD + ISR)

- **Blog operations:**
  - Create/edit/delete blog posts
  - Rich text editing
- **Static generation:** `generateStaticParams()` + ISR
- **Admin features:**
  - Admin approval system
  - Content moderation

### 🔍 Search Functionality

- **Database search:** PostgreSQL ILIKE / tsvector
- **UI components:**
  - Debounced search bar
  - Search results display
  - No-results fallback UI
- **Performance optimization**

### 🧭 Routing & Layout

- **Dynamic routes:** `/post/[slug]`
- **Custom pages:** 404 error page
- **Layout system:**
  - Complete header logic
  - Dashboard layout
  - Responsive design

---

## 🎨 Project 2: Asset Manager (Advanced Project)

_8 topics covered - Complete asset management system_

### 🔐 Google OAuth with Better Auth

- **OAuth integration:** Google authentication
- **Better Auth setup:** Seamless social login
- **User session management**
- **Profile synchronization**

### 👥 RBAC - User and Admin Roles

- **Role-Based Access Control:** User permissions system
- **Admin privileges:** Full system access
- **User restrictions:** Limited functionality
- **Role assignment and management**

### ☁️ Cloudinary File Upload

- **File upload system:**
  - Upload assets to Cloudinary
  - File validation and processing
- **Asset management:**
  - Store metadata in database
  - File organization and categorization

### 📝 Signed Upload with Server Actions

- **Secure uploads:** Server-side signature generation
- **Server Actions integration:** Modern upload handling
- **File validation:** Size, type, and security checks
- **Progress tracking** and error handling

### ✅ Admin Approval System

- **Content moderation:**
  - Admin review workflow
  - Approve/reject uploaded assets
- **Status management:**
  - Pending, approved, rejected states
  - Automated notifications

### 💳 PayPal Payment Integration

- **PayPal Smart Payment Buttons**
- **Premium features:** Unlock after payment
- **Transaction security:** Purchase protection
- **Payment verification**

### 🛒 Purchase Dashboard

- **User purchase tracking:**
  - Purchase history
  - Transaction records
- **Purchase status:** Active, expired, pending
- **Feature access control** based on purchases

### 🧾 Invoice Generation

- **Automated invoices:** Generate for purchases
- **Invoice management:**
  - Download PDF invoices
  - Invoice history
- **Tax calculations** and billing information

---

## 🧩 Utility Setup & Configuration

### Database & Authentication

- **Drizzle configuration** and database connection
- **CLI tools:** Better Auth + Drizzle setup
- **Migration management**

### Admin Features

- **Category management system**
- **Admin dashboard**
- **User role management**

### UI Components

- **Header/menu logic**
- **Responsive navigation**
- **Reusable components**

---

## 🛠️ Tech Stack

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features

### Database & ORM

- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database toolkit

### Authentication

- **Better Auth** - JWT-based authentication
- **Drizzle adapter** - Database integration

### Forms & Validation

- **React Hook Form** - Form state management
- **Zod** - Schema validation

### State Management

- **Zustand** - Lightweight state management
- **SWR** - Data fetching with caching
- **React Query** - Advanced server state management

### Styling

- **TailwindCSS** - Utility-first CSS framework
- **ShadCN UI** - Reusable component library
- **next-themes** - Theme management

### File Storage

- **Cloudinary** - Cloud-based file management

### Payments

- **PayPal API** - Payment processing

### Development Tools

- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account
- PayPal developer account

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nextjs-fullstack-course

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your database, Cloudinary, and PayPal credentials

# Setup database
npm run db:generate
npm run db:migrate

# Start development server
npm run dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# Authentication
BETTER_AUTH_SECRET="your-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# PayPal
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
```

---

## 📚 Learning Outcomes

By completing this course, you'll master:

- **Modern Next.js development** with App Router
- **Full-stack application architecture**
- **Authentication and authorization**
- **Database design and management**
- **File upload and management**
- **Payment integration**
- **SEO optimization**
- **Performance optimization**
- **Production deployment**

---

**Happy Coding! 🎉**
