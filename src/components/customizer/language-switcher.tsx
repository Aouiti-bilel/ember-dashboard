"use client"

import { Languages, Check } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"

type Locale = "en" | "ar" | "fr"

const languages: {
  value: Locale
  label: string
  icon: string
}[] = [
  {
    value: "en",
    label: "English",
    icon: "🇬🇧",
  },
  {
    value: "ar",
    label: "العربية",
    icon: "🇹🇳",
  },
  {
    value: "fr",
    label: "Français",
    icon: "🇫🇷",
  },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function handleLanguageChange(nextLocale: Locale) {
    router.replace(pathname, {
      locale: nextLocale,
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Languages className="size-4" />
      </div>

      <div className="space-y-1.5">
        {languages.map((language) => {
          const active = locale === language.value

          return (
            <Button
              key={language.value}
              type="button"
              variant="ghost"
              className={[
                "h-11 w-full justify-start gap-3 rounded-lg px-3",
                "font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                  : "text-foreground hover:bg-muted",
              ].join(" ")}
              onClick={() => handleLanguageChange(language.value)}
            >
              <span className="text-lg leading-none">
                {language.icon}
              </span>

              <span className="flex-1 text-left">
                {language.label}
              </span>

              {active && (
                <Check className="size-4 shrink-0" />
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}