import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "My First Storage System",
  description: "Next.js + Tailwind + Prisma + R2 starter",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-3xl p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">My First Storage System</h1>
            <p className="text-sm text-slate-600">Next.js + Tailwind + Prisma + R2 starter</p>
          </header>
          <main>{children}</main>
          <footer className="mt-8 text-xs text-slate-500">Built with Next.js, Tailwind CSS, Prisma, and Cloudflare R2</footer>
        </div>
      </body>
    </html>
  );
}