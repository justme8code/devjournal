"use client";

import { Button } from "@/app/components/Button";
import { useRouter} from "next/navigation";
import { navTabs } from "@/app/const_data";

export const ContentsNavbar = ({currentNavbar}:{currentNavbar:string}) => {

    const router = useRouter();

    const decodedNavbar = decodeURIComponent(currentNavbar || "feed");


    const handleButtonClick = (button: string) => {
        if (button === "feed") {
            router.push("/contents", { scroll: false }); // Remove query params for default feed
        } else {
            const category = encodeURIComponent(button.toLowerCase());
            router.push(`/contents/category/${category}`, { scroll: false });
        }

    };

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
                                decodedNavbar === btn ? "bg-indigo-500 text-white" : "bg-gray-100 hover:bg-indigo-200"
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
