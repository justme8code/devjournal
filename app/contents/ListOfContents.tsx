"use client";

import ContentBlock from "@/app/components/ContentBlock";
import { BlogPost } from "@/app/types";
import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "@/app/axios";
import {useBlogStore} from "@/app/store/useBlogStore";
import {ContentShimmer} from "@/app/components/ContentShimmer";
import {TECH_TIDE_BLOGS_URL} from "@/app/api_urls";
import {useTabStore} from "@/app/store/useTabStore";

export const ListOfContents = () => {
    const { posts, modifyPosts, addPost, updatePost } = useBlogStore();
    const { tab } = useTabStore();
    const [error, setError] = useState<string | null>(null);

    const fetchContents = useCallback(async () => {

        console.log("calling...")
        if (tab === "Feed") {
            try {
                const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}?page=0&size=100`);

                if (data.content.length === 0) {
                    modifyPosts(null); // No posts available
                } else {
                    data.content.forEach((blogPost: BlogPost) => {
                        const existingPost = posts?.find((p) => p.id === blogPost.id);
                        if (existingPost) {
                            updatePost(blogPost.id, blogPost);
                        } else {
                            addPost(blogPost);
                        }
                    });
                }
            } catch {
                setError("Could not get contents");
            }
        }

    }, [addPost, posts, tab, updatePost, modifyPosts]);

    useEffect(() => {
        fetchContents().catch(() => setError("Could not get contents"));
    }, [fetchContents, tab]);

    return (
        <div className="w-full pt-20 max-md:pt-0 p-2">
            {error && <div className="text-red-500 text-center my-4">{error}</div>}
            <div className={"hidden max-sm:block"}>
                <h1 className={"font-bold p-2"}>{tab}</h1>
            </div>
            {/*{posts === null && <div className="text-red-500 text-center my-4">No {tab} posts yet</div>}*/}
            {
                !posts &&  <div className="grid grid-cols-1 px-6 gap-6" aria-live="polite">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <ContentShimmer key={i} />
                    ))}
                </div>
            }

            {
                posts && posts?.length > 0 && <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 w-full">
                    {posts.map((post) => (

                            <ContentBlock
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                description={post.description}
                                coverImageUrl={post.coverImageUrl}
                            />

                    ))}
                    <div className={"h-0.5 w-full bg-gray-200"}></div>
                </div>
            }

        </div>
    );
};
