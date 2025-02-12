
import { ImageIcon,  PlusCircle} from "lucide-react";
import { motion } from "framer-motion";

export const AddContent = ({onClick,visible}:{onClick:()=>void,visible:boolean}) => {

    const parentVariants = {
        hidden: { opacity: 1, transition: { staggerChildren: 0.2, staggerDirection: -1 } }, // Reverse order when hiding
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const childVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <div className="flex gap-4 absolute top-10 text-2xl text-gray-700 -left-10 items-center">
            <button className="border-none outline-none" onClick={onClick}>
                <PlusCircle />
            </button>

            {/* Always render the motion.section */}
            <motion.section
                variants={parentVariants}
                initial="hidden"
                animate={visible ? "visible" : "hidden"}
                className="flex gap-2"
            >
                <motion.div variants={childVariants}>
                    <button onClick={onClick}>
                        <ImageIcon />
                    </button>
                </motion.div>

            </motion.section>
        </div>
    );
};
