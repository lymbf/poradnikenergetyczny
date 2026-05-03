// pages/home/hotTopics.tsx

import { getArticles } from "@/actions/articles/articles";
import HotTopicsSlider from "./hotTopicsSlider";

export default async function HotTopics() {
    // Pobieramy 6 najnowszych artykułów po stronie serwera
    const latestArticles = await getArticles(6);

    if (!latestArticles || latestArticles.length === 0) {
        return null;
    }

    // Przekazujemy dane do interaktywnego komponentu klienckiego
    return <HotTopicsSlider articles={latestArticles} />;
}