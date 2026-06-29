# 🏥 MediCare Connect — Client Application

> A premium, modern healthcare management platform connecting patients with trusted medical professionals through real-time scheduling, automated digital invoicing, and advanced diagnostic records tracking.

---

## 🚀 Live Links & Credentials

*   **🌐 Live Deployment:** [https://medicare-connect-client.vercel.app](https://your-live-link-here.com)
*   **🔑 Admin Demo Email:** `admin@medicare.com`
*   **🔒 Admin Demo Password:** `AdminSecure2026!`

---

## 🛠️ Technology Stack & Libraries

### Core Architecture
*   **Framework:** Next.js 14+ (App Router with Streaming & Suspense boundaries)
*   **Style Engine:** Tailwind CSS
*   **Component Library:** HeroUI (formerly NextUI) & Gravity UI Icons
*   **Animations:** Framer Motion (Implemented across Hero Banners and Testimonial Carousels)

### State & Utilities
*   **Authentication:** Better Auth (Unified Session Sync Client)
*   **Data Visualization:** Recharts (Interactive SVG Admin Analytics)
*   **Payment Processing:** Stripe Elements SDK
*   **Notifications:** SweetAlert2 & React Hot Toast

---

## 🎨 Design Systems & UI Philosophy

MediCare Connect uses a custom, highly scannable medical aesthetic engineered to establish instant clinical trust.

*   **Primary Palette:** Deep Emerald (`#0f766e` to `#115e59`) representing medical safety and clean-room professionalism.
*   **Accent Accents:** Soft Amber (`#f59e0b`) for verification states, and Mint (`#10b981`) for cleared invoices.
*   **Layout Safety:** Full-width adaptive layouts, persistent layout sidebar systems, and explicit responsive container breakpoints down to `320px`.

---

## 🧠 Realized Challenges & Key Solutions

### 1. Advanced Multivariable Search & Server-Driven Pagination
*   **The Goal:** Allow users to filter hundreds of medical personnel efficiently without causing browser DOM bloat or repetitive layout reflows.
*   **The Execution:** Built a dynamic hook linking `useDebounce` input parameters to URL Search parameters (`?search=...&specialization=...&sort=fee-desc&page=1`). The Find Doctors UI uses explicit server-driven pagination calculating current index windows dynamically via MongoDB pipeline offsets.

### 2. High-Performance Client React Hooks Architecture
*   **The Bug Solved:** Fixed Next.js lifecycle errors caused by mixing async server component queries directly inside client-declared execution boundaries.
*   **The Refactor:** Shifted auth state context tracking to `authClient.useSession()`. Data triggers wait gracefully on UI loading skeleton screens before mapping states to state arrays.

### 3. Role-Based Route Guards (Admin, Doctor, Patient)
*   **Implementation:** Client routes extract cryptographic JSON Web Token metadata claims during initial context middleware processing. Users trying to modify or inspect routes beyond their permission levels are redirected cleanly to custom 404 pages using responsive error imagery.

---

## ⚙️ Environment Configuration

Create a `.env.local` file at the root of your project:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=process.env.NEXT_PUBLIC_SERVER_URL

# Better Auth Configuration
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_super_secure_better_auth_session_hash

# Firebase/Google Authentication Config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA1...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=medicare-connect.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=medicare-connect

# Stripe Gateways
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...