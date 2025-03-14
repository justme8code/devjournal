import React from 'react';
import {MainComponentForContentPage} from "@/app/contents/MainComponentForContentPage";
import {Metadata} from "next";

export async function generateMetadata({ params }: { params:  Promise<{ category: string }> }): Promise<Metadata> {
    const category = decodeURIComponent((await params).category);
    return {
        title: `Feed Blogs | DevJournal`,
        description: `Explore Feed tech blogs, programming tips, and AI-driven insights on DevJournal.`,
        keywords: ["tech", "programming", "AI", "software development", "blogs", category],
        openGraph: {
            title: `DevJournal - Feed Blogs`,
            description: `Stay updated with the latest feed trends and insights from top developers.`,
            images: ["/default-blog-image.jpg"],
            url: `https://devjournal.vercel.app/contents`,
        },
    };
}

export default async function ContentPage({params}: {params: Promise <{category:string}>}) {
    const category = await params;
    return (
        <MainComponentForContentPage category={category.category}/>
    );
}
