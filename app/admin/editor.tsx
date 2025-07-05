"use client"
import {cn} from "@/lib/utils";
import {Dispatch, SetStateAction} from "react";
import RichTextEditor from "@/components/richTextEditor/richTextEditor";

export default function Editor({richText, setRichText, clear}:{clear?:boolean, richText:string, setRichText:Dispatch<SetStateAction<string>>}){

    return(
        <div className = {cn('')}>
            <RichTextEditor clear = {clear} content={richText} onChange={setRichText}/>
        </div>
    )
}