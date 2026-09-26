"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
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
  { month: "Jan", patients: 12 },
  { month: "Fév", patients: 18 },
  { month: "Mar", patients: 15 },
  { month: "Avr", patients: 22 },
  { month: "Mai", patients: 19 },
  { month: "Juin", patients: 27 },
]

export function NewPatients() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Nouveaux patients par mois
        </CardTitle>

        <p className="text-xs text-muted-foreground">
          Évolution des nouveaux patients
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                dataKey="month"
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

              <Tooltip />

              <Line
                type="monotone"
                dataKey="patients"
                name="Nouveaux patients"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={{
                  r: 3,
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}