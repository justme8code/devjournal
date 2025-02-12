import { TextArea } from "@/app/tech-tider/components/TextArea";
import TipTap from "@/app/tech-tider/components/TipTap";
import React, {useCallback, useEffect, useState} from "react";
import { useEditingBlogPostStore } from "@/app/store/useEditingBlogPostStore";

export const MyEditor = () => {
    const [title, setTitle] = useState<string>("");

    const [coverImageUrl, setCoverImageUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [editorContent, setEditorContent] = useState<object>({});
    const { blogPost, updateBlogPost} = useEditingBlogPostStore();

    const [isSaving, setIsSaving] = useState(false); // Track saving state

    // Load initial content when the component mounts
    useEffect(() => {
        if (blogPost) {
            setTitle(blogPost.title || '');
            setDescription(blogPost.description || '');

            try {
                const parsedContent = blogPost.content ? blogPost.content :{};
                setEditorContent(parsedContent);
            } catch (error) {
                console.error("Failed to parse editor content:", error);
                setEditorContent({});
            }
        }
    }, [blogPost]);

    const handleUpdate = useCallback((
        () => {
            const newContent = {
                id:'',
                title,
                description,
                coverImageUrl,
                content: editorContent

            };

            updateBlogPost(newContent);
        }
    ),[coverImageUrl, description, editorContent, title, updateBlogPost]);

    // Auto-save after 5 seconds of inactivity
    useEffect(() => {
        setIsSaving(true); // Show "Saving..." when saving starts

        const saveTimeout = setTimeout(() => {
            handleUpdate();
            setIsSaving(false); // Hide "Saving..." when done
        }, 5000); // Auto-save after 5 seconds

        return () => clearTimeout(saveTimeout); // Cleanup timeout on unmount or new change
    }, [title, description,editorContent, handleUpdate]); // Only depend on the actual fields



    return (
        <>
            <div className="w-full prose-md sticky top-0 z-10 ">

                    <input
                        value={title}
                        placeholder="Title"
                        className="w-full prose-xl font-medium outline-none"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <input
                        value={coverImageUrl}
                        type={"url"}
                        placeholder="coverImageUrl"
                        className="w-full prose-xs  outline-none text-gray-400"
                        onChange={(event) => setCoverImageUrl(event.target.value)}
                    />
                     <div className={"w-full"}>
                         <TextArea
                             className={"w-full"}
                             placeholder="Description..."
                             content={description}
                             onChange={(e) => setDescription(e.target.value)}
                             onKeyDown={() => {}}
                         />
                     </div>
            </div>

            {/* Pass JSON Handler to TipTap */}
            {blogPost.content && (
                <TipTap onContentChange={setEditorContent} initialContent={blogPost.content}  editable={true}/>
            )}

            {/* Show Saving Indicator */}
            {isSaving && (
                <div className="mt-2 text-blue-500 text-sm font-mono flex items-center">
                    <span className="animate-spin mr-1">🔄</span> Saving...
                </div>
            )}

            <button onClick={handleUpdate} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Save Content
            </button>
        </>
    );
};
