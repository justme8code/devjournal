// app/tech-tider/actions/createBlogPost.ts (server-side)
'use server';

import { axiosInstance } from "@/app/axios";
import { TECH_TIDE_USER_BLOG } from "@/app/api_urls";
import {BlogPost} from "@/app/tech-tider/types";
import withCookie from "@/app/api/withcookie";

export default async function createBlogPost(blogPost:BlogPost) {
    return withCookie(async token => {
        try {
            const response = await axiosInstance.post(`${TECH_TIDE_USER_BLOG}`,
                {
                    title: blogPost.title,
                    description: blogPost.description,
                    coverImageUrl: blogPost.coverImageUrl,
                    content: JSON.stringify(blogPost.content),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token manually
                    },
                });
            console.log("This is a token on")

            return {success: true, data: response.data};
        } catch (error) {
            console.error("Server error:", error);
            return {success: false, error: "Could not create Blog Post"};
        }
    });
}


