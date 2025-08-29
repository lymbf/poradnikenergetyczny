import {ArrowLeft, InfoIcon} from "lucide-react";
import CreateForm from "@/app/admin/posts/create/createForm";
import {authorizePage} from "@/actions/auth/auth";
import Link from "next/link";
import React from "react";
import {Category} from "@/interfaces/articles";
import {getCategories} from "@/actions/articles/articles";



export default async function AdminPage() {

    const user = await authorizePage()
    const categories:Category[]|null = await getCategories()
    if(!categories){}



    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <Link href = '/admin' className="text-[14px] text-foreground flex flex-row items-center"><ArrowLeft
                className={'h-4'}/><span>Wstecz</span></Link>
            <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                    <InfoIcon size="16" strokeWidth={2}/>
                    Page for creating the post
                </div>
            </div>
            <CreateForm categories={categories}/>

        </div>
    );
}