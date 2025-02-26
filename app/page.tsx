'use client';
import tech from "@/public/tech.svg";
import Link from "next/link";
import {Footer} from "@/app/components/Footer";
import {AboutUs} from "@/app/components/AboutUs";
import {ContactUs} from "@/app/components/ContactUs";
import {Navbar} from "@/app/components/Navbar";
import Head from "next/head";
import Image from "next/image";

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

            <div className="flex flex-col min-h-screen bg-white text-gray-900">
                {/* Navbar */}

                <Navbar  >
                    <ul className="flex space-x-6 items-center">
                        <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                        <li><AboutUs/></li>
                        <li><ContactUs/></li>
                    </ul>
                </Navbar>

                <div className="flex-grow">
                    {/* Hero Section */}
                    <section className="bg-gradient-to-r from-blue-50 via-gray-100 to-gray-300 py-20 text-center">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-center items-center space-x-8">
                                <div className="text-left max-w-lg space-y-10">
                                    <h2 className="text-6xl font-bold">Ready To Ride the Wave of Innovation</h2>
                                    <h2 className="mt-4 text-xl">Exploring the latest breakthroughs and trends in technology.</h2>
                                    <div><Link href={"/contents"} className={"p-3 shadow-2xl bg-black text-white rounded-full"}>Start learning</Link></div>
                                </div>
                                <div className="w-1/3">
                                    <Image
                                        src={tech.src}
                                        alt="Tech Image"
                                        className="rounded-lg"
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <Footer/>
            </div>
        </>

    );
}
