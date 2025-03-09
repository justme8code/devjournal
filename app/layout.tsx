import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./Shimmer.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const devJournal = "https://devjournal.vercel.app";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `${devJournal} - The Future of Tech`,
    authors: [{ name: "Thompson Oretan", url: `${devJournal}` }],
    applicationName: "TechTide",
    category: "Technology",
    robots: "index, follow",
    description: "Stay updated with the latest in tech, AI, and programming.",
    openGraph: {
        title: "DevJournal - The Future of Tech",
        description: "Stay updated with the latest in tech, AI, and programming.",
        url: `${devJournal}`,
        siteName: "TechTide",
        type: "website",
        images: [
            {
                url: `${devJournal}/logo.svg`, // Replace with actual image
                width: 1200,
                height: 630,
                alt: "TechTide Cover Image",
            },
            {
                url: `${devJournal}/tech.svg`, // Replace with actual image
                alt: "Devjournal Cover Image",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "DevJournal - The Future of Tech",
        description: "Stay updated with the latest in tech, AI, and programming.",
        creator: "@justme8code", // Replace with your Twitter handle if you have one
        images: [`${devJournal}/logo.svg`], // Same image for Twitter preview
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

      </body>
    </html>
  );
}
