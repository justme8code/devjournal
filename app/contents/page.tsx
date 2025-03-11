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
                <title>Latest Blogs | DevJournal</title>
                <meta name="description" content="Explore the latest tech blogs, programming tips, and AI-driven insights on DevJournal." />
                <meta name="keywords" content="tech, programming, AI, software development, blogs" />
                <meta property="og:title" content="DevJournal - The Best Tech Blogs" />
                <meta property="og:description" content="Stay updated with the latest tech trends and insights from top developers." />
                <meta property="og:image" content="/default-blog-image.jpg" />
                <meta property="og:url" content="https://devjournal.vercel.app/contents" />
            </Head>

                <MobileNavbar/>


            <div className="flex flex-col min-h-screen bg-white text-gray-900">
                <div className="flex justify-center ">
                    {/* Main Content */}
                    <main className="w-full max-w-2xl  ">
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
