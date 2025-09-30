# Finance App

A modern personal finance management application built with Next.js 14 and Supabase.

## 🚀 Live Demo

If deployed: https://finance-app-qbz6.vercel.app/

- Dashboard preview: https://finance-app-qbz6.vercel.app/dashboard

## ✨ Features

- Authentication with magic links (email OTP)
- Transaction management: create, edit, delete
- Financial insights and trends
- User profile with avatar upload (Supabase Storage)
- Responsive UI with Tailwind CSS
- Dark mode toggle (theme persisted via cookie)

## 🛠 Tech Stack

- Frontend: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- Backend: Supabase (Database, Auth, Storage)
- Deployment: Vercel
- UI: Custom components, lucide-react icons

## ✅ Prerequisites

- Node.js 18+ (recommend using nvm)
- A Supabase project with URL and keys

## 🧩 Environment Variables

Create a `.env.local` file in `finance_app/` with the following:

```
# Required (browser + server)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key

# Used for building email magic-link callback URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Local scripts only (DO NOT expose publicly)
SUPABASE_SERVICE_ROLE=your-service-role-secret
```

Notes
- `NEXT_PUBLIC_SITE_URL` defaults to `http://localhost:3000` if not set; set it in production to your domain so auth emails contain a correct link.
- `SUPABASE_SERVICE_ROLE` is only used by the local `seed.mjs` script (admin APIs); never use it in runtime code.

## 🔐 Supabase Setup

1. In Supabase Auth → URL Configuration, add redirect URLs:
	 - `${NEXT_PUBLIC_SITE_URL}/auth/confirm`
2. Create a Storage bucket for avatars (e.g., `avatars`) and allow authenticated users to upload/read their own files.
3. Ensure RLS policies exist for `transactions` and relevant tables according to your data model.

## 🏃‍♂️ Getting Started

1. Install dependencies
	 - `npm install`
2. Create `.env.local` (see above)
3. Start the dev server
	 - `npm run dev`
4. Visit http://localhost:3000

## 🧪 Seeding Local Data (optional)

We include a simple seeding script using Supabase Admin APIs.

- Ensure `SUPABASE_SERVICE_ROLE` is set in `.env.local`.
- Run: `node seed.mjs`

This will create demo users and transactions for local testing.

## 📦 Scripts

- `npm run dev` — Start the Next.js dev server
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Lint the project
- `npm run json-server` — Start a local JSON server on port 3100 (uses `db.json`) for mock data

## 🗂 Project Structure

```
app/
├── (auth)/
│   ├── auth/
│   │   ├── confirm/        # Email confirmation handler (OTP / code exchange)
│   │   └── magiclink/      # Magic link verification
│   └── login/              # Login page
├── dashboard/
│   ├── components/         # Dashboard-only server components (e.g., trend)
│   ├── settings/
│   │   ├── avatar/         # Avatar upload page
│   │   └── profile/        # Profile management
│   ├── transaction/
│   │   ├── add/            # Add new transaction
│   │   └── [id]/edit/      # Edit a transaction
│   └── page.tsx            # Dashboard home
├── playground/             # UI playground
└── layout.tsx              # Root layout

components/
├── avatar.tsx
├── page-header.tsx
├── date-range-select.tsx
├── submit-button.tsx
├── sign-out-button.tsx
├── alert.tsx / alert-success.tsx / alert-error.tsx
└── ...others

lib/
├── actions.ts              # Server actions (auth, CRUD, storage)
├── validation.ts           # Zod schemas
└── supabase/
		├── client.ts           # Browser client
		├── server.ts           # Server-side client (SSR/actions)
		└── middleware.ts       # Middleware client + cookie adapter

hooks/
└── use-server-dark-mode.ts # Server-only theme helper

middleware.ts               # Root Next.js middleware (auth/session)
```

## 🔧 Implementation Highlights

- Next.js 14 App Router with server components and server actions
- Auth via Supabase OTP/magic links (two-argument server actions supported in forms)
- Zod validation for robust, typed form handling
- Avatar upload via Supabase Storage and cleanup of old images
- Theme preference persisted via cookie (server-detected)

## 🧰 Troubleshooting

- “next is not recognized” or build fails on WSL/Windows
	- Ensure Node.js is installed in your Linux environment (e.g., `nvm install --lts`).
	- Run commands from your Linux shell (bash) inside the project folder.
	- Verify: `node -v` and `which node` show Linux paths.

- “Cannot find module './xxx.js'” after edits
	- Remove the Next.js cache and rebuild:
		- Delete `.next/` then run `npm run dev` or `npm run build` again.

- Auth links redirect to the wrong domain
	- Set `NEXT_PUBLIC_SITE_URL` to your domain and update Supabase Auth redirect URLs accordingly.

## 📄 License

Internal learning project. Adapt as needed.
