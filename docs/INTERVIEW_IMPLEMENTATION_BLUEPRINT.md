# 🎯 2 YOE Interview Claim vs Reality Audit & Implementation Blueprint

This document audits the **4 key claims** you want to tell interviewers. For each claim, it details **what is currently in your codebase**, **why it would fail in an interview if asked to show the code**, **where to implement it**, and **complete base implementation code**.

---

## 📊 Summary Scorecard

| # | Interview Claim | Current Reality in Code | Status | Action Needed |
|---|----------------|-------------------------|--------|---------------|
| **1** | **App Router Architecture**<br>*(Route groups, nested layouts, minimal re-renders)* | `(site)` & `(dashboard)` exist, but **NO `(site)/layout.tsx`** exists. `<Navbar />` & `<Footer />` are duplicated in 17 pages. | ⚠️ **Partial / Broken** | Create `(site)/layout.tsx`, remove manual Navbar/Footer from all pages. |
| **2** | **Authentication & Security**<br>*(JWT, Axios 401 retry interceptor, Edge Middleware)* | 401 interceptor exists in `apiClient.ts`, but **`middleware.ts` is 100% MISSING**. Most services bypass `apiClient` with raw `axios`. | ⚠️ **Partial / Broken** | Add `src/middleware.ts`, add Request Interceptor in `apiClient.ts`, route all services through it. |
| **3** | **Performance Optimization**<br>*(next/font self-hosting, next/image, lazy-load SDKs)* | Fonts loaded via render-blocking `<link>` tag. Razorpay loaded globally on every route. 8.3MB image in `public/`. | ❌ **NOT DONE** | Migrate to `next/font/google`, load Razorpay on-demand only on checkout, optimize images. |
| **4** | **State Management & Custom Hooks**<br>*(React Context session state, decoupled custom hooks)* | `AuthProvider` doesn't provide Context (returns `<>{children}</>`). **Zero custom hooks exist**. All API calls hardcoded in UI. | ❌ **NOT DONE** | Create true `AuthContext` + `CartContext`, create custom hooks (`useAuth`, `useCart`, `useDoctors`). |

---

## 🛠️ Step-by-Step Implementation Blueprint & Base Code

---

### Claim 1: App Router Architecture & Nested Layouts
> *"I organized routes using Next.js route groups (site) for consumer health portal and (dashboard) for admin, utilizing nested layouts to minimize re-renders."*

#### 🔍 What is currently in your code:
1. `apps/client/src/app/(site)` exists, but has **no `layout.tsx`**.
2. Because of this, `<Navbar />` and `<Footer />` are manually imported and rendered in:
   - `Home/page.tsx`
   - `about/page.tsx`
   - `doctor/page.tsx`
   - `buy-medicines/page.tsx`
   - `privacy-policy/page.tsx`
   - ...and 12 other files!
3. When the user navigates between pages, the entire Navbar unmounts, remounts, and re-runs its internal `useEffect` (`localStorage.getItem`). Re-renders are **not** minimized.

#### 📍 Where to implement:
Create: `apps/client/src/app/(site)/layout.tsx`

#### 💻 Base Code:
```tsx
// File: apps/client/src/app/(site)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

#### 🧹 Cleanup:
Open each subpage in `apps/client/src/app/(site)/**/page.tsx` (e.g., `doctor/page.tsx`, `buy-medicines/page.tsx`, `privacy-policy/page.tsx`) and **delete**:
```tsx
// DELETE these from individual pages:
import Navbar from "...";
import Footer from "...";

