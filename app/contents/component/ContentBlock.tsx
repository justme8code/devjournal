import { useState } from "react";
import Link from "next/link";

interface Props {
    id: string;
    title: string,
    description: string,
    coverImageUrl?: string,
}

const ContentBlock = ({ id,title, description, coverImageUrl }:Props) => {
    const [showPopup, setShowPopup] = useState<string|null>(null);

    const handleComingSoon = (button:string) => {
        setShowPopup(button);
        setTimeout(() => setShowPopup(null), 2000);
    };

    return (
        <div className="flex justify-between flex-col border-b border-gray-300 pb-6 mb-6">
            <div className="flex items-center space-x-4 justify-between">

                <div className="text-left max-w-lg">
                    <Link  href={`/contents/${id}`} className={"hover:underline"}>
                        <h2 className="prose-xl font-bold">{title}</h2>
                        <p className="mt-2 prose-sm text-gray-600">{description}</p>
                    </Link>

                    <div className="space-x-4 flex relative">
                        <button className="text-gray-600 hover:text-gray-900" onClick={() => handleComingSoon('like')}>👍 Like</button>
                        <button className="text-gray-600 hover:text-gray-900" onClick={() => handleComingSoon('bookmark')}>🔖 Bookmark</button>
                        <button className="text-gray-600 hover:text-gray-900" onClick={() => handleComingSoon('comment')}>🗨️ comment</button>
                        {showPopup && (
                            <div className="absolute bg-gray-800 text-white text-xs rounded py-1 px-2 bottom-full mb-2">
                                Coming Soon!
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-40">
                    <img
                        src={coverImageUrl || "https://placehold.co/150"}
                        alt="Tech Content"
                        className="rounded-sm "
                    />
                </div>
            </div>

        </div>
    );
};

export default ContentBlock;
