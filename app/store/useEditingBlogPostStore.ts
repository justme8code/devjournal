import { BlogPost } from "@/app/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type BlogPostStore = {
    blogPost: BlogPost;
    updatePost: (data: BlogPost) => void;
    getBlogPost: () => BlogPost;
    destroyPost: () => void; // Add this
};

export const useEditingBlogPostStore = create<BlogPostStore>()(
    persist(
        (set, get) => ({
            blogPost: {
                id: "",
                title: "",
                description: "",
                content: undefined,
            },
            updatePost: (data: BlogPost) => set({ blogPost: data }),
            getBlogPost: () => get().blogPost,
            destroyPost: () =>
                set({
                    blogPost: {
                        id: "",
                        title: "",
                        description: "",
                        content: undefined,
                    },
                }),
        }),
        {
            name: "tech-tide-content-created",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
