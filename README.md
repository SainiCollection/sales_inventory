# Inventory Management (frontend)

Scaffolded React app with Inventory, Sales, Accounts, and Auth modules using React 18, React Router v6, Redux Toolkit, MUI v5, Axios, React Hook Form and Yup.

Quick start

1. Install dependencies:
```powershell
npm install
```

2. Start dev server:
```powershell
npm start
```

Login

Default test credentials (for local/demo only):

- username: `admin`
- password: `password`

Where to change the credentials:

- The demo/fake login is implemented in `src/modules/auth/services/authAPI.js` in the `fakeLogin` function. Update that file to modify the allowed username/password or replace with real authentication logic that calls your backend API.

Example (file to edit):

`src/modules/auth/services/authAPI.js`

Search for `fakeLogin` and adjust behavior as needed.

Design notes
- Font: Inter is used for a compact, modern UI. The font is imported in `src/index.css`.
- Compact table: The Inventory table uses MUI's `size="small"` and reduced paddings to show more rows per screen. Modify `src/modules/inventory/pages/InventoryPage.jsx` to change density or sizing.

Mock data
- `src/modules/inventory/mockdata.json` contains sample data loaded when no backend is available.

Extending the app
- Add/Edit product modal (React Hook Form + Yup) — can be added to `modules/inventory/components` and wired to `modules/inventory/services/inventoryAPI.js`.
- Persist data to backend: implement API endpoints and update `inventorySlice` thunks (create/update/delete) to call them.
Generate a scalable React app, Inventory Management System that includes modules for Inventory, Sales, and Account Management.

The tech stack includes:

- React 18+
- React Router v6+
- Redux Toolkit for state management (slice-per-feature)
- Material UI (MUI v5) with custom theme configuration
- Axios for API calls
- React Hook Form + Yup for form handling and validation
- Optional: TypeScript (ask user if needed)

### ✅ Project Requirements:

#### 1. Folder Structure (inside `/src`)

Create a modular, scalable folder structure like:

/src
  ├── assets/                  # Static files like images, fonts
  ├── components/              # Shared reusable components (Button, Modal, Table)
  ├── layouts/                 # AppShell, AuthLayout, etc.
  ├── modules/                 # Feature modules
  │   ├── inventory/
  │   │   ├── pages/
  │   │   ├── components/
  │   │   ├── services/         # API calls (e.g., inventoryAPI.js)
  │   │   └── inventorySlice.js
  │   ├── sales/
  │   │   ├── pages/
  │   │   ├── components/
  │   │   ├── services/
  │   │   └── salesSlice.js
  │   ├── accounts/
  │   │   ├── pages/
  │   │   ├── components/
  │   │   ├── services/
  │   │   └── accountsSlice.js
  │   └── auth/
  │       ├── pages/
  │       ├── authSlice.js
  │       └── services/
  ├── redux/                   # Redux store configuration
  │   ├── store.js
  │   └── rootReducer.js
  ├── routes/                  # AppRouter with route definitions
  │   └── AppRouter.jsx
  ├── services/                # Axios setup and base API config
  │   └── apiClient.js
  ├── theme/                   # MUI custom theming
  │   ├── index.js
  │   ├── palette.js
  │   ├── typography.js
  │   ├── components.js
  │   └── themeProvider.jsx
  ├── hooks/                   # Custom reusable hooks
  ├── constants/               # App-wide constants
  ├── utils/                   # Helper functions
  ├── App.jsx
  └── main.jsx

#### 2. App Setup

- Wrap app with Redux Provider and ThemeProvider
- Configure React Router with lazy-loaded routes per module
- Create example routes for `/inventory`, `/sales`, and `/accounts`
- Protect routes using `auth` module (example with fake auth check)

#### 3. Theme Configuration

- Use Material UI v5 with:
  - Primary: #1976d2
  - Secondary: #9c27b0
  - Background: #f4f6f8
  - Text: #333333
- Set up typography and component overrides
- Add ThemeProvider and CssBaseline
- Create dark mode toggle with context (optional)

#### 4. Redux Setup

- Use Redux Toolkit
- Store configured in `redux/store.js`
- Combine feature slices in `rootReducer.js`
- Each module should manage its own slice (e.g., `inventorySlice.js`)

#### 5. API Layer

- Use Axios instance in `services/apiClient.js`
- All module services should import from this base client
- Example:
  ```js
  // inventoryAPI.js
  import apiClient from '../../../services/apiClient';
  export const fetchItems = () => apiClient.get('/inventory');
  ```
