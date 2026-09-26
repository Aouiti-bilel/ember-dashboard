import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

type StatCardProps = {
  title: string
  value: string
  trend: string
  positive?: boolean
  accent?: 1 | 2 | 3 | 4
}

const accentClasses = {
  1: "border-l-chart-1",
  2: "border-l-chart-2",
  3: "border-l-chart-3",
  4: "border-l-chart-4",
}

export function StatCard({
  title,
  value,
  trend,
  positive = true,
  accent = 1,
}: StatCardProps) {
  return (
    <Card
      className={`border-l-[3px] ${accentClasses[accent]}`}
    >
      <CardContent className="px-4 py-2.5">
        <p className="text-xs font-medium text-muted-foreground">
          {title}
        </p>

        <div className="mt-0.5 flex items-center gap-2">
          <span className="text-xl font-bold leading-none tracking-tight">
            {value}
          </span>

          <span
            className={[
              "rounded-full px-2 py-0.5 text-[10px] font-bold leading-none text-white",
              positive ? "bg-emerald-600" : "bg-destructive",
            ].join(" ")}
          >
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}