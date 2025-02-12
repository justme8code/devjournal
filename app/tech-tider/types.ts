type BlogPost = {
    id: string,
    title: string;
    description: string;
    coverImageUrl?: string;
    content:object,
    publishedOn?: string;
    modifiedOn?: string;
};

export type  { BlogPost };
