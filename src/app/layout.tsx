import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gharkilist (घर की लिस्ट) — Smart Pantry & Kirana List Manager for Indian Homes",
  description: "100% offline, privacy-first kitchen inventory app for Indian households. Track pantry stock, compute budget in ₹, and order via WhatsApp in one tap.",
  keywords: "gharkilist, घर की लिस्ट, grocery list, indian kitchen, kirana, whatsapp, offline, pantry manager",
  openGraph: {
    title: "Gharkilist (घर की लिस्ट)",
    description: "The Smart Household Pantry & Kirana List Manager for Indian Homes",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
