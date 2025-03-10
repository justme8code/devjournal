'use client';
import { useState } from "react";
import { Button } from "@/app/components/Button";
import { FaTimes } from "react-icons/fa";
import { Blocks } from "lucide-react";
import {useTabStore} from "@/app/store/useTabStore";
import {navTabs} from "@/app/const_data";

export const SideBarMobile = () => {
    const {tab,setTab} = useTabStore();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Controls sidebar visibility

    const handleButtonClick = (button: string) => {
        setTab(button);
        setSidebarOpen(false); // Close sidebar when a category is selected
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
            <aside className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-4 z-50 overflow-x-auto transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:hidden`}>
                <button onClick={() => setSidebarOpen(false)} className="p-2 bg-gray-100 rounded-full absolute top-4 right-4">
                    <FaTimes size={20} className="text-gray-700" />
                </button>
                <h3 className="text-xl font-semibold mb-4">Blog Categories</h3>
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
            </aside>
        </>
    );
};
