import { Suspense } from "react";
import Loading from "@/loading";
import {ViewContent} from "@/app/contents/[contentId]/ViewContent";

export default async function View({params}:{params: Promise <{contentId:string}>}) {
    const contentId = await params;

    return (
         <main className={"mx-auto max-w-2xl"}>
             <Suspense fallback={<Loading/>}>
                 <ViewContent contentId={contentId.contentId} />
             </Suspense>
         </main>
    );
}