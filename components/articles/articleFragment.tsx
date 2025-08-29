"use client"

import {cn} from "@/lib/utils";
import {useState} from "react";
import Link from "next/link";
import RichTextEditor from "@/components/richTextEditor/richTextEditor";

export default function ArticleFragmentNoImg({className, title, created_at, content, id}: {
    className?: string,
    title: string,
    created_at: string,
    content: string,
    id: string
}) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [richText, setRichText] = useState(content);

    return (
        <div className={cn('flex flex-col items-start box-border pb-6 ', className)}>
            <Link className={'hover:opacity-80'} href={`/posts/${id}`}><h1
                className={'first-letter:uppercase  font-semibold  text-[24px] leading-[28px] mb-3'}>{title}</h1>
            </Link>
            {/*<p className={'text-[12px]  font-normal mb-[10px]'}>{new Date(created_at).toLocaleString()}</p>*/}
            <div className={'max-h-[50px] overflow-hidden relative '}>
                <RichTextEditor content={richText} editable={false} neClassName={'text-[12px] font-light tracking-wide text-front-foreground'}/>
                <div className = 'absolute w-[120px] h-[14px] bottom-0 right-0 bg-front-background flex flex-start items-start px-2 text-front-foreground text-[12px]'>
                  <Link href={`/posts/${id}`} className={'hover:opacity-80 hover:cursor-pointer'}> ...</Link>
                </div>
            </div>

            <div
                className={'w-full flex justify-end text-[12px] font-medium hover:cursor-pointer hover:opacity-80 mt-4'}>
                <Link href={`/posts/${id}`}>Czytaj dalej.. </Link>
            </div>

        </div>
    )
}