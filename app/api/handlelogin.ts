'use server';
import { axiosInstance } from "@/app/axios";
import { TECH_TIDE_AUTH_URL } from "@/app/api_urls";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Server-side cookie handling

export default async function handleLogin(previousState: unknown, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === "" || password === "") {
        return { error: "Username or password is required" };
    }


        // Make the request to the backend
        const { data } = await axiosInstance.post<{ userId: string; jwtToken: string }>(TECH_TIDE_AUTH_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true // This ensures that credentials (cookies) are sent along with the request
        });

        // Assuming the backend returns JWT in response.data.jwtToken
        if (data.jwtToken) {
            // If the token exists, manually set it in a cookie on the server-side
            const cookieStore = await cookies();

            // Set the JWT token as an HttpOnly cookie
            cookieStore.set("jwt_token", data.jwtToken, {
                httpOnly: true,         // Prevents JS access to the cookie
                secure:true,  // Ensures cookie is sent only over HTTPS in production
                path: '/',              // Cookie is available to the entire site
                sameSite: 'none',       // Allows the cookie to be sent with cross-origin requests
                maxAge: 60 * 60 * 24 * 7, // Optional: expires in 7 days
            });

            console.log("JWT token set in server-side cookie.");
        }

        // Check if the response indicates a successful login
        if (data.jwtToken) {
            console.log("Login successful, redirecting...");
            redirect("/tech-tider/create-new-content");
        } else {
            console.log("Login failed, redirecting...");
            redirect("/tech-tider");
        }


}
