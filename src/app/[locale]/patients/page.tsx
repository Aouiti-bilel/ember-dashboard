import { ArrowUpRight, Users } from "lucide-react"

import { Dashboard } from "@/components/layout/dashboard"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PatientsTable } from "./patients-table"
import { prisma } from "@/lib/prisma"
import { AddPatientSheet } from "./add-patient-sheet"

export default async function PatientsPage({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const patients = await prisma.patient.findMany({
        orderBy: {
            fullName: "asc",
        },
    })
    const patientRows = patients.map((patient) => ({
        id: patient.id,
        fullName: patient.fullName,
        phone: patient.phone,
        email: patient.email ?? undefined,
        birthDate: patient.birthDate?.toISOString(),
        isActive: patient.isActive,
    }))
    const totalPatients = patients.length
    const activePatients = patients.filter(
        (patient) => patient.isActive,
    ).length
    const inactivePatients = totalPatients - activePatients

    return (
        <Dashboard>
            <div className="space-y-6">
                {/* Header */}
                <section className="relative overflow-hidden rounded-xl border bg-primary/[0.04]">
                    <div className="absolute -right-16 -top-24 size-64 rounded-full bg-primary/10" />
                    <div className="absolute -bottom-28 right-32 size-52 rounded-full bg-chart-2/10" />

                    <div className="relative flex items-center justify-between gap-6 px-6 py-7">
                        <div className="min-w-0">
                            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                                <Users className="size-4" />
                                Patient directory
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight">
                                Patients
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                                Keep your patient information organized and easy to access.
                            </p>
                        </div>

                        <AddPatientSheet locale={locale} />
                    </div>
                </section>

                {/* Overview */}
                <section className="grid gap-4 md:grid-cols-3">
                    <Card className="overflow-hidden border-primary/20">
                        <CardContent className="relative p-5">
                            <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/10" />

                            <p className="relative text-sm font-medium text-muted-foreground">
                                Total patients
                            </p>

                            <div className="relative mt-3 flex items-end justify-between">
                                <span className="text-3xl font-bold tracking-tight">
                                    {totalPatients}
                                </span>

                                <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-primary">
                                    <ArrowUpRight className="size-3.5" />
                                    All patients
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm font-medium text-muted-foreground">
                                Active patients
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                                <span className="text-3xl font-bold tracking-tight">
                                    {activePatients}
                                </span>

                                <span className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium">
                                    <span className="size-2 rounded-full bg-emerald-500" />
                                    Active
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm font-medium text-muted-foreground">
                                Inactive patients
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                                <span className="text-3xl font-bold tracking-tight">
                                    {inactivePatients}
                                </span>

                                <span className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                                    <span className="size-2 rounded-full bg-muted-foreground/40" />
                                    Inactive
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Patients section */}
                <Card className="overflow-hidden">
                    <CardHeader className="border-b bg-muted/20 px-5 py-4">
                        <CardTitle className="text-base">
                            Patient list
                        </CardTitle>

                        <p className="text-xs text-muted-foreground">
                            Your cabinet&apos;s patient directory.
                        </p>
                    </CardHeader>
                    <CardContent className="p-5">
                        <PatientsTable patients={patientRows} locale={locale} />
                    </CardContent>
                </Card>
            </div>
        </Dashboard>
    )
}