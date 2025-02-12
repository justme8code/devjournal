'use client';
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import 'highlight.js/styles/atom-one-dark.css';
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import {
    Bold, Italic, Heading1, Heading2, Heading3, Link as LinkIcon, List,
    AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Code as CodeIcon
} from 'lucide-react'
import { Image } from '@tiptap/extension-image'
import {useEffect} from "react";

//   Initialize lowlight.js for syntax highlighting
const lowlight = createLowlight(common);

//   Custom Image Extension (to support alignment)
const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: 'display: block; margin: auto;',
                renderHTML: attributes => ({ style: attributes.style }),
                parseHTML: element => element.style.cssText,
            },
        }
    }
})

const extensions = [
    StarterKit,
    Link.configure({ openOnClick: true }),
    CustomImage, //  Use the extended image
    TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }), //  Enable alignment on images
    CodeBlockLowlight.configure({ lowlight:lowlight}),
]

const TipTap = ({
                    onContentChange,
                    initialContent,
                    editable,
                }: {
    onContentChange: (json: JSONContent) => void;
    initialContent: object;
    editable: boolean;
}) => {
    const editor = useEditor({
        editable:editable,
        immediatelyRender:false,
        extensions,
        content: initialContent??<p>Write here</p>, // ✅ Load stored content instead of default
        editorProps: {
            attributes: {
                class: 'prose prose-lg sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none font-mono',
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            onContentChange(json);
        },
    });

    // ✅ Sync editor when initialContent updates
    useEffect(() => {
        if (editor && initialContent) {
            editor.commands.setContent(initialContent);
        }
    }, [initialContent, editor]); // ✅ Updates only when content changes

    if (!editor) return null;

    return (
        <div className="relative">
            {/* Toolbar */}
            {editable && <div className="flex gap-2 bg-white shadow-md p-2 rounded-lg border sticky top-0 z-10">
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
                <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
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
                    if (url) editor.chain().focus().setImage({ src: url }).run()
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
            </div>}

            {/* Editor */}
            <EditorContent editor={editor} className="prose max-w-none mt-4"  />
        </div>
    )
};

export default TipTap
