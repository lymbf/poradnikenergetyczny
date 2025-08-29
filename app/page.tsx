import Banner from "@/components/ui/my_elements/banner";
import {getArticles} from "@/actions/articles/articles";
import HotTopics from "@/components/pages/home/hotTopics";


export default async function Home() {

    const articles = await getArticles();
    articles && console.log('text: ', articles[0].text);


    return (
        <>
            <Banner imgUrl={'/images/banners/banner_1.png'}
                    label={'Jakiś Tam Banner, Fit 4 55 Cczy Inne Badziewe, Dowiedz Się Jak Ogarnąć Dupę'}/>
            <div className="relative  flex flex-row w-full min-h-[200px]">
                <div className={'w-[calc(100%_-_315px)] flex flex-row'}>
                    {articles && <HotTopics article1={articles[0]} article2={articles[1]}/>}
                </div>
                <div className={'w-[315px] border-l-[1px] border-l-border border-opacity-55'}>

                </div>
            </div>
        </>

    );
}
