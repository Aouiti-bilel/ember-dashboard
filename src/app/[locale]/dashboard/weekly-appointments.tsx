"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const data = [
  { day: "Lun", appointments: 4 },
  { day: "Mar", appointments: 6 },
  { day: "Mer", appointments: 5 },
  { day: "Jeu", appointments: 8 },
  { day: "Ven", appointments: 6 },
  { day: "Sam", appointments: 3 },
  { day: "Dim", appointments: 1 },
]

export function WeeklyAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Rendez-vous cette semaine
        </CardTitle>

        <p className="text-xs text-muted-foreground">
          Nombre de rendez-vous par jour
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 8,
                right: 8,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                vertical={false}
                className="stroke-border"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
              />

              <Bar
                dataKey="appointments"
                name="Rendez-vous"
                fill="var(--color-chart-1)"
                radius={[4, 4, 0, 0]}
                maxBarSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}