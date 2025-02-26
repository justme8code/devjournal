import { findBlogPost } from "@/app/contents/actions";
import {EditContent} from "@/app/contents/[contentId]/edit/EditContent";

export default async function EditContentPage({params,}: { params: Promise<{ contentId: string }> }) {
    const contentId = (await params).contentId; // Get the ID from the route params
    const res = await findBlogPost(contentId);
    const blogPost = res?.success ? res.data : null;

    return (
        <>
            {
                blogPost ? <EditContent contentId={contentId} blogPost={blogPost}/> : <p>Blog Post Not Found</p>
            }
        </>
    );
}
