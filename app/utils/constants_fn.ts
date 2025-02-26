import {BlogPost, BlogPostResponseType} from "@/app/types";

export function convertBlogPostToJsonContent(blogPostResponseType:BlogPostResponseType):BlogPost{
    return {
        id: blogPostResponseType.id,
        title: blogPostResponseType.title,
        description: blogPostResponseType.description,
        coverImageUrl: blogPostResponseType.coverImageUrl,
        content: JSON.parse(blogPostResponseType.content),
        modifiedOn:blogPostResponseType.modifiedOn,
        publishedOn:blogPostResponseType.publishedOn
    };
}

export function convertBlogPostToResponseType(blogPost:BlogPost){
    return {
        id: blogPost.id,
        title: blogPost.title,
        description: blogPost.description,
        coverImageUrl: blogPost.coverImageUrl,
        content: JSON.stringify(blogPost.content)
    };
}