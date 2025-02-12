'use client';

import { useState, useEffect } from 'react';
import { Footer } from "@/app/components/Footer";
import { format } from "date-fns";
import { axiosInstance } from "@/app/axios";
import 'highlight.js/styles/atom-one-dark.css';
import NextLink from 'next/link';
import { useParams } from "next/navigation";
import TipTap from "@/app/tech-tider/components/TipTap";
import { ViewContentShimmer } from "@/app/contents/component/ViewContentShimmer";
import { useCurrentFocusedBlogPost } from "@/app/store/useCurrentFocusedBlogPost";
import {TECH_TIDE_BLOGS_URL} from "@/app/api_urls";

export default function View() {
    const { contentId } = useParams(); // Get contentId from the URL
    const [searchQuery, setSearchQuery] = useState("");
    const { post, setFocusedBlog } = useCurrentFocusedBlogPost();

    function formatPublishedDate(publishedOn: string) {
        const date = new Date(publishedOn);
        const today = new Date();

        // Check if the date is today
        if (date.toDateString() === today.toDateString()) {
            return "Today";
        }

        // Format: Thu, 2nd Feb 2025
        return format(date, "EEE, do MMM yyyy");
    }

    useEffect(() => {
        if (!contentId || post?.id === contentId) return;

        const fetchContent = async () => {
            try {
                const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}/${contentId}`);

                if (data) {
                    console.log("Fetched Data:", data);

                    // Ensure `content` is properly parsed
                    const parsedContent = typeof data.content === "string"
                        ? JSON.parse(data.content)
                        : data.content;

                    setFocusedBlog({ ...data, content: parsedContent });
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [contentId, post?.id, setFocusedBlog]); // Include setFocusedBlog in dependencies

    return (
        <>
            <nav className="bg-white py-4 border-b border-neutral-200 sticky top-0 shadow-sm z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                        <h1 className="text-xl text-gray-800 font-bold">TechTide</h1>
                        <input
                            type="text"
                            placeholder="Search for articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 p-1 px-2 max-md:hidden bg-neutral-100 outline-none rounded-full"
                        />
                        {post?.publishedOn && (
                            <p className={"font-bold"}>Published on: {formatPublishedDate(post.publishedOn)}</p>
                        )}
                    </div>

                    <NextLink href="/" className="text-gray-600 hover:text-gray-900">Home</NextLink>

                </div>
            </nav>


        <div className="flex flex-col h-screen  text-gray-900">
            {/* Navbar */}


            <div className="flex flex-col justify-between h-screen mx-auto">
                {/* Content Section */}
                <main className="container flex flex-col mx-auto px-4 py-8 max-w-screen-lg justify-center items-center">

                    {post?.content ? (
                        <TipTap
                            onContentChange={() => {}}
                            initialContent={post.content}
                            editable={false}
                        />
                    ) : (
                        <ViewContentShimmer />
                    )}
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
        </>
    );
}
