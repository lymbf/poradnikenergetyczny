import {Article} from "@/interfaces/articles";
import {cn} from "@/lib/utils";
import Image from "next/image";
import ArticleFragmentNoImg from "@/components/articles/articleFragment";

interface Props {
    article1: Article,
    article2: Article
}

export default function HotTopics({article1, article2}: Props) {
    return (
        <>
            {  /*  Article 1 */}

            <div className={cn('flex-[3] flex flex-col px-2 sm:px-7 border-r-border border-r-[1px] ')}>
                <div className='flex flex-col flex-[4] overflow-hidden pb-3'>
                    <h1 className={'font-loos-compressed text-[48px] font-bold tracking-tighter text-front-foreground mb-2'}>
                        Gorące tematy
                    </h1>
                    {article1 && <>
                        <div className={'flex flex-row justify-between w-full mb-2'}>
                            <div className={'text-[12px] text-front-muted-foreground font-light'}>
                                {article1.tags && article1?.tags.map(tag => {
                                    return <span>{tag}</span>
                                })}
                            </div>
                            <div
                                className={'text-[12px] text-front-muted-foreground font-light'}>{new Date(article1?.created_at).toLocaleString()}</div>
                        </div>
                        <div className={'w-full relative h-[190px]'}>
                            <Image src={`${article1.img_file}`} alt={'sadv'} fill={true} style={{objectFit: 'cover',}}
                                   className={'object-cover'}/>
                        </div>
                    </>}
                </div>

                <div className={'flex-[2]'}>
                    {article1 && <ArticleFragmentNoImg title={article1.title} created_at={article1.created_at}
                                                       content={article1.text} id={article1.id}/>
                    }
                </div>
            </div>

            {  /*  Article 2 */}

            <div className={'flex-[4] flex flex-col px-2 sm:px-7 '}>
                <div className='flex flex-col flex-[4] overflow-hidden pb-3'>

                    {article2 && <>

                        <div className={'w-full relative h-full mt-5'}>
                            <Image src={`${article2.img_file}`} alt={'sadv'} fill={true}
                                   style={{objectFit: 'cover',}}
                                   className={'object-cover'}/>
                        </div>
                    </>}
                </div>

                <div className={'flex-[2]'}>
                    {article2 && <ArticleFragmentNoImg title={article2.title} created_at={article2.created_at}
                                                       content={article2.text} id={article2.id}/>
                    }
                </div>
            </div>

        </>
    )
}