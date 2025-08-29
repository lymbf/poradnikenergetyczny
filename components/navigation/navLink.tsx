import {cn} from "@/lib/utils";
import Link from "next/link";

export default function NavLink({className, label, href}:{className?:string, label:string, href:string}){
    return(
        <Link href = {href} className = {cn('text-[14px] hover:text-front-accent  transition-all duration-100 ease-in',className)}>
            {label}
        </Link>
    )
}