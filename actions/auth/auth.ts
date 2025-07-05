"use server"

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

const authorizePage = async (access?:string)=>{
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();
    switch(access){
        case undefined:
            if (!user) {
                return redirect("/sign-in?error=access denied, change user to admin");
            }
            break;
        case 'admin':
            if (!user || user.role != 'admin') {
                return redirect("/sign-in?error=access denied, change user to admin");
            }
            break;
    }
    // if (!user || user.role != 'admin') {
    //     return redirect("/sign-in?error=access denied, change user to admin");
    // }

    return user
}

export {authorizePage}