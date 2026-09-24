"use client"

import {
    Check,
    Globe,
    LayoutDashboard,
    Menu,
    Moon,
    Palette,
    PanelLeft,
    PanelTop,
    RotateCcw,
    Rows3,
    Settings,
    SlidersHorizontal,
    Sun,
    SunMoon,
    TextCursorInput,
    AlignLeft,
    AlignRight,
    Minimize2,
    Scan,
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

import {
    useDashboardPreferences,
    type Container,
    type Density,
    type Direction,
    type Language,
    type Layout,
} from "@/components/dashboard-preferences-provider"

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
            className: "bg-orange-600",
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

const densityOptions: {
    name: string
    value: Density
    icon: typeof Rows3
}[] = [
        {
            name: "Compact",
            value: "compact",
            icon: Rows3,
        },
        {
            name: "Comfortable",
            value: "comfortable",
            icon: Rows3,
        },
        {
            name: "Spacious",
            value: "spacious",
            icon: Rows3,
        },
    ]

const layoutOptions: {
    name: string
    value: Layout
    icon: typeof PanelLeft
}[] = [
        {
            name: "Sidebar",
            value: "sidebar",
            icon: PanelLeft,
        },
        {
            name: "Top Nav",
            value: "topnav",
            icon: PanelTop,
        },
    ]

const containerOptions: {
    name: string
    value: Container
    icon: typeof LayoutDashboard
}[] = [
        {
            name: "Fluid",
            value: "fluid",
            icon: Scan,
        },
        {
            name: "Boxed",
            value: "boxed",
            icon: Minimize2,
        },
    ]

const directionOptions: {
    name: string
    value: Direction
    icon: typeof AlignLeft
}[] = [
        {
            name: "LTR",
            value: "ltr",
            icon: AlignLeft,
        },
        {
            name: "RTL",
            value: "rtl",
            icon: AlignRight,
        },
    ]

const languageOptions: {
    name: string
    value: Language
    icon: typeof Globe
}[] = [
        {
            name: "English",
            value: "en",
            icon: Globe,
        },
        {
            name: "Deutsch",
            value: "de",
            icon: Globe,
        },
        {
            name: "Français",
            value: "fr",
            icon: Globe,
        },
    ]


export function Customizer({
    open,
    onOpenChange,
}: CustomizerProps) {
    const { theme, setTheme } = useTheme()

    const { colorTheme, setColorTheme } = useColorTheme()

    const {
        density,
        setDensity,
        layout,
        setLayout,
        container,
        setContainer,
        direction,
        setDirection,
        language,
        setLanguage,
        resetPreferences,
    } = useDashboardPreferences()

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

                        {/* Density */}
                        <CustomizerSection title="Density">
                            <div className="grid grid-cols-3 gap-2">
                                {densityOptions.map((option) => (
                                    <PreferenceButton
                                        key={option.value}
                                        label={option.name}
                                        icon={option.icon}
                                        active={density === option.value}
                                        onClick={() => setDensity(option.value)}
                                    />
                                ))}
                            </div>
                        </CustomizerSection>

                        {/* Layout */}
                        <CustomizerSection title="Layout">
                            <div className="grid grid-cols-2 gap-2">
                                {layoutOptions.map((option) => (
                                    <PreferenceButton
                                        key={option.value}
                                        label={option.name}
                                        icon={option.icon}
                                        active={layout === option.value}
                                        onClick={() => setLayout(option.value)}
                                    />
                                ))}
                            </div>
                        </CustomizerSection>

                        {/* Container */}
                        <CustomizerSection title="Container">
                            <div className="grid grid-cols-2 gap-2">
                                {containerOptions.map((option) => (
                                    <PreferenceButton
                                        key={option.value}
                                        label={option.name}
                                        icon={option.icon}
                                        active={container === option.value}
                                        onClick={() => setContainer(option.value)}
                                    />
                                ))}
                            </div>
                        </CustomizerSection>

                        {/* Direction */}
                        <CustomizerSection title="Direction">
                            <div className="grid grid-cols-2 gap-2">
                                {directionOptions.map((option) => (
                                    <PreferenceButton
                                        key={option.value}
                                        label={option.name}
                                        icon={option.icon}
                                        active={direction === option.value}
                                        onClick={() => setDirection(option.value)}
                                    />
                                ))}
                            </div>
                        </CustomizerSection>

                        {/* Language */}
                        <CustomizerSection title="Language">
                            <div className="grid grid-cols-3 gap-2">
                                {languageOptions.map((option) => (
                                    <PreferenceButton
                                        key={option.value}
                                        label={option.name}
                                        icon={option.icon}
                                        active={language === option.value}
                                        onClick={() => setLanguage(option.value)}
                                    />
                                ))}
                            </div>
                        </CustomizerSection>

                        {/* Reset */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={resetPreferences}
                        >
                            <RotateCcw className="size-4" />
                            Reset to Defaults
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function CustomizerSection({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <section className="space-y-3">
            <h3 className="text-sm font-medium">{title}</h3>
            {children}
        </section>
    )
}

function PreferenceButton({
    label,
    icon: Icon,
    active,
    onClick,
}: {
    label: string
    icon: React.ComponentType<{ className?: string }>
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={[
                "relative flex min-h-16 flex-col items-center justify-center gap-2 rounded-xl border-2 px-3 py-3 text-center transition-all",
                active
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-accent",
            ].join(" ")}
        >
            <Icon className="size-5" />

            <span className="text-xs font-medium">
                {label}
            </span>

            {active && (
                <span className="absolute right-2 top-2">
                    <Check className="size-3.5" />
                </span>
            )}
        </button>
    )
}