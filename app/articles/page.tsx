import {cn} from "@/lib/utils";
import Image from "next/image";
import {createServerClient} from "@supabase/ssr";
import {createClient} from "@/utils/supabase/server";

const getServerSideProps = () => {
    return {
        props: {}
    }
}

export default async function Page() {

    const supabase = await createClient()

    const {
        data,
        error
    } = await supabase.from("articles")
        .select(`title,text, category (id,name), img_file, subcategory (id,name)`)
        .overrideTypes<Array<{
            title: string,
            text: string,
            img_file:string,
            category: { id: string, name: string },
            subcategory: { id: string, name: string }
        }>, { merge: false }>()

    console.log('data: ', data)
    console.log('error: ', error)

    return (
        <main className="flex-1 flex flex-col gap-6 px-4">
            <div className={'flex flex-col gap-6'}>
                {data?.map(async (a, i) => {
                    const imgUrl = await supabase.storage.from('images').getPublicUrl(a.img_file).data.publicUrl
                    return <div key={i} className={'flex flex-col'}>
                        <p className={'mb-[10px] text-[12px] font-medium capitalize'}>{a.category.name} - <span
                            className={'text-[12px] font-normal'}>{a.subcategory.name}</span></p>
                        <h1 className={'text-3xl mb-[20px] font-medium'}>{a.title}</h1>
                        <Image src={imgUrl} alt={a.img_file} width = {500} height = {500}/>
                        <p className={''}>
                            {a.text}
                        </p>
                    </div>
                })}
            </div>
        </main>
    )
}