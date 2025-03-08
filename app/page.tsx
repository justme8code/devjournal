'use client';
import tech from "@/public/tech.svg";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { AboutUs } from "@/app/components/AboutUs";
import { ContactUs } from "@/app/components/ContactUs";
import Head from "next/head";
import Image from "next/image";
import { Logo } from "@/app/Logo";
import { useState } from "react";
import {ListIcon} from "lucide-react";

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Head>
                <title>TechTide - The Future of Tech</title>
                <meta name="description" content="Stay updated with the latest in tech, AI, and programming." />
                <meta name="keywords" content="Tech, AI, Programming, Java, React, Spring Boot" />
                <meta name="author" content="Thompson" />
                <meta property="og:title" content="TechTide - The Future of Tech" />
                <meta property="og:description" content="Stay updated with the latest in tech, AI, and programming." />
                <meta property="og:url" content="https://techtide.vercel.app" />
            </Head>

            <nav className="flex justify-between p-1 fixed top-0 bg-white w-full shadow-md">
                <Logo />
                <button
                    className="md:hidden p-2 border rounded-lg"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <ListIcon/>
                </button>
                <ul className={`md:flex space-x-2 items-center ${menuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 bg-white md:bg-transparent w-full md:w-auto p-3 md:p-0 shadow-md md:shadow-none`}>
                    <li><Link href="/contents" className="block text-gray-600 hover:text-gray-900 p-2">Contents</Link></li>
                    <li><AboutUs /></li>
                    <li><ContactUs /></li>
                </ul>
            </nav>

            <div className="flex flex-col h-screen bg-white text-gray-900">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-green-300 via-gray-100 to-gray-300 py-20 text-center">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-center items-center space-x-8 max-sm:flex-col">
                            <div className="text-left max-w-lg space-y-10">
                                <h2 className="text-6xl max-sm:text-3xl font-bold">Ready To Ride the Wave of Innovation</h2>
                                <div>
                                    <Image
                                        src={tech.src}
                                        alt="Tech Image"
                                        className="rounded-lg"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                                <h2 className="mt-4 text-xl max-sm:text-sm font-medium">Exploring the latest breakthroughs and trends in technology.</h2>
                                <div><Link href="/contents" className="p-3 shadow-2xl bg-black text-white rounded-full">Start learning</Link></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}