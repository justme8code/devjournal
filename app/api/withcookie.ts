// utils/getCookieWithFunction.ts
'use server';

import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export default async function withCookie<T>(fn: (token: string) => Promise<T> | T): Promise<T | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('jwt_token')?.value;

        if (!token) {
            redirect("/tech-tide")
        }

        return fn(token);
    } catch (error) {
        console.error("Error retrieving cookie or executing function:", error);
        return null;
    }
}
