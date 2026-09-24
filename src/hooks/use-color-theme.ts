"use client";

import { useEffect, useState } from "react";

import {
  colorThemes,
  type ColorTheme,
} from "@/lib/themes";

const STORAGE_KEY = "ember-color-theme";

export function useColorTheme() {
  const [colorTheme, setColorTheme] =
    useState<ColorTheme>("coral");

  useEffect(() => {
    const stored = localStorage.getItem(
      STORAGE_KEY
    ) as ColorTheme | null;

    if (stored && stored in colorThemes) {
      setColorTheme(stored);
      applyColorTheme(stored);
    }
  }, []);

  function changeColorTheme(theme: ColorTheme) {
    setColorTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    applyColorTheme(theme);
  }

  return {
    colorTheme,
    setColorTheme: changeColorTheme,
  };
}

function applyColorTheme(theme: ColorTheme) {
  const root = document.documentElement;
  const selected = colorThemes[theme];

  Object.entries(selected.light).forEach(
    ([property, value]) => {
      root.style.setProperty(`--${property}`, value);
    }
  );
}