'use client';

import { MyEditor } from "@/app/components/MyEditor";
import React, {useEffect, useState, useTransition} from "react";
import {createBlogPost} from "@/app/contents/actions";
import {useLoggedInUser} from "@/app/store/useLoggedInUser";
import {BlogPost} from "@/app/types";
import {convertBlogPostToResponseType} from "@/app/utils/constants_fn";
import {RequestStatusComponent} from "@/app/components/RequestStatusComponent";
import {Logo} from "@/app/Logo";

export default function CreateContent() {
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const { setLoggedIn } = useLoggedInUser();

    useEffect(() => {
        setLoggedIn(true);
    }, [setLoggedIn]);

    const handleSubmit = (blog:BlogPost) => {
        startTransition(async () => {
            const data = convertBlogPostToResponseType(blog);
            const response = await createBlogPost(data); // Call server action
            if (response?.success) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(true);
                setTimeout(() => setError(false), 3000);
            }

        });
    };

    return (
        <>
            <nav className="bg-white py-4">
                <div className="container mx-auto flex max-w-6xl justify-between items-center px-4">
                    <Logo/>
                </div>
            </nav>


            {isPending && !error && (
                <>
                    <div className="fixed inset-0 bg-gray-600 opacity-50 z-50" />
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl z-50">Publishing new blog post...</p>
                </>
            )}

            <div className=" relative container mx-auto p-8 max-w-3xl">
                <MyEditor contentId={""}  onSaveAction={blogPost1 => {
                    handleSubmit(blogPost1)
                }}/>
                <RequestStatusComponent error={error} success={success}
                                        successMessage={"Successfully published blog post"}
                                        errorMessage={"Could not create blog post"}/>

            </div>

        </>
    );
};
