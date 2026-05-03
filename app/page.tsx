import {getArticles} from "@/actions/articles/articles";
import HotTopics from "@/components/pages/home/hotTopics";
import RecentArticles from "@/components/pages/home/recentArticles";


export default async function Home() {


    return (
        <>
            <RecentArticles/>
            <HotTopics/>
        </>

    );
}
