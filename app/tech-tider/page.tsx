// Next.js 15 Server Component with App Router (Server Actions)
import { redirect } from 'next/navigation';
import { TECH_TIDE_AUTH_URL } from '@/app/api_urls';
import { axiosInstance } from '@/app/axios';
import { FormEvent } from 'react';

export default async function Admin() {
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        if (!username || !password) {
            alert('Username or password is required');
            return;
        }

        try {
            const { data } = await axiosInstance.post<{ error?: string }>(
                TECH_TIDE_AUTH_URL,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );

            if (data.error) {
                alert(data.error);
            } else {
                redirect('/tech-tider/create-new-content');
            }
        } catch (error) {
            console.error(error);
            alert('Invalid credentials');
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
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="p-2 bg-black text-white rounded-full px-6 w-full hover:bg-gray-800"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
