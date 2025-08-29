import NavLink from "@/components/navigation/navLink";
import {Subcategory} from "@/interfaces/articles";
import {cn} from "@/lib/utils";
import {ChevronDown} from "lucide-react";

export default function NavCategoryElement({className, label, categoryID, subcategories}: {
    className?: string,
    label: string,
    categoryID: string,
    subcategories?: Subcategory[]
}) {
    return (
     <div className={'group relative hover:cursor-pointer'}>
                <div className={' text-[12px] mysm:text-[14px] font-medium capitalize group-hover:text-front-accent  transition-all duration-100 ease-in flex flex-row items-center'}>
                    {label} {subcategories?.length ? <ChevronDown className={'ml-1'}/> : ''}
                </div>
         {subcategories?.length ? <div
             className={cn('hidden absolute w-[200px] h-[100px] bg-front-foreground text-front-background group-hover:flex flex-col',
                 'opacity-0 group-hover:opacity-100  transition-all duration-1000'
             )}>
             {subcategories.map((el, i) => {
                 return (<div key={i} className={''}>
                     {el.name}
                 </div>)
             })}
         </div>:null}
            </div>
    )
}