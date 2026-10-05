import type { BadgeProps } from "@/components/ui/badge"

type AppointmentStatus =
    | "SCHEDULED"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED"
    | "NO_SHOW"

export const appointmentStatusConfig: Record<
    AppointmentStatus,
    {
        label: string
        variant: BadgeProps["variant"]
    }
> = {
    SCHEDULED: {
        label: "Scheduled",
        variant: "secondary",
    },

    CONFIRMED: {
        label: "Confirmed",
        variant: "default",
    },

    COMPLETED: {
        label: "Completed",
        variant: "secondary",
    },

    CANCELLED: {
        label: "Cancelled",
        variant: "destructive",
    },

    NO_SHOW: {
        label: "No-show",
        variant: "outline",
    },
}