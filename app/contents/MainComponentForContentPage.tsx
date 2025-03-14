import {MobileNavbar} from "@/app/components/MobileNavabar";
import {ContentsNavbar} from "@/app/components/ContentsNavbar";
import React, {Suspense} from "react";
import Loading from "@/loading";
import ListOfContents from "@/app/contents/ListOfContents";
import {SidePanel} from "@/app/components/SidePanel";
import {Footer} from "@/app/components/Footer";

export const MainComponentForContentPage = ({category}:{category:string}) => {
    return (
        <>
            <MobileNavbar/>
            <div className="flex flex-col min-h-screen bg-white text-gray-900">
                <div className="flex justify-center ">
                    {/* Main Content */}
                    <main className="w-full max-w-2xl  ">
                        <ContentsNavbar  currentNavbar={category}/>
                        <Suspense fallback={<Loading />}>
                            <ListOfContents category={category}/>
                        </Suspense>
                    </main>

                    {/* Side Panel */}
                    <SidePanel />
                </div>
            </div>

            {/* Footer */}
            <Footer />

        </>
    );
};