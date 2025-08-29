"use client"

import {useTheme} from "next-themes";
import LightLogo from "@/components/svgs/logo/lightLogo";
import DarkLogo from "@/components/svgs/logo/darkLogo";
import {useEffect, useState} from "react";

export default function Logo({className, dark}: { className?: string, dark?: boolean }) {
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted){
        return null
    }

    return(<div>
        {theme === "dark" && !dark && <DarkLogo className={className}/>}
        {theme === "dark" && dark && <LightLogo className={className}/>}
        {theme === "light" && dark && <DarkLogo className={className}/>}
        {theme === "light" && !dark && <LightLogo className={className}/>}
    </div>)

}