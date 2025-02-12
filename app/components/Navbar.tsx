import React from "react";

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
                {!override && (
                    <h1 className="text-xl text-gray-800 font-bold">TechTide</h1>
                )}



                {/* Extra Custom Elements */}
                {children}
            </div>
        </nav>
    );
};
