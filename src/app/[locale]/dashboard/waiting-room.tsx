"use client"

import { useState } from "react"
import { CheckCircle2, Clock3, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { updateEmergencyVisitStatus } from "../patients/actions"
import { toast } from "@/components/ui/toast"


type WaitingPatient = {
    id: string
    patientName: string
    arrivedAt: Date
    status: string
}

type WaitingRoomProps = {
    patients: WaitingPatient[]
    locale: string
}

export function WaitingRoom({
    patients,
    locale,
}: WaitingRoomProps) {
    const [updatingId, setUpdatingId] = useState<string | null>(null)


    async function handleStartConsultation(visitId: string) {
        setUpdatingId(visitId)

        await updateEmergencyVisitStatus(
            locale,
            visitId,
            "IN_CONSULTATION",
        )

        setUpdatingId(null)

        toast.add({
            title: "Consultation commencée",
            description: "Le patient est maintenant en consultation.",
        })
    }

    async function handleCompleteConsultation(visitId: string) {
        setUpdatingId(visitId)

        await updateEmergencyVisitStatus(
            locale,
            visitId,
            "COMPLETED",
        )

        setUpdatingId(null)

        toast.add({
            title: "Consultation terminée",
            description: "La consultation a été enregistrée avec succès.",
        })
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base">
                        Salle d&apos;attente
                    </CardTitle>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Patients en attente de consultation
                    </p>
                </div>

                <Clock3 className="size-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                {patients.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                        Aucun patient en attente.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {patients.map((patient) => (
                            <div
                                key={patient.id}
                                className="flex items-center justify-between gap-4 rounded-lg border bg-background p-4"
                            >
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        {patient.patientName}
                                    </p>

                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Clock3 className="size-3.5" />
                                        Arrivé à{" "}
                                        {new Intl.DateTimeFormat("fr-FR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }).format(patient.arrivedAt)}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    {patient.status === "WAITING" && (
                                        <>
                                            <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
                                                En attente
                                            </span>

                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={() =>
                                                    handleStartConsultation(patient.id)
                                                }
                                                disabled={updatingId === patient.id}
                                            >
                                                <Play className="size-3.5" />

                                                {updatingId === patient.id
                                                    ? "..."
                                                    : "Commencer"}
                                            </Button>
                                        </>
                                    )}

                                    {patient.status === "IN_CONSULTATION" && (
                                        <>
                                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                                En consultation
                                            </span>

                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    handleCompleteConsultation(
                                                        patient.id,
                                                    )
                                                }
                                                disabled={updatingId === patient.id}
                                            >
                                                <CheckCircle2 className="size-3.5" />

                                                {updatingId === patient.id
                                                    ? "..."
                                                    : "Terminer"}
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}