// And remove <Navbar /> and <Footer /> from JSX!
```

---

### Claim 2: Authentication & Security (Middleware & Interceptors)
> *"Implemented role-based auth (Patients & Doctors) with JWT tokens. Used Axios response interceptors for 401 token refresh retry mechanisms and Next.js Edge Middleware for route protection."*

#### 🔍 What is currently in your code:
1. **Edge Middleware is completely missing.** In `(dashboard)/admin/layout.tsx`, you use:
   ```tsx
   useEffect(() => {
     const adminAccessToken = localStorage.getItem("adminAccessToken");
     if (!adminAccessToken) router.push("/admin-login");
   }, []);
   ```
   *Why this fails in interviews:* This is client-side redirection. The protected admin page flashes on screen (FOUC) before redirecting. An interviewer will ask: *"Why didn't you use Next.js Middleware?"*
2. In `services/productService.ts`, `services/doctors.ts`, `services/authService.ts`, you use raw `axios.get()` instead of `apiClient.get()`. Your 401 retry interceptor in `apiClient.ts` is never triggered for them!
3. `apiClient.ts` has no **Request Interceptor**, forcing every single service function to manually write:
   ```ts
   const token = localStorage.getItem("userAccessToken");
   headers: { Authorization: `Bearer ${token}` }
   ```

#### 📍 Where to implement:
1. Middleware: `apps/client/src/middleware.ts`
2. Unified Axios Client: `apps/client/src/services/apiClient.ts`

#### 💻 Base Code (1): Next.js Edge Middleware
```ts
// File: apps/client/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve token from cookies (or authorization header)
  const userToken = request.cookies.get('userAccessToken')?.value;
  const adminToken = request.cookies.get('adminAccessToken')?.value;
  const doctorToken = request.cookies.get('doctorAccessToken')?.value;

  // Protected User Routes
  const isUserRoute = pathname.startsWith('/user-orders') || 
                      pathname.startsWith('/user-appointment') || 
                      pathname.startsWith('/cart');
  if (isUserRoute && !userToken) {
    const loginUrl = new URL('/user-login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protected Admin Routes
  const isAdminRoute = pathname.startsWith('/admin');
  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }

  // Protected Doctor Routes
  const isDoctorRoute = pathname.startsWith('/doctor-appointment');
  if (isDoctorRoute && !doctorToken) {
    return NextResponse.redirect(new URL('/doctor-login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user-orders/:path*',
    '/user-appointment/:path*',
    '/cart/:path*',
    '/admin/:path*',
    '/doctor-appointment/:path*',
  ],
};
```

#### 💻 Base Code (2): Robust `apiClient.ts` (Request + Response Interceptors)
```ts
// File: apps/client/src/services/apiClient.ts
import axios from "axios";
import { userRefreshToken, doctorRefreshToken } from "./authService";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:5000",
  withCredentials: true,
});

