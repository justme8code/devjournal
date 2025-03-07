import React from 'react';
import { SidePanel } from "@/app/components/SidePanel";
import { Footer } from "@/app/components/Footer";
import { ContentsNavbar } from "@/app/components/ContentsNavbar";
import { ListOfContents } from "@/app/contents/ListOfContents";
import { MobileNavbar } from '../components/MobileNavabar';


export default function ContentPage() {

    return (
        <>
                <MobileNavbar/>


            <div className="flex flex-col min-h-screen bg-white text-gray-900">
                <div className="flex justify-center w-full">
                    {/* Main Content */}
                    <main className="w-full max-w-2xl">
                        <ContentsNavbar />
                        <ListOfContents />
                    </main>

                    {/* Side Panel */}
                    <SidePanel />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}
