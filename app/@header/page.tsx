import {cn} from "@/lib/utils";
import {hasEnvVars} from "@/utils/supabase/check-env-vars";
import {EnvVarWarning} from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import {ThemeSwitcher} from "@/components/theme-switcher";
import Logo from "@/components/svgs/logo/logo";
import Link from "next/link";
import Navigation from "@/components/navigation/navigation";

export default function Page(){

    return(
        <nav className="w-full flex flex-col items-center bg-front-foreground  border-b border-b-foreground/10  text-background">
            <div className="w-full  flex justify-between items-center p-4 px-4 sm:px-8 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href = '/'><Logo className={'w-[174px] h-auto hover:opacity-80'}/></Link>
                </div>
                <Navigation className={'hidden 2xl:flex w-auto'}/>
                <div className={'flex flex-row'}>
                    {!hasEnvVars ? <EnvVarWarning/> : <HeaderAuth  front={true} className={'mr-[10px]'}/>}
                    <div className={'hidden sm:block ml-2'}><ThemeSwitcher/></div>
                </div>

            </div>
            <Navigation className={'hidden sm:flex 2xl:hidden justify-start w-full max-w-none px-8 pb-2 '}/>
        </nav>
    )
}