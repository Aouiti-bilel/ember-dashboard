"use client"

type VisitOverviewProps = {
    doctorName: string
    completed: number
    planned: number
    completedProgress?: number
    plannedProgress?: number
}

export function VisitOverview({
    doctorName,
    completed,
    planned,
    completedProgress = 0,
    plannedProgress = 0,
}: VisitOverviewProps) {
    return (
        <section className="relative h-full overflow-hidden rounded-lg border border-border bg-background">            {/* Decorative background */}
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
                    Dr.{doctorName} !
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                    Une vue densemble complète des visites prévues pour aujourdhui.
                </p>

                <div className="mt-5 grid gap-8 lg:grid-cols-2">
                    <VisitKpi
                        title="Visites Terminées"
                        description="Ce KPI affiche le nombre de rendez-vous qui ont déjà eu lieu et sont considérés comme terminés pour aujourd'hui."
                        value={completed}
                        progress={completedProgress}
                    />

                    <VisitKpi
                        title="Visites Prévisionnelles"
                        description="Ce KPI concerne les rendez-vous prévus pour le reste de la journée."
                        value={planned}
                        progress={plannedProgress}
                    />
                </div>
            </div>
        </section>
    )
}



type VisitKpiProps = {
    title: string
    description: string
    value: number
    progress?: number
}

export function VisitKpi({
    title,
    description,
    value,
    progress = 0,
}: VisitKpiProps) {
    const safeProgress = Math.min(Math.max(progress, 0), 100)

    const radius = 80
    const circumference = Math.PI * radius
    const progressLength = (safeProgress / 100) * circumference

    return (
        <div>
            <h2 className="text-2xl font-normal tracking-tight text-primary">
                {title}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                {description}
            </p>

            <div className="mt-4 border-t border-border" />

            <div className="relative mx-auto mt-4 h-[125px] max-w-[220px] overflow-hidden">
                <svg
                    viewBox="0 0 200 110"
                    className="absolute inset-x-0 top-0 h-auto w-full"
                    aria-hidden="true"
                >
                    {/* Background arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="16"
                        strokeLinecap="butt"
                        className="text-muted"
                    />

                    {/* Progress arc */}
                    {safeProgress > 0 && (
                        <path
                            d="M 20 100 A 80 80 0 0 1 180 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="16"
                            strokeLinecap="butt"
                            strokeDasharray={`${progressLength} ${circumference}`}
                            className="text-primary"
                        />
                    )}
                </svg>

                <div className="absolute inset-x-0 bottom-2 text-center">
                    <div className="text-base font-medium text-primary">
                        {value}
                    </div>

                    <div className="mt-0.5 text-sm font-semibold text-primary">
                        rendez-vous
                    </div>
                </div>
            </div>
        </div>
    )
}