"use client"

import { useActionState, useEffect } from "react"
import { createPatient, type CreatePatientState } from "./actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PatientFormProps = {
  locale: string
onSuccess: (patientName: string) => void}

const initialState: CreatePatientState = {}

export function PatientForm({
  locale,
  onSuccess,
}: PatientFormProps) {
  async function submitPatient(
    _previousState: CreatePatientState,
    formData: FormData,
  ) {
    return createPatient(locale, formData)
  }

  const [state, formAction, pending] = useActionState(
    submitPatient,
    initialState,
  )

  useEffect(() => {
if (state.success && state.patientName) {
  onSuccess(state.patientName)
}
  }, [state.success, onSuccess])

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>

        <Input
          id="fullName"
          name="fullName"
          placeholder="e.g. Sarah Johnson"
          required
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>

        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+216 ..."
          required
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="patient@example.com"
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthDate">Birth date</Label>

        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          disabled={pending}
        />
      </div>

      {state.error && (
        <p className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full"
      >
        {pending ? "Adding patient..." : "Add patient"}
      </Button>
    </form>
  )
}