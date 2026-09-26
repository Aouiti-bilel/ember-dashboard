"use client"

import { ArrowRight, Eye, EyeOff, Globe2, LockKeyhole, Mail, ShieldCheck } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "@/i18n/navigation"
import { authClient } from "@/lib/auth-client"
type Locale = "en" | "fr" | "ar"

const languages: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "ar", label: "العربية" },
]

function EmberMark() {
  return (
    <div aria-hidden="true" className="relative size-10 shrink-0">
      <span className="absolute left-3 top-0 size-4 rounded-[5px] bg-teal-500" />
      <span className="absolute bottom-0 left-3 size-4 rounded-[5px] bg-sky-400" />
      <span className="absolute left-0 top-3 size-4 rounded-[5px] bg-teal-600" />
      <span className="absolute right-0 top-3 size-4 rounded-[5px] bg-emerald-500" />
    </div>
  )
}

function EmberLogo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <EmberMark />
      <div>
        <div
          className={`text-[28px] font-semibold tracking-tight leading-none ${light ? "text-white" : "text-slate-950"
            }`}
        >
          Ember
        </div>
        <div
          className={`mt-1 text-xs tracking-wide ${light ? "text-white/75" : "text-slate-500"
            }`}
        >
          Healthcare, simplified.
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const t = useTranslations("Login")
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const currentLanguage =
    languages.find((language) => language.value === locale)?.label ?? "English"

  function handleLanguageChange(nextLocale: Locale) {
    router.replace(pathname, { locale: nextLocale })
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setIsLoading(true)

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    })

    if (error) {
      setError(error.message || "Unable to sign in.")
      setIsLoading(false)
      return
    }

    window.location.href = "/en"
  }
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden min-h-screen overflow-hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljYWwlMjBjbGluaWN8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=1600')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/65 to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/20" />

          <div className="relative z-10 flex min-h-screen flex-col px-12 py-12 xl:px-16">
            <EmberLogo />

            <div className="mt-24 max-w-xl">
              <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-slate-950 xl:text-6xl">
                {t("brandTagline")}
                <br />
                <span className="text-teal-600"> {t("heroTitleAccent")} </span>
              </h1>

              <p className="mt-7 max-w-md text-base leading-7 text-slate-600">
                {t("heroDescription")}
              </p>

              <div className="mt-10 space-y-6">
                <Feature
                  icon="patient"
                  title={t("features.patients.title")}
                  description={t("features.patients.description")}
                />
                <Feature
                  icon="calendar"
                  title={t("features.appointments.title")}
                  description={t("features.appointments.description")}
                />
                <Feature
                  icon="shield"
                  title={t("features.outcomes.title")}
                  description={t("features.outcomes.description")}
                />
              </div>
            </div>

            <div className="mt-auto max-w-[220px] pb-2 text-3xl font-light italic leading-tight text-white drop-shadow-md">
              {t("healthMessage")}
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-12 sm:px-10 lg:px-16">
          <div className="absolute right-8 top-7 flex items-center gap-2 text-xs text-slate-500">
            <span>{t("help.question")}</span>
            <button
              type="button"
              className="font-medium text-teal-600 transition-colors hover:text-teal-700 hover:underline"
            >
              {t("help.contact")}
            </button>
            <ArrowRight className="size-3.5 text-teal-600" />
          </div>

          <div className="absolute right-[-55px] top-20 size-32 rounded-full bg-teal-100/60 blur-[1px]" />
          <div className="absolute bottom-[-45px] right-8 size-28 rounded-[45%] bg-sky-100/70 rotate-[-25deg]" />

          <div className="relative z-10 w-full max-w-lg">
            <div className="mb-10">
              <EmberLogo />
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950">
                {t("welcome.title")}
              </h2>
              <p className="mt-3 text-base text-slate-500">
                {t("welcome.description")}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_14px_45px_-28px_rgba(15,23,42,0.28)] sm:p-8">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-slate-700">
                    {t("form.email")}
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      placeholder="doctor@example.com"
                      className="h-12 border-slate-200 pl-10 shadow-none focus-visible:ring-teal-500/25"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm text-slate-700">
                      {t("form.password")}
                    </Label>
                    <button
                      type="button"
                      className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                    >
                      {t("form.forgotPassword")}
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-12 border-slate-200 pl-10 pr-11 shadow-none focus-visible:ring-teal-500/25"
                      required
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-0 top-0 flex h-12 w-11 items-center justify-center text-slate-400 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="size-4 rounded border-slate-300 accent-teal-600"
                  />
                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-slate-500"
                  >
                    {t("form.rememberMe")}
                  </Label>
                </div>
                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-lg bg-teal-600 text-white shadow-none hover:bg-teal-700"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                  {!isLoading && <ArrowRight className="size-4" />}
                </Button>
              </form>
            </div>

            <div className="mt-7 flex items-start gap-3 px-1">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {t("security.title")}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {t("security.description")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <span className="inline-flex items-center gap-2">
                    <Globe2 className="size-4" />
                    {currentLanguage}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.value}
                      onClick={() => handleLanguageChange(language.value)}
                    >
                      {language.label}
                      {locale === language.value && (
                        <span className="ml-auto text-teal-600">✓</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: "patient" | "calendar" | "shield"
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/75 text-teal-600 shadow-sm ring-1 ring-white/80">
        {icon === "patient" && <span className="text-lg">◯</span>}
        {icon === "calendar" && <span className="text-base">▣</span>}
        {icon === "shield" && <ShieldCheck className="size-5" />}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}
