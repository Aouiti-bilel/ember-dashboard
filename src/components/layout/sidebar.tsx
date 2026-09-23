"use client";

import {
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Patients",
    icon: Users,
  },
  {
    title: "Appointments",
    icon: CalendarDays,
  },
  {
    title: "Medical Records",
    icon: FileText,
  },
  {
    title: "Prescriptions",
    icon: ClipboardList,
  },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="size-4" />
          </div>

          <span className="text-lg font-semibold tracking-tight">
            Ember
          </span>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Main
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.title}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
            >
              <Icon className="size-4" />
              {item.title}
            </Button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-3">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="size-4" />
          Settings
          <ChevronDown className="ml-auto size-4" />
        </Button>
      </div>
    </aside>
  );
}