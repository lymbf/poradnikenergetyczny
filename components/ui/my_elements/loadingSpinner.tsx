"use client"

import {cn} from "@/lib/utils";
import {Loader} from "lucide-react";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

export default function LoadingSpinner({className}:{className?:string}){
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        ref && gsap.to(ref.current, {
            rotateZ:360,
            repeat:-1,
            duration:2,
            ease:'none'
        })
    })
    return(
        <div ref = {ref} className = {cn('loading_circle w-[30px] h-[30px] mix-blend-difference',className)}>
            <Loader className={'w-[30px] h-[30px]'}/>
        </div>
    )
}