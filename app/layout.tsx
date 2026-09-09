import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: "./fonts/montserrat.woff2",
  variable: "--font-montserrat",
  display: "swap",
  weight: "600 800",
  style: "normal",
});

export const metadata: Metadata = {
  title: "SuperFloat",
  description:
    "SuperFloat brings a billion people on-chain through safety-prioritized investment opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
