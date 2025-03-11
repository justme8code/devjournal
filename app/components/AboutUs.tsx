'use client';
import {useState} from "react";
import {AnimatedPopUp} from "@/app/components/AnimatedPopUp";

export const AboutUs = () => {
    const [showInfo, setShowInfo] = useState(false);
    return (

        <>
            <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-600 hover:text-gray-900  py-1 rounded-md"
            >
                About Me
            </button>
            {
                showInfo && (
                    <AnimatedPopUp onClickClose={() => setShowInfo(false)}>
                        <div className="text-gray-700 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">About DevJournal</h2>
                            <p>
                                DevJournal is a platform dedicated to help developers and tech enthusiasts
                                learn.
                                My goal is to automate developers code by helping journaling them,
                                which other people/developers can see this journals as a useful tool to use and help them grow
                            </p>
                            <p>
                                Whether you`&#39;`re a beginner exploring the world of programming or an experienced
                                developer looking to deepen your knowledge, DevJournal offers insightful articles,
                                hands-on tutorials, and real-world project guides to help you grow.
                            </p>
                            <p>
                                Join me as DevJournal journals every line of code.
                            </p>
                        </div>
                    </AnimatedPopUp>
                )
            }
        </>
    );
};
