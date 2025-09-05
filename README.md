# My First Storage System

A minimal, production-ready scaffold for a simple storage system using:

- Next.js (App Router, TypeScript)
- Tailwind CSS
- Prisma with SQLite (for local development)
- Cloudflare R2 (S3-compatible) via AWS SDK v3

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create an `.env` file from the example and fill in your values:

```bash
cp .env.example .env
```

Required variables:

- `R2_ACCOUNT_ID` – Your Cloudflare account ID
- `R2_ACCESS_KEY_ID` – R2 access key ID
- `R2_SECRET_ACCESS_KEY` – R2 secret access key
- `R2_BUCKET` – The name of your R2 bucket
- `R2_PUBLIC_BASE_URL` – Optional. If you expose objects publicly via a custom domain, set to that base URL, e.g. `https://files.example.com`.

### 3) Initialize Prisma

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 4) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## How it works

- Uploads are sent to `/api/upload`, which stores the object in R2 and metadata in SQLite via Prisma.
- The file list is served by `/api/files`.
- If `R2_PUBLIC_BASE_URL` is set, the UI shows a View link for each file.

## Notes

- This starter uses SQLite locally. For production, switch the Prisma datasource to Postgres or MySQL and set a new `DATABASE_URL`.
- R2 is S3-compatible. The SDK client is configured with `region: "auto"` and an account-specific endpoint.
