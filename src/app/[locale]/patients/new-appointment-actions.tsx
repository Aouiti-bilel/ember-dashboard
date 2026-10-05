"use client"

import { useState } from "react"
import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NewAppointmentSheet } from "./new-appointment-sheet"

type NewAppointmentActionsProps = {
    locale: string
    patientId: string
    patientName: string
}

export function NewAppointmentActions({
    locale,
    patientId,
    patientName,
}: NewAppointmentActionsProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
            >
                <CalendarDays className="mr-2 size-4" />
                New appointment
            </Button>

            <NewAppointmentSheet
                locale={locale}
                patientId={patientId}
                patientName={patientName}
                open={open}
                onOpenChange={setOpen}
            />
        </>
    )
}