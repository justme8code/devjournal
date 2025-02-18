'use client';

import { MyEditor } from "@/app/tech-tider/components/MyEditor";
import { SaveIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { useEditingBlogPostStore } from "@/app/store/useEditingBlogPostStore";
import createBlogPost from "@/app/api/handlecreateblogpost";

export default function CreateContent() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const { blogPost } = useEditingBlogPostStore();

    const handleSubmit = () => {
        startTransition(async () => {
            setError(null);
            setSuccess(false);

            const response = await createBlogPost(blogPost); // Call server action
            if (response?.success) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError("Could not create blog post");
            }

        });
    };

    return (
        <>
            <nav className="bg-white py-4">
                <div className="container mx-auto flex max-w-6xl justify-between items-center px-4">
                    <h1 className="text-xl text-gray-800 font-bold">TechTide</h1>
                    <motion.button
                        onClick={handleSubmit}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="rounded-full bg-green-600 p-2 px-5 text-white shadow-md flex items-center gap-2"
                    >
                        <SaveIcon />
                        <p>Publish</p>
                    </motion.button>
                </div>
            </nav>
            <div className="flex justify-center mt-4">
                {error && <p className="text-red-600">{error}</p>}
                {success && <p className="text-green-600">Successfully published blog post</p>}
            </div>

            {isPending && !error && (
                <>
                    <div className="fixed inset-0 bg-gray-600 opacity-50 z-50" />
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl z-50">Publishing new blog post...</p>
                </>
            )}

            <div className="container mx-auto p-8 max-w-3xl">
                <MyEditor />
            </div>
        </>
    );
};
