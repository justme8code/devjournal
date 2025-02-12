import { BlogPost } from "@/app/tech-tider/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type BlogPostStore = {
    blogPost: BlogPost;
    updateBlogPost: (data: BlogPost) => void;
    getBlogPost: () => BlogPost; // Add this
};

export const useEditingBlogPostStore = create<BlogPostStore>()(
    persist(
        (set, get) => ({
            blogPost: {
                id:"",
                title: "",
                description: "",
                content: {}
            },
            updateBlogPost: (data: BlogPost) => set({ blogPost: data }),
            getBlogPost: () => get().blogPost, // Add this
        }),
        {
            name: "tech-tide-content-created",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
