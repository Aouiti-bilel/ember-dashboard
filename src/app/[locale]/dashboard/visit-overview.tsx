import { prisma } from "@/lib/prisma"

type VisitOverviewProps = {
    doctorName: string
}

export async function VisitOverview({
    doctorName,
}: VisitOverviewProps) {
    const now = new Date()

    const startOfDay = new Date(now)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(now)
    endOfDay.setHours(23, 59, 59, 999)

    const appointments = await prisma.appointment.findMany({
        where: {
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
            status: {
                not: "CANCELLED",
            },
        },
        select: {
            date: true,
            status: true,
        },
    })

    const total = appointments.length

    const completed = appointments.filter(
        (appointment) => appointment.status === "COMPLETED",
    ).length

    const remaining = Math.max(total - completed, 0)

    const progress =
        total > 0 ? Math.round((completed / total) * 100) : 0

    return (
        <section className="relative h-full overflow-hidden rounded-lg border border-border bg-background">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-32 size-[360px] rounded-full bg-primary/5"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 top-20 size-[300px] rounded-full bg-chart-2/5"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 right-24 size-[260px] rounded-full bg-chart-3/10"
            />

            <div className="relative px-5 py-5">
                <h1 className="text-2xl font-bold tracking-tight text-primary">
                    Dr. {doctorName}!
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Suivez l’avancement de votre journée en un coup d’œil.
                </p>

                <div className="mt-5 grid gap-8 lg:grid-cols-2">
                    <VisitKpi
                        title="Visites terminées"
                        description="Les rendez-vous déjà effectués aujourd’hui."
                        value={completed}
                    />

                    <VisitKpi
                        title="Visites restantes"
                        description="Les rendez-vous qu’il vous reste à recevoir aujourd’hui."
                        value={remaining}
                    />
                </div>

                <div className="mt-6 border-t border-border pt-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold">
                                Progression de la journée
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {total === 0
                                    ? "Aucun rendez-vous prévu aujourd’hui."
                                    : `${completed} visite${completed > 1 ? "s" : ""} sur ${total} terminée${completed > 1 ? "s" : ""}.`}
                            </p>
                        </div>

                        <span className="text-sm font-semibold text-primary">
                            {progress}%
                        </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

type VisitKpiProps = {
    title: string
    description: string
    value: number
}

function VisitKpi({
    title,
    description,
    value,
}: VisitKpiProps) {
    return (
        <div>
            <h2 className="text-2xl font-normal tracking-tight text-primary">
                {title}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <div className="mt-4 border-t border-border" />

            <div className="mt-5">
                <div className="text-4xl font-semibold tracking-tight text-primary">
                    {value}
                </div>

                <div className="mt-1 text-sm text-muted-foreground">
                    rendez-vous
                </div>
            </div>
        </div>
    )
}