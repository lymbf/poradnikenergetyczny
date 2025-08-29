
import {cn} from "@/lib/utils";
import {getCategories} from "@/actions/articles/articles";
import NavCategoryElement from "@/components/navigation/navCategoryElement";


export default async function Navigation({className}:{className?:string}){

    const categories = await getCategories();
    console.log('categories: ', categories)
    return(
        <ul className = {cn('flex flex-row justify-center items-center gap-8 w-full max-w-[1200px]',className)}>
            {categories && categories.map((c,i )=>{
                return <NavCategoryElement key = {i} label={c.name} categoryID={c.id} subcategories={c.subcategories}/>
            })}
        </ul>
    )
}