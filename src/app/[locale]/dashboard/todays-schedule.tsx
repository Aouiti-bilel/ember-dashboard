import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleDot,
} from "lucide-react"

import { prisma } from "@/lib/prisma"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function StatusIcon({
  status,
}: {
  status: string
}) {
  if (status === "COMPLETED") {
    return <CheckCircle2 className="size-4 text-emerald-600" />
  }

  if (status === "CONFIRMED") {
    return <CircleDot className="size-4 text-amber-500" />
  }

  return <Clock3 className="size-4 text-muted-foreground" />
}

function Status({
  status,
}: {
  status: string
}) {
  const label = status
    .replace("_", " ")
    .replace(/^\w/, (letter) => letter.toUpperCase())

  return (
    <div className="flex items-center gap-2 text-sm">
      <StatusIcon status={status} />
      <span>{label}</span>
    </div>
  )
}

function formatAppointmentType(type: string) {
  return type
    .replace("_", " ")
    .replace(/^\w/, (letter) => letter.toUpperCase())
}

export async function TodaysSchedule() {
  const now = new Date()

  const startOfDay = new Date(now)
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)

  const appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      patient: true,
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">
            Today&apos;s Schedule
          </CardTitle>

          <p className="mt-1 text-xs text-muted-foreground">
            Your appointments for today
          </p>
        </div>

        <CalendarDays className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        {appointments.length === 0 ? (
          <div className="flex min-h-32 flex-col items-center justify-center text-center">
            <CalendarDays className="size-8 text-muted-foreground/50" />

            <p className="mt-3 text-sm font-medium">
              No appointments today
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your schedule is clear for today.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="pb-3 font-medium">
                      Time
                    </th>

                    <th className="pb-3 font-medium">
                      Patient
                    </th>

                    <th className="pb-3 font-medium">
                      Type
                    </th>

                    <th className="pb-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b last:border-0"
                    >
                      <td className="py-3 font-medium">
                        {new Intl.DateTimeFormat("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(appointment.date)}
                      </td>

                      <td className="py-3">
                        {appointment.patient.fullName}
                      </td>

                      <td className="py-3 text-muted-foreground">
                        {formatAppointmentType(
                          appointment.type,
                        )}
                      </td>

                      <td className="py-3">
                        <Status status={appointment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y md:hidden">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="py-4 first:pt-1 last:pb-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {appointment.patient.fullName}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatAppointmentType(
                          appointment.type,
                        )}
                      </p>
                    </div>

                    <span className="shrink-0 text-sm font-semibold">
                      {new Intl.DateTimeFormat("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(appointment.date)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <Status status={appointment.status} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}