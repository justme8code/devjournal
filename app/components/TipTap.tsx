'use client';
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import {
    Bold, Italic, Heading1, Heading2, Heading3, Link as LinkIcon, List,
    AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Code as CodeIcon, Undo, RedoIcon, SaveIcon, Trash2
} from 'lucide-react'
import {CustomTipTapExtensionConfig} from "@/app/components/editor_config";
import {useEffect, useState} from 'react';

interface TipTapProps {
    content?:JSONContent
    onContentChange: (content: JSONContent) => void
}

const TipTap = ({content,onContentChange}:TipTapProps) => {
    const [wordCount, setWordCount] = useState(0);
    const editor = useEditor({
        editable:true,
        immediatelyRender:false,
        extensions:CustomTipTapExtensionConfig,
        content: content??`<p>Type in here</p>`, // ✅ Load stored content instead of default
        editorProps: {
            attributes: {
                class: 'prose  max-w-lg:prose-xs w-full sm:prose  lg:prose-lg xl:prose-xl mx-auto focus:outline-none font-mono',
            },
        },

        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            onContentChange(json);
            const text = editor.getText();
            setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);

        },
        onCreate: ({ editor }) => {
            const text = editor.getText();
            setWordCount(text.split(/\s+/).filter(word => word.length > 0).length);
        }

    });

    const saveDraft = () => {
        if (editor) {
            const content = editor.getJSON();
            localStorage.setItem('draftContent', JSON.stringify(content));
            alert('Draft saved!');
        }
    };

    const clearDraft = () => {
        if (window.confirm('Are you sure you want to clear the draft?')) {
            localStorage.removeItem('draftContent');
            if (editor) {
                editor.commands.clearContent();
            }
            alert('Draft cleared!');
        }
    };



    useEffect(() => {
        const savedDraft = localStorage.getItem('draftContent');
        if (savedDraft && editor) {
            editor.commands.setContent(JSON.parse(savedDraft));
        }
    }, [editor]);





    if (!editor) return null;

    return (
        <div className="relative">
            {/* Toolbar */}
            {<div className="flex gap-2 bg-white shadow-md p-2 rounded-lg border sticky top-0 z-10 flex-wrap">
                <button onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}>
                    <Bold size={16} />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}>
                    <Italic size={16} />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                    <Heading1 size={16} />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 size={16} />
                </button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                    <Heading3 size={16} />
                </button>
                <button onClick={() =>  editor.chain().focus().setParagraph().run()}>P</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <List size={16} />
                </button>
                <button onClick={() => {
                    const url = prompt('Enter the URL')
                    if (url) editor.chain().focus().setLink({ href: url }).run()
                }}>
                    <LinkIcon size={16} />
                </button>
                <button onClick={() => {
                    const url = prompt('Enter image URL')
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}>
                    <ImageIcon size={16} />
                </button>

                <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                    <AlignLeft size={16} />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                    <AlignCenter size={16} />
                </button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                    <AlignRight size={16} />
                </button>
                <button onClick={() => {
                    const language = prompt('Enter language (e.g., javascript, python, java)')
                    if (language) {
                        editor.chain().focus().toggleCodeBlock({ language }).run();
                    }
                }}>
                    <CodeIcon size={16} />
                </button>

                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                    <Undo size={16} />
                </button>

                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                    <RedoIcon size={16} />
                </button>

                <button onClick={saveDraft}>
                    <SaveIcon size={16} />
                </button>

                <button onClick={clearDraft}>
                    <Trash2 size={16} />
                </button>
            </div>}

            {/* Editor */}
            <EditorContent editor={editor} className="prose max-w-none mt-4"  />
            {/* Word Count */}
            <div className="mt-2 text-right text-gray-500">
                Word Count: {wordCount}
            </div>
        </div>
    )
};

export default TipTap
