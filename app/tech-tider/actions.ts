'use server';

import {axiosInstance} from "@/app/axios";
import {TECH_TIDE_AUTH_URL} from "@/app/api_urls";
import {redirect} from "next/navigation";

export async function login(previousState: unknown, formData: FormData){
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === "" || password === "") {
        return { error: "Username or password is required" };
    }


        const response = await axiosInstance.post(TECH_TIDE_AUTH_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true // Crucial for cookie handling
        });

        if (response.status !== 200) {
            // Handle any potential error responses
            return { error: 'Login failed' };
        }
        console.log(response.data);
        // Check for successful login based on your backend's response structure



    redirect("/tech-tider/create-new-content");


}
