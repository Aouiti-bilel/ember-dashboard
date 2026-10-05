import { prisma } from "@/lib/prisma"

import { WeeklyAppointmentsChart } from "./weekly-appointments-chart"

export async function WeeklyAppointments() {
  const now = new Date()

  const startOfWeek = new Date(now)
  const day = startOfWeek.getDay()

  const diff = day === 0 ? -6 : 1 - day

  startOfWeek.setDate(startOfWeek.getDate() + diff)
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 7)

  const appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lt: endOfWeek,
      },
      status: {
        not: "CANCELLED",
      },
    },
    select: {
      date: true,
    },
    orderBy: {
      date: "asc",
    },
  })

  const days = [
    { key: 1, day: "Lun", appointments: 0 },
    { key: 2, day: "Mar", appointments: 0 },
    { key: 3, day: "Mer", appointments: 0 },
    { key: 4, day: "Jeu", appointments: 0 },
    { key: 5, day: "Ven", appointments: 0 },
    { key: 6, day: "Sam", appointments: 0 },
    { key: 0, day: "Dim", appointments: 0 },
  ]

  for (const appointment of appointments) {
    const day = appointment.date.getDay()

    const entry = days.find((item) => item.key === day)

    if (entry) {
      entry.appointments += 1
    }
  }

  return <WeeklyAppointmentsChart data={days} />
}