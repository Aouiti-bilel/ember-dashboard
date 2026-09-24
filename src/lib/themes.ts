
export const colorThemes = {
  coral: {
    light: {
      primary: "0.67 0.18 28",
      "primary-foreground": "0.98 0.01 20",
      ring: "0.67 0.18 28",
    },
    dark: {
      primary: "0.72 0.16 28",
      "primary-foreground": "0.15 0.02 20",
      ring: "0.72 0.16 28",
    },
  },

  teal: {
    light: {
      primary: "0.65 0.15 180",
      "primary-foreground": "0.98 0.01 180",
      ring: "0.65 0.15 180",
    },
    dark: {
      primary: "0.72 0.13 180",
      "primary-foreground": "0.15 0.02 180",
      ring: "0.72 0.13 180",
    },
  },

  blue: {
    light: {
      primary: "0.62 0.19 250",
      "primary-foreground": "0.98 0.01 250",
      ring: "0.62 0.19 250",
    },
    dark: {
      primary: "0.7 0.16 250",
      "primary-foreground": "0.15 0.02 250",
      ring: "0.7 0.16 250",
    },
  },

  violet: {
    light: {
      primary: "0.62 0.19 295",
      "primary-foreground": "0.98 0.01 295",
      ring: "0.62 0.19 295",
    },
    dark: {
      primary: "0.72 0.15 295",
      "primary-foreground": "0.15 0.02 295",
      ring: "0.72 0.15 295",
    },
  },

  sage: {
    light: {
      primary: "0.62 0.12 145",
      "primary-foreground": "0.98 0.01 145",
      ring: "0.62 0.12 145",
    },
    dark: {
      primary: "0.7 0.1 145",
      "primary-foreground": "0.15 0.02 145",
      ring: "0.7 0.1 145",
    },
  },

  amber: {
    light: {
      primary: "0.72 0.16 75",
      "primary-foreground": "0.2 0.03 60",
      ring: "0.72 0.16 75",
    },
    dark: {
      primary: "0.78 0.14 75",
      "primary-foreground": "0.2 0.03 60",
      ring: "0.78 0.14 75",
    },
  },
} as const;

export type ColorTheme = keyof typeof colorThemes;