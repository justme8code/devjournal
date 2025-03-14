import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./Shimmer.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
    metadataBase: new URL("https://devjournal.vercel.app"), // ✅ This fixes the issue
    title: "DevJournal - AI, Programming & Tech Insights",
    authors: [{ name: "Thompson Oretan", url: "https://devjournal.vercel.app" }],
    applicationName: "DevJournal",
    category: "Technology",
    robots: "index, follow",
    description: "Explore the latest in AI, programming, and technology. Tutorials, insights, and guides for developers and tech enthusiasts.",
    keywords: ["AI", "programming", "technology", "software development", "coding", "tech trends"],
    openGraph: {
        title: "DevJournal - AI, Programming & Tech Insights",
        description: "Explore the latest in AI, programming, and technology. Tutorials, insights, and guides for developers and tech enthusiasts.",
        url: "https://devjournal.vercel.app",
        siteName: "DevJournal",
        type: "website",
        images: [
            {
                url: "/og-image.png", // Now this works correctly!
                width: 1200,
                height: 630,
                alt: "DevJournal Cover Image",
            }
        ],
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "DevJournal - AI, Programming & Tech Insights",
        description: "Stay ahead with AI, programming, and technology insights. Learn, explore, and grow with DevJournal.",
        creator: "@justme8code",
        images: ["/og-image.png"], // This also works correctly now!
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
