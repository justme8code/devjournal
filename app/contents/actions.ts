'use server';

import {axiosInstance} from "@/app/axios";
import {TECH_TIDE_BLOGS_URL, TECH_TIDE_USER_BLOG} from "@/app/api_urls";
import {BlogPostResponseType} from "@/app/types";
import {verifySession} from "@/app/api/session";
import {convertBlogPostToJsonContent} from "@/app/utils/constants_fn";


export async function findBlogPost(blogId:string) {
    const response = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}/${blogId}`);
    const data = convertBlogPostToJsonContent(response.data);
    return {success: response.status === 200, data: data}
}

export async function createBlogPost(blogPost:BlogPostResponseType) {
    const token = await verifySession();

    const response = await axiosInstance.post(
        TECH_TIDE_USER_BLOG,
        blogPost,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return {success: response.status === 201, data: response.data}

}

export async function deleteBlogPost(blogPostId:string) {
    const token = await verifySession();

    const response = await axiosInstance.delete(`${TECH_TIDE_USER_BLOG}/${blogPostId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token manually
            },
        });
    return {success: response.status === 200, data: response.data}

}

export async function updateBlogPost(blogPost:BlogPostResponseType) {
    const token = await verifySession();
    const response = await axiosInstance.put(`${TECH_TIDE_USER_BLOG}`,
        blogPost,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token manually
            },
        });
    return {success: response.status === 200, data: response.data}

}

export async function exploreBlogPost(keyword:string){
    const response = await axiosInstance.get(`${TECH_TIDE_USER_BLOG}/${keyword}`);
}



