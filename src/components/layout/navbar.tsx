import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="flex h-16 items-center border-b bg-background px-6">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="size-5" />
        <span className="sr-only">Open navigation</span>
      </Button>

      <div className="ml-auto">
        {/* Navbar actions will come later */}
      </div>
    </header>
  );
}