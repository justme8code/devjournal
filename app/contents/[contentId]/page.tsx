'use client';
import { Footer } from "@/app/components/Footer";
import { format } from "date-fns";
import { axiosInstance } from "@/app/axios";
import 'highlight.js/styles/atom-one-dark.css';
import NextLink from 'next/link';
import { useParams } from "next/navigation";
import { ViewContentShimmer } from "@/app/components/ViewContentShimmer";
import {TECH_TIDE_BLOGS_URL} from "@/app/api_urls";
import {TipTapDisplay} from "@/app/components/TipTapDisplay";
import {convertBlogPostToJsonContent} from "@/app/utils/constants_fn";
import {Logo} from "@/app/Logo";
import {useEffect, useState} from "react";
import {BlogPost} from "@/app/types";

// View content page
export default function View() {
    const { contentId } = useParams(); // Get contentId from the URL
    const [ post, setFocusedBlog ] = useState<BlogPost|null>(null);

    function formatPublishedDate(publishedOn: string) {
        const date = new Date(publishedOn);
        const today = new Date();

        // Check if the date is today
        if (date.toDateString() === today.toDateString()) {
            return "Today";
        }

        // Format: e.g: Sunday, 2nd Feb 2025
        return format(date, "EEE, do MMM yyyy");
    }

    useEffect(() => {
        if (!contentId || post?.id === contentId) return;

        const fetchContent = async () => {
            try {
                const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}/${contentId}`);

                if (data) {

                    const  modifiedData = convertBlogPostToJsonContent(data);
                    setFocusedBlog(modifiedData);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();

    }, [contentId, post?.id]); // Include setFocusedBlog in dependencies

    return (
        <div className={"space-y-6"}>
            <nav className="bg-white p-2 border-b border-neutral-200   shadow-sm z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                        <Logo/>

                    </div>

                     <div className={"flex gap-10"}>
                         <NextLink href="/" className="text-gray-600 hover:text-gray-900">Home</NextLink>
                         <NextLink href="/contents" className="text-gray-600 hover:text-gray-900">Contents</NextLink>

                     </div>
                </div>
            </nav>


        <div className="flex flex-col h-screen  justify-between text-gray-900">
            {/* Navbar */}

                {/* Content Section */}
                <main className="container flex flex-col mx-auto px-4  max-w-2xl justify-center items-center ">
                    <div >


                        {post?.content ? (
                            <div className={"space-y-5"}>
                                <div className={"max-w-2xl sticky top-0 z-10 bg-neutral-50"}>

                                    <h1 className={"prose-xs font-bold"}>{post?.title}</h1>

                                    {post?.publishedOn && (
                                        <i className={"prose-xs"}>{formatPublishedDate(post.publishedOn)}</i>
                                    )}
                                </div>
                                 <div className={" "}>
                                     {post.description && post.description !== "" && <p>{post?.description}</p>}
                                 </div>
                                <TipTapDisplay content={post.content}/>
                            </div>

                        ) : (
                            <ViewContentShimmer />
                        )}
                    </div>

                </main>
                {/* Footer */}
                <Footer />
        </div>

        </div>
    );
}
