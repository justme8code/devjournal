'use client';
import { Button } from "@/app/components/Button";
import {useBlogStore} from "@/app/store/useBlogStore";
import {exploreBlogPost} from "@/app/contents/actions";
import {useTabStore} from "@/app/store/useTabStore";
import {navTabs} from "@/app/const_data";


export const ContentsNavbar = () => {
    const {tab, setTab} = useTabStore();
    const {modifyPosts} = useBlogStore();

    const handleButtonClick = async (button: string) => {
        setTab(button);
        if (button !== "Feed" && button !== tab) {
            const { data, success } = await exploreBlogPost(button.toLowerCase());
            console.log(data);

            if (success && data.length > 0) {
                modifyPosts(data);
            } else {
                console.error("Failed to fetch blog posts or no posts available");
                modifyPosts(null); // Clear posts or handle accordingly
            }
        }
    };

    //link


    return (
        <>
            {/* Normal Navbar (Desktop) */}
            <div className="hidden md:block mb-10 bg-white shadow-sm z-20 fixed top-0 w-full max-w-2xl pt-20">
                <section className="flex items-center pt-2 px-2 gap-2 flex-wrap whitespace-nowrap">
                    {navTabs.map((btn) => (
                        <Button
                            key={btn}
                            text={btn}
                            className={`font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                                tab === btn ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-indigo-200'
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
