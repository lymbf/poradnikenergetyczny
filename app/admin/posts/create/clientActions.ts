import {createClient} from "@/utils/supabase/client";

const getSubcategories = async (categoryId:number)=>{
    const supabase = createClient()

    const res = await supabase.from('subcategories').select().eq('category_id', categoryId)
    return res

}

export {getSubcategories}