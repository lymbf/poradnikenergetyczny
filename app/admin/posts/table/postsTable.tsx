"use client"
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    VisibilityState
} from "@tanstack/table-core";
import React, {useActionState, useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import {ChevronDown, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {columns} from "@/app/admin/posts/table/columns";
import {Article} from "@/app/admin/posts/interfaces";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {getArticles} from "@/actions/articles/articles";
import {deletPostsAction} from "@/app/admin/posts/actions";
import LoadingSpinner from "@/components/ui/my_elements/loadingSpinner";
import ErrorBox from "@/components/ui/my_elements/errorBox";
import MessageBox from "@/components/ui/my_elements/messageBox";


export default function PostsTable({className,}: { className?: string, }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 5, //default page size
    })
    const [articles, setArticles] = React.useState<Article[]>([])
    const [showMessage, setShowMessage] = useState<boolean>(false);


    useEffect(() => {
        getArticles().then(res => {
            res && setArticles(res);
            console.log('articles: ', articles)
        })
    }, [])

    const table = useReactTable({
        data: articles,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getRowId: row => row.id,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination
        },
    })

    const initState = {message: '', success: false, ids: []}
    const deletePosts = deletPostsAction.bind(null, rowSelection)
    const [state, action, pending] = useActionState(deletePosts, initState)

    /*   adjust articles state after deleting the posts  */
    useEffect(() => {
        if (state?.success) {
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000)
            setArticles((prev) => {
                return prev.filter(a => {
                    return !state?.ids.includes(a.id.toString())
                })
            })
        }
        if(state?.message.length && !state?.success){
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000)
        }
    }, [state])

    return (
        <div className="relative w-full">
            {pending && <LoadingSpinner
                className={'z-[99] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'}/>}
            <div className=' absolute top-[-50px] right-0 flex justify-center items-center h-[40px] min-w-[300px]'>
                {showMessage && state?.success && <MessageBox message={state?.message}/>}
                {showMessage && !state?.success && state?.message && <ErrorBox errorMessage={state?.message}/>}

            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter articles..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <form action={action}>
                    <Button type='submit' className={'ml-4 text-[12px] font-bold flex items-center text-muted'}><Trash2
                        className={'mr-2 text-muted'}/>Delete selected</Button>
                </form>
            </div>
            <div className="rounded-md border">
                <Table>

                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>

                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
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