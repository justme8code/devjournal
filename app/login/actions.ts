'use server';
import { axiosInstance } from "@/app/axios";
import { TECH_TIDE_AUTH_URL } from "@/app/api_urls";
import { redirect } from "next/navigation";
import {createSession, deleteSession} from "@/app/api/session"; // Server-side cookie handling

const routeTo = "/contents/contents"
const loginRoute = "/login"

export async function handleLogin(previousState: unknown, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (username === "" || password === "") {
        return { error: "Username or password is required" };
    }
    console.log(username, password);
    // Make the request to the backend
    const { data } = await axiosInstance.post(TECH_TIDE_AUTH_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        withCredentials: true // This ensures that credentials (cookies) are sent along with the request
    });

    if(data.jwtToken){
        console.log(data.jwtToken);
        await createSession(data.jwtToken);
        redirect(routeTo);
    }else{
        redirect(loginRoute);
    }
}

export async function handleLogout() {
    await deleteSession();
    redirect(loginRoute);
}
