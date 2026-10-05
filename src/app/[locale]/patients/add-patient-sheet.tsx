"use client"

import { useCallback, useState } from "react"
import { Check, Heart, Plus, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { PatientForm } from "./patient-form"

export function AddPatientSheet({
  locale,
}: {
  locale: string
}) {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [patientName, setPatientName] = useState("")

  const handleSuccess = useCallback(
    (name: string) => {
      setPatientName(name)
      setSuccess(true)
      router.refresh()
    },
    [router],
  )

  function handleOpenChange(value: boolean) {
    setOpen(value)

    if (!value) {
      setSuccess(false)
      setPatientName("")
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button className="shrink-0">
          <Plus className="mr-2 size-4" />
          Add patient
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-hidden sm:max-w-lg">
        {!success ? (
          <>
            <SheetHeader>
              <SheetTitle>Add patient</SheetTitle>

              <SheetDescription>
                Add a new patient to your cabinet directory.
              </SheetDescription>
            </SheetHeader>

            <div className="px-4 pb-6">
              <PatientForm
                locale={locale}
                onSuccess={handleSuccess}
              />
            </div>
          </>
        ) : (
          <SuccessPanel
            patientName={patientName}
            onDone={() => setOpen(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}

function SuccessPanel({
  patientName,
  onDone,
}: {
  patientName: string
  onDone: () => void
}) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Decorative confetti */}
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute left-[16%] top-[20%] size-2 rotate-12 rounded-sm bg-primary/50" />
        <span className="absolute left-[27%] top-[13%] size-1.5 rotate-45 rounded-full bg-primary/40" />
        <span className="absolute right-[22%] top-[18%] size-2 -rotate-12 rounded-sm bg-primary/50" />
        <span className="absolute right-[13%] top-[29%] size-1.5 rotate-45 rounded-full bg-primary/40" />
        <span className="absolute left-[11%] top-[38%] size-1.5 -rotate-12 rounded-full bg-primary/30" />
        <span className="absolute right-[10%] top-[42%] size-2 rotate-12 rounded-sm bg-primary/40" />
      </div>

      {/* Success icon */}
      <div className="relative mb-7">
        <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl" />

        <div className="relative flex size-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Check className="size-7 stroke-[2.5]" />
          </div>

          <Sparkles className="absolute -right-3 -top-3 size-5 text-primary" />
        </div>
      </div>

      {/* Message */}
      <div className="relative space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Patient added!
        </h2>

        <p className="text-base font-medium text-primary">
          {patientName}
        </p>

        <p className="mx-auto max-w-xs text-sm leading-6 text-muted-foreground">
          has been successfully added to your patient directory.
        </p>
      </div>

      {/* Heart message */}
      <div className="mt-7 flex items-center gap-2 rounded-full bg-muted/60 px-4 py-2 text-xs text-muted-foreground">
        <Heart className="size-3.5 fill-primary text-primary" />
        <span>Another patient cared for.</span>
      </div>

      {/* Bottom action */}
      <div className="relative mt-10">
        <Button
          size="lg"
          className="min-w-32 rounded-xl"
          onClick={onDone}
        >
          Done
        </Button>
      </div>

      {/* Soft bottom wave */}
      <div className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-[140%] -translate-x-1/2 rounded-[50%] bg-primary/[0.04]" />
    </div>
  )
}