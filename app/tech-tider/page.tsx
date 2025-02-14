"use client";
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { TECH_TIDE_AUTH_URL } from "@/app/api_urls";
import { axiosInstance } from "@/app/axios";

interface FormDataState {
    error?: string;
}

export default function Admin(){
    const router = useRouter();
    const [data, setData] = useState<FormDataState | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setIsPending(true);
        setData(null);

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (!username || !password) {
            setData({ error: "Username or password is required" });
            setIsPending(false);
            return;
        }

        try {
            const { data } = await axiosInstance.post<{ error?: string }>(
                `${TECH_TIDE_AUTH_URL}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            if (data.error) {
                setData({ error: data.error });
            } else {
                router.push("/tech-tider/create-new-content");
            }
        } catch (error) {
            console.error(error);
            setData({ error: 'Invalid credentials' });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-6">Tech Tide Writer.</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`p-2 bg-black text-white rounded-full px-6 w-full ${isPending ? 'bg-gray-300' : ''}`}
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {data?.error && <p className="text-red-500 mt-2">{data.error}</p>}
            </div>
        </div>
    );
}