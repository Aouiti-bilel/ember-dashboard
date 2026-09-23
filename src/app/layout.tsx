import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}