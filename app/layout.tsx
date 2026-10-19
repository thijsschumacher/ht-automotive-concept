import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "HT Automotive Naaldwijk | APK, onderhoud en reparatie aan alle merken",
  description:
    "HT Automotive in Naaldwijk: erkend RDW APK-keuringsstation voor onderhoud, autoreparaties en APK aan alle merken auto's en lichte bedrijfswagens. Gratis koffie of thee in de wachtruimte.",
};

export const viewport: Viewport = {
  themeColor: "#0b1b33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="bg-white font-sans text-navy-900 antialiased">{children}</body>
    </html>
  );
}
