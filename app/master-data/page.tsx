"use client"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Machine } from "@/model/machines"
import machinesServices from "@/services/machines"
import { ColumnDef } from "@tanstack/react-table"
import { useCallback, useEffect, useState } from "react"

export default function UsersPage() {
    const [data, setData] = useState<Machine[]>([])
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<Machine | null>(null)

    const [openModal, setOpenModal] = useState(false)
    const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    const [form, setForm] = useState({
        machineNumber: "",
        standardCapacityQuantity: "1",
    })

    const totalPages = Math.ceil(totalCount / pageSize)

    const columns: ColumnDef<Machine>[] = [
        {
            accessorKey: "machineNumber",
            header: "機械番号",
        },
        {
            accessorKey: "standardCapacityQuantity",
            header: "標準処理能力",
        },
        {
            id: "actions",
            header: "操作",
            cell: ({ row }) => {
                const item = row.original
                return (
                    <button
                        className="text-red-600 hover:text-red-800"
                        onClick={(e) => {
                            e.stopPropagation()
                            setDeleteTarget(item)
                            setOpenDelete(true)
                        }}
                    >
                        🗑️
                    </button>
                )
            }
        }
    ]


    const getData = useCallback(async () => {
        try {
            setIsLoading(true)
            const res = await machinesServices.getMachinesPaginationData({ PageIndex: pageIndex, PageSize: pageSize })
            setTotalCount(res.machines.count)
            setData(res.machines.data)
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }, [pageIndex, pageSize])

    const handleSave = async () => {
        try {
            setIsSaving(true)

            if (selectedMachine) {
                await machinesServices.updateMachineNumber({
                    id: selectedMachine.id,
                    machineNumber: form.machineNumber
                })
                await machinesServices.updateStandardCapacityQuantity({
                    id: selectedMachine.id,
                    standardCapacityQuantity: Number(form.standardCapacityQuantity)
                })
            } else {
                const response = await machinesServices.createMachine({
                    machineNumber: form.machineNumber
                })
                if (response.id) {
                    await machinesServices.updateStandardCapacityQuantity({
                        id: response.id,
                        standardCapacityQuantity: Number(form.standardCapacityQuantity)
                    })
                }
            }

            setOpenModal(false)
            getData()
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        try {
            await machinesServices.deleteMachine(deleteTarget.id)
            setOpenDelete(false)
            setDeleteTarget(null)
            getData()
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        if (selectedMachine) {
            setForm({
                machineNumber: selectedMachine.machineNumber,
                standardCapacityQuantity: selectedMachine.standardCapacityQuantity.toString(),
            })
        } else {
            setForm({
                machineNumber: "",
                standardCapacityQuantity: "1",
            })
        }
    }, [selectedMachine])


    return (
        <PageLayout title="設備一覧">
            <div className="p-6 bg-white">
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={() => {
                            setSelectedMachine(null)
                            setOpenModal(true)
                        }}
                        className="bg-[#299fde] text-white px-12 py-4 rounded-lg text-xl font-bold"
                    >
                        新規設備を登録
                    </Button>
                </div>

                <DataTable
                    isLoading={isLoading}
                    columns={columns} data={data} onRowClick={(item) => {
                        setSelectedMachine(item)   // lưu item để edit
                        setOpenModal(true)
                    }} />

                <Pagination className="mt-6">
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => pageIndex > 1 && setPageIndex(pageIndex - 1)}
                                className={pageIndex <= 1 ? "pointer-events-none opacity-40" : ""}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const page = i + 1
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        isActive={pageIndex === page}
                                        onClick={() => setPageIndex(page)}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => pageIndex < totalPages && setPageIndex(pageIndex + 1)}
                                className={pageIndex >= totalPages ? "pointer-events-none opacity-40" : ""}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            </div>

            {/* MODAL EDIT/CRETATE */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedMachine ? "設備情報を編集" : "新規設備を登録"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">機械番号</label>
                            <Input
                                value={form.machineNumber}
                                onChange={e => setForm({ ...form, machineNumber: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">標準処理能力</label>
                            <Input
                                type="number"
                                value={form.standardCapacityQuantity}
                                onChange={e =>
                                    setForm({
                                        ...form,
                                        standardCapacityQuantity: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            className="bg-blue-600 text-white"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? "保存中..." : selectedMachine ? "更新" : "作成"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* MODAL COFIRM DELETE */}
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>削除確認</DialogTitle>
                    </DialogHeader>

                    <p>
                        設備「{deleteTarget?.machineNumber}」を削除しますか？
                    </p>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenDelete(false)}
                            disabled={isSaving}
                        >
                            キャンセル
                        </Button>

                        <Button
                            className="bg-red-600 text-white"
                            onClick={handleDelete}
                        >
                            削除
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </PageLayout>
    )
}
