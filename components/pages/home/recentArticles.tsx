// components/pages/home/recentArticles.tsx

import Image from "next/image";
import Link from "next/link";
import { getOneArticleFromFourCategories } from "@/actions/articles/articles";

export default async function RecentArticles() {
    // Pobieramy dane bezpośrednio w Server Component
    const articles = await getOneArticleFromFourCategories();

    console.log('pobrane artykuły: ', articles)

    if (!articles || articles.length === 0) {
        return null; // Nic nie renderujemy, jeśli nie ma artykółów
    }

    return (
        <section className="w-full border-t  pt-[12px] mb-[20px] max-w-main-w ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/articles/${article.id}`} // Zakładam taką ścieżkę do artykułu
                        className="flex items-start gap-3 group"
                    >
                        {/* Wrapper na zdjęcie */}
                        <div className="relative w-[51px] h-[51px] shrink-0 overflow-hidden bg-gray-100">
                            <Image
                                src={article.img_file || "/placeholder.jpg"} // Warto mieć awaryjne zdjęcie
                                alt={article.title}
                                fill
                                sizes="200px"
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>

                        {/* Kontener na tekst */}
                        <div className="flex flex-col justify-between h-full">
                            {/* Tytuł: Utile Display 12px semibold color primary */}
                            <h3 className="font-utile-display text-[12px] capitalize font-semibold text-primary leading-tight line-clamp-2">
                                {article.title}
                            </h3>

                            {/* Kategoria: Utile Display 12px medium color accent */}
                            <span className="font-utile-display text-[12px] capitalize font-medium text-accent mt-1 block">
                {article.category?.name || "Brak kategorii"}
              </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}