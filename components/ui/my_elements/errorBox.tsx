
import {InfoIcon} from "lucide-react";
import React from "react";

export default function ErrorBox({className, errorMessage}:{className?:string, errorMessage:string}){
    return (
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
            <InfoIcon size="16" strokeWidth={2} className={'stroke-red-500'}/>
            <div className={'text-red-500'}>{errorMessage}</div>
        </div>
    )
}