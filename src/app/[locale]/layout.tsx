import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"

import { ThemeProvider } from "@/components/theme-provider"
import { ColorThemeProvider } from "@/components/color-theme-provider"
import { DashboardPreferencesProvider } from "@/components/dashboard-preferences-provider"
import { routing } from "@/i18n/routing"

import "../globals.css"

export const metadata: Metadata = {
  title: "Ember Dashboard",
  description: "Healthcare admin dashboard",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  const direction = locale === "ar" ? "rtl" : "ltr"

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ColorThemeProvider>
              <DashboardPreferencesProvider>
                {children}
              </DashboardPreferencesProvider>
            </ColorThemeProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}