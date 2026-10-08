import { Dashboard } from "@/components/layout/dashboard"

import { NewPatients } from "./new-patients"
import { StatCard } from "./stat-card"
import { TodaysAppointments } from "./todays-appointments"
import { TodaysSchedule } from "./todays-schedule"
import { VisitOverview } from "./visit-overview"
import { WeeklyAppointments } from "./weekly-appointments"
import { prisma } from "@/lib/prisma"
import { PatientArrived } from "./patient-arrived"
import { WaitingRoom } from "./waiting-room"

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)

  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const todaysAppointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        not: "CANCELLED",
      },
    },
    include: {
      patient: true,
    },
    orderBy: {
      date: "asc",
    },
  })
  const todaysAppointmentData = todaysAppointments.map(
    (appointment) => ({
      id: appointment.id,
      time: new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(appointment.date),
      patient: appointment.patient.fullName,
      type: appointment.type
        .replace("_", " ")
        .replace(/^\w/, (letter) => letter.toUpperCase()),
      status: appointment.status
        .replace("_", " ")
        .replace(/^\w/, (letter) => letter.toUpperCase()),
    }),
  )
  const patients = await prisma.patient.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      fullName: true,
      phone: true,
    },
    orderBy: {
      fullName: "asc",
    },
  })
  const waitingRoomPatients = await prisma.emergencyVisit.findMany({
    where: {
      arrivedAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        in: ["WAITING", "IN_CONSULTATION"],
      },
    },
    include: {
      patient: true,
    },
    orderBy: {
      arrivedAt: "asc",
    },
  })
  const waitingRoomData = waitingRoomPatients.map((visit) => ({
    id: visit.id,
    patientName: visit.patient.fullName,
    arrivedAt: visit.arrivedAt,
    status: visit.status,
  }))
  return (
    <Dashboard>
      <div className="space-y-6">
        {/* Main overview */}
        <div className="flex justify-end">
          <PatientArrived patients={patients} locale={locale} />
        </div>
        <section className="grid min-w-0 items-stretch gap-6 xl:grid-cols-5">

          <div className="min-w-0 xl:col-span-3">
            <VisitOverview doctorName="Doe" />
          </div>
          <WaitingRoom
            patients={waitingRoomData}
            locale={locale}
          />          <div className="min-w-0 xl:col-span-2">
            <TodaysAppointments
              appointments={todaysAppointmentData}
            />
          </div>
        </section>

        {/* Key statistics */}
        <section
          aria-label="Dashboard statistics"
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            title="Patients Today"
            value="8"
            trend="+2"
            accent={1}
          />

          <StatCard
            title="Appointments Today"
            value="6"
            trend="2 remaining"
            accent={2}
          />

          <StatCard
            title="Completed Visits"
            value="4"
            trend="67%"
            accent={3}
          />

          <StatCard
            title="New Patients"
            value="2"
            trend="+1"
            accent={4}
          />
        </section>
        {/* Today's activity divider */}
        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-border" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Today&apos;s activity
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Today's schedule */}
        <TodaysSchedule />

        {/* Activity trends */}
        <section className="grid gap-6 lg:grid-cols-2">
          <WeeklyAppointments />
          <NewPatients />
        </section>
      </div>
    </Dashboard>
  )
}