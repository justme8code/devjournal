import { create } from "zustand";
import { BlogPost } from "../types";



interface BlogStore {
    posts: BlogPost[];
    addPost: (post: BlogPost) => void;
    updatePost: (id: string, updatedPost: Partial<BlogPost>) => void;
    deletePost: (id: string) => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
    posts: [],

    addPost: (post:BlogPost) =>
        set((state) => ({
            posts: [...state.posts, post],
        })),

    updatePost: (id, updatedPost) =>
        set((state) => ({
            posts: state.posts.map((post) =>
                post.id === id ? { ...post, ...updatedPost } : post
            ),
        })),

    deletePost: (id) =>
        set((state) => ({
            posts: state.posts.filter((post) => post.id !== id),
        })),
}));
