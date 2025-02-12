import Link from "next/link";

export const ContentsNavbar = () => {
    return (

            <div className="flex flex-col mb-10 sticky top-0 bg-white shadow-sm z-20 ">
                {/* Latest Link */}
                <div className={"flex"}>
                    <Link href="#" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
                        Latest
                    </Link>
                </div>
                <div className="border-b border-neutral-200 mt-2 w-full"></div> {/* Gray line after Latest */}
            </div>
    );
};