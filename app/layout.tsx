
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
        <body className="bg-background text-foreground font-[sofia-pro]">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <main className="min-h-screen flex flex-col items-center ">
                <div className="flex-1 w-full flex flex-col  items-center">
                    {header}
                    <main className="flex flex-col w-full max-w-[1200px] box-border border-border border-[1px]">
                        {children}
                    </main>
                </div>
            </main>
        </ThemeProvider>
        </body>
        </html>
    );
}
