import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ColorThemeProvider } from "@/components/color-theme-provider";
import { DashboardPreferencesProvider } from "@/components/dashboard-preferences-provider";

export const metadata: Metadata = {
  title: "Ember Dashboard",
  description: "Healthcare admin dashboard",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
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
      </body>
    </html>
  );
}