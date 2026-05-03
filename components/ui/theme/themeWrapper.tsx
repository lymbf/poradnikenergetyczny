"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {ThemeProvider} from "next-themes";

type Props = {
    children: React.ReactNode
}

export default function ThemeWrapper({ children }: Props) {
    const pathname = usePathname()
    const isAdmin = pathname.startsWith("/admin")

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme={isAdmin ? "dark" : "light"}
            forcedTheme={isAdmin ? "dark" : "light"} // na /admin zawsze dark
            enableSystem={false}
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}