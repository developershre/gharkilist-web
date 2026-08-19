import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Gharkilist (घर की लिस्ट) — Smart Pantry & Kirana List Manager for Indian Homes",
  description: "100% offline, privacy-first kitchen inventory app for Indian households. Track pantry stock, compute budget in ₹, and order via WhatsApp in one tap.",
  keywords: ["gharkilist", "घर की लिस्ट", "grocery list", "indian kitchen", "kirana", "whatsapp export", "offline pantry manager"],
  openGraph: {
    title: "Gharkilist (घर की लिस्ट) — Smart Indian Pantry Manager",
    description: "Say goodbye to paper lists and barcode apps. Track pantry stock, compute budget in ₹, and order via WhatsApp in one tap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
