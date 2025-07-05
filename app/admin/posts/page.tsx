import {cn} from "@/lib/utils";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {getArticles, getCategories} from "@/actions/articles/categories";
import PostsTable from "@/app/admin/posts/table/postsTable";
import {Article} from "@/app/admin/posts/interfaces";
import React from "react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";


export default function Page() {

    return (
        <div className={cn('relative')}>
            <Link href = '/admin' className="text-[14px] text-foreground flex flex-row items-center mb-[20px]"><ArrowLeft
                className={'h-4'}/><span>Wstecz</span></Link>
            <Card className={'sm:min-w-[800px]'}>
                <CardHeader className={''}>Articles:</CardHeader>
                <CardContent>
                   <PostsTable/>
                </CardContent>
            </Card>
        </div>
    )
}