import { BlogPost } from "@/app/store/useBlogStore";
import { create } from "zustand";

interface CurrentFocusedBlogPostStore {
    post: BlogPost | null;
    setFocusedBlog: (updatedPost: Partial<BlogPost>) => void;
}

export const useCurrentFocusedBlogPost = create<CurrentFocusedBlogPostStore>((set) => ({
    post: null,
    setFocusedBlog: (updatedPost: Partial<BlogPost>) =>
        set((state) => ({
            post: state.post ? { ...state.post, ...updatedPost } : (updatedPost as BlogPost),
        })),
}));
