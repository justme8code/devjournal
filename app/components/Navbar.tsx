import React from "react";
import {LogoutButton} from "@/app/components/LogoutButton";
import {Logo} from "@/app/Logo";

interface NavbarProps {
    override?: boolean; // If true, use custom content instead of defaults
    children?: React.ReactNode; // Additional elements (e.g., search bar, profile picture)
    className?: string; // Allow custom styling
}

export const Navbar: React.FC<NavbarProps> = ({
                                                  override = false,
                                                  children,
                                                  className = ""
                                              }) => {


    return (
        <nav className={`bg-white shadow-md py-4  ${className}`}>
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Left Side (Brand) */}
                <div className={"flex gap-2 items-center space-x-20"}>
                    {!override && (
                         <Logo/>
                    )}

                    {/* Extra Custom Elements */}
                    {children}

                </div>



                <LogoutButton/>

            </div>
        </nav>
    );
};
