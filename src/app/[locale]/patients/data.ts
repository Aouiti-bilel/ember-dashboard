export type Patient = {
  id: string
  fullName: string
  phone: string
  email: string | null
  birthDate: string | null
  isActive: boolean
}

export const patients: Patient[] = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    phone: "+216 22 345 678",
    email: "sarah@example.com",
    birthDate: "1988-03-12",
    isActive: true,
  },
  {
    id: "2",
    fullName: "Michael Chen",
    phone: "+216 55 234 891",
    email: null,
    birthDate: "1992-07-24",
    isActive: true,
  },
  {
    id: "3",
    fullName: "Emily Davis",
    phone: "+216 98 456 123",
    email: "emily@example.com",
    birthDate: "1985-11-08",
    isActive: true,
  },
  {
    id: "4",
    fullName: "James Wilson",
    phone: "+216 27 891 234",
    email: null,
    birthDate: "1979-05-19",
    isActive: false,
  },
  {
    id: "5",
    fullName: "Maria Rodriguez",
    phone: "+216 21 567 890",
    email: "maria@example.com",
    birthDate: "1990-01-31",
    isActive: true,
  },
  {
    id: "6",
    fullName: "Robert Taylor",
    phone: "+216 53 789 456",
    email: "robert@example.com",
    birthDate: "1982-09-15",
    isActive: true,
  },
]