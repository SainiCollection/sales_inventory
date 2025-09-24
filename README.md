# Inventory Management (Frontend)

This project aims to **create a store inventory application** that can manage key business operations, including **inventory tracking**, **sales and billing**, **invoice generation**, **account management**, and **vendor data handling**. It is designed to be modular, scalable, and easy to extend. I is like a ERP solution.

A **React + TypeScript** Inventory Management System scaffolded with modular support for Inventory, Sales, Accounts, and Authentication. It uses a modern stack including React 18+, React Router v6+, Redux Toolkit, Material UI v5, Axios, React Hook Form, and Yup.

---

## ⚡ Quick Start

* Install dependencies:

```bash
npm install
```

* Start the development server:

```
npm start
```

---

## 🔐 Authentication

* Default demo credentials:

```
Username: admin
Password: password
```

* Fake login is located in:

```
src/modules/auth/services/authAPI.ts
```

Edit the `fakeLogin` function to change or remove the default login behavior.

---



## 📁 Project Structure (`/src`)

```
/src
  ├── assets/                  # Static files (images, icons, fonts)
  ├── components/              # Shared reusable UI components
  ├── constants/               # App-wide constants
  ├── hooks/                   # Custom React hooks
  ├── layouts/                 # App layouts using nested routing
  │   ├── AuthLayout.tsx         # Used for /login, /signup, /forgot-password
  │   └── DashboardLayout.tsx    # Used after login (includes sidebar)
  ├── modules/                 # Feature-based modules
  │   ├── inventory/
  │   │   ├── pages/
  │   │   ├── components/
  │   │   ├── services/
  │   │   └── inventorySlice.ts
  │   ├── sales/
  │   ├── accounts/
  │   └── auth/
  │       ├── pages/
  │       ├── services/
  │       └── authSlice.ts
  ├── redux/                   # Redux Toolkit setup
  │   ├── store.ts
  │   └── rootReducer.ts
  ├── routes/                  # Central routing config using nested routing
  │   └── AppRouter.tsx
  ├── services/                # Axios configuration and API client
  │   └── apiClient.ts
  ├── theme/                   # MUI theme customization
  │   ├── index.ts
  │   ├── palette.ts
  │   ├── typography.ts
  │   ├── components.ts
  │   └── ThemeProvider.tsx
  ├── utils/                   # Utility helper functions
  ├── App.tsx
  └── main.tsx

```

---



## 🔧 Routing Strategy (with `<Outlet />`)

Uses **React Router v6** with **nested routing** and layout-based route separation:

---



### 🔑 Auth Routes (`/login`, `/signup`, `/forgot-password`)

Wrapped in `AuthLayout.tsx`

---



### 📊 Dashboard Routes (`/inventory`, `/sales`, etc.)

Wrapped in `DashboardLayout.tsx` (with sidebar)

Each layout uses `<Outlet />` to render child routes dynamically.

---



## 🎨 Theme Configuration

* Based on **Material UI v5**
* Theme files in `/theme`:
  * Primary: `#1976d2`
  * Secondary: `#9c27b0`
  * Background: `#f4f6f8`
  * Text: `#333333`

---



## 🧠 State Management (Redux Toolkit)

* Store: `redux/store.ts`
* Root reducer: `redux/rootReducer.ts`
* Feature slices:
  * `inventorySlice.ts`
  * `salesSlice.ts`
  * `accountsSlice.ts`
  * `authSlice.ts`

Each module is responsible for managing its own state.

---



## 🌐 API Integration

* Axios client defined in `services/apiClient.ts`
* Modules use feature-specific services:

```
// Example: inventoryAPI.ts
import apiClient from '../../../services/apiClient';
export const fetchItems = () => apiClient.get('/inventory');
```

---

## 🧪 Mock Data

* `src/modules/inventory/mockdata.json` contains sample products
* Used when backend integration is not available

---

## 🧱 Forms & Validation

* Uses `React Hook Form` + `Yup`
* For Add/Edit modals and authentication forms
* Custom validation schemas per module

---

## 📦 Extending the App

* Add product form (modal) using React Hook Form
* Integrate real backend API endpoints
* Add role-based access control
* Add pagination and filtering in tables
* Convert reusable logic to custom hooks
* Implement E2E testing (Cypress) and unit testing

---

## 📘 TypeScript

The app uses **TypeScript** throughout:

* All components and slices use `.tsx` / `.ts`
* Recommended to add types/interfaces in each module
* Type-safe API responses and Redux actions
* Make seprate file for type/interface `*.d.ts`

---

## 📅 Planned Features

* [ ] Inventory CRUD (API)
* [ ] Sales dashboard
* [ ] Account management with roles
* [ ] Responsive design improvements
* [ ] Dark mode toggle
* [ ] Real authentication flow (JWT)
* [ ] Unit & E2E tests
* [ ] Type-safe forms

---

## 🛠 Environment Variables

Create a `.env` file:

<pre class="overflow-visible!" data-start="5288" data-end="5342"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-env"><span>VITE_API_BASE_URL=http://localhost:3000/api
</span></code></div></div></pre>

Used by `apiClient.ts` to call backend services.

---

## 📦 Extending the App

* Add product form (modal) using React Hook Form
* Integrate real backend API endpoints
* Add role-based access control
* Add pagination and filtering in tables
* Convert reusable logic to custom hooks
* Implement E2E testing (Cypress) and unit testing

---

## 📘 TypeScript

The app uses **TypeScript** throughout:

* All components and slices use `.tsx` / `.ts`
* Recommended to add types/interfaces in each module
* Type-safe API responses and Redux actions

---

## 📅 Planned Features

* [ ] Inventory CRUD (API)
* [ ] Sales dashboard
* [ ] Account management with roles
* [ ] Responsive design improvements
* [ ] Dark mode toggle
* [ ] Real authentication flow (JWT)
* [ ] Unit & E2E tests
* [ ] Type-safe forms

---

## 🛠 Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

Used by `apiClient.ts` to call backend services.
