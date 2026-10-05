"use client"

import {
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    filterFn_equals,
    filterFn_includesString,
    globalFilteringFeature,
    columnFilteringFeature,
    rowPaginationFeature,
    rowSortingFeature,
    tableFeatures,
    useTable,
    type ColumnDef,
    type SortingState,
} from "@tanstack/react-table"
import {
    ArrowUpDown,
    MoreHorizontal,
    Search,
    SlidersHorizontal,
} from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link'

import { EditPatientSheet } from "./edit-patient-sheet"
export type Patient = {
    id: string
    fullName: string
    phone: string
    email?: string
    birthDate?: string
    isActive: boolean
}





const features = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    rowSortingFeature,
    rowPaginationFeature,

    filteredRowModel: createFilteredRowModel(),
    sortedRowModel: createSortedRowModel(),
    paginatedRowModel: createPaginatedRowModel(),

    filterFns: {
        includesString: filterFn_includesString,
        equals: filterFn_equals,
    },
})

export function PatientsTable({
    patients,
    locale,
}: {
    patients: Patient[]
    locale: string
}) {
    const [editingPatient, setEditingPatient] =
        useState<Patient | null>(null)
    const columns: ColumnDef<typeof features, Patient>[] = [{
        accessorKey: "fullName",
        header: ({ column }) => (
            <button
                type="button"
                className="flex items-center gap-1.5 font-medium"
                onClick={() => column.toggleSorting()}
            >
                Patient
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
            </button>
        ),
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("fullName")}</div>
        ),
        filterFn: "includesString",
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("phone")}
            </span>
        ),
        filterFn: "includesString",
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("email") || "—"}
            </span>
        ),
        filterFn: "includesString",
    },
    {
        accessorKey: "birthDate",
        header: "Birth date",
        cell: ({ row }) => {
            const value = row.getValue("birthDate") as string | undefined

            if (!value) {
                return <span className="text-muted-foreground">—</span>
            }

            return new Intl.DateTimeFormat("en-GB").format(new Date(value))
        },
        enableGlobalFilter: false,
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.getValue("isActive") as boolean

            return (
                <Badge
                    variant={isActive ? "default" : "secondary"}
                    className="gap-1.5"
                >
                    <span
                        className={`size-1.5 rounded-full ${isActive ? "bg-background" : "bg-muted-foreground"
                            }`}
                    />
                    {isActive ? "Active" : "Inactive"}
                </Badge>
            )
        },
        filterFn: "equals",
        enableGlobalFilter: false,
    },
    {
        id: "actions",
        header: "",
        enableGlobalFilter: false,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted"
                    >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open actions</span>
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/${locale}/patients/${row.original.id}`}
                        >
                            View patient
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() => {
                            setEditingPatient(row.original)
                        }}
                    >
                        Edit patient
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
    ]
    const [sorting, setSorting] = useState<SortingState>([])


    const table = useTable(
        {
            features,
            data: patients,
            columns,
            globalFilterFn: "includesString",
            onSortingChange: setSorting,
        },
        (state) => ({
            sorting: state.sorting,
            globalFilter: state.globalFilter,
            pagination: state.pagination,
            columnFilters: state.columnFilters,
        }),
    )

    const globalFilter = table.state.globalFilter ?? ""

    const statusFilter =
        table.state.columnFilters.find(
            (filter) => filter.id === "isActive",
        )?.value

    const filteredCount = table.getFilteredRowModel().rows.length

    return (
        <div className="space-y-4">
            {editingPatient && (
                <EditPatientSheet
                    locale={locale}
                    patient={editingPatient}
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) {
                            setEditingPatient(null)
                        }
                    }}
                />
            )}
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-sm">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={globalFilter}
                        onChange={(event) =>
                            table.setGlobalFilter(event.target.value)
                        }
                        placeholder="Search patients..."
                        className="pl-9"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <SlidersHorizontal className="size-4" />
                        <span className="hidden sm:inline">Status</span>
                    </div>

                    <select
                        value={
                            statusFilter === undefined
                                ? "all"
                                : statusFilter
                                    ? "active"
                                    : "inactive"
                        }
                        onChange={(event) => {
                            const value = event.target.value

                            table.setColumnFilters((previous) => {
                                const filters = previous.filter(
                                    (filter) => filter.id !== "isActive",
                                )

                                if (value === "all") {
                                    return filters
                                }

                                return [
                                    ...filters,
                                    {
                                        id: "isActive",
                                        value: value === "active",
                                    },
                                ]
                            })
                        }}
                        className="h-9 rounded-md border bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
                    >
                        <option value="all">All patients</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Result count */}
            <div className="text-xs text-muted-foreground">
                {filteredCount}{" "}
                {filteredCount === 1 ? "patient" : "patients"}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <table.FlexRender header={header} />
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getAllCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            <table.FlexRender cell={cell} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No patients found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Page {table.state.pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </p>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}