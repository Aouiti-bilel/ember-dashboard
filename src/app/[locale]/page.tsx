import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function Home() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Today¨s patient flow, occupancy, and revenue at a glance.
        </p>
      </div>
    </DashboardShell>
  );
}