import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://superfloat.app"),
  title: "Superfloat",
  description: "Social stock bundles on Base. Discover a portfolio, invest automatically, and keep every stock in your own wallet.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
