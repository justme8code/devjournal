'use client';
import { useState, useTransition } from "react";
import Link from "next/link";
import { useBlogStore } from "@/app/store/useBlogStore";
import CustomImagePlaceholder from "@/app/components/CustomImagePlaceholder";
import { deleteBlogPost } from "@/app/contents/actions";
import {useLoggedInUser} from "@/app/store/useLoggedInUser";
import {Bookmark,Delete, Edit2, Heart, MessagesSquareIcon} from "lucide-react";
import {Button} from "@/app/components/Button";

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
        /*

        *
        * */

        <div className="flex flex-col  max-sm:max-w-sm w-full relative">
            {isPending ? (
                <p className={"bg-indigo-200 p-2 rounded-full animate-pulse"}>Deleting Content...</p>
            ) : (
                <div className="flex flex-col  gap-5">
                    {successMessage && (
                        <div className="mt-2 text-green-600 font-semibold">{successMessage}</div>
                    )}
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
                    <section className="flex items-center  justify-between sm:space-x-10 text-left max-w-xl space-y-4  max-sm:flex-col ">

                            <Link href={`/contents/${id}`} className="hover:underline">
                                <h2 className="prose-xl font-bold">{title}</h2>
                                <p className="mt-2 prose-sm text-gray-600">{description}</p>
                            </Link>

                        {
                            coverImageUrl&&<CustomImagePlaceholder
                                src={coverImageUrl}
                                alt="post Image"
                                className="overflow-hidden max-h-52 max-sm:inline sm:max-w-60 sm:max-h-40 "
                                imageClassName="object-contain w-full h-full sm:max-w-64  sm:max-h-64"
                            />
                        }
                    </section>


                    <div className="flex gap-6 ">
                        <Button  text={"20k"} icon={<Heart/>} onClick={() => handleComingSoon('like')}/>

                        <Button  text={"30k"} icon={<Bookmark/>} onClick={() => handleComingSoon('bookmark')}/>

                        <Button  text={"40k"} icon={<MessagesSquareIcon/>} onClick={() => handleComingSoon('comments')}/>
                        {showPopup && (
                            <div className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                                Coming Soon!
                            </div>
                        )}
                    </div>


                </div>
            )}

        </div>

    );
};

export default ContentBlock;