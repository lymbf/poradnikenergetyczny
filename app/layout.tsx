
import {Geist} from "next/font/google";
import {ThemeProvider} from "next-themes";
import "./globals.css";
import '@/styles/variables.scss';
import '@/styles/keyframe-animations.scss';
import '@/styles/editor-styles.css'
const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Next.js and Supabase Starter Kit",
    description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({children, header}: Readonly<{
    children: React.ReactNode;
    header: React.ReactNode;
}>) {
    return (
        <html lang="en" className={geistSans.className} suppressHydrationWarning>
        <body className="bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen flex flex-col items-center ">
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    {header}
                    <div className="flex flex-col gap-20 max-w-5xl p-5">
                        {children}
                    </div>

                    <footer
                        className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                        <p>
                            Created by
                            <a
                                href="https://3wart.pl"
                                target="_blank"
                                className="font-bold hover:underline ml-[5px]"
                                rel="noreferrer"
                            >
                                3Wart Studio
                            </a>
                        </p>

                    </footer>
                </div>
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
