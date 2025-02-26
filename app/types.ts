import { JSONContent } from "@tiptap/react";

type BlogPost = {
    id: string;
    title: string;
    description: string;
    coverImageUrl?: string;
    content?: JSONContent;
    publishedOn?: string;
    modifiedOn?: string;
};

export type BlogPostResponseType = Omit<BlogPost, "content"> & {
    content: string;
};

export type { BlogPost };
