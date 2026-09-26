import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleDot,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const schedule = [
  {
    time: "09:00",
    patient: "Sarah Johnson",
    type: "Consultation",
    status: "Completed",
  },
  {
    time: "10:30",
    patient: "Michael Chen",
    type: "Follow-up",
    status: "In Progress",
  },
  {
    time: "14:00",
    patient: "Emily Davis",
    type: "Consultation",
    status: "Scheduled",
  },
  {
    time: "15:30",
    patient: "James Wilson",
    type: "Check-up",
    status: "Scheduled",
  },
]

function StatusIcon({ status }: { status: string }) {
  if (status === "Completed") {
    return <CheckCircle2 className="size-4 text-emerald-600" />
  }

  if (status === "In Progress") {
    return <CircleDot className="size-4 text-amber-500" />
  }

  return <Clock3 className="size-4 text-muted-foreground" />
}

export function TodaysSchedule() {
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((appointment) => (
                <tr
                  key={`${appointment.time}-${appointment.patient}`}
                  className="border-b last:border-0"
                >
                  <td className="py-3 font-medium">
                    {appointment.time}
                  </td>

                  <td className="py-3">
                    {appointment.patient}
                  </td>

                  <td className="py-3 text-muted-foreground">
                    {appointment.type}
                  </td>

                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={appointment.status} />
                      <span>{appointment.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}