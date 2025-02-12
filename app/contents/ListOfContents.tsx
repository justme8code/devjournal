"use client";

import ContentBlock from "@/app/contents/component/ContentBlock";
import { BlogPost } from "@/app/tech-tider/types";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/app/axios";
import { motion } from "motion/react";
import {useBlogStore} from "@/app/store/useBlogStore";
import {ContentShimmer} from "@/app/contents/component/ContentShimmer";
import {TECH_TIDE_BLOGS_URL} from "@/app/api_urls";

export const ListOfContents = () => {
    const { posts, addPost, updatePost } = useBlogStore(); // Zustand Store for managing blog posts
    const [error, setError] = useState<string | null>(null);

    const fetchContents = useCallback( async () => {

        const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}`);

        data.content.forEach((post: BlogPost) => {
            const existingPost = posts.find((p) => p.id === post.id);
            if (existingPost) {
                updatePost(post.id, post); // Update existing post
            } else {
                addPost(post); // Add new post
            }
        });

    }, [posts, addPost, updatePost]);

    useEffect(() => {
        if(!posts || posts.length <= 0){
            fetchContents().catch(() => {
                setError("Could not get contents");
            });
        }
    }, [fetchContents, posts.length]);

    return (
        <div className="px-4 max-md:p-0 md:px-8 lg:px-12">
            {error && <div className="text-red-500 text-center my-4">{error}</div>}

            {posts.length === 0? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6" aria-live="polite">
                    {
                        Array.from({ length: 20 }).map((_, i:number) => (
                            <ContentShimmer key={i}  />
                        ))
                    }
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6">
                    {posts.map((post: BlogPost) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
                            className="w-full"
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
