"use server"

import {createClient} from "@/utils/supabase/server";
import {Category} from "@/app/admin/posts/create/page";
import {Article} from "@/app/admin/posts/interfaces";

const getCategories = async ()=>{
    const supabase = await createClient()
    const categories:Category[]|null = (await supabase.from('categories').select()).data
       return categories
}

const getArticles = async ()=>{
    const supabase = await createClient()
    // @ts-ignore
    const articles:Article[]|null = (await supabase.from('articles').select(`id, title, created_at, author ( id, name )`)).data
    return articles
}

export {getCategories, getArticles}