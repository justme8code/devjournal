import 'highlight.js/styles/atom-one-dark.css';
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { Image } from '@tiptap/extension-image'
import 'highlight.js/styles/atom-one-dark.css';
import Paragraph from '@tiptap/extension-paragraph'
import {ImageResize} from "tiptap-extension-resize-image";
import '../Shimmer.css';


const lowlight = createLowlight(common);

//   Custom Image Extension (to support alignment)
const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: 'auto',
                renderHTML: attributes => ({ width: attributes.width }),
                parseHTML: element => element.getAttribute('width'),
            },
            height: {
                default: 'auto',
                renderHTML: attributes => ({ height: attributes.height }),
                parseHTML: element => element.getAttribute('height'),
            },
        }
    }
});

const CustomTipTapExtensionConfig = [
    StarterKit,
    ImageResize,
    Paragraph,
    CustomImage, //  Use the extended image
    TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }), //  Enable alignment on images
    CodeBlockLowlight.configure({ lowlight:lowlight}),
    Link.configure({
        protocols: ['ftp', 'mailto'],
        openOnClick: true,
        HTMLAttributes: {
            class: 'tip-tap-link'

        },
    })

]

export {CustomTipTapExtensionConfig}