// components/richTextEditor/richTextDisplay.tsx

import React from 'react';

interface RichTextDisplayProps {
    content: string;
    className?: string;
}

export default function RichTextDisplay({ content, className = '' }: RichTextDisplayProps) {
    if (!content) return null;

    return (
        <div
            // Kontener, który przyjmie style dla HTML. Możesz tu dodać globalne klasy dla tekstu.
            className={`w-full text-front-foreground font-georgia leading-relaxed ${className}`}
            // To jest wbudowany w React "parser" stringów HTML
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}