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
        <nav className="w-full max-w-main-w flex flex-col items-center bg-front-background    text-foreground">
            <div className="w-full  flex flex-col justify-between items-center text-sm">
                <div className="flex h-[100px] w-full  items-center justify-center font-semibold border-b-[2px] border-b-foreground">
                    <Link href = '/'><Logo className={'w-[168px] h-auto hover:opacity-80'}/></Link>
                </div>
                <div className={'flex justify-center items-center w-full py-[15px] border-b-[1px] border-b-foreground/5'}>
                    <Navigation className={'hidden sm:flex w-full max-w-none px-8  '}/>

                </div>
                {/*<div className={'flex flex-row'}>*/}
                {/*    {!hasEnvVars ? <EnvVarWarning/> : <HeaderAuth  front={true} className={'mr-[10px]'}/>}*/}
                {/*    <div className={'hidden sm:block ml-2'}><ThemeSwitcher/></div>*/}
                {/*</div>*/}

            </div>
        </nav>
    )
}