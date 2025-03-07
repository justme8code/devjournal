import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
    text?: string;
    className?: string;
}

export const Button = ({ href, onClick, icon, text, className = "" }: ButtonProps) => {
    const content = (
        <div className={`flex items-center gap-2 ${className}`}>
            {icon}
            {text}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="hover:underline">
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} >
            {content}
        </button>
    );
};