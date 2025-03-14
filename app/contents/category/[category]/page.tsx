import React  from 'react';

import {Metadata} from "next";
import {MainComponentForContentPage} from "@/app/contents/MainComponentForContentPage";

export async function generateMetadata({params}: {params: Promise <{category:string}>}): Promise<Metadata> {

    const category = decodeURIComponent((await params).category);
    return {
        title: `${category} Blogs | DevJournal`,
        description: `Explore ${category} tech blogs, programming tips, and AI-driven insights on DevJournal.`,
        keywords: ["tech", "programming", "AI", "software development", "blogs", category],
        openGraph: {
            title: `DevJournal - ${category} Blogs`,
            description: `Stay updated with the latest ${category} trends and insights from top developers.`,
            images: ["/default-blog-image.jpg"],
            url: `https://devjournal.vercel.app/contents/category/${category}`,
        },
    };
}


export default async function ContentPage({params}: {params: Promise <{category:string}>}) {

    const category = await params;

    return (
        <MainComponentForContentPage category={category.category}/>
    );
}
