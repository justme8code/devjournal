'use client';
import tech from "@/public/tech.svg";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import Head from "next/head";
import Image from "next/image";
import { Logo } from "@/app/Logo";
import React from "react";
import {motion} from "framer-motion";
import {SideBarMobile} from "@/app/components/SideBarMobile";

export default function Home() {

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

            <nav className="flex justify-between items-center fixed top-0 bg-white w-full shadow-md">
                <Logo />
                <SideBarMobile/>
            </nav>

            <div className="flex flex-col h-screen bg-white text-gray-900">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-green-300 via-gray-100 to-gray-300 py-20 text-center">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-center items-center space-x-8 max-sm:flex-col">
                            <div className="text-left max-w-lg space-y-14">
                                <h2 className="text-5xl max-sm:text-3xl font-bold">DevJournal — Writing the Future, One Line at a Time</h2>
                                <div>
                                    <Image
                                        src={tech.src}
                                        alt="Tech Image"
                                        className=""
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                                <h2 className="mt-4 text-xl max-sm:text-sm font-medium">Journaling every line of knowledge at a time, for you to explore later</h2>

                                <motion.div

                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="flex justify-center rounded-full bg-green-600 p-2 px-5 text-white shadow-md items-center gap-2"
                                >
                                    <Link href="/contents" className="p-3">Start Journaling</Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}