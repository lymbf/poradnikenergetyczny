"use server"

import {createClient} from "@/utils/supabase/server";
import {Category} from "@/app/admin/posts/create/page";

const getCategories = async ()=>{
    const supabase = await createClient()
    const categories:Category[]|null = (await supabase.from('categories').select()).data
       return categories
}



export {getCategories}