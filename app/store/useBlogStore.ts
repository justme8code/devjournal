import { create } from "zustand";
import { BlogPost } from "../types";

interface BlogStore {
    posts: BlogPost[] | null;
    modifyPosts: (newPosts: BlogPost[] | null) => void;
    addPost: (post: BlogPost) => void;
    updatePost: (id: string, updatedPost: Partial<BlogPost>) => void;
    deletePost: (id: string) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
    posts: null,

    addPost: (post: BlogPost) =>
        set((state) => {
            if (state.posts !== null) {
                return { posts: [...state.posts, post] };
            }
            return { posts: [post] }; // If null, start with a new array
        }),

    updatePost: (id, updatedPost) =>
        set((state) => {
            if (state.posts !== null) {
                return {
                    posts: state.posts.map((post) =>
                        post.id === id ? { ...post, ...updatedPost } : post
                    ),
                };
            }
            return {};
        }),

    deletePost: (id) =>
        set((state) => {
            if (state.posts !== null) {
                const updatedPosts = state.posts.filter((post) => post.id !== id);
                return { posts: updatedPosts.length > 0 ? updatedPosts : null };
            }
            return {};
        }),

    modifyPosts: (newPosts: BlogPost[] | null) => set(() => ({
        posts: newPosts,
    })),
}));
