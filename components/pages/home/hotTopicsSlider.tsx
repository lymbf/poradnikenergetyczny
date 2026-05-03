"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Article } from "@/interfaces/articles";

interface HotTopicsSliderProps {
    articles: Article[];
}

export default function HotTopicsSlider({ articles }: HotTopicsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        gsap.to(sliderRef.current, {
            opacity: 0,
            x: -30,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) => (prev + 1) % articles.length);
                gsap.fromTo(
                    sliderRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
                );
            },
        });
    };

    const goToSlide = (index: number) => {
        if (index === currentIndex) return;
        gsap.to(sliderRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(index);
                gsap.fromTo(
                    sliderRef.current,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            },
        });
    };

    const stripHtml = (htmlString: string) => {
        if (!htmlString) return "";
        return htmlString.replace(/<[^>]+>/g, '');
    };

    if (!articles || articles.length === 0) return null;

    const leftArticle = articles[currentIndex];
    const rightArticle = articles[(currentIndex + 1) % articles.length];

    return (
        <section className="w-full bg-front-bglight py-12 overflow-hidden flex flex-col lg:h-[600px]">
            <div className="max-w-[var(--main-width,1300px)] mx-auto w-full px-4 lg:px-0 flex flex-col gap-6 h-full">

                <div className="flex gap-[4px] shrink-0">
                    {articles.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`h-1 w-[36px] transition-colors duration-300 ${
                                idx === currentIndex ? "bg-front-accent" : "bg-front-muted-bg"
                            }`}
                            aria-label={`Przejdź do slajdu ${idx + 1}`}
                        />
                    ))}
                </div>

                <div ref={sliderRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:divide-x lg:divide-front-border/30 flex-1 min-h-0">

                    {/* LEWA KOLUMNA (GŁÓWNA) */}
                    <article className="flex flex-col gap-4 lg:col-span-2 lg:pr-12 h-full">
                        <Link href={`/articles/${leftArticle.id}`} className="shrink-0">
                            <h2 className="font-utile text-[24px] first-letter:uppercase md:text-[35px] font-bold text-front-foreground leading-tight hover:underline line-clamp-3">
                                {leftArticle.title}
                            </h2>
                        </Link>

                        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 flex-1 min-h-0">

                            <div className="flex flex-col gap-4 flex-1">
                                <div className="flex flex-col gap-1 shrink-0">
                                    <span className="uppercase text-front-accent font-montserrat text-[10px] font-medium tracking-wider">
                                        {leftArticle.category?.name || "Brak kategorii"}
                                    </span>
                                    <time className="text-front-muted-bg font-utile text-[9px] font-medium">
                                        {formatDate(leftArticle.created_at)}
                                    </time>
                                </div>

                                {/* Zmiana: line-clamp-4 dla mobile, md:line-clamp-[7] dla większych ekranów */}
                                <p className="font-georgia text-[12px] text-front-muted font-normal leading-relaxed line-clamp-4 md:line-clamp-[7]">
                                    {stripHtml(leftArticle.text)}
                                </p>

                                <span className="uppercase text-front-muted-bg font-montserrat text-[10px]">
                                    {leftArticle.author?.name || "Nieznany autor"}
                                </span>
                            </div>

                            <div className="relative w-full md:w-[45%] lg:w-[55%] aspect-[3/2] lg:aspect-auto lg:h-full shrink-0 bg-gray-200">
                                <Image
                                    src={leftArticle.img_file || "/placeholder.jpg"}
                                    alt={leftArticle.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 800px"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </article>

                    {/* PRAWA KOLUMNA */}
                    <article className="hidden lg:flex flex-col gap-4 lg:col-span-1 pl-0 lg:pl-12 h-full">
                        <Link href={`/articles/${rightArticle.id}`} className="shrink-0">
                            <h3 className="font-utile text-[24px] first-letter:uppercase font-semibold text-front-foreground leading-tight hover:underline line-clamp-4">
                                {rightArticle.title}
                            </h3>
                        </Link>

                        <div className="flex flex-col gap-1 shrink-0">
                            <span className="uppercase text-front-accent font-montserrat text-[10px] font-medium tracking-wider">
                                {rightArticle.category?.name || "Brak kategorii"}
                            </span>
                            <time className="text-front-muted-bg font-utile text-[9px] font-medium">
                                {formatDate(rightArticle.created_at)}
                            </time>
                        </div>

                        <span className="uppercase text-front-muted-bg font-montserrat text-[10px] shrink-0">
                            {rightArticle.author?.name || "Nieznany autor"}
                        </span>

                        <div className="relative w-full flex-1 min-h-0 mt-2 bg-gray-200">
                            <Image
                                src={rightArticle.img_file || "/placeholder.jpg"}
                                alt={rightArticle.title}
                                fill
                                sizes="400px"
                                className="object-cover"
                            />
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
}