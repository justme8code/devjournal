
import { create } from "zustand";
import { BlogPost } from "../types";

interface CurrentFocusedBlogPostStore {
    post: BlogPost | null;
    setFocusedBlog: (updatedPost: Partial<BlogPost>) => void;
    unSetFocusedBlog: () => void;
}

export const useCurrentFocusedBlogPost = create<CurrentFocusedBlogPostStore>((set) => ({
    post: null,
    setFocusedBlog: (updatedPost: Partial<BlogPost>) =>
        set((state) => ({
            post: state.post ? { ...state.post, ...updatedPost } : (updatedPost as BlogPost),
        })),
    unSetFocusedBlog: () => set(() => ({
        post: null,
    }))
}));
