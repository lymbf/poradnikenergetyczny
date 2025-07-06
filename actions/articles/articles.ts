"use server"

import {createClient} from "@/utils/supabase/server";
import {Article} from "@/app/admin/posts/interfaces";

const getArticles = async ()=>{
    const supabase = await createClient()
    // @ts-ignore
    const articles:Article[]|null = (await supabase.from('articles').select(`id, title, created_at, author ( id, name )`)).data
    return articles
}

const getArticle = async (id:string)=>{
    const supabase = await createClient()
    // @ts-ignore
    const res:Article[]|null = (await supabase.from('articles').select(`id, title, created_at, text, author ( id, name )`).eq('id', id)).data
    console.log('res: ', res)
    return  res
}

export {getArticle, getArticles}