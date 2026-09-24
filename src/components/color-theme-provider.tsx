"use client"

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

export const colorThemes = [
    "coral",
    "teal",
    "blue",
    "violet",
    "green",
    "orange",
] as const

export type ColorTheme = (typeof colorThemes)[number]

const STORAGE_KEY = "ember-color-theme"

type ColorThemeContextValue = {
    colorTheme: ColorTheme
    setColorTheme: (theme: ColorTheme) => void
}

const ColorThemeContext = createContext<ColorThemeContextValue | undefined>(
    undefined
)

function isColorTheme(value: string | null): value is ColorTheme {
    return value !== null && colorThemes.includes(value as ColorTheme)
}

export function ColorThemeProvider({
    children,
}: {
    children: ReactNode
}) {
    const [colorTheme, setColorThemeState] = useState<ColorTheme>("coral")

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)

        if (isColorTheme(stored)) {
            
            setColorThemeState(stored)
            document.documentElement.dataset.color = stored
        } else {
            document.documentElement.dataset.color = "coral"
        }
    }, [])

    function setColorTheme(theme: ColorTheme) {
        setColorThemeState(theme)
        localStorage.setItem(STORAGE_KEY, theme)
        document.documentElement.dataset.color = theme
    }

    return (
        <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
            {children}
        </ColorThemeContext.Provider>
    )
}

export function useColorTheme() {
    const context = useContext(ColorThemeContext)

    if (!context) {
        throw new Error(
            "useColorTheme must be used inside ColorThemeProvider"
        )
    }

    return context
}