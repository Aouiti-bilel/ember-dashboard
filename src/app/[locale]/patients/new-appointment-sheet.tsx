"use client"

import { useState } from "react"
import { CalendarDays, Check } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { createAppointment } from "./actions"

type NewAppointmentSheetProps = {
    locale: string
    patientId: string
    patientName: string
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function NewAppointmentSheet({
    locale,
    patientId,
    patientName,
    open,
    onOpenChange,
}: NewAppointmentSheetProps) {
    const router = useRouter()

    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState(false)

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [type, setType] = useState("CONSULTATION")
    const [status, setStatus] = useState("SCHEDULED")
    const [notes, setNotes] = useState("")

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        setPending(true)
        setError(undefined)

        const formData = new FormData()

        formData.set("patientId", patientId)
        formData.set("date", date)
        formData.set("time", time)
        formData.set("type", type)
        formData.set("status", status)
        formData.set("notes", notes)

        const result = await createAppointment(
            locale,
            formData,
        )

        setPending(false)

        if (result.error) {
            setError(result.error)
            return
        }

        setSuccess(true)
        router.refresh()
    }

    const canSubmit =
        Boolean(date) &&
        Boolean(time) &&
        !pending

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent className="w-full sm:max-w-lg">
                {!success ? (
                    <>
                        <SheetHeader>
                            <SheetTitle>
                                New appointment
                            </SheetTitle>

                            <SheetDescription>
                                Schedule an appointment for {patientName}.
                            </SheetDescription>
                        </SheetHeader>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 px-4 pb-6"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="appointment-date">
                                        Date
                                    </Label>

                                    <Input
                                        id="appointment-date"
                                        type="date"
                                        value={date}
                                        onChange={(event) =>
                                            setDate(event.target.value)
                                        }
                                        disabled={pending}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="appointment-time">
                                        Time
                                    </Label>

                                    <Input
                                        id="appointment-time"
                                        type="time"
                                        value={time}
                                        onChange={(event) =>
                                            setTime(event.target.value)
                                        }
                                        disabled={pending}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="appointment-type">
                                    Type
                                </Label>

                                <select
                                    id="appointment-type"
                                    value={type}
                                    onChange={(event) =>
                                        setType(event.target.value)
                                    }
                                    disabled={pending}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="CONSULTATION">
                                        Consultation
                                    </option>

                                    <option value="FOLLOW_UP">
                                        Follow-up
                                    </option>

                                    <option value="CHECK_UP">
                                        Check-up
                                    </option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="appointment-status">
                                    Status
                                </Label>

                                <select
                                    id="appointment-status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                    disabled={pending}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                >
                                    <option value="SCHEDULED">
                                        Scheduled
                                    </option>

                                    <option value="CONFIRMED">
                                        Confirmed
                                    </option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="appointment-notes">
                                    Notes
                                </Label>

                                <textarea
                                    id="appointment-notes"
                                    value={notes}
                                    onChange={(event) =>
                                        setNotes(event.target.value)
                                    }
                                    disabled={pending}
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                                    placeholder="Optional notes..."
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-destructive">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={!canSubmit}
                            >
                                {pending
                                    ? "Creating appointment..."
                                    : "Create appointment"}
                            </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
                            <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Check className="size-6" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold tracking-tight">
                            Appointment created!
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            The appointment for {patientName} has been
                            successfully created.
                        </p>

                        <Button
                            className="mt-8"
                            onClick={() => {
                                setSuccess(false)
                                setDate("")
                                setTime("")
                                setType("CONSULTATION")
                                setStatus("SCHEDULED")
                                setNotes("")
                                setError(undefined)
                                onOpenChange(false)
                            }}                     >
                            Done
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}