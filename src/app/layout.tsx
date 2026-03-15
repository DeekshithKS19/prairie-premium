
///////
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // if using sonner
import { Navbar } from "@/components/layout/navbar";

import { Footer } from "@/components/layout/footer";
// ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-16 px-4 md:px-8 py-6">{children}</main>
          <Footer /> {/* ⬅️ footer on all pages */}
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
export const metadata: Metadata = {
  title: "PRAIRIE PREMIUM – Logistics Export Management",
  description:
    "Setting the Standard for Prairie Premium Grade Conventional and Organic Flax Products, and Conventional Yellow Peas.",
};



