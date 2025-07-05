import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {InfoIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";



export default async function AdminPage() {
    const supabase = await createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();
    console.log('data: ', user)
    if (!user || user.role != 'admin') {
        return redirect("/sign-in?error=access denied, change user to admin");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                    <InfoIcon size="16" strokeWidth={2}/>
                    This is an admin page that you can only see as an administrator
                    user
                </div>
            </div>
            {/*<div className="flex flex-col gap-2 items-start">*/}
            {/*    <h2 className="font-bold text-2xl mb-4">Your user details</h2>*/}
            {/*    <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">*/}
            {/*        {JSON.stringify(user, null, 2)}*/}
            {/*    </pre>*/}
            {/*</div>*/}
            <Card className={'flex flex-col gap-4 p-4'}>
                <CardHeader className={'w-full flex justify-center p-4 pb-8'}>
                    <CardTitle className={'text-center tracking-wide text-[30px]'}>Admin Dashboard</CardTitle>
                </CardHeader>
                <CardContent className={'flex flex-row'}>
                    <div className={'flex-1 flex flex-col gap-4 items-start'}>
                        <label className={'font-semibold text-[20px] pb-[10px]'}>
                            Manage articles
                        </label>
                        <Link href={'/admin/posts/create'}><Button className={'w-[130px] h-[32px]'}>Create Post</Button></Link>
                        <Link href={'/admin/posts'}><Button className={'w-[130px] h-[32px]'}>Edit Posts</Button></Link>
                    </div>
                    <div className={'flex-1'}>

                    </div>
                </CardContent>

            </Card>

        </div>
    );
}
