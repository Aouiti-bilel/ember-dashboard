"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export const densities = [
  "compact",
  "comfortable",
  "spacious",
] as const

export const layouts = [
  "sidebar",
  "topnav",
] as const

export const containers = [
  "fluid",
  "boxed",
] as const




export type Density = (typeof densities)[number]
export type Layout = (typeof layouts)[number]
export type Container = (typeof containers)[number]

type DashboardPreferences = {
  density: Density
  layout: Layout
  container: Container
}

type DashboardPreferencesContextValue =
  DashboardPreferences & {
    setDensity: (value: Density) => void
    setLayout: (value: Layout) => void
    setContainer: (value: Container) => void
    resetPreferences: () => void
  }

const STORAGE_KEY = "ember-dashboard-preferences"

const defaultPreferences: DashboardPreferences = {
  density: "compact",
  layout: "sidebar",
  container: "fluid",
}

const DashboardPreferencesContext =
  createContext<DashboardPreferencesContextValue | undefined>(
    undefined
  )

function isValidValue<T extends readonly string[]>(
  values: T,
  value: unknown
): value is T[number] {
  return typeof value === "string" && values.includes(value)
}

function getStoredPreferences(): DashboardPreferences {
  if (typeof window === "undefined") {
    return defaultPreferences
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return defaultPreferences
    }

    const parsed = JSON.parse(stored)

    return {
      density: isValidValue(densities, parsed.density)
        ? parsed.density
        : defaultPreferences.density,

      layout: isValidValue(layouts, parsed.layout)
        ? parsed.layout
        : defaultPreferences.layout,

      container: isValidValue(containers, parsed.container)
        ? parsed.container
        : defaultPreferences.container,

    }
  } catch {
    return defaultPreferences
  }
}

export function DashboardPreferencesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [preferences, setPreferences] =
    useState<DashboardPreferences>(defaultPreferences)

  useEffect(() => {
    const stored = getStoredPreferences()
    setPreferences(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement

    root.dataset.density = preferences.density
    root.dataset.layout = preferences.layout
    root.dataset.container = preferences.container


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    )
  }, [preferences])

  function setDensity(density: Density) {
    setPreferences((current) => ({
      ...current,
      density,
    }))
  }

  function setLayout(layout: Layout) {
    setPreferences((current) => ({
      ...current,
      layout,
    }))
  }

  function setContainer(container: Container) {
    setPreferences((current) => ({
      ...current,
      container,
    }))
  }




  function resetPreferences() {
    setPreferences(defaultPreferences)
  }

  return (
    <DashboardPreferencesContext.Provider
      value={{
        ...preferences,
        setDensity,
        setLayout,
        setContainer,
        resetPreferences,
      }}
    >
      {children}
    </DashboardPreferencesContext.Provider>
  )
}

export function useDashboardPreferences() {
  const context = useContext(DashboardPreferencesContext)

  if (!context) {
    throw new Error(
      "useDashboardPreferences must be used inside DashboardPreferencesProvider"
    )
  }

  return context
}