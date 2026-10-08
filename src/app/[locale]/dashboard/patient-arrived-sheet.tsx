"use client"

import { useMemo, useState } from "react"
import {
    AlertCircle,
    CalendarPlus,
    Search,
    UserPlus,
} from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { createEmergencyVisit } from "../patients/actions"
type Patient = {
    id: string
    fullName: string
    phone: string
}

type PatientArrivedSheetProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    patients: Patient[]
    locale: string

}

export function PatientArrivedSheet({
    open,
    onOpenChange,
    patients,
    locale,
}: PatientArrivedSheetProps) {
    const [patientId, setPatientId] = useState("")
    const [search, setSearch] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const selectedPatient = patients.find(
        (patient) => patient.id === patientId,
    )

    const filteredPatients = useMemo(() => {
        const query = search.trim().toLowerCase()

        if (!query) {
            return patients
        }

        return patients.filter(
            (patient) =>
                patient.fullName.toLowerCase().includes(query) ||
                patient.phone.toLowerCase().includes(query),
        )
    }, [patients, search])

    function handleSelectPatient(patient: Patient) {
        setPatientId(patient.id)
        setSearch("")
    }

    function handleOpenChange(value: boolean) {
        if (!value) {
            setSearch("")
            setPatientId("")
        }

        onOpenChange(value)
    }
    async function handleEmergencyVisit() {
        if (!selectedPatient) return

        setIsSubmitting(true)

        const result = await createEmergencyVisit(
            locale,
            selectedPatient.id,
        )

        setIsSubmitting(false)

        if (result.success) {
            onOpenChange(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Patient arrivé</SheetTitle>

                    <SheetDescription>
                        Enregistrez l&apos;arrivée d&apos;un patient et choisissez
                        comment le prendre en charge.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Patient */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Patient
                        </label>

                        {selectedPatient ? (
                            <div className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium">
                                        {selectedPatient.fullName}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {selectedPatient.phone}
                                    </p>
                                </div>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setPatientId("")}
                                >
                                    Modifier
                                </Button>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="flex h-10 items-center rounded-md border border-input bg-background px-3">
                                    <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Rechercher un patient..."
                                        className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                    />
                                </div>

                                {search.trim() && (
                                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-background p-1 shadow-md">
                                        {filteredPatients.length > 0 ? (
                                            filteredPatients.map((patient) => (
                                                <button
                                                    key={patient.id}
                                                    type="button"
                                                    onClick={() => handleSelectPatient(patient)}
                                                    className="flex w-full flex-col items-start rounded-sm px-3 py-2 text-left hover:bg-muted"
                                                >
                                                    <span className="text-sm font-medium">
                                                        {patient.fullName}
                                                    </span>

                                                    <span className="text-xs text-muted-foreground">
                                                        {patient.phone}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                                                Aucun patient trouvé.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Selected patient */}
                    {selectedPatient && (
                        <div className="rounded-lg border bg-muted/30 p-3">
                            <p className="text-sm font-medium">
                                {selectedPatient.fullName}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {selectedPatient.phone}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-auto w-full justify-start gap-3 p-4"
                            disabled={!selectedPatient}
                        >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <CalendarPlus className="size-4" />
                            </div>

                            <div className="text-left">
                                <p className="text-sm font-semibold">
                                    Rendez-vous plus tard
                                </p>

                                <p className="mt-1 text-xs font-normal text-muted-foreground">
                                    Créer un rendez-vous pour ce patient.
                                </p>
                            </div>
                        </Button>
                        <p className="text-sm font-semibold">
                            {isSubmitting ? "Enregistrement..." : "Visite urgente"}
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-auto w-full justify-start gap-3 border-destructive/20 p-4 hover:bg-destructive/5"
                            disabled={!selectedPatient || isSubmitting}
                            onClick={handleEmergencyVisit}
                        >
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                                <AlertCircle className="size-4" />
                            </div>

                            <div className="text-left">
                                <p className="text-sm font-semibold">
                                    Visite urgente
                                </p>

                                <p className="mt-1 text-xs font-normal text-muted-foreground">
                                    Ajouter le patient à la salle d&apos;attente.
                                </p>
                            </div>
                        </Button>
                    </div>

                    {/* New patient */}
                    <div className="border-t pt-5">
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full gap-2"
                        >
                            <UserPlus className="size-4" />
                            Nouveau patient
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}