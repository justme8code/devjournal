import React from "react";

export const ContentShimmer = () => {
    return (
        <>
            <div className={"space-y-10 "}>
                 <div className={"flex gap-5 items-center justify-between"}>

                          <div className="space-y-6 w-screen max-w-md">
                          <div className="shimmer-box w-full max-w-sm h-4 bg-gray-200 animate-pulse rounded-md"></div>
                          <div className="shimmer-box w-full max-w-md h-4 bg-gray-200 animate-pulse rounded-md"></div>
                          <div className="shimmer-box w-full max-w-xs h-2 bg-gray-200 animate-pulse rounded-md"></div>
                          </div>

                     <div className="shimmer-box  max-w-40  h-40 w-40 bg-gray-200 animate-pulse rounded-md max-md:hidden"></div>

                 </div>
            </div>


        </>
    );
};