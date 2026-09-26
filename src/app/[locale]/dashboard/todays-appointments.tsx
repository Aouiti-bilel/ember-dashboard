import { CalendarDays, Clock3 } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const appointments = [
    {
        time: "09:00",
        patient: "Sarah Johnson",
        type: "Consultation",
    },
    {
        time: "10:30",
        patient: "Michael Chen",
        type: "Follow-up",
    },
    {
        time: "14:00",
        patient: "Emily Davis",
        type: "Consultation",
    },
    {
        time: "15:30",
        patient: "James Wilson",
        type: "Check-up",
    },
]

export function TodaysAppointments() {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base">
                        Today&apos;s Appointments
                    </CardTitle>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Your schedule for today
                    </p>
                </div>

                <CalendarDays className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent className="space-y-1">
                {appointments.map((appointment) => (
                    <div
                        key={`${appointment.time}-${appointment.patient}`}
                        className="flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-muted/50"
                    >
                        <div className="flex w-14 shrink-0 items-center gap-1.5 text-sm font-medium">
                            <Clock3 className="size-3.5 text-muted-foreground" />
                            {appointment.time}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {appointment.patient}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {appointment.type}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}