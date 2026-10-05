"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { cancelAppointment } from "./actions"
import { EditAppointmentSheet } from "./edit-appointment-sheet"

type Appointment = {
    id: string
    patientId: string
    date: Date
    type: "CONSULTATION" | "FOLLOW_UP" | "CHECK_UP"
    status:
        | "SCHEDULED"
        | "CONFIRMED"
        | "COMPLETED"
        | "CANCELLED"
        | "NO_SHOW"
    notes: string | null
}

type AppointmentActionsProps = {
    locale: string
    appointment: Appointment
}

export function AppointmentActions({
    locale,
    appointment,
}: AppointmentActionsProps) {
    const [editOpen, setEditOpen] = useState(false)
    const [cancelOpen, setCancelOpen] = useState(false)
    const [pending, setPending] = useState(false)

    async function handleCancel() {
        setPending(true)

        const result = await cancelAppointment(
            locale,
            appointment.id,
            appointment.patientId,
        )

        setPending(false)

        if (result.error) {
            return
        }

        setCancelOpen(false)
    }

    return (
        <>
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setEditOpen(true)}
                >
                    <Pencil className="size-4" />
                    <span className="sr-only">
                        Edit appointment
                    </span>
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setCancelOpen(true)}
                    disabled={appointment.status === "CANCELLED"}
                >
                    <X className="size-4" />
                    <span className="sr-only">
                        Cancel appointment
                    </span>
                </Button>

            </div>

            <EditAppointmentSheet
                locale={locale}
                appointment={appointment}
                open={editOpen}
                onOpenChange={setEditOpen}
            />

            <AlertDialog
                open={cancelOpen}
                onOpenChange={setCancelOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Cancel appointment?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            This appointment will be marked as
                            cancelled. The appointment will remain
                            in the patient's history.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={pending}>
                            Keep appointment
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleCancel}
                            disabled={pending}
                        >
                            {pending
                                ? "Cancelling..."
                                : "Cancel appointment"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}