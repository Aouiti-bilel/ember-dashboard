"use client"

import {
    Check,
    Moon,
    Palette,
    Settings,
    Sun,
    SunMoon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    useColorTheme,
    type ColorTheme,
} from "@/components/color-theme-provider"

type CustomizerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const colorThemes: {
    name: string
    value: ColorTheme
    className: string
}[] = [
        {
            name: "Coral",
            value: "coral",
            className: "bg-orange-500",
        },
        {
            name: "Teal",
            value: "teal",
            className: "bg-teal-500",
        },
        {
            name: "Blue",
            value: "blue",
            className: "bg-blue-500",
        },
        {
            name: "Violet",
            value: "violet",
            className: "bg-violet-500",
        },
        {
            name: "Green",
            value: "green",
            className: "bg-green-500",
        },
        {
            name: "Orange",
            value: "orange",
            className: "bg-orange-500",
        },
    ]

const appearanceOptions = [
    {
        name: "Light",
        value: "light",
        icon: Sun,
    },
    {
        name: "Dark",
        value: "dark",
        icon: Moon,
    },
    {
        name: "System",
        value: "system",
        icon: SunMoon,
    },
] as const

export function Customizer({
    open,
    onOpenChange,
}: CustomizerProps) {
    const { theme, setTheme } = useTheme()
    const { colorTheme, setColorTheme } = useColorTheme()

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="flex w-full flex-col sm:max-w-md"
            >
                <SheetHeader className="border-b pb-6">
                    <SheetTitle className="flex items-center gap-2">
                        <Settings className="size-5" />
                        Customizer
                    </SheetTitle>

                    <SheetDescription>
                        Customize the appearance of your dashboard.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="space-y-8">
                        {/* Appearance */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-semibold">
                                    <Sun className="size-4" />
                                    Appearance
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Choose your preferred color mode.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {appearanceOptions.map((option) => {
                                    const Icon = option.icon
                                    const active = theme === option.value

                                    return (
                                        <Button
                                            key={option.value}
                                            type="button"
                                            variant={active ? "default" : "outline"}
                                            className="h-auto flex-col gap-2 py-4"
                                            onClick={() => setTheme(option.value)}
                                        >
                                            <Icon className="size-5" />
                                            <span className="text-xs">
                                                {option.name}
                                            </span>
                                        </Button>
                                    )
                                })}
                            </div>
                        </section>

                        {/* Color */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="flex items-center gap-2 text-sm font-semibold">
                                    <Palette className="size-4" />
                                    Color
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Choose the primary color for your dashboard.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {colorThemes.map((color) => {
                                    const active = colorTheme === color.value

                                    return (
                                        <button
                                            key={color.value}
                                            type="button"
                                            onClick={() => setColorTheme(color.value)}
                                            className="group flex flex-col items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-accent"
                                            aria-label={`Select ${color.name} theme`}
                                            aria-pressed={active}
                                        >
                                            <span
                                                className={`relative flex size-10 items-center justify-center rounded-full ${color.className}`}
                                            >
                                                {active && (
                                                    <Check className="size-5 text-white" />
                                                )}
                                            </span>

                                            <span className="text-xs font-medium">
                                                {color.name}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>

                        {/* More settings */}
                        <section className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold">
                                    More settings
                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Additional dashboard customization options
                                    will appear here.
                                </p>
                            </div>

                            <div className="rounded-lg border bg-muted/30 p-4">
                                <p className="text-sm text-muted-foreground">
                                    More customization options coming soon.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}