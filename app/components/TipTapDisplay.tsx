'use client';
import {EditorContent, JSONContent, useEditor} from "@tiptap/react";
import {CustomTipTapExtensionConfig} from "@/app/components/editor_config";

interface TipTapDisplayProps {
    content: JSONContent;
}

export const TipTapDisplay = ({content}:TipTapDisplayProps) => {

    const editor = useEditor(
        {
            editable:false,
            extensions:CustomTipTapExtensionConfig,
            content:content,
            editorProps: {
                attributes: {
                    class: 'prose prose-lg w-full sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none font-mono',
                },
            },
        }
    );
    return (
        <>
            <EditorContent editor={editor} className="prose max-w-3xl mt-4"  />
        </>
    );
};