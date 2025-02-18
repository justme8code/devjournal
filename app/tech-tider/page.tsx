'use client';

import React, { useActionState } from 'react';
import handleLogin from "@/app/api/handlelogin";

export default function Admin() {
    const [data, action, isPending] = useActionState(handleLogin, undefined);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-6">Tech Tide Writer</h2>
                <form action={action} className="w-full">
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