
import {format} from "date-fns";
import {axiosInstance} from "@/app/axios";
import {TECH_TIDE_BLOGS_URL} from "@/app/api_urls";
import {convertBlogPostToJsonContent} from "@/app/utils/constants_fn";
import {Logo} from "@/app/Logo";
import NextLink from "next/link";
import {TipTapDisplay} from "@/app/components/TipTapDisplay";
import {Footer} from "@/app/components/Footer";


const fetchContent = async (contentId:string) => {
    try {
        const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}/${contentId}`);
        if (data) {
            return convertBlogPostToJsonContent(data);
        }
    } catch (error) {
        console.error('Error fetching content:', error);
    }
};

function formatPublishedDate(publishedOn: string) {
    const date = new Date(publishedOn);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    }
    return format(date, "EEE, do MMM yyyy");
}

export  async function ViewContent ({contentId}:{contentId:string}){
    const post = await fetchContent(contentId)
    return (
        <div className={"space-y-6"}>
            <nav className="bg-white p-2 border-b border-neutral-200 shadow-sm z-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                        <Logo />
                    </div>
                    <div className={"flex gap-10"}>
                        <NextLink href="/" className="text-gray-600 hover:text-gray-900">Home</NextLink>
                        <NextLink href="/contents" className="text-gray-600 hover:text-gray-900">Contents</NextLink>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col h-screen justify-between text-gray-900">
                <main className="container flex flex-col mx-auto px-2 max-w-2xl justify-center items-center">
                    <div>
                        {post && (
                            <div className={"space-y-5"}>
                                <div className={"max-w-2xl sticky top-0 z-10 bg-neutral-50"}>
                                    <h1 className={"prose-xs font-bold"}>{post?.title}</h1>
                                    {post?.publishedOn && <i className={"prose-xs"}>{formatPublishedDate(post.publishedOn)}</i>}
                                </div>
                                <div>
                                    {post.description && post.description !== "" && <p>{post?.description}</p>}
                                </div>
                                {post.content && <TipTapDisplay content={post.content} />}
                            </div>
                        ) }
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}