"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PatientArrivedSheet } from "./patient-arrived-sheet"

type Patient = {
  id: string
  fullName: string
  phone: string
}

type PatientArrivedProps = {
  patients: Patient[]
  locale: string
}

export function PatientArrived({
  patients,
  locale,
}: PatientArrivedProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <UserPlus className="size-4" />
        Patient arrivé
      </Button>

      <PatientArrivedSheet
        open={open}
        onOpenChange={setOpen}
        patients={patients}
        // locale={locale}
      />
    </>
  )
}