// 1. Automatic Token Attachment on EVERY request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = 
      localStorage.getItem("userAccessToken") ||
      localStorage.getItem("doctorAccessToken") ||
      localStorage.getItem("adminAccessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 2. 401 Interceptor: Silent Token Refresh & Retry
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";

      try {
        if (pathname.startsWith("/doctor")) {
          const res = await doctorRefreshToken();
          const newToken = res?.data?.accessToken;
          if (newToken) localStorage.setItem("doctorAccessToken", newToken);
        } else {
          const res = await userRefreshToken();
          const newToken = res?.data?.accessToken;
          if (newToken) localStorage.setItem("userAccessToken", newToken);
        }

        // Replay original request with refreshed session
        return apiClient(originalRequest);
      } catch (refreshErr) {
        // Refresh token failed -> Force login redirect
        if (typeof window !== "undefined") {
          window.location.href = pathname.startsWith("/doctor") ? "/doctor-login" : "/user-login";
        }
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

### Claim 3: Performance Optimization (Fonts, Images, Lazy SDKs)
> *"Optimized Core Web Vitals by self-hosting web fonts via next/font, using Next Image optimization, and lazy-loading heavy third-party SDKs like Razorpay."*

#### 🔍 What is currently in your code:
1. `layout.tsx` lines 18-20: Uses an external Google Fonts stylesheet link (`<link href="https://fonts.googleapis.com/css2?...">`). This creates 2 extra HTTP connections and causes CLS (Layout Shift).
2. `layout.tsx` line 24: Loads Razorpay globally via `<Script src="https://checkout.razorpay.com/v1/checkout.js" />` on **every single page**, even on static pages like `/about` or `/privacy-policy`.
3. `public/contact.jpg` is **8.3 MB** in size!
4. In `privacy-policy/page.tsx` line 10 and `contact/page.tsx` line 13: You wrote `height={20} width={1200}` which produces a distorted 60:1 aspect ratio.

#### 📍 Where to implement:
1. Self-hosted Fonts: `apps/client/src/app/layout.tsx`
2. On-demand Razorpay Loader Utility: `apps/client/src/utils/loadRazorpay.ts`

#### 💻 Base Code (1): `next/font/google` in `layout.tsx`
```tsx
// File: apps/client/src/app/layout.tsx
import './global.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { GoogleOAuthProvider } from "@react-oauth/google";

// Automatically self-hosts font, zero Google network requests at runtime, zero CLS
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata = {
  title: 'CareHub | AI-Powered Healthcare & Telemedicine Platform',
  description: 'Book verified doctors, order genuine medicines, and get instant AI health reports.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} antialiased max-w-full mx-auto`}>
        <GoogleOAuthProvider clientId={googleClientId}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
```

#### 💻 Base Code (2): Lazy Load Razorpay ONLY When User Clicks Checkout
Delete `<Script src="https://checkout.razorpay.com/v1/checkout.js" />` from `layout.tsx`. Instead, dynamically load it when payment is triggered:

```ts
// File: apps/client/src/utils/loadRazorpay.ts
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // If already loaded in window, resolve immediately
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
```

**Usage inside Payment function (`services/payment.ts` or checkout page):**
```ts
const handlePayment = async () => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load. Please check your internet connection.");
    return;
  }
  // Initialize new (window as any).Razorpay(options).open()
};
```

---

### Claim 4: State Management & Custom Hooks
> *"Used React Context for lightweight session state and custom hooks to decouple API calls from UI presentation components."*

#### 🔍 What is currently in your code:
1. `apps/client/src/components/AuthProvider.tsx` is not a Context. It has no `createContext`, no `useContext`, and provides no values to children.
2. In `Navbar.tsx`, `doctor/page.tsx`, `cart/page.tsx`, the UI components directly call `doctorList()`, `userProfile()`, `cartList()`, managing raw `useState` and `useEffect` inline.
3. No Cart Context exists. Adding an item in `buy-medicines` does not update the cart icon badge in `Navbar`.

#### 📍 Where to implement:
1. True Auth Context: `apps/client/src/context/AuthContext.tsx`
2. Cart Context (for Navbar badge): `apps/client/src/context/CartContext.tsx`
3. Custom Hook (`useDoctors`): `apps/client/src/hooks/useDoctors.ts`

#### 💻 Base Code (1): Real `AuthContext.tsx`
```tsx
// File: apps/client/src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { userProfile } from "@/services/user";

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAuthenticated: false,
  loading: true,
  logout: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const storedRole = localStorage.getItem("userRole") || localStorage.getItem("doctorRole");
      const token = localStorage.getItem("userAccessToken") || localStorage.getItem("doctorAccessToken");

      if (token) {
        setRole(storedRole);
        const profile = await userProfile();
        setUser(profile?.data?.data || null);
      } else {
        setUser(null);
        setRole(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user || !!role,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

#### 💻 Base Code (2): Custom Hook (`useDoctors.ts`) to Decouple UI from API
```ts
// File: apps/client/src/hooks/useDoctors.ts
"use client";

import { useState, useEffect, useMemo } from "react";
import { doctorList } from "@/services/doctors";

export interface Doctor {
  _id: string;
  name: string;
  specialties: string;
  experience: string;
  price: number;
  place: string;
  profile?: string;
}

export function useDoctors(searchQuery = "") {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await doctorList();
      setDoctors(res?.data?.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Filtered doctors memoized
  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return doctors;
    return doctors.filter(
      (doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialties.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [doctors, searchQuery]);

  return { doctors: filteredDoctors, totalCount: doctors.length, loading, error, refetch: fetchDoctors };
}
```

**Now see how clean `doctor/page.tsx` becomes:**
```tsx
// File: apps/client/src/app/(site)/doctor/page.tsx
"use client";

import { useState } from "react";
import { useDoctors } from "@/hooks/useDoctors";

export default function DoctorListPage() {
  const [search, setSearch] = useState("");
  const { doctors, loading, error } = useDoctors(search);

  if (loading) return <div>Loading verified doctors...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Search doctors or specialties..." 
        className="w-full p-3 border rounded-lg"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="p-4 border rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-gray-500">{doctor.specialties}</p>
            <p className="text-sm font-medium text-emerald-600">₹{doctor.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```
*(Notice: No Navbar or Footer needed here because `(site)/layout.tsx` wraps it! No direct axios/service calls here because `useDoctors` handles it!)*

---

## 🏆 Interview Readiness Summary

Once you apply these 4 implementations:
1. When asked about **App Router**, you can open `apps/client/src/app/(site)/layout.tsx` and show how your navigation stays persistent while children re-render.
2. When asked about **Security & Middleware**, you can open `src/middleware.ts` and explain how Edge Middleware intercepts protected routes before rendering.
3. When asked about **Performance**, you can show `layout.tsx` with `next/font/google` and `utils/loadRazorpay.ts` showing on-demand script loading.
4. When asked about **State Management**, you can show `AuthContext.tsx` and `useDoctors.ts` showing clean separation of concerns and custom hooks.
