"use server"

import {createClient} from "@/utils/supabase/server";
import {Article, Category, Subcategory} from "@/interfaces/articles";


/*  Metody do pobierania artykułów  */

const getArticles = async (limit?: number) => {
    const supabase = await createClient()

    let query = supabase
        .from('articles')
        .select(`id, title, created_at, text, img_file, author ( id, name ), category ( id, name )`)
        .order('created_at', {ascending: false});

    // Jeśli podano limit, dodajemy go do zapytania
    if (limit) {
        query = query.limit(limit);
    }

    return (await query).data as unknown as Article[] | null
}

const getArticle = async (id: string) => {
    const supabase = await createClient()
    // @ts-ignore
    const res: Article[] | null = (await supabase.from('articles').select(`id, title, created_at, text, img_file, author ( id, name ) category ( id, name )`).eq('id', id)).data
    console.log('res: ', res)
    return res
}

const getOneArticleFromFourCategories = async () => {
    const supabase = await createClient();
    const categories = await getCategories();

    if (!categories || categories.length === 0) return [];

    // Bierzemy 4 pierwsze kategorie
    const topCategories = categories.slice(0, 4);
    const topArticles: Article[] = [];

    // Pobieramy po 1 najnowszym artykule dla każdej z tych kategorii
    // Zakładam, że w tabeli 'articles' masz kolumnę 'category_id'
    for (const category of topCategories) {
        const { data } = await supabase
            .from('articles')
            .select(`id, title, created_at, text, img_file, author ( id, name ), category ( id, name )`)
            .eq('category', category.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (data) {
            // @ts-ignore
            topArticles.push(data);
        }
    }

    return topArticles;
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

export {getArticle, getArticles, getCategories, getOneArticleFromFourCategories, getSubCategories}