import {motion} from "motion/react";

interface Props{
    children:React.ReactNode;
    onClickClose:() => void;
}
export const AnimatedPopUp = ({children,onClickClose}:Props) => {
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white shadow-lg p-6 rounded-lg w-1/3 max-md:w-full text-center"
                >
                    {children}
                    <button
                        onClick={onClickClose}
                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        Close
                    </button>
                </motion.div>
            </div>
        </>
    );
};