import React from 'react';
import { SidePanel } from "@/app/components/SidePanel";
import { Footer } from "@/app/components/Footer";
import { ContentsNavbar } from "@/app/components/ContentsNavbar";
import { ListOfContents } from "@/app/contents/ListOfContents";
import { MobileNavbar } from '../components/MobileNavabar';
import Head from "next/head";


export default function ContentPage() {

    return (
        <>
            <Head>
                <title>Read on Techtide</title>
                <meta name="description" content="Stay updated with the latest in tech, AI, and programming." />
                <meta name="keywords" content="Tech, AI, Programming, Java, React, Spring Boot" />
                <meta name="author" content="Thompson" />
                <meta property="og:title" content="TechTide - The Future of Tech" />
                <meta property="og:description" content="Stay updated with the latest in tech, AI, and programming." />
                <meta property="og:url" content="https://techtide.vercel.app/contents" />
            </Head>

                <MobileNavbar/>


            <div className="flex flex-col min-h-screen bg-white text-gray-900">
                <div className="flex justify-center w-full">
                    {/* Main Content */}
                    <main className="w-full max-w-2xl">
                        <ContentsNavbar />
                        <ListOfContents />
                    </main>

                    {/* Side Panel */}
                    <SidePanel />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}
