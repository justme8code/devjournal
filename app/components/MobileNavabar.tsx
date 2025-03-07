
'use client';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Logo } from '@/app/Logo';
import Link from 'next/link';
import { SideBarMobile } from './SideBarMobile';

export const MobileNavbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <nav className="flex items-center p-3 border-b bg-white shadow-sm max-w-7xl mx-auto sticky z-30 top-0">
                <div className="flex w-full gap-10 items-center max-md:justify-between">
                    {/* Logo */}
                    <Logo />

                    {/* Search Bar (Hidden on Mobile) */}
                    <input
                        type="text"
                        placeholder="Search for articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-xl p-3 px-4 bg-neutral-100 outline-none rounded-full hidden md:block"
                    />

                    {/* Mobile Search Icon */}
                    <div className={"flex gap-4"}>
                        <button
                            className="md:hidden p-2 bg-gray-100 rounded-full"
                            onClick={() => setSearchOpen(true)}
                        >
                            <FaSearch size={20} className="text-gray-700" />
                        </button>

                        <SideBarMobile/>
                    </div>


                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link href="/" className="hover:text-indigo-500">Home</Link>
                </div>
            </nav>

            {/* Mobile Search Overlay */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg w-3/4 shadow-lg relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 p-2 bg-gray-100 rounded-full"
                            onClick={() => setSearchOpen(false)}
                        >
                            <FaTimes size={20} className="text-gray-700" />
                        </button>

                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none"
                        />
                    </div>
                </div>
            )}
        </>
    );
};
