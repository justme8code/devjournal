// ListOfContents.tsx (Server Component)
import ContentBlock from "@/app/components/ContentBlock";
import { BlogPost } from "@/app/types";
import { axiosInstance } from "@/app/axios";
import { TECH_TIDE_BLOGS_URL } from "@/app/api_urls";

async function fetchContents() {
    try {
        const { data } = await axiosInstance.get(`${TECH_TIDE_BLOGS_URL}?page=0&size=100`);
        return data.content.length ? data.content : null;
    } catch {
        return null;
    }
}

export default async function ListOfContents() {
    const posts = await fetchContents(); // Fetch data on the server

    return (
        <div className="w-full pt-20 max-md:pt-0 p-2">
            <h1 className="font-bold p-2">Feed</h1>

            {posts === null && <div className="text-red-500 text-center my-4">No posts yet</div>}

            {posts && posts.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 w-full">
                    {posts.map((post: BlogPost) => (
                        <div key={post.id} className="space-y-6 flex flex-col items-center justify-center">
                            <ContentBlock
                                id={post.id}
                                title={post.title}
                                description={post.description}
                                coverImageUrl={post.coverImageUrl}
                            />
                            <div className="h-0.5 w-full bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
