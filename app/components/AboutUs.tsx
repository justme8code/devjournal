'use client';
import {useState} from "react";
import {AnimatedPopUp} from "@/app/components/AnimatedPopUp";

export const AboutUs = () => {
    const [showInfo, setShowInfo] = useState(false);
    return (

        <>
            <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-600 hover:text-gray-900 border px-4 py-1 rounded-md"
            >
                AboutUs
            </button>
            {
                showInfo && (
                    <AnimatedPopUp onClickClose={() => setShowInfo(false)}>
                        <div className="text-gray-700 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">About TechTide</h2>
                            <p>
                                TechTide is a platform dedicated to empowering developers, tech enthusiasts,
                                and innovators. Our goal is to simplify complex technologies and provide a space
                                where learning meets creativity.
                            </p>
                            <p>
                                Whether you`&#39;`re a beginner exploring the world of programming or an experienced
                                developer looking to deepen your knowledge, TechTide offers insightful articles,
                                hands-on tutorials, and real-world project guides to help you grow.
                            </p>
                            <p>
                                Join us as we ride the wave of innovation and make technology more accessible
                                to everyone!
                            </p>
                        </div>
                    </AnimatedPopUp>
                )
            }
        </>
    );
};
