import {AnimatedPopUp} from "@/app/components/AnimatedPopUp";
import {useState} from "react";

export const ContactUs = () => {
    const [showInfo, setShowInfo] = useState(false);
    return (

        <>
            <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-gray-600 hover:text-gray-900 border px-4 py-1 rounded-md"
            >
                ContactUs
            </button>
            {showInfo && (
                <AnimatedPopUp onClickClose={() => setShowInfo(false)}>
                    <div className="text-gray-700 space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
                        <p>
                            Have questions, feedback, or collaboration ideas? We’d love to hear from you!
                            Reach out to us through any of the channels below.
                        </p>

                        <div className="space-y-2">
                            <p><span className="font-semibold">📧 Email:</span> bjmay302004@gmail.com </p>{/*info@techtide.com*/}
                            <p><span className="font-semibold">📍 Location:</span> TechTide HQ, Lagos, Nigeria</p>
                        </div>

                        <p>Follow us on social media to stay updated!</p>


                    </div>
                </AnimatedPopUp>
            )}

        </>


    );
};
