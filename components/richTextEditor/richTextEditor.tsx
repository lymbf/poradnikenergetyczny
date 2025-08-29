import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import {ImageUploadNode} from "@/components/tiptap-editor/tiptap-node/image-upload-node/image-upload-node-extension"
import MenuBar from "@/components/richTextEditor/menuBar";
import {handleImageUpload} from "@/lib/tiptap-utils";
import {useEffect} from "react";
interface RichTextEditorProps {
    content: string;
    onChange?: (content: string) => void;
    editable?: boolean;
    clear?:boolean,
    neClassName?:string
}

export default function RichTextEditor({content, onChange, editable,clear, neClassName}: RichTextEditorProps) {
    const isEditable = editable ?? true;



    const editor = useEditor({
        editable: isEditable,
        immediatelyRender:false,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },

                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            Image.configure({
                HTMLAttributes: {
                    class: "w-full max-w-[600px] h-auto rounded-sm p-2",
                },
                inline:true
            }),
            ImageUploadNode.configure({
                accept: 'image/*',
                maxSize: 10000000,
                limit: 3,
                upload: handleImageUpload,
                onError: (error) => console.error('Upload failed:', error),
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: isEditable
                    ? "min-h-[156px] border rounded-md bg-foreground text-background py-2 px-3"
                    : neClassName || '',
            },
        },
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
    });

    useEffect(() => {
        clear && editor?.commands.clearContent()
    }, [clear]);

    return (
        <div className = 'text-black'>
            {isEditable && <MenuBar editor={editor}/>}
            <EditorContent editor={editor} />
        </div>
    )
}