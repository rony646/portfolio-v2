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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rony Silva | Software Engineer",
    template: "%s | Rony Silva",
  },
  description:
    "Brazilian Software Engineer building scalable, high-performance web apps with React, Next.js, TypeScript, and AWS.",
  keywords: [
    "Rony Silva",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "AWS",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rony Silva Portfolio",
    title: "Rony Silva | Software Engineer",
    description:
      "Brazilian Software Engineer building scalable, high-performance web apps with React, Next.js, TypeScript, and AWS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rony Silva | Software Engineer",
    description:
      "Brazilian Software Engineer building scalable, high-performance web apps with React, Next.js, TypeScript, and AWS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
