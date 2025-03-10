'use client';
import {BlogPost} from "@/app/types";
import {MyEditor} from "@/app/components/MyEditor";
import React, {useState, useTransition} from "react";
import {updateBlogPost} from "@/app/contents/actions";
import {convertBlogPostToResponseType} from "@/app/utils/constants_fn";
import {RequestStatusComponent} from "@/app/components/RequestStatusComponent";
import {Logo} from "@/app/Logo";


export const EditContent = ({contentId,blogPost}:{contentId:string,blogPost:BlogPost}) => {
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();


    const handleUpdateBlog = (blog:BlogPost) => {
         startTransition(async () => {

             if(blogPost){
                 const data = convertBlogPostToResponseType(blog);
                 const response = await updateBlogPost(data); // Call server action
                 if (response?.success) {
                     setSuccess(true);
                     setTimeout(() => setSuccess(false), 3000);
                 } else {
                     setError(false);
                     setTimeout(() => setError(false), 3000);
                 }

             }
         });
    };
    return (
        <>

            <nav className="bg-white py-4">
                <div className="container mx-auto flex max-w-6xl justify-between items-center px-4">
                    <Logo/>

                </div>
            </nav>








            <div className="relative container mx-auto p-2 max-w-3xl">
                {contentId &&  <MyEditor contentId={contentId} initialData={blogPost}
                                         onSaveAction={blogPost1 => {
                                             handleUpdateBlog(blogPost1);
                                         }} />}

                <RequestStatusComponent error={error} success={success}
                                        successMessage={"Successfully published blog post"}
                                        errorMessage={"Could not create blog post"}/>
            </div>



            {isPending && !error && (
                <>
                    <div className="fixed inset-0 bg-gray-600 opacity-50 z-50" />
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl z-50">Updating blog post...</p>

                </>
            )}




        </>
    );
};