"use client"

import { useState } from "react"
import { Check } from "lucide-react"
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

import { updateAppointment } from "./actions"

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

type EditAppointmentSheetProps = {
  locale: string
  appointment: Appointment
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

function formatTime(date: Date) {
  return date.toTimeString().slice(0, 5)
}

export function EditAppointmentSheet({
  locale,
  appointment,
  open,
  onOpenChange,
}: EditAppointmentSheetProps) {
  const router = useRouter()

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState(false)

  const [date, setDate] = useState(formatDate(appointment.date))
  const [time, setTime] = useState(formatTime(appointment.date))
  const [type, setType] = useState(appointment.type)
  const [status, setStatus] = useState(appointment.status)
  const [notes, setNotes] = useState(appointment.notes ?? "")

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setPending(true)
    setError(undefined)

    const formData = new FormData()

    formData.set("date", date)
    formData.set("time", time)
    formData.set("type", type)
    formData.set("status", status)
    formData.set("notes", notes)

    const result = await updateAppointment(
      locale,
      appointment.id,
      appointment.patientId,
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

  const hasChanges =
    date !== formatDate(appointment.date) ||
    time !== formatTime(appointment.date) ||
    type !== appointment.type ||
    status !== appointment.status ||
    notes !== (appointment.notes ?? "")

  function handleDone() {
    setSuccess(false)
    setDate(formatDate(appointment.date))
    setTime(formatTime(appointment.date))
    setType(appointment.type)
    setStatus(appointment.status)
    setNotes(appointment.notes ?? "")
    setError(undefined)
    onOpenChange(false)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full sm:max-w-lg">
        {!success ? (
          <>
            <SheetHeader>
              <SheetTitle>Edit appointment</SheetTitle>

              <SheetDescription>
                Update the appointment details.
              </SheetDescription>
            </SheetHeader>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 px-4 pb-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`appointment-date-${appointment.id}`}>
                    Date
                  </Label>

                  <Input
                    id={`appointment-date-${appointment.id}`}
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
                  <Label htmlFor={`appointment-time-${appointment.id}`}>
                    Time
                  </Label>

                  <Input
                    id={`appointment-time-${appointment.id}`}
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
                <Label htmlFor={`appointment-type-${appointment.id}`}>
                  Type
                </Label>

                <select
                  id={`appointment-type-${appointment.id}`}
                  value={type}
                  onChange={(event) =>
                    setType(
                      event.target.value as Appointment["type"],
                    )
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
                <Label htmlFor={`appointment-status-${appointment.id}`}>
                  Status
                </Label>

                <select
                  id={`appointment-status-${appointment.id}`}
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as Appointment["status"],
                    )
                  }
                  disabled={pending}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="NO_SHOW">No-show</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`appointment-notes-${appointment.id}`}>
                  Notes
                </Label>

                <textarea
                  id={`appointment-notes-${appointment.id}`}
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
                disabled={pending || !hasChanges}
              >
                {pending
                  ? "Saving changes..."
                  : "Save changes"}
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
              Appointment updated!
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              The appointment has been successfully updated.
            </p>

            <Button
              className="mt-8"
              onClick={handleDone}
            >
              Done
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}