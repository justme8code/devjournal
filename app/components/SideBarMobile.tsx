'use client';
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { FaTimes } from "react-icons/fa";
import { Blocks } from "lucide-react";
import {useTabStore} from "@/app/store/useTabStore";
import {navTabs} from "@/app/const_data";
import {LogoutButton} from "@/app/components/LogoutButton";
import Link from "next/link";
import {AboutUs} from "@/app/components/AboutUs";
import {ContactUs} from "@/app/components/ContactUs";
import {useRouter} from "next/navigation";

export const SideBarMobile = () => {
    const {tab,setTab} = useTabStore();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Controls sidebar visibility
    const router = useRouter();

    const handleButtonClick = (button: string) => {
        setTab(button);
        setSidebarOpen(false); // Close sidebar when a category is selected

        if (button === "Feed") {
            router.push("/contents", { scroll: false }); // Remove query params for default feed
        } else {
            const category = encodeURIComponent(button.toLowerCase());
            router.push(`/contents/category/${category}`, { scroll: false });
        }
    };


    return (
        <>
            {/* Mobile Sidebar Button */}
            <div className="md:hidden  flex justify-between items-center bg-white ">
                <h3 className="font-semibold"></h3>
                <button onClick={() => setSidebarOpen(true)} className="p-2 bg-gray-100 rounded-full">
                    <Blocks  className="text-gray-700" />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Sidebar (Mobile Only) */}
            <aside className={`fixed  flex flex-col justify-between top-0 left-0 w-64 h-full bg-white shadow-lg p-4 z-50 overflow-x-auto transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:hidden space-y-5`}>
                <button onClick={() => setSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full absolute top-4 right-4">
                    <FaTimes size={20} className="text-gray-700" />
                </button>

                 <div className={"flex flex-col gap-3"}>
                     <div className={""}>
                         <h3 className="font-semibold mb-4">Go To</h3>
                         <ul className={`flex flex-col gap-2`}>
                             <li><Link href="/contents" className="block text-gray-600 hover:text-gray-900">Contents</Link></li>
                             <li><AboutUs /></li>
                             <li><ContactUs /></li>
                         </ul>
                     </div>

                     <div className={" "}>
                         <h3 className=" font-semibold mb-4">Explore</h3>
                         <div className="flex flex-col gap-3">
                             {navTabs.map((btn) => (
                                 <Button
                                     key={btn}
                                     text={btn}
                                     className={`font-bold px-3 py-2 rounded-lg text-left ${
                                         tab === btn ? "bg-indigo-500 text-white" : "bg-gray-100 hover:bg-indigo-200"
                                     }`}
                                     onClick={() => handleButtonClick(btn)}
                                 />
                             ))}

                         </div>
                     </div>
                 </div>

                <div className={"flex font-bold"}>
                    <LogoutButton />
                </div>

            </aside>
        </>
    );
};
