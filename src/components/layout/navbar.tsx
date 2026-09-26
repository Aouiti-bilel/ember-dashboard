"use client"

import { useState } from "react"
import { Bell, LogOut, Menu, Settings } from "lucide-react"
import { useTranslations } from "next-intl"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { Customizer } from "@/components/customizer/customizer"
import { authClient } from "@/lib/auth-client"

export function Navbar() {
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const t = useTranslations("Navigation")

  async function handleSignOut() {
    await authClient.signOut()
    window.location.href = "/en/login"
  }

  return (
    <>
      <header className="flex h-16 items-center border-b bg-background px-4 md:px-6">
        {/* Mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="size-5" />

          <span className="sr-only">
            Open navigation
          </span>
        </Button>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
          >
            <Bell className="size-4" />

            <span className="sr-only">
              Notifications
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCustomizerOpen(true)}
          >
            <Settings className="size-4" />

            <span className="sr-only">
              Customize dashboard
            </span>
          </Button>

          <Avatar className="ml-1 size-8">
            <AvatarFallback>
              BL
            </AvatarFallback>
          </Avatar>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />

            <span className="sr-only">
              Sign out
            </span>
          </Button>
        </div>
      </header>

      <Customizer
        open={customizerOpen}
        onOpenChange={setCustomizerOpen}
      />
    </>
  )
}