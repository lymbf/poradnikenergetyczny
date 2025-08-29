"use server"

import {createClient} from "@/utils/supabase/server";
import {Article, Category, Subcategory} from "@/interfaces/articles";

const getArticles = async () => {
    const supabase = await createClient()
    // @ts-ignore
    const articles: Article[] | null = (await supabase
        .from('articles')
        .select(`id, title, created_at, text, img_file, author ( id, name ) category ( id, name )`)
        .order('created_at', {ascending: false})).data
    return articles
}

const getArticle = async (id: string) => {
    const supabase = await createClient()
    // @ts-ignore
    const res: Article[] | null = (await supabase.from('articles').select(`id, title, created_at, text, img_file, author ( id, name ) category ( id, name )`).eq('id', id)).data
    console.log('res: ', res)
    return res
}

const getCategories = async () => {
    const supabase = await createClient()
    const categories: Category[] | null = (await supabase.from('categories').select(`id, name, subcategories ( id, name )`)).data
    return categories
}

const getSubCategories = async (categoryID: string) => {
    const supabase = await createClient()
    const subCategories: Subcategory[] | null = (await supabase.from('subcategories').select().eq('category_id', categoryID)).data
    return subCategories
}

export {getArticle, getArticles, getCategories}