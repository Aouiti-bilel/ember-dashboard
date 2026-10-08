import Link from "next/link"
import { ArrowLeft, CalendarDays, Mail, Pencil, Phone } from "lucide-react"

import { prisma } from "@/lib/prisma"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dashboard } from "@/components/layout/dashboard"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PatientDetailsActions } from "../patient-details-actions"
import { NewAppointmentActions } from "../new-appointment-actions"
import { AppointmentActions } from "../appointment-actions"
import { appointmentStatusConfig } from "../appointment-status"
import { appointmentTypeConfig } from "../appointment-type"

type PatientPageProps = {
    params: Promise<{
        locale: string
        patientId: string
    }>
}

export default async function PatientPage({
    params,
}: PatientPageProps) {
    const { locale, patientId } = await params
    const patient = await prisma.patient.findUnique({
        where: {
            id: patientId,
        },
        include: {
            appointments: {
                orderBy: {
                    date: "asc",
                },
            },
        },
    })

    if (!patient) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-semibold">
                    Patient not found
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    The patient you are looking for does not exist.
                </p>

                <Button asChild className="mt-6">
                    <Link href={`/${locale}/patients`}>
                        <ArrowLeft className="mr-2 size-4" />
                        Back to patients
                    </Link>
                </Button>
            </div>
        )
    }

    const birthDate = patient.birthDate
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(patient.birthDate)
        : "—"

    const createdDate = new Intl.DateTimeFormat("en-GB", {
        month: "short",
        year: "numeric",
    }).format(patient.createdAt)
    return (
        <Dashboard>
            <div className="space-y-6">
                {/* Back */}
                <Button
                    asChild
                    variant="ghost"
                    className="-ml-2"
                >
                    <Link href={`/${locale}/patients`}>
                        <ArrowLeft className="mr-2 size-4" />
                        Patients
                    </Link>
                </Button>

                {/* Header */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                            {patient.fullName
                                .split(" ")
                                .map((name) => name[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    {patient.fullName}
                                </h1>

                                <Badge
                                    variant={
                                        patient.isActive
                                            ? "default"
                                            : "secondary"
                                    }
                                >
                                    {patient.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Patient since {createdDate}
                            </p>
                        </div>
                    </div>
                    <PatientDetailsActions
                        locale={locale}
                        patient={patient}
                    />
                </div>

                {/* Information */}
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Contact information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                    <Phone className="size-4 text-muted-foreground" />
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Phone
                                    </p>

                                    <p className="text-sm font-medium">
                                        {patient.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                    <Mail className="size-4 text-muted-foreground" />
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Email
                                    </p>

                                    <p className="text-sm font-medium">
                                        {patient.email || "—"}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Personal information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Birth date
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    {birthDate}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Gender
                                </p>

                                <p className="mt-1 text-sm font-medium">
                                    —
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Appointments */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                            Appointments
                        </CardTitle>

                        <NewAppointmentActions
                            locale={locale}
                            patientId={patient.id}
                            patientName={patient.fullName}
                        />
                    </CardHeader>

                    <CardContent>
                        {patient.appointments.length === 0 ? (
                            <div className="flex min-h-32 flex-col items-center justify-center text-center">
                                <CalendarDays className="size-8 text-muted-foreground/50" />

                                <p className="mt-3 text-sm font-medium">
                                    No appointments yet
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Appointments for this patient will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {patient.appointments.map((appointment) => {
                                    const status = appointmentStatusConfig[appointment.status] || {
                                        label: appointment.status,
                                        variant: "default",
                                    }
                                    const type = appointmentTypeConfig[appointment.type]
                                    return <div
                                        key={appointment.id}
                                        className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-start sm:justify-between"
                                    >
                                        <div className="min-w-0 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                    <CalendarDays className="size-4 text-primary" />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                        <p className="text-sm font-semibold">
                                                            {new Intl.DateTimeFormat("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                            }).format(appointment.date)}
                                                        </p>

                                                        <span className="text-muted-foreground">
                                                            ·
                                                        </span>

                                                        <p className="text-sm font-semibold">
                                                            {new Intl.DateTimeFormat("en-GB", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            }).format(appointment.date)}
                                                        </p>
                                                    </div>

                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {type.label}
                                                    </p>
                                                </div>
                                            </div>

                                            {appointment.notes && (
                                                <div className="ml-[52px]">
                                                    <p className="text-xs text-muted-foreground">
                                                        Notes
                                                    </p>

                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {appointment.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2 sm:pt-1">
                                            <Badge variant={status.variant}>
                                                {status.label}
                                            </Badge>

                                            <AppointmentActions
                                                locale={locale}
                                                appointment={appointment}
                                            />
                                        </div>
                                    </div>
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Dashboard>
    )
}