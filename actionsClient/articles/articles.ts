import {createClient} from "@/utils/supabase/client";

const getSubcategoriesClient = async (categoryId:string)=>{
    const supabase = createClient()

    const res = await supabase.from('subcategories').select().eq('category_id', categoryId)
    return res

}

export {getSubcategoriesClient}