"use client";
import { TextArea } from "@/app/components/TextArea";
import TipTap from "@/app/components/TipTap";
import React, {useEffect, useState } from "react";
import { BlogPost } from "@/app/types";
import { SaveIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MyEditorProps {
    contentId: string;
    initialData?: BlogPost;
    onSaveAction: (blogPost: BlogPost) => void;
}

export const MyEditor = ({ initialData, onSaveAction }: MyEditorProps) => {
    const [blogPost, setBlogPost] = useState<BlogPost>({
        title: "",
        description: "",
        coverImageUrl: "",
        content: undefined,
        publishedOn: "",
        id: "",
        modifiedOn: "",
    });

    useEffect(() => {
        if (initialData) {
            setBlogPost(initialData);
        }
    }, [initialData]);



    return (
        <>
            <div className="w-full prose-md mb-10">
                <input
                    value={blogPost.title}
                    placeholder="Title"
                    className="w-full prose-xl font-medium outline-none"
                    onChange={(event) =>
                        setBlogPost((prev) => ({ ...prev, title: event.target.value }))
                    }
                />
                <input
                    value={blogPost.coverImageUrl ?? ""}
                    type="url"
                    placeholder="Cover Image URL"
                    className="w-full prose-xs outline-none text-gray-400"
                    onChange={(event) =>
                        setBlogPost((prev) => ({ ...prev, coverImageUrl: event.target.value }))
                    }
                />
                <div className="w-full">
                    <TextArea
                        className="w-full"
                        placeholder="Description..."
                        content={blogPost.description ?? ""}
                        onChange={(e) =>
                            setBlogPost((prev) => ({ ...prev, description: e.target.value }))
                        }
                        onKeyDown={() => {}}
                    />
                </div>
            </div>

            <TipTap
                onContentChange={(content) => setBlogPost((prev) => ({...prev, content}))}
                content={blogPost.content || initialData?.content || undefined}
            />
            <div className={"mb-10"}></div>

            <motion.button
                onClick={() => {
                    onSaveAction(blogPost);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-green-600 p-2 px-5 text-white shadow-md flex items-center gap-2"
            >
                <SaveIcon />
                <p>Update Post</p>
            </motion.button>
        </>
    );
};