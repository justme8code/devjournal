'use client';
import { useState } from 'react';
import { Button } from "@/app/components/Button";
import {useBlogStore} from "@/app/store/useBlogStore";

export const ContentsNavbar = () => {
    const [activeButton, setActiveButton] = useState<string | null>("Latest");
    const {posts,modifyPosts} = useBlogStore();

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
    };

    //link
    const buttons = [
        "Latest", "Trending", "Most Viewed", "Microsoft Azure"
    ];

    // based on what button is clicked we want to fetch blogs
    // by modifying the global useBlogstoreState


    return (
        <>
            {/* Normal Navbar (Desktop) */}
            <div className="hidden md:block mb-10 bg-white shadow-sm z-20 fixed top-0 w-full max-w-2xl pt-20">
                <section className="flex items-center pt-2 px-2 gap-2 flex-wrap whitespace-nowrap">
                    {buttons.map((btn) => (
                        <Button
                            key={btn}
                            text={btn}
                            className={`font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                                activeButton === btn ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-indigo-200'
                            }`}
                            onClick={() => handleButtonClick(btn)}
                        />
                    ))}
                </section>
                <div className="border-b border-neutral-200 mt-2 w-full"></div>
            </div>
        </>
    );
};
