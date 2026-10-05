"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EditPatientSheet } from "./edit-patient-sheet"

type PatientDetailsActionsProps = {
  locale: string
  patient: {
    id: string
    fullName: string
    phone: string
    email: string | null
    birthDate: Date | null
    isActive: boolean
  }
}

export function PatientDetailsActions({
  locale,
  patient,
}: PatientDetailsActionsProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Pencil className="mr-2 size-4" />
        Edit patient
      </Button>

      <EditPatientSheet
        locale={locale}
        patient={patient}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}