'use client';
import { useState, useTransition } from "react";
import Link from "next/link";
import { useBlogStore } from "@/app/store/useBlogStore";
import CustomImagePlaceholder from "@/app/components/CustomImagePlaceholder";
import { deleteBlogPost } from "@/app/contents/actions";
import {useLoggedInUser} from "@/app/store/useLoggedInUser";
import {Delete, Edit2} from "lucide-react";

interface Props {
    id: string;
    title: string;
    description: string;
    coverImageUrl?: string;
}

const ContentBlock = ({ id, title, description, coverImageUrl }: Props) => {
    const [showPopup, setShowPopup] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const { deletePost } = useBlogStore();
    const { loggedIn } = useLoggedInUser();

    const handleComingSoon = (button: string) => {
        setShowPopup(button);
        setTimeout(() => setShowPopup(null), 2000);
    };

    const handleDeleteContent = async (contentId: string) => {
        startTransition(async () => {
            setSuccessMessage(null);
            try {
                const response = await deleteBlogPost(contentId);
                if (response?.success) {
                    deletePost(contentId);
                    setSuccessMessage("Content deleted successfully!");
                    setTimeout(() => setSuccessMessage(null), 3000);
                } else {
                    console.error("Failed to delete content.");
                }
            } catch (error) {
                console.error("Error deleting content:", error);
            }
        });
    };

    return (
        <div className="flex items-center justify-between border-b border-gray-300 w-full p-2 relative">
            {isPending ? (
                <p className={"bg-indigo-200 p-2 rounded-full animate-pulse"}>Deleting Content...</p>
            ) : (
                <>
                    <div className="text-left max-w-lg">
                        {loggedIn}
                        {loggedIn && (
                            <div className="flex gap-2">
                                <button className=" flex  hover:bg-indigo-300 gap-2 mt-2 prose-sm text-gray-600 bg-gray-100 p-2 rounded-full " onClick={() => handleDeleteContent(id)}>
                                    <Delete/> Delete
                                </button>

                                <Link href={`/contents/${id}/edit`} className="hover:bg-indigo-300 gap-2 flex mt-2 prose-sm text-gray-600 bg-gray-100 p-2 rounded-full ">
                                   <Edit2/> Edit
                                </Link>
                            </div>
                        )}
                        <Link href={`/contents/${id}`} className="hover:underline">
                            <h2 className="prose-xl font-bold">{title}</h2>
                            <p className="mt-2 prose-sm text-gray-600">{description}</p>
                        </Link>
                        <div className="space-x-4 flex relative">
                            <button className="text-gray-600 hover:text-gray-900" onClick={() => handleComingSoon('like')}>
                                👍 Like
                            </button>
                            <button className="text-gray-600 hover:text-gray-900" onClick={() => handleComingSoon('bookmark')}>
                                🔖 Bookmark
                            </button>
                            <button className="text-gray-600 hover:text-gray-900" onClick={() => handleComingSoon('comment')}>
                                🗨️ Comment
                            </button>
                            {showPopup && (
                                <div className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                                    Coming Soon!
                                </div>
                            )}
                        </div>
                        {successMessage && (
                            <div className="mt-2 text-green-600 font-semibold">{successMessage}</div>
                        )}
                    </div>
                    <CustomImagePlaceholder src={coverImageUrl} width={150} height={150} alt="content_image" />
                </>
            )}
        </div>
    );
};

export default ContentBlock;