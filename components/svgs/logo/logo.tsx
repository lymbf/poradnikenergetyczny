"use client"

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import NewLogo from "@/components/svgs/logo/newLogo";
import NewLogoWhite from "@/components/svgs/logo/newLogoWhite";

export default function Logo({className, dark}: { className?: string, dark?: boolean }) {
    const {resolvedTheme} = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted){
        return null
    }

    return(<div>
        {resolvedTheme === "dark" && dark && <NewLogo className={className}/>}
        {resolvedTheme === "dark" && !dark && <NewLogoWhite className={className}/>}
        {resolvedTheme === "light" && !dark && <NewLogo className={className}/>}
        {resolvedTheme === "light" && dark && <NewLogoWhite className={className}/>}
    </div>)

}