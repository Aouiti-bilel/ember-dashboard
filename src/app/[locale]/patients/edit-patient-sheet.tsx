"use client"

import { useCallback, useState } from "react"
import { Check, Pencil } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { updatePatient } from "./actions"

type Patient = {
    id: string
    fullName: string
    phone: string
    email: string | null
    birthDate: Date | null
    isActive: boolean
}

type EditPatientSheetProps = {
    locale: string
    patient: Patient
    open: boolean
    onOpenChange: (open: boolean) => void
}
export function EditPatientSheet({
    locale,
    patient,
    open,
    onOpenChange,
}: EditPatientSheetProps) {
    const router = useRouter()

    const [pending, setPending] = useState(false)
    const [error, setError] = useState<string>()
    const [success, setSuccess] = useState(false)

    const [fullName, setFullName] = useState(patient.fullName)
    const [phone, setPhone] = useState(patient.phone)
    const [email, setEmail] = useState(patient.email ?? "")
const [birthDate, setBirthDate] = useState(
    patient.birthDate
        ? patient.birthDate.toISOString().slice(0, 10)
        : "",
)

 

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        setPending(true)
        setError(undefined)

        const formData = new FormData()

        formData.set("fullName", fullName)
        formData.set("phone", phone)
        formData.set("email", email)
        formData.set("birthDate", birthDate)

        const result = await updatePatient(
            locale,
            patient.id,
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
        fullName !== patient.fullName ||
        phone !== patient.phone ||
        email !== (patient.email ?? "") ||
        birthDate !==
        (patient.birthDate
            ? patient.birthDate.toISOString().slice(0, 10)
            : "")

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >

            <SheetContent className="w-full sm:max-w-lg">
                {!success ? (
                    <>
                        <SheetHeader>
                            <SheetTitle>Edit patient</SheetTitle>

                            <SheetDescription>
                                Update this patient's information.
                            </SheetDescription>
                        </SheetHeader>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 px-4 pb-6"
                        >
                            <div className="space-y-2">
                                <Label htmlFor={`fullName-${patient.id}`}>
                                    Full name
                                </Label>

                                <Input
                                    id={`fullName-${patient.id}`}
                                    value={fullName}
                                    onChange={(event) =>
                                        setFullName(event.target.value)
                                    }
                                    disabled={pending}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`phone-${patient.id}`}>
                                    Phone
                                </Label>

                                <Input
                                    id={`phone-${patient.id}`}
                                    type="tel"
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(event.target.value)
                                    }
                                    disabled={pending}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`email-${patient.id}`}>
                                    Email
                                </Label>

                                <Input
                                    id={`email-${patient.id}`}
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    disabled={pending}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor={`birthDate-${patient.id}`}>
                                    Birth date
                                </Label>

                                <Input
                                    id={`birthDate-${patient.id}`}
                                    type="date"
                                    value={birthDate}
                                    onChange={(event) =>
                                        setBirthDate(event.target.value)
                                    }
                                    disabled={pending}
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
                                {pending ? "Saving changes..." : "Save changes"}
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
                            Patient updated!
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {fullName} has been successfully updated.
                        </p>

                        <Button
                            className="mt-8"
                            onClick={() => onOpenChange(false)}
                        >
                            Done
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet >
    )
}