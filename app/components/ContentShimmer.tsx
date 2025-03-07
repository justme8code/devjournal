import React from "react";

export const ContentShimmer = () => {
    return (


                 <div className={"flex items-center justify-between w-full"}>
                          <div className="space-y-6 w-full">
                          <div className="shimmer-box w-full max-w-sm h-4 bg-gray-200 animate-pulse rounded-md"></div>
                          <div className="shimmer-box w-full max-w-md h-4 bg-gray-200 animate-pulse rounded-md"></div>
                          <div className="shimmer-box w-full max-w-xs h-2 bg-gray-200 animate-pulse rounded-md"></div>
                          </div>

                     <div className="shimmer-box  max-w-48  h-20 w-20 bg-gray-200 animate-pulse rounded-md max-md:hidden"></div>

                 </div>



    );
};