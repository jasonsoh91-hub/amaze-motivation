import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "7 Days to Clarity | Free Guide by Amaze Motivation",
  description: "Stop feeling stuck and overwhelmed. Get our free step-by-step guide to gain crystal-clear clarity on your goals, purpose, and next steps. Join 10,000+ go-getters.",
  keywords: ["motivation", "clarity", "personal development", "goal setting", "self-improvement", "life coaching"],
  openGraph: {
    title: "7 Days to Clarity | Free Guide by Amaze Motivation",
    description: "Stop feeling stuck and overwhelmed. Get our free step-by-step guide to gain crystal-clear clarity on your goals, purpose, and next steps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
