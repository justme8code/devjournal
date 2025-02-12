'use client';

import React, { useActionState } from 'react';
import {redirect, useRouter} from 'next/navigation';
import axios from 'axios';
import {TECH_TIDE_AUTH_URL} from "@/app/api_urls";


const Page: React.FC = () => {
    const router = useRouter();
    const [data,action, isPending] = useActionState(handleSubmit,undefined);


    async function  handleSubmit (previousState:unknown, formData:FormData){
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;


        if(username === "" || password === ""){
            return {error:"Username or password is required"};
        }

        try {
            const { data } = await axios.post(`${TECH_TIDE_AUTH_URL}`, formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            });
            if (data.error) {
                return {error:data.error};
            }
            router.replace('/tech-tider/create-new-content');
            return null;
        } catch (error) {
            console.log(error);
            return { error: 'Invalid credentials' };
        }

    }






    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-6">Tech Tide Writer.</h2>
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
                        className={`p-2 bg-black text-white rounded-full px-6 w-full ${isPending ? 'bg-gray-300':''} `}>
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {data?.error && <p className="text-red-500 mt-2">{data.error}</p>}
            </div>
        </div>
    );
};

export default Page;
