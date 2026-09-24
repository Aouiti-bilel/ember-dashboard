"use client";

import { Check, Moon, Palette, Settings, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
];

export function Customizer({
  open,
  onOpenChange,
}: CustomizerProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="size-4" />
            Customizer
          </SheetTitle>

          <SheetDescription>
            Customize the appearance of your dashboard.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 px-4 pb-6">
          {/* Theme */}
          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium">
                Theme
              </h3>

              <p className="text-xs text-muted-foreground">
                Select your preferred appearance.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {themes.map((item) => {
                const Icon = item.icon;
                const selected = theme === item.value;

                return (
                  <Button
                    key={item.value}
                    type="button"
                    variant="outline"
                    className="relative h-20 flex-col gap-2"
                    onClick={() => setTheme(item.value)}
                  >
                    {selected && (
                      <span className="absolute right-2 top-2">
                        <Check className="size-3.5" />
                      </span>
                    )}

                    <Icon className="size-5" />

                    <span className="text-xs">
                      {item.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </section>

          {/* Color */}
          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-medium">
                Color
              </h3>

              <p className="text-xs text-muted-foreground">
                Choose the primary dashboard color.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                "Coral",
                "Teal",
                "Blue",
                "Violet",
                "Sage",
                "Amber",
              ].map((color) => (
                <Button
                  key={color}
                  type="button"
                  variant="outline"
                  className="h-12 justify-start gap-2"
                >
                  <span className="size-3 rounded-full bg-primary" />
                  {color}
                </Button>
              ))}
            </div>
          </section>

          {/* Coming later */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-muted-foreground" />

              <h3 className="text-sm font-medium">
                More settings
              </h3>
            </div>

            <p className="text-sm text-muted-foreground">
              Density, layout, container, and other
              customization options will be added next.
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}