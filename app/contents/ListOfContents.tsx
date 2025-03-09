"use client";

import ContentBlock from "@/app/components/ContentBlock";
import { BlogPost } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/app/axios";
import { motion } from "motion/react";
import {useBlogStore} from "@/app/store/useBlogStore";
import {ContentShimmer} from "@/app/components/ContentShimmer";
import {TECH_TIDE_BLOGS_URL} from "@/app/api_urls";
import {useTabStore} from "@/app/store/useTabStore";

export const ListOfContents = () => {
    const { posts, addPost, updatePost } = useBlogStore(); // Zustand Store for managing blog posts
    const { tab} = useTabStore();
    const [error, setError] = useState<string | null>(null);

    const fetchContents = useCallback( async () => {

        if(tab === "Feed"){
            const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}?page=0&size=100`);

            data.content.forEach((blogPost:BlogPost) => {
                const existingPost = posts.find((p) => p.id === blogPost.id);
                if (existingPost) {
                    updatePost(blogPost.id, blogPost); // Update existing post
                } else {
                    addPost(blogPost); // Add new post
                }
            });
        }


    }, [addPost, posts, tab, updatePost]);

    useEffect(() => {

            fetchContents().catch(() => {
                setError("Could not get contents");
            });

    }, [fetchContents,tab]);
    return (
        <div className="w-full  pt-20 max-md:pt-0 p-2">
            {error && <div className="text-red-500 text-center my-4">{error}</div>}

            {posts.length === 0? (
                <div className="grid grid-cols-1 px-6 gap-6" aria-live="polite">
                    {
                        Array.from({ length: 20 }).map((_, i:number) => (
                            <ContentShimmer key={i}  />
                        ))
                    }
                </div>
            ) : (
                <div className=" grid grid-cols-1 xl:grid-cols-1 gap-6 w-full">
                    {posts.map((post: BlogPost) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
                            className="w-full flex justify-center"
                        >
                            <ContentBlock
                                id={post.id}
                                title={post.title}
                                description={post.description}
                                coverImageUrl={post.coverImageUrl}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
