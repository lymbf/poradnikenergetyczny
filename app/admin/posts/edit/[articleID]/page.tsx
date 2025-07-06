"use client"

import {cn} from "@/lib/utils";
import {getArticle} from "@/actions/articles/articles";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Article} from "@/app/admin/posts/interfaces";
import {InfoIcon} from "lucide-react";
import ErrorBox from "@/components/ui/my_elements/errorBox";

type Params = {
    articleID:string
}

export default function Page(){
    const {articleID} = useParams<Params>();
    const [article, setArticle] = useState<Article>();
    const [errorMessage, setErrorMessage] = useState<string>();
    console.log('aID: ', articleID);
    // const article = getArticle(articleID)



    useEffect(() => {
        getArticle(articleID).then(res=>{
            if(res)setArticle(res[0])
            else setErrorMessage('wrong id, article not found')
        })
    }, []);

    return(
        <div className={cn('')}>
            {errorMessage && <ErrorBox errorMessage={errorMessage}/>}

            {article && <div className=''>{article.toString()}</div>}
        </div>
    )
}