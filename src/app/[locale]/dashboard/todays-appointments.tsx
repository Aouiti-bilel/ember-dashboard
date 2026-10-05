import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type TodaysAppointment = {
  id: string
  time: string
  patient: string
  type: string
  status: string
}

type TodaysAppointmentsProps = {
  appointments: TodaysAppointment[]
}

export function TodaysAppointments({
  appointments,
}: TodaysAppointmentsProps) {
  const [nextAppointment, ...remainingAppointments] =
    appointments

  return (
    <Card className="h-fit self-start overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarDays className="size-4" />
            </div>

            <div>
              <CardTitle className="text-base">
                Today&apos;s Appointments
              </CardTitle>

              <p className="mt-1 text-xs text-muted-foreground">
                Your schedule for today
              </p>
            </div>
          </div>

          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {appointments.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {nextAppointment ? (
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/[0.06] p-4">
            <div className="absolute right-0 top-0 size-20 rounded-full bg-primary/10 blur-2xl" />

            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                  Next appointment
                </span>

                <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <Clock3 className="size-3.5" />
                  {nextAppointment.time}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {nextAppointment.patient}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {nextAppointment.type}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-dashed text-center">
            <CalendarDays className="size-6 text-muted-foreground/50" />

            <p className="mt-2 text-sm font-medium">
              No appointments today
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your schedule is clear for today.
            </p>
          </div>
        )}

        {remainingAppointments.length > 0 && (
          <div className="max-h-[120px] overflow-y-auto divide-y divide-border pr-1">
            {remainingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group flex items-center gap-3 py-3 first:pt-2 last:pb-2"
              >
                <div className="flex w-14 shrink-0 items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Clock3 className="size-3.5" />
                  {appointment.time}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {appointment.patient}
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {appointment.type}
                  </p>
                </div>

                <span className="hidden rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground sm:inline-flex">
                  {appointment.status}
                </span>

                <CheckCircle2 className="size-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className="group flex w-full items-center justify-between rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
        >
          <span>View full schedule</span>

          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </CardContent>
    </Card>
  )
}