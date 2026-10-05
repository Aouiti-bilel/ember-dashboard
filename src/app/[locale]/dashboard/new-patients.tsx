import { prisma } from "@/lib/prisma"

import { NewPatientsChart } from "./new-patients-chart"

export async function NewPatients() {
  const now = new Date()

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - 5,
    1,
  )

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
  )

  const patients = await prisma.patient.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
  })

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - 5 + index,
      1,
    )

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      label: formatter
        .format(date)
        .replace(".", "")
        .replace(/^\w/, (letter) => letter.toUpperCase()),
      patients: 0,
    }
  })

  for (const patient of patients) {
    const month = months.find(
      (item) =>
        item.year === patient.createdAt.getFullYear() &&
        item.month === patient.createdAt.getMonth(),
    )

    if (month) {
      month.patients += 1
    }
  }

  return <NewPatientsChart data={months} />
}