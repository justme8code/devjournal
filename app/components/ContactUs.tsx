'use client';
import {AnimatedPopUp} from "@/app/components/AnimatedPopUp";
import {useState} from "react";
import {LocateIcon} from "lucide-react";
import {BsWhatsapp} from "react-icons/bs";
import {MdEmail} from "react-icons/md";
import {FaXTwitter} from "react-icons/fa6";

export const ContactUs = () => {
    const [showInfo, setShowInfo] = useState(false);
    return (

        <>
            <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-600 hover:text-gray-900 py-1 rounded-md"
            >
                Contact Us
            </button>
            {showInfo && (
                <AnimatedPopUp onClickClose={() => setShowInfo(false)}>
                    <div className="text-gray-700 space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
                        <p>
                            Have questions, feedback, or collaboration ideas? I’d love to hear from you!
                            Reach out to me through any of the channels below.
                        </p>


                        <div className={"flex flex-col justify-center items-center w-full"}>
                            <p className={"flex items-center gap-3"}>
                                <MdEmail/>
                                <span className="font-semibold"> bjmay302004@gmail.com  </span>
                            </p>

                            <p className={"flex items-center gap-3"}>
                                <BsWhatsapp/>
                                <span className="font-semibold">+234 9158497042 </span>
                            </p>

                            <p className={"flex items-center gap-3 "}>
                                <FaXTwitter/>
                                <span className="font-semibold">
                                    justme8code
                                </span>
                            </p>

                            <p className={"flex items-center gap-3"}>
                                <LocateIcon/>
                                <span className="font-semibold">
                                    DevJournal HQ, Lagos, Nigeria
                                </span>
                            </p>
                        </div>

                        <p>Follow me on social media to stay updated!</p>


                    </div>
                </AnimatedPopUp>
            )}

        </>


    );
};
