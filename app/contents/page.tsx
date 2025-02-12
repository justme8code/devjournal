'use client';
import React, { useState } from 'react';
import {SidePanel} from "@/app/contents/component/SidePanel";
import {Footer} from "@/app/components/Footer";
import {ContentsNavbar} from "@/app/contents/component/ContentsNavbar";
import Link from "next/link";
import {ListOfContents} from "@/app/contents/ListOfContents";
import {Navbar} from "@/app/components/Navbar";

export default function ContentPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
            {/* Navbar */}
            <Navbar override={true} className={"flex shadow-none border-b border-neutral-200 "}>
                 <div className={"flex gap-2 items-center"}>
                     <h1 className="text-xl text-gray-800 font-bold">TechTide</h1>
                     <input
                         type="text"
                         placeholder="Search for articles..."
                         value={searchQuery}
                         onChange={handleSearchChange}
                         className="w-64 p-2 px-2 bg-neutral-100 outline-none rounded-full max-md:hidden"
                     />
                 </div>

                <Link key="home" href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            </Navbar>



            <div className={"flex mx-auto"}>
                {/* Content Section with Side Panel */}
                <main className="flex py-8 ">
                    <div>
                        <ContentsNavbar/>
                        <ListOfContents/>
                    </div>

                </main>
                {/* Side Panel */}
                <SidePanel/>

            </div>


        </div>
            {/* Footer */}
            <Footer/>
        </>
    );
}
