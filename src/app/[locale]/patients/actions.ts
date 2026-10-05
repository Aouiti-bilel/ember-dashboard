"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export type CreatePatientState = {
  error?: string
  success?: boolean
  patientName?: string
}

export async function createPatient(
  locale: string,
  formData: FormData,
): Promise<CreatePatientState> {
  const fullName = String(formData.get("fullName") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const birthDate = String(formData.get("birthDate") ?? "").trim()

  if (!fullName) {
    return {
      error: "Patient name is required.",
    }
  }

  if (!phone) {
    return {
      error: "Phone number is required.",
    }
  }
  const patient = await prisma.patient.create({
    data: {
      fullName,
      phone,
      email: email || null,
      birthDate: birthDate ? new Date(birthDate) : null,
    },
  })

  revalidatePath(`/${locale}/patients`)

  return {
    success: true,
    patientName: patient.fullName,
  }
}



export type PatientActionState = {
  error?: string
  success?: boolean
  patientName?: string
}

export async function updatePatient(
  locale: string,
  patientId: string,
  formData: FormData,
): Promise<PatientActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim()
  const phone = String(formData.get("phone") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const birthDate = String(formData.get("birthDate") ?? "").trim()

  if (!fullName) {
    return {
      error: "Patient name is required.",
    }
  }

  if (!phone) {
    return {
      error: "Phone number is required.",
    }
  }

  const patient = await prisma.patient.update({
    where: {
      id: patientId,
    },
    data: {
      fullName,
      phone,
      email: email || null,
      birthDate: birthDate ? new Date(birthDate) : null,
    },
  })

  revalidatePath(`/${locale}/patients`)

  return {
    success: true,
    patientName: patient.fullName,
  }
}

export type AppointmentActionState = {
  error?: string
  success?: boolean
}

export async function createAppointment(
  locale: string,
  formData: FormData,
): Promise<AppointmentActionState> {
  const patientId = String(formData.get("patientId") ?? "").trim()
  const date = String(formData.get("date") ?? "").trim()
  const time = String(formData.get("time") ?? "").trim()
  const type = String(formData.get("type") ?? "").trim()
  const status = String(formData.get("status") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()

  if (!patientId) {
    return {
      error: "Patient is required.",
    }
  }

  if (!date) {
    return {
      error: "Date is required.",
    }
  }

  if (!time) {
    return {
      error: "Time is required.",
    }
  }

  const appointmentDate = new Date(`${date}T${time}`)

  if (Number.isNaN(appointmentDate.getTime())) {
    return {
      error: "Invalid appointment date or time.",
    }
  }

  await prisma.appointment.create({
    data: {
      patientId,
      date: appointmentDate,
      type: type as "CONSULTATION" | "FOLLOW_UP" | "CHECK_UP",
      status: status as
        | "SCHEDULED"
        | "CONFIRMED"
        | "COMPLETED"
        | "CANCELLED"
        | "NO_SHOW",
      notes: notes || null,
    },
  })

  revalidatePath(`/${locale}/patients/${patientId}`)

  return {
    success: true,
  }
}


export async function updateAppointment(
  locale: string,
  appointmentId: string,
  patientId: string,
  formData: FormData,
): Promise<AppointmentActionState> {
  const date = String(formData.get("date") ?? "").trim()
  const time = String(formData.get("time") ?? "").trim()
  const type = String(formData.get("type") ?? "").trim()
  const status = String(formData.get("status") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()

  if (!date) {
    return { error: "Date is required." }
  }

  if (!time) {
    return { error: "Time is required." }
  }

  const appointmentDate = new Date(`${date}T${time}`)

  if (Number.isNaN(appointmentDate.getTime())) {
    return { error: "Invalid appointment date or time." }
  }

  await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      date: appointmentDate,
      type: type as "CONSULTATION" | "FOLLOW_UP" | "CHECK_UP",
      status: status as
        | "SCHEDULED"
        | "CONFIRMED"
        | "COMPLETED"
        | "CANCELLED"
        | "NO_SHOW",
      notes: notes || null,
    },
  })

  revalidatePath(`/${locale}/patients/${patientId}`)

  return {
    success: true,
  }
}

export async function cancelAppointment(
  locale: string,
  appointmentId: string,
  patientId: string,
): Promise<AppointmentActionState> {
  await prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: "CANCELLED",
    },
  })

  revalidatePath(`/${locale}/patients/${patientId}`)

  return {
    success: true,
  }
}