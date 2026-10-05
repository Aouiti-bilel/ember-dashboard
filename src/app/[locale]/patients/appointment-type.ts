type AppointmentType =
    | "CONSULTATION"
    | "FOLLOW_UP"
    | "CHECK_UP"

export const appointmentTypeConfig: Record<
    AppointmentType,
    {
        label: string
    }
> = {
    CONSULTATION: {
        label: "Consultation",
    },

    FOLLOW_UP: {
        label: "Follow-up",
    },

    CHECK_UP: {
        label: "Check-up",
    },
}