
import {InfoIcon} from "lucide-react";
import React from "react";

export default function MessageBox({className, message}:{className?:string, message:string}){
    return (
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
            <InfoIcon size="16" strokeWidth={2} className={'stroke-green-500'}/>
            <div className={'text-green-500'}>{message}</div>
        </div>
    )
}