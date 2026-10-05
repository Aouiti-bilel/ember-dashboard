import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface DashboardProps {
  children: React.ReactNode;
}

export function Dashboard({
  children,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Navbar />

          <main className="min-w-0 flